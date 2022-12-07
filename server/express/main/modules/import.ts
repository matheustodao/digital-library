<<<<<<< HEAD
import { badRequest, noContent, serverError } from '../helpers/http';
import { BookLoan } from '../config/types/loanBook';
=======
import { badRequest, noContent, ok, serverError } from '../helpers/http';
import { BookLoanParams } from '../config/types/loanBook';
>>>>>>> backend
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

<<<<<<< HEAD
async function createLoan(loan: BookLoan) {
	const {
=======
const invalidBooks = [];

async function createLoan(loan: BookLoanParams) {
	const {
		bookId,
>>>>>>> backend
		deliveryDate,
		email,
		exitDate,
		personName,
		phone,
<<<<<<< HEAD
		book,
		isStudent,
		teacherName,
=======
		teacherName
>>>>>>> backend
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
<<<<<<< HEAD
			phone,
			isStudent,
			teacherName,
			class: loan.class,
			bookId: book.id,
			status: loan.status || 'no_warning'
=======
			phone: String(phone),
			status: 'no_warning',
			teacherName,
			class: loan.class,
			bookId: bookId
>>>>>>> backend
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

<<<<<<< HEAD
			if (keepData === '0') {
=======
			if (Number(keepData) === 0) {
>>>>>>> backend
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

<<<<<<< HEAD
			if (keepData === '0') {
=======
			if (Number(keepData) === 0) {
>>>>>>> backend
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
