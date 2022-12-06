function processAuthorName(authorName: string): string {
	if (authorName.includes(',')) {
		return authorName.split(',').reverse().join(' ').trim();
	} else {
		return authorName;
	}
}

export { processAuthorName };
