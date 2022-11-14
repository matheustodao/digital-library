import { Config } from '@prisma/client';

type User = Omit<Config, 'id'>;

export { User };
