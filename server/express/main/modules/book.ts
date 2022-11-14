import { serverError, ok, noContent } from '../helpers/http';
import { Book, BookCategories, BookParams } from '../config/types/book';
import { prisma } from '../config/prisma';

import { Response, Request } from 'express';

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
				where: text
					? {
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
					  }
					: {},
				orderBy: {
					title: orderBy || 'asc'
				}
			});

			return ok(res, books);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async getMostCommonCategories(req: Request, res: Response) {
		try {
			const book = await prisma.book.findMany({
				select: { categories: true }
			});

			const categories = book
				.reduce((acc, { categories }) => {
					const allCategories = categories.split(',');

					allCategories.forEach((category) => {
						const categoryIndex = acc.findIndex(
							(currentCategory) => currentCategory.name === category
						);

						if (categoryIndex >= 0) {
							acc[categoryIndex].amount++;
						} else {
							acc.push({ name: category, amount: 1 });
						}
					});

					return acc;
				}, [] as BookCategories)
				.sort((a, b) => b.amount - a.amount);

			const topFourMostCommomCategories = categories.slice(0, 4);

			const categoriesReport = categories.reduce(
				(acc, currentCategory, index) => {
					if (index > 3) {
						const otherIndex = acc.findIndex(({ name }) => name === 'outros');

						if (otherIndex !== -1) {
							acc[otherIndex].amount += currentCategory.amount;
						} else {
							acc.push({ name: 'outros', amount: currentCategory.amount });
						}
					}

					return acc;
				},
				topFourMostCommomCategories
			);

			return ok(res, categoriesReport);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}
}

export { BookController };
