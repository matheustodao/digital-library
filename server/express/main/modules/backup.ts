import { cleanTempFolder, jsToPdf, jsToXlsx } from '../helpers/convertion';
import { serverError } from '../helpers/http';
import { prisma } from '../config/prisma';

import { Request, Response } from 'express';
import { temp } from '../config/paths';
import {
	getMostBorrowedBook,
	getMostPopularAuthor,
	getMostPopularCategory
} from '../helpers/get-popular-data';
import JSZip from 'jszip';
import { createWriteStream, readFile } from 'node:fs';
import { promisify } from 'node:util';

const readFileAsync = promisify(readFile);

class BackupController {
	async backupData(req: Request, res: Response) {
		cleanTempFolder();

		try {
			const zip = new JSZip();
			const pdfFolder = zip.folder(`pdfs`);

			const books = await prisma.book.findMany();
			const loans = await prisma.bookLoan.findMany({ include: { book: true } });

			if (books.length !== 0) {
				jsToXlsx(books, 'books');

				zip.file('books.xlsx', await readFileAsync(`${temp}/books.xlsx`));
			}

			if (loans.length !== 0) {
				jsToXlsx(loans, 'loans');

				zip.file('loans.xlsx', await readFileAsync(`${temp}/loans.xlsx`));
			}

			await jsToPdf(
				books.sort((a, b) => b.quantity - a.quantity).slice(0, 10),
				{
					mostPopularCategory: getMostPopularCategory(books)[0].category,
					mostPopularAuthor: getMostPopularAuthor(books)[0].author,
					totalBooksQuantity: books.length
				},
				'books',
				'books'
			);
			await jsToPdf(
				loans.slice(0, 10),
				{
					totalLoansQuantity: loans.length,
					mostBorrowedBook: getMostBorrowedBook(loans)[0]?.book,
					upToDateLoans: loans.filter(({ status }) => {
						return status === 'no_warning';
					}).length,
					lateLoans: loans.filter(({ status }) => {
						return status !== 'no_warning';
					}).length
				},
				'loans',
				'loans'
			);

			const zipPath = `${temp}/backup.zip`;
			pdfFolder.file('books.pdf', await readFileAsync(`${temp}/books.pdf`));
			pdfFolder.file('loans.pdf', await readFileAsync(`${temp}/loans.pdf`));

			zip
				.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
				.pipe(createWriteStream(zipPath))
				.on('finish', function () {
					return res.download(zipPath);
				});
		} catch (error) {
			return serverError(res, error as Error);
		}
	}
}

export { BackupController };
