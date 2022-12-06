import { BookFromExternalSource, BookParams } from '../config/types/book';
import { BookLoanParams } from '../config/types/loanBook';
import { processAuthorName } from './string-manipulation';
import { File } from '../config/types/file';
import { temp } from '../config/paths';

import { readdirSync, unlink } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import jsonToXlsx from 'json-as-xlsx';

import csv from 'csvtojson';
import xlsx from 'xlsx';

function cleanTempFolder() {
	readdirSync(join(__dirname, '..', '..', 'temp')).forEach((file: string) => {
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

function jsToXlsx(data: any[]): string {
	const fileName = 'export';
	const columnNames = Object.keys(data[0]);

	const formatedData = [
		{
			sheet: 'Export',
			columns: columnNames.map((column) => {
				return { label: column, value: column };
			}),
			content: data
		}
	];

	const settings = {
		fileName: `${temp}/${fileName}`
	};

	jsonToXlsx(formatedData, settings);

	return `${fileName}.xlsx`;
}

async function jsToPdf(data: any[]): Promise<string> {
	const fileName = 'export.pdf';

	return fileName;
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
