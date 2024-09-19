import express, { type Request, type Response } from 'express';
import errorHandler, {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
  getTaskById,
} from './data-access/task';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.get('/tasks', async (_req: Request, res: Response) => {
  try {
    const tasks = await getTasks();
    return res.status(200).json(tasks);
  } catch (error) {
    // res.status(500).json({ error: error });
    console.log('messa');
  }
});

app.get('/task/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await getTaskById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    return res.status(200).json(task);
  } catch (error) {
    //errorHandler(error, res);
    console.log('messa');
  }
});

app.post('/task/new', async (req: Request, res: Response) => {
  const { name, description } = req.body;

  try {
    addTask({ name, description });
    // res.status(201).send('Task added successfully');
  } catch (error) {
    // errorHandler(error as Error, res);
    console.log('messa');
  }
});

// app.put('/task/update/:id', (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { name, description } = req.body;

//   if (!id) {
//     return res.status(400).send('::Error fetching task\nID is required');
//   }

//   if (!name && !description) {
//     return res
//       .status(400)
//       .send('::Error updating task\nName or description is required');
//   }

//   try {
//     updateTask({ id: Number(id), name, description });
//     res.status(200).send('Task updated successfully');
//   } catch (error) {
//     errorHandler(error as Error, res);
//   }
// });

// app.delete('/task/delete/:id', (req: Request, res: Response) => {
//   const { id } = req.params;

//   if (!id) {
//     return res.status(400).send('::Error deleting task\nID is required');
//   }

//   try {
//     deleteTask(Number(id));
//     res.status(200).send('Task deleted successfully');
//   } catch (error) {
//     errorHandler(error as Error, res);
//   }
// });

// connectDB();
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
