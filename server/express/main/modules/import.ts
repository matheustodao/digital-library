import { badRequest, noContent, ok, serverError } from '../helpers/http';
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

const invalidBooks = [];

async function createLoan(loan: BookLoanParams) {
	const {
		bookId,
		deliveryDate,
		email,
		exitDate,
		personName,
		phone,
		teacherName
	} = loan;

	const book = await prisma.book.findUnique({ where: { id: bookId } });

	if (!book) {
		invalidBooks.push(bookId);

		return;
	}

	await prisma.bookLoan.create({
		data: {
			deliveryDate: new Date(deliveryDate),
			email,
			exitDate: new Date(exitDate),
			personName,
			phone: String(phone),
			status: 'no_warning',
			teacherName,
			class: loan.class,
			bookId: bookId
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

			const body = req.body as { keepData: '1' | '0' };

			if (fileExtension !== 'xlsx' && fileExtension !== 'csv') {
				return badRequest(res, new Error('invalid file'));
			}

			const { keepData } = body;

			const json =
				fileExtension === 'xlsx' ? xlsxToJson(file) : await csvToJson(file);

			const books = convertImportedJsonToBook(json);

			if (Number(keepData) === 0) {
				await prisma.book.deleteMany();
			}

			for await (const book of books) {
				await createBook(book);
			}

			cleanTempFolder();

			return ok(res, { message: `${invalidBooks.length} livros inválidos` });
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async importBookLoan(req: Request, res: Response) {
		try {
			const file = req.file;
			const splitedName = file.originalname.split('.');
			const fileExtension = splitedName[splitedName.length - 1];

			const body = req.body as { keepData: '1' | '0' };

			if (fileExtension !== 'xlsx' && fileExtension !== 'csv') {
				return badRequest(res, new Error('invalid file'));
			}

			const { keepData } = body;

			const json =
				fileExtension === 'xlsx' ? xlsxToJson(file) : await csvToJson(file);
			const loans = convertImportedJsonToBookLoan(json);

			if (Number(keepData) === 0) {
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
