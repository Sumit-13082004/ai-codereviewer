import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { testRouter } from "./test";

export const appRouter = router({
    // A simple procedure to verify the setup is working
    test: testRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;