import { Book, BookParams } from '../config/types/book';
import { serverError, ok, noContent } from '../helpers/http';
import { Response, Request } from 'express';
import { prisma } from '../config/prisma';

class BookController {
	async create(req: Request, res: Response) {
		try {
			const body = req.body as BookParams;
			const {
				authors,
				cover,
				categories,
				description,
				isbn,
				publishingCompany,
				quantity,
				title,
				tumble
			} = body;

			const book = await prisma.book.create({
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

			return ok(res, book);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async update(req: Request, res: Response) {
		try {
			const body = req.body as Book;
			const {
				id,
				authors,
				cover,
				categories,
				description,
				isbn,
				publishingCompany,
				quantity,
				title,
				tumble
			} = body;

			const book = await prisma.book.update({
				where: {
					id
				},
				data: {
					authors: authors ? authors.join() : undefined,
					categories: authors ? categories.join() : undefined,
					cover,
					description,
					isbn,
					publishingCompany,
					quantity,
					title,
					tumble
				}
			});

			return ok(res, book);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const params = req.params as { bookId: string };

			await prisma.book.delete({
				where: {
					id: params.bookId
				}
			});

			return noContent(res);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async getById(req: Request, res: Response) {
		try {
			const params = req.params as { bookId: string };

			const book = await prisma.book.findUnique({
				where: {
					id: params.bookId
				}
			});

			return ok(res, book);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async find(req: Request, res: Response) {
		try {
			const filters = req.query as { text: string; orderBy: 'asc' | 'desc' };

			const { text, orderBy } = filters;

			const books = await prisma.book.findMany({
				where: {
					OR: [
						{
							title: { contains: text }
						},
						{
							publishingCompany: { contains: text }
						},
						{
							description: { contains: text }
						},
						{
							authors: { contains: text }
						}
					]
				},
				orderBy: {
					title: orderBy
				}
			});

			return ok(res, books);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async getMostCommonCategories(req: Request, res: Response) {
		try {
			const categories = await prisma.book.aggregate({
				_count: {
					categories: true
				}
			});

			console.log(categories);

			return ok(res, categories);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}
}

export { BookController };
