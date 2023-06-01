import { CreateTask, UpdateTask } from '../interfaces/task.interface';

const API = 'http://localhost:3000/api';

export const createTask = async (task: CreateTask) =>
  fetch(`${API}/tasks`, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getTasks = async () => fetch(`${API}/tasks`);

export const deleteTask = async (id: string) => {
  return await fetch(`${API}/tasks/${id}`, { method: 'DELETE' });
};

export const updateTask = async (id: string, task: UpdateTask) => {
  return await fetch(`${API}/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: { 'Content-Type': 'application/json' },
  });
};

export const getATask = async (id: string) => {
  return await fetch(`${API}/tasks/${id}`);
};
