import { router, publicProcedure } from "@/server/trpc";
import { prisma } from "@/lib/prisma";
import z from "zod";

export const testRouter = router({
    createTest: publicProcedure
        .input(
            z.object({
                name: z.string(),
                title: z.string(),
            })
        )   
        .mutation(async ({ input }) => {
            const test = await prisma.test.create({
                data: {
                    name: input.name,
                    title: input.title,
                },
            });
            return test;
        }),
    getTests: publicProcedure.query(async () => {
        const tests = await prisma.test.findMany();
        return tests;
    }),
})