// prisma/seed.ts
import { PrismaClient, Prisma } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy recipes
  const user = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      email: 'admin@example.com',
      username: 'admin',
      password: 'admins',
      refreshToken:'dwdawdafa23rr2',
    },
  });

  const data = [
    {
      kana: 'あさ',
      sound: 'あ￢さ',
      romanji: 'asa',
      translated: 'Morgen',
      chapter: 1,
      number: 1,
      progress: {
        rank: 1,
        points: 3,
        correct: 5,
        incorrect: 2,
        lastActivity: 0,
        lastRankUp: 0,
      },
    },
  ] as Prisma.JsonArray;

  const progresses = await prisma.progress.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      data: data,
      userId: user.id,
    },
  });

  console.log({ user, progresses });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
