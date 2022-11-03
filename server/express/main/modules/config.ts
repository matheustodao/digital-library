import { Config } from '@prisma/client';

import { badRequest, noContent, ok } from '../helpers/error';
import { prisma } from '../config/prisma';

import { Request, Response } from 'express';
import { compare, hash } from 'bcrypt';

type User = Omit<Config, 'id'>;

class ConfigController {
	async create(req: Request, res: Response) {
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
	}

	async login(req: Request, res: Response) {
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

		return noContent(res);
	}
}

export { ConfigController };
