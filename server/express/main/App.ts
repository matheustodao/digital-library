import { configMiddlewares } from './config/middlewares';
import { setupRoutes } from './config/routes';

import express from 'express';

class App {
	public express: express.Application;

	constructor() {
		this.express = express();
		configMiddlewares(this.express);
		setupRoutes(this.express);
	}
}

export default new App().express;
