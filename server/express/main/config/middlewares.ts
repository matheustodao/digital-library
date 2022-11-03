import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';

import express from 'express';

function configMiddlewares(express: express.Application): void {
	express.use(logger('dev'));
	express.use(cors());

	// @ts-ignore
	express.use('/images', express.static(path.join(__dirname, 'public/images')));

	express.use(bodyParser.urlencoded({ extended: false }));
	express.use(bodyParser.json());
}

export { configMiddlewares };
