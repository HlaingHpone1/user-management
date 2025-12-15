import { betterAuth } from 'better-auth/minimal';
import { prismaAdapter } from 'better-auth/adapters/prisma';

import { PrismaClient, Role, UserStatus } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });

const prisma = new PrismaClient({ adapter });

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      username: {
        type: 'string',
        required: true,
      },
      phoneNumber: {
        type: 'string',
        required: false,
      },
      gender: {
        type: 'string',
        required: false,
      },
      status: {
        type: 'string',
        required: true,
        defaultValue: UserStatus.ACTIVE,
        input: false,
      },
      role: {
        type: 'string',
        required: true,
        defaultValue: Role.USER,
        input: false,
      },
    },
  },
  experimental: { joins: true },
  session: {
    disableSessionRefresh: false,
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days cache duration
      strategy: 'jwe',
      refreshCache: true,
    },
    account: {
      storeStateStrategy: 'cookie',
      storeAccountCookie: true, // Store account data after OAuth flow in a cookie (useful for database-less flows)
    },
  },
});
