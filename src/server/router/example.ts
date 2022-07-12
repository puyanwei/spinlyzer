import { createRouter } from './context';
import { z } from 'zod';

export const exampleRouter = createRouter()
  .query('hello', {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? 'world'}`,
      };
    },
  })
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.example.findMany();
    },
  })
  .query('postAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.user.createMany({
        data: [
          { name: 'Bob', email: 'bob@prisma.io' },
          { name: 'Yewande', email: 'yewande@prisma.io' },
          { name: 'Angelique', email: 'angelique@prisma.io' },
        ],
      });
    },
  });
