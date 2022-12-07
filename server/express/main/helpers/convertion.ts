import { BookFromExternalSource, BookParams } from '../config/types/book';
import { processAuthorName } from './string-manipulation';
import { BookLoanParams } from '../config/types/loanBook';
import { resources, temp } from '../config/paths';
import { File } from '../config/types/file';

import { createWriteStream, readdirSync, unlink } from 'node:fs';

import jsonToXlsx, { ISettings } from 'json-as-xlsx';

import PDFDocument from 'pdfkit';
import csv from 'csvtojson';
import xlsx from 'xlsx';

type DataToIncludeInPdfTable = {
	quantity?: number;
	tumble?: string;
	status?: string;
	name?: string;
	title?: string;
	book?: { title: string };
};

type DataToIncludeInHeader = {
	totalLoansQuantity?: number;
	mostBorrowedBook?: string;
	upToDateLoans?: number;
	lateLoans?: number;

	mostPopularCategory?: string;
	totalBooksQuantity?: number;
	mostPopularAuthor?: string;
};

function cleanTempFolder() {
	readdirSync(temp).forEach((file: string) => {
		unlink(`${temp}/${file}`, () => {});
	});
}

// Book
function convertImportedJsonToBook(books: any): BookParams[] {
	if (books[0]['id']) {
		return books;
	} else {
		return convertImportedBookToDatabaseBook(books as BookFromExternalSource[]);
	}
}

function convertImportedBookToDatabaseBook(
	books: BookFromExternalSource[]
): BookParams[] {
	return books.map((book) => ({
		title: book.OBRA,
		tumble: book.TOMBO,
		authors: [processAuthorName(book.AUTOR)],
		categories: [book['COLEÇÃO']],
		publishingCompany: book.EDITORA
	}));
}

// Book Loan
function convertImportedJsonToBookLoan(loans: any): BookLoanParams[] {
	return loans as BookLoanParams[];
}

// General
async function csvToJson(file: File) {
	const json = await csv().fromFile(`${temp}/${file.filename}`);
	return json;
}

function xlsxToJson(file: File) {
	// Read the file using pathname
	const fileData = xlsx.readFile(`${temp}/${file.filename}`);

	// Grab the sheet info from the file
	const sheetNames = fileData.SheetNames;

	const totalSheets = sheetNames.length;

	// Variable to store our data
	let parsedData = [];

	// Loop through sheets
	for (let i = 0; i < totalSheets; i++) {
		// Convert to json using xlsx
		const tempData = xlsx.utils.sheet_to_json(fileData.Sheets[sheetNames[i]]);

		// Skip header row which is the colum names
		// tempData.shift();

		// Add the sheet's json to our data array
		parsedData.push(...tempData);
	}

	return parsedData;
}

function jsToXlsx(data: any[], filename?: string): string {
	const fileName = filename || 'export';
	const columnNames = Object.keys(data[0]);

	const formatedData = [
		{
			sheet: 'Export',
			columns: columnNames.map((column) => {
				if (column === 'deliveryDate') return { label: column, value: column, format: 'd-mmm-yy' };
				return { label: column, value: column };
			}),
			content: data
		}
	];

	const settings: ISettings = {
		fileName: `${temp}/${fileName}`,
	};

	jsonToXlsx(formatedData, settings);

	return `${fileName}.xlsx`;
}

// PDF
function generateHeader(doc: typeof PDFDocument) {
	doc
		.image(`./resources/logo.png`, 50, 45, { width: 50 })
		.fillColor('#444444')
		.fontSize(20)
		.text('Digital Library', 110, 57)
		.fontSize(10)
		.text('Digital Library', 200, 50, { align: 'right' })
		.text(new Date().toLocaleString(), 200, 65, { align: 'right' })
		.moveDown();
}

