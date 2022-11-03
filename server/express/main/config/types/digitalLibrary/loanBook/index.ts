type status =
	| 'no_warning'
	| 'first_warning'
	| 'second_warning'
	| 'third_warning';

export interface LoanBookParams {
	id: string;
	book: {
		id: string;
		title: string;
		cover: string;
	};
	exitDate: string;
	deliveryDate: string;
	personName: string;
	status: status;
	class: string | null;
	teacherName: string | null;
	email: string | null;
	phone: string | null;
}
