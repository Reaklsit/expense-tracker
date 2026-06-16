import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// 1. Создаем стандартный пул подключений к PostgreSQL
const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL 
});

// 2. Инициализируем адаптер
const adapter = new PrismaPg(pool);

// 3. Сохраняем инстанс для HMR в Next.js
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// 4. Передаем адаптер внутрь new PrismaClient() — именно это требует Prisma v7
export const db = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = db;
}