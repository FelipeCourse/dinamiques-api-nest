import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
  const email = 'leticia.pereira@dinamiques.com.br';
  const isUserAlreadyExists = await prisma.user.findUnique({
    where: { email },
  });

  if (!isUserAlreadyExists) {
    await prisma.user.create({
      data: {
        email,
        username: 'leticiap',
        password: await bcrypt.hash('admin', 6),
        createdBy: '17d0abc6-2fde-42ab-88ab-a9f02501b78f',
      },
    });
  }
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
