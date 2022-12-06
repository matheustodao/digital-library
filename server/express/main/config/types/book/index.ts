type Book = {
	id: string;
	title: string;
	authors: string[];
	categories: string[];
	publishingCompany: string;

	tumble: string;
	isbn?: string;
	description?: string;
	cover?: string;
	quantity?: number;
};

type BookParams = Omit<Book, 'id'>;

type BookCategories = { name: string; amount: number }[];

type BookFromExternalSource = {
	AUTOR: string;
	TOMBO: string;
	OBRA: string;
	EDITORA: string;
	COLEÇÃO: string;
};

export { Book, BookParams, BookCategories, BookFromExternalSource };
