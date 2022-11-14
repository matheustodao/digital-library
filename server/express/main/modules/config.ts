import { User } from '../config/types/digitalLibrary/user';
import { badRequest, ok } from '../helpers/http';
import { serverError } from '../helpers/http';
import { prisma } from '../config/prisma';
import { Cache } from '../helpers/cache';

import { Request, Response } from 'express';
import { compare, hash } from 'bcrypt';

class ConfigController {
	async create(req: Request, res: Response) {
		try {
			const body = req.body as User;
			const { email, backupEmail, name, password } = body;

			const config = await prisma.config.findFirst();

			if (config) {
				return badRequest(
					res,
					Error('Ja existe um usuário cadastrado nessa máquina')
				);
			}

			if (!password || !name || !email) {
				return badRequest(res, Error('faltam dados para completar o cadastro'));
			}

			const hashedPassword = await hash(password, 8);

			const newConfig = await prisma.config.create({
				data: {
					email,
					backupEmail,
					name,
					password: hashedPassword
				}
			});

			return ok(res, newConfig);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async login(req: Request, res: Response) {
		try {
			const body = req.body as { email: string; password: string };

			const { email, password } = body;

			const config = await prisma.config.findFirst({
				where: {
					email
				}
			});

			if (!config) {
				return badRequest(
					res,
					Error('seu cadastro não corresponde a essas credenciais')
				);
			}

			const passwordIsValid = await compare(password, config.password);

			if (!passwordIsValid) {
				return badRequest(res, Error('sua senha não corresponde'));
			}

			Cache.setConfig(config);

			return ok(res, config);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}

	async update(req: Request, res: Response) {
		try {
			const body = req.body as User;
			const { email, backupEmail, name } = body;

			const config = await Cache.getConfig();

			const updatedConfig = await prisma.config.update({
				data: {
					email,
					backupEmail,
					name
				},
				where: {
					id: config.id
				}
			});

			Cache.setConfig(updatedConfig);

			return ok(res, updatedConfig);
		} catch (error) {
			return serverError(res, error as Error);
		}
	}
}

export { ConfigController };
