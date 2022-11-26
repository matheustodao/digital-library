import { serverError, ok, noContent } from '../helpers/http';
import { Book, BookCategories, BookParams } from '../config/types/book';
import { prisma } from '../config/prisma';

import { Response, Request } from 'express';
import {
	BookLoan,
	BookLoanParams,
	BookLoanReportByMonth,
	months
} from '../config/types/loanBook';

class BookLoanController {
	async create(req: Request, res: Response) {
		try {
			const body = req.body as BookLoanParams;
			const {
				deliveryDate,
				bookId,
				email,
				exitDate,
				personName,
				phone,
				teacherName
			} = body;

			const bookLoan = await prisma.bookLoan.create({
				data: {
					bookId,
					class: body.class,
					deliveryDate: new Date(deliveryDate),
					exitDate: new Date(exitDate),
					email,
					personName,
					phone,
					status: 'no_warning',
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
			const params = req.params as { loanBookId: string };

			const bookLoan = await prisma.bookLoan.findUnique({
				where: {
					id: params.loanBookId
				},
				include: {
					book: {
						select: {
							id: true,
							title: true,
							cover: true,
							authors: true,
							tumble: true,
							publishingCompany: true
						}
					}
				}
			});

			const loansParsed = {
				...bookLoan,
				book: {
					...bookLoan.book,
					authors: bookLoan.book.authors?.trim()?.split(',') ?? ['Desconhecido']
				}
			}

			return ok(res, loansParsed);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async find(req: Request, res: Response) {
		try {
			const filters = req.query as { text: string; orderBy: 'asc' | 'desc', orderDeliveryDateBy: 'asc' | 'desc' };

			const { text, orderBy, orderDeliveryDateBy } = filters;

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
				orderBy: [
					{
						deliveryDate: orderDeliveryDateBy || 'asc'
					},
					{
						personName: orderBy || 'asc',
					}
				],
				include: {
					book: {
						select: {
							id: true,
							title: true,
							cover: true,
							authors: true,
							tumble: true,
							publishingCompany: true
						}
					}
				}
			});

			const loansParsed = books.map((currentLoan) => ({
				...currentLoan,
				book: {
					...currentLoan.book,
					authors: currentLoan.book.authors?.split(',') ?? ['Desconhecido']
				}
			}))

			return ok(res, loansParsed);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async bookLoanReport(req: Request, res: Response) {
		try {
			const { _count: studentLoans } = await prisma.bookLoan.aggregate({
				where: {
					teacherName: { not: null },
					class: { not: null }
				},
				_count: true
			});

			const { _count: employeeLoans } = await prisma.bookLoan.aggregate({
				where: {
					phone: { not: null },
					email: { not: null }
				},
				_count: true
			});

			const { _count: booksQuantity } = await prisma.book.aggregate({
				_count: true
			});

			const { _count: bookLoansQuantity } = await prisma.bookLoan.aggregate({
				_count: true
			});

			return ok(res, {
				studentLoans,
				booksQuantity,
				employeeLoans,
				bookLoansQuantity
			});
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async bookLoanByMonth(req: Request, res: Response) {
		try {
			const beginningOfTheYear = new Date();
			beginningOfTheYear.setDate(1);
			beginningOfTheYear.setMonth(0);
			beginningOfTheYear.setHours(0, 0, 0, 0);

			const studentLoans = await prisma.bookLoan.findMany({
				where: {
					teacherName: { not: null },
					class: { not: null },
					exitDate: { gte: beginningOfTheYear }
				}
			});

			const employeeLoans = await prisma.bookLoan.findMany({
				where: {
					email: { not: null },
					phone: { not: null },
					exitDate: { gte: beginningOfTheYear }
				}
			});

			const report = [
				{ type: 'student', data: [] },
				{ type: 'employee', data: [] }
			] as BookLoanReportByMonth;

			studentLoans.forEach((loan) => {
				const month = new Date(loan.exitDate).toLocaleDateString('pt-BR', {
					month: 'long'
				});

				const reportMonthIndex = report[0].data.findIndex(
					(reportMonth) => reportMonth.month === month
				);

				if (reportMonthIndex !== -1) {
					report[0].data.push({ month: month as months, amount: 1 });
				} else {
					report[0].data[reportMonthIndex].amount++;
				}
			});

			employeeLoans.forEach((loan) => {
				const month = new Date(loan.exitDate).toLocaleDateString('pt-BR', {
					month: 'long'
				});

				const reportMonthIndex = report[1].data.findIndex(
					(reportMonth) => reportMonth.month === month
				);

				if (reportMonthIndex !== -1) {
					report[1].data.push({ month: month as months, amount: 1 });
				} else {
					report[1].data[reportMonthIndex].amount++;
				}
			});

			return ok(res, report);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}
}

export { BookLoanController };
