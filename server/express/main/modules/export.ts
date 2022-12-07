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

class ExportController {
	async exportData(req: Request, res: Response) {
		try {
			cleanTempFolder();

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

				const filename =
					format === 'xlsx' ? jsToXlsx(books) : await jsToPdf(books);

				return res.download(`${temp}/${filename}`);
			} else if (content === 'loans') {
				const loans = await prisma.bookLoan.findMany();

				const filename =
					format === 'xlsx' ? jsToXlsx(loans) : await jsToPdf(loans);

				return res.download(`${temp}/${filename}`);
			}
		} catch (error) {
			return serverError(res, error as Error);
		}
	}
}

export { ExportController };
