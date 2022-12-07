import { badRequest, noContent, serverError } from '../helpers/http';
import { BookLoanParams } from '../config/types/loanBook';
import { BookParams } from '../config/types/book';
import { prisma } from '../config/prisma';
import {
	cleanTempFolder,
	convertImportedJsonToBook,
	convertImportedJsonToBookLoan,
	csvToJson,
	jsToPdf,
	jsToXlsx,
	xlsxToJson
} from '../helpers/convertion';

import { Request, Response } from 'express';
import { temp } from '../config/paths';
import {
	getMostBorrowedBook,
	getMostPopularAuthor,
	getMostPopularCategory
} from '../helpers/get-popular-data';

class ExportController {
	async exportData(req: Request, res: Response) {
		cleanTempFolder();

		try {
			const body = req.body as {
				format: 'pdf' | 'xlsx';
				content: 'books' | 'loans';
			};
			const { format, content } = body;

			if (content !== 'books' && content !== 'loans') {
				return badRequest(
					res,
					new Error('conteúdo requerido inválido, tente: books | loans')
				);
			}

			if (format !== 'pdf' && format !== 'xlsx') {
				return badRequest(
					res,
					new Error('formato requerido inválido, tente: books | loans')
				);
			}

			if (content === 'books') {
				const books = await prisma.book.findMany();

				if (format === 'xlsx' && books.length === 0) {
					return badRequest(res, new Error('no books'));
				}

<<<<<<< HEAD
				return res.download(`${temp}/${filename}`);
=======
				const filename =
					format === 'xlsx'
						? jsToXlsx(books)
						: await jsToPdf(
								books.sort((a, b) => b.quantity - a.quantity).slice(0, 10),
								{
									mostPopularCategory:
										getMostPopularCategory(books)[0].category,
									mostPopularAuthor: getMostPopularAuthor(books)[0].author,
									totalBooksQuantity: books.length
								},
								content
						  );

				return res.download(`${temp}/${filename}.pdf`);
>>>>>>> backend
			} else if (content === 'loans') {
				const loans = await prisma.bookLoan.findMany({
					include: { book: true }
				});

				if (format === 'xlsx' && loans.length === 0) {
					return badRequest(res, new Error('no loans'));
				}

				const filename =
					format === 'xlsx'
						? jsToXlsx(loans)
						: await jsToPdf(
								loans.slice(0, 10),
								{
									totalLoansQuantity: loans.length,
									mostBorrowedBook: getMostBorrowedBook(loans)[0].book,
									upToDateLoans: loans.filter(({ status }) => {
										return status === 'no_warning';
									}).length,
									lateLoans: loans.filter(({ status }) => {
										return status !== 'no_warning';
									}).length
								},
								content
						  );

<<<<<<< HEAD
				return res.download(`${temp}/${filename}`);
=======
				return res.download(`${temp}/${filename}.pdf`);
>>>>>>> backend
			}
		} catch (error) {
			return serverError(res, error as Error);
		}
	}
}

export { ExportController };
