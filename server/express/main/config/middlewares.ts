import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';

import express from 'express';

function configMiddlewares(express: express.Application): void {
	express.use(logger('dev'));
	express.use(cors());

	express.use(bodyParser.urlencoded({ extended: false }));
	express.use(bodyParser.json());
}

export { configMiddlewares };
