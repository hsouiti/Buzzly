import { PrismaClient } from "@prisma/client"
import { config } from "./config"

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
    datasources: {
        db: {
            url: config.databaseURL
        }
    }
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export const  db = prisma;