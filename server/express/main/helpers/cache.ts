import { prisma } from '../config/prisma';
import { Config } from '@prisma/client';

class Cache {
	static config: Config;

	static setConfig(config: Config) {
		config = config;

		return config;
	}

	static async getConfig() {
		return this.config || this.setConfig(await this._getConfigFromDatabase());
	}

	static async _getConfigFromDatabase() {
		return await prisma.config.findFirst({});
	}
}

export { Cache };
