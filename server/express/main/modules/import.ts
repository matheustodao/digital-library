import { badRequest, noContent, serverError } from '../helpers/http';
import { BookLoanParams } from '../config/types/loanBook';
import { BookParams } from '../config/types/book';
import { prisma } from '../config/prisma';
import {
	cleanTempFolder,
	convertImportedJsonToBook,
	convertImportedJsonToBookLoan,
	csvToJson,
	xlsxToJson
} from '../helpers/convertion';

import { Request, Response } from 'express';

async function createLoan(loan: BookLoanParams) {
	const {
		book,
		deliveryDate,
		email,
		exitDate,
		personName,
		phone,
		status,
		teacherName
	} = loan;

	await prisma.bookLoan.create({
		data: {
			deliveryDate,
			email,
			exitDate,
			personName,
			phone,
			status,
			teacherName,
			class: loan.class,
			bookId: book.id
		}
	});
}

async function createBook(book: BookParams) {
	const {
		authors,
		categories,
		cover,
		description,
		isbn,
		publishingCompany,
		quantity,
		title,
		tumble
	} = book;

	await prisma.book.create({
		data: {
			authors: authors.join(),
			categories: categories.join(),
			cover,
			description,
			isbn,
			publishingCompany,
			quantity,
			title,
			tumble
		}
	});
}

class ImportController {
	async importBook(req: Request, res: Response) {
		try {
			const file = req.file;
			const splitedName = file.originalname.split('.');
			const fileExtension = splitedName[splitedName.length - 1];

			const body = req.body as { keepData: boolean };

			if (fileExtension !== 'xlsx' && fileExtension !== 'csv') {
				return badRequest(res, new Error('invalid file'));
			}

			const { keepData } = body;

			const json =
				fileExtension === 'xlsx' ? xlsxToJson(file) : await csvToJson(file);

			const books = convertImportedJsonToBook(json);

			if (keepData === false) {
				await prisma.book.deleteMany();
			}

			for await (const book of books) {
				await createBook(book);
			}

			cleanTempFolder();

			return noContent(res);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async importBookLoan(req: Request, res: Response) {
		try {
			const file = req.file;
			const splitedName = file.originalname.split('.');
			const fileExtension = splitedName[splitedName.length - 1];

			const body = req.body as { keepData: boolean };

			if (fileExtension !== 'xlsx' && fileExtension !== 'csv') {
				return badRequest(res, new Error('invalid file'));
			}

			const { keepData } = body;

			const json =
				fileExtension === 'xlsx' ? xlsxToJson(file) : await csvToJson(file);
			const loans = convertImportedJsonToBookLoan(json);

			if (keepData === false) {
				await prisma.bookLoan.deleteMany();
			}

			for await (const loan of loans) {
				await createLoan(loan);
			}

			cleanTempFolder();

			return noContent(res);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}
}

export { ImportController };
