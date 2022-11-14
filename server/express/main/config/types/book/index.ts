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

type BookFilters = {
	title: string;
	publishingCompany: string;
	description: string;
	author: string;
	quantity: string;
	orderBy: 'asc' | 'desc';
};

export { Book, BookParams, BookFilters };
