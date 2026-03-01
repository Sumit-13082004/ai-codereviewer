import { PrismaClient } from "@/generated/prisma/client";

// 1. Access the global object
// We cast `globalThis` to a specific type so TypeScript knows 
// that a property named `prisma` might exist on it.
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
}; 

// 2. Create or Reuse the Client
// We check if `globalForPrisma.prisma` already holds a client.
// - If YES (?? operator): We reuse that existing instance.
// - If NO: We create a new `PrismaClient`.
export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        // Optional: Logs SQL queries to the console for debugging
        log: ["query", "info", "warn", "error"]
    });

// 3. Save to Global in Development
// If we are not in production, we save the `prisma` instance 
// we just defined back to the global object. 
// This ensures that on the next hot-reload, step #2 will find it.
if (process.env.NODE_ENV !== "production")
    globalForPrisma.prisma = prisma;