function setHeaderInformation(
	doc: typeof PDFDocument,
	headerData: DataToIncludeInHeader,
	content: 'books' | 'loans'
) {
	const title =
		content === 'books' ? 'Livros com mais Exemplares' : 'Empréstimos';

	doc.fillColor('#444444').fontSize(20).text(title, 50, 160);

	generateHr(doc, 185);

	const customerInformationTop = 200;

	if (content === 'books') {
		doc
			.fontSize(10)
			.text('Total de Livros:', 50, customerInformationTop)
			.font('Helvetica-Bold')
			.text(String(headerData.totalBooksQuantity), 180, customerInformationTop)
			.font('Helvetica')
			.text('Categoria mais Popular:', 50, customerInformationTop + 15)
			.text(headerData.mostPopularCategory, 180, customerInformationTop + 15)
			.text('Autor mais Popular:', 50, customerInformationTop + 30)
			.text(headerData.mostPopularAuthor, 180, customerInformationTop + 30);
	} else if (content === 'loans') {
		doc
			.fontSize(10)
			.text('Total de Empréstimos:', 50, customerInformationTop)
			.font('Helvetica-Bold')
			.text(String(headerData.totalLoansQuantity), 180, customerInformationTop)
			.font('Helvetica')
			.text('Livro mais Emprestado:', 50, customerInformationTop + 15)
			.text(headerData.mostBorrowedBook, 180, customerInformationTop + 15)
			.text(
				'Quantidade de Empréstimos em Dia:',
				50,
				customerInformationTop + 30
			)
			.text(String(headerData.upToDateLoans), 180, customerInformationTop + 30)
			.text(
				'Quantidade de Empréstimos em Atraso:',
				50,
				customerInformationTop + 45
			)
			.text(String(headerData.lateLoans), 180, customerInformationTop + 45);
	}

	doc.moveDown();
	generateHr(doc, 252);
}

function generateTable(
	doc: typeof PDFDocument,
	content: 'books' | 'loans',
	data: DataToIncludeInPdfTable[]
) {
	let i;
	const invoiceTableTop = 330;

	const items =
		content === 'books'
			? ['Tombo', 'Titulo', 'Quantidade']
			: ['Nome', 'Titulo', 'Status'];

	doc.font('Helvetica-Bold');
	generateTableRow(doc, invoiceTableTop, items);
	generateHr(doc, invoiceTableTop + 20);
	doc.font('Helvetica');

	for (i = 0; i < data.length; i++) {
		const item: DataToIncludeInPdfTable = data[i];
		const position = invoiceTableTop + (i + 1) * 30;
		generateTableRow(
			doc,
			position,
			content === 'books'
				? [item.tumble, item.title, item.quantity]
				: [item.name, item.book.title, item.status]
		);

		generateHr(doc, position + 20);
	}

	doc.font('Helvetica');
}

function generateFooter(doc: typeof PDFDocument) {
	doc.fontSize(10).text('Dados oferecidos por digital library', 50, 780, {
		align: 'center',
		width: 500
	});
}

function generateTableRow(doc: typeof PDFDocument, y: number, items: any[]) {
	doc.fontSize(10);
	doc.text(items[0], 50, y);
	doc.text(items[1], 150, y);
	doc.text(items[2], 250, y);
}

function generateHr(doc: typeof PDFDocument, y: number) {
	doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

async function jsToPdf(
	data: DataToIncludeInPdfTable[],
	headerData: DataToIncludeInHeader,
	content: 'books' | 'loans',
	filename?: string
): Promise<string> {
	let doc = new PDFDocument({ size: 'A4', margin: 50 });
	const fileName = filename || 'export';
	const filePath = `${temp}/${fileName}.pdf`;

	generateHeader(doc);
	setHeaderInformation(doc, headerData, content);
	generateTable(doc, content, data);
	generateFooter(doc);

	doc.end();

	return new Promise((resolve, reject) => {
		doc.pipe(createWriteStream(filePath)).on('finish', () => {
			resolve(fileName);
		});
	});
}

export {
	jsToPdf,
	jsToXlsx,
	csvToJson,
	xlsxToJson,
	cleanTempFolder,
	convertImportedJsonToBook,
	convertImportedJsonToBookLoan
};
