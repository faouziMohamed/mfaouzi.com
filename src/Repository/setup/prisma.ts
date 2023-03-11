/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/ban-ts-comment */
import { PrismaClient } from '@prisma/client';

// eslint-disable-next-line import/no-extraneous-dependencies
export type { GComment as DbComment, GUser as DbUser } from '.prisma/client';
// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    errorFormat: 'minimal',
  });
} else {
  // @ts-ignore: Unreachable code error
  globalThis.prisma =
    // @ts-ignore: Unreachable code error
    globalThis.prisma || new PrismaClient({ errorFormat: 'pretty' });
  // @ts-ignore: Unreachable code error
  prisma = globalThis.prisma;
}

export default prisma;
