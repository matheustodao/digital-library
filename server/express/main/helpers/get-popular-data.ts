import { Book, BookLoan } from '@prisma/client';

function getMostPopularCategory(books: Book[]) {
	const mostPopularCategories: { category: string; quantity: number }[] = [];

	for (const book of books) {
		const categories = book.categories
			.split(',')
			.map((category) => category.trim());

		for (const category of categories) {
			const categoryIndex = mostPopularCategories.findIndex(
				(currentItem) => currentItem.category === category
			);

			if (categoryIndex < 0) {
				mostPopularCategories.push({ category, quantity: 1 });
			} else {
				mostPopularCategories[categoryIndex].quantity++;
			}
		}
	}

	return mostPopularCategories.sort((a, b) => b.quantity - a.quantity);
}

function getMostPopularAuthor(books: Book[]) {
	const mostPopularAuthors: { author: string; quantity: number }[] = [];

	for (const book of books) {
		const authors = book.authors.split(',').map((author) => author.trim());

		for (const author of authors) {
			const authorIndex = mostPopularAuthors.findIndex(
				(currentItem) => currentItem.author === author
			);

			if (authorIndex < 0) {
				mostPopularAuthors.push({ author, quantity: 1 });
			} else {
				mostPopularAuthors[authorIndex].quantity++;
			}
		}
	}

	return mostPopularAuthors.sort((a, b) => b.quantity - a.quantity);
}

function getMostBorrowedBook(
	loans: (BookLoan & {
		book: Book;
	})[]
) {
	const mostPopularBook: { book: string; quantity: number }[] = [];

	for (const loan of loans) {
		const bookIndex = mostPopularBook.findIndex(
			(currentItem) => currentItem.book === loan.book.title
		);

		if (bookIndex < 0) {
			mostPopularBook.push({ book: loan.book.title, quantity: 1 });
		} else {
			mostPopularBook[bookIndex].quantity++;
		}
	}

	return mostPopularBook.sort((a, b) => b.quantity - a.quantity);
}

export { getMostPopularCategory, getMostPopularAuthor, getMostBorrowedBook };
