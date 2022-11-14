type Book = {
	id: string;
	title: string;
	authors: string[];
	categories: string[];
	tumble: string;
	isbn: string;
	publishingCompany: string;
	description: string;
	cover: string;
	quantity: number;
};

type BookParams = Omit<Book, 'id'>;

export { Book, BookParams };
