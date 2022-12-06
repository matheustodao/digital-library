import { readdirSync } from 'fs';
import { join } from 'path';

import express from 'express';

async function setupRoutes(express: express.Application): Promise<void> {
	readdirSync(join(__dirname, '..', 'routes')).forEach(async (file: string) => {
		const { router } = await import(`../routes/${file}`);

		console.log(file);

		express.use(router);
	});
}

export { setupRoutes };
