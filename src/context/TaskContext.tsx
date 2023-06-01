import { createContext, useState, useEffect } from 'react';
import {
  getTasks,
  createTask as createNewTask,
  deleteTask as deleteATask,
  updateTask as updateATask,
} from '../api/tasks';
import { CreateTask, Task, UpdateTask } from '../interfaces/task.interface';

interface TaskContextValue {
  tasks: Task[];
  createTask: (task: CreateTask) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTask: (id: string, task: UpdateTask) => Promise<void>;
}

export const TasksContext = createContext<TaskContextValue>({
  tasks: [],
  createTask: async () => {
    throw new Error('createTask() not implemented');
  },
  deleteTask: async () => {
    throw new Error('deleteTask() not implemented');
  },
  updateTask: async () => {
    throw new Error('updateTask() not implemented');
  },
});

interface Props {
  children: React.ReactNode;
}

export const TasksProvider: React.FC<Props> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks()
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const createTask = async (task: CreateTask) => {
    const res = await createNewTask(task);
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  const deleteTask = async (id: string) => {
    const res = await deleteATask(id);
    if (res.status === 204) {
      setTasks(tasks.filter((task) => task._id !== id));
    }
  };

  const updateTask = async (id: string, task: UpdateTask) => {
    const res = await updateATask(id, task);
    const data = await res.json();

    setTasks(
      tasks.map((task) => (task._id === id ? { ...task, ...data } : task))
    );
  };

  return (
    <TasksContext.Provider
      value={{ tasks, createTask, deleteTask, updateTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
