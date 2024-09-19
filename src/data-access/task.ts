import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import type { Response } from 'express';

export type Task = Prisma.TaskCreateInput;

export const getTasks = async () => {
  const tasks = await prisma.task.findMany();

  return tasks;
};

export const getTaskById = async (taskId: string) => {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  });

  return task;
};

export const addTask = async (task: Task) => {
  const { name, description } = task;

  if (!name || !description) {
    throw Error('Name and description are required');
  }

  if (typeof name !== 'string' || typeof description !== 'string') {
    throw Error('Name and description must be strings');
  }

  await prisma.task.create({
    data: task,
  });
};

export const updateTask = async (taskId: string, task: Partial<Task>) => {
  await prisma.task.update({
    where: { id: taskId },
    data: task,
  });
};

export const deleteTask = async (id: string) => {
  await prisma.task.delete({
    where: { id },
  });
};

export const errorHandler = (err: unknown, res: Response): void => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2023':
        res.status(404).json({ error: 'Task not found' });
        break;
      default:
        res.status(400).json({ error: 'Bad Request' });
    }
  }
  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Unknown Error' });
  }
};

export default errorHandler;
