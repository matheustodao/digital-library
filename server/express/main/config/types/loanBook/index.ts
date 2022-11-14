type status =
	| 'no_warning'
	| 'first_warning'
	| 'second_warning'
	| 'third_warning';

type BookLoan = {
	id: string;
	book?: {
		id: string;
		title: string;
		cover: string;
	};
	exitDate: Date;
	deliveryDate: Date;
	personName: string;
	status: status;
	class: string | null;
	teacherName: string | null;
	email: string | null;
	phone: string | null;
};

type BookLoanParams = Omit<BookLoan, 'id'>;

export { BookLoan, BookLoanParams };
