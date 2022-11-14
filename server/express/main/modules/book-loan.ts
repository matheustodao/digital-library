import { serverError, ok, noContent } from '../helpers/http';
import { Book, BookCategories, BookParams } from '../config/types/book';
import { prisma } from '../config/prisma';

import { Response, Request } from 'express';
import { BookLoan, BookLoanParams } from '../config/types/loanBook';

class BookLoanController {
	async create(req: Request, res: Response) {
		try {
			const body = req.body as BookLoanParams;
			const {
				deliveryDate,
				book,
				email,
				exitDate,
				personName,
				phone,
				status,
				teacherName
			} = body;

			const bookLoan = await prisma.bookLoan.create({
				data: {
					bookId: book.id,
					class: body.class,
					deliveryDate: new Date(deliveryDate),
					exitDate: new Date(exitDate),
					email,
					personName,
					phone,
					status,
					teacherName
				}
			});

			return ok(res, bookLoan);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async update(req: Request, res: Response) {
		try {
			const body = req.body as BookLoan;
			const {
				deliveryDate,
				email,
				exitDate,
				id,
				personName,
				phone,
				status,
				teacherName
			} = body;

			const bookLoan = await prisma.bookLoan.update({
				where: {
					id
				},
				data: {
					class: body.class,
					deliveryDate: new Date(deliveryDate),
					exitDate: new Date(exitDate),
					email,
					id,
					personName,
					phone,
					status,
					teacherName
				}
			});

			return ok(res, bookLoan);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const params = req.params as { bookLoanId: string };

			await prisma.bookLoan.delete({
				where: {
					id: params.bookLoanId
				}
			});

			return noContent(res);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const params = req.params as { bookLoanId: string };

			const bookLoan = await prisma.bookLoan.findUnique({
				where: {
					id: params.bookLoanId
				}
			});

			return ok(res, bookLoan);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async find(req: Request, res: Response) {
		try {
			const filters = req.query as { text: string; orderBy: 'asc' | 'desc' };

			const { text, orderBy } = filters;

			const books = await prisma.bookLoan.findMany({
				where: text
					? {
							OR: [
								{
									personName: { contains: text }
								},
								{
									book: { title: { contains: text } }
								},
								{
									book: { authors: { contains: text } }
								},
								{
									status: { contains: text }
								}
							]
					  }
					: {},
				orderBy: {
					deliveryDate: orderBy || 'asc'
				}
			});

			return ok(res, books);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}
}

export { BookLoanController };
