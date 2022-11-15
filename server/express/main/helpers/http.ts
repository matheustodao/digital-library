import { Response } from 'express';

function badRequest(res: Response, error: Error) {
	return res.status(400).json({ error: error.message });
}

function ok(res: Response, data: any) {
	return res.json(data);
}

function noContent(res: Response) {
	return res.sendStatus(204);
}

function serverError(res: Response, error: Error) {
	console.log(`Error: ${error.message}`);

	return res.sendStatus(500);
}

export { badRequest, ok, noContent, serverError };
