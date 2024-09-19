import type { Prisma } from '@prisma/client';
import prisma from '../src/lib/prisma';

const initialTasks: Prisma.TaskCreateInput[] = [
  {
    name: 'Groceries',
    description: 'Buy groceries',
  },
  {
    name: 'Clean the house',
    description: 'Clean the house before the guests arrive',
  },
];

async function main() {
  console.log('Start seeding ...');
  for (const task of initialTasks) {
    const newTask = await prisma.task.create({
      data: task,
    });
    console.log(`Created task with id: ${newTask.id}`);
  }
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
