import { configMiddlewares } from './config/middlewares';
import { setupRoutes } from './config/routes';

import express from 'express';

const app = express();

(async () => {
	await setupRoutes(app);
})();

class App {
	public express: express.Application;

	constructor() {
		this.express = app;
		configMiddlewares(app);
	}
}
export default new App().express;
