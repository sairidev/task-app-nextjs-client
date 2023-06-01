import { ChangeEvent, FormEvent, useState } from 'react';
import { useTasks } from '../context/useTasks';
import { toast } from 'react-toastify';

const DefaultValues = {
  title: '',
  description: '',
  done: false,
};

export default function TaskForm() {
  const [task, setTask] = useState(DefaultValues);

  const { createTask } = useTasks();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (task.title.length && task.description.length) {
      await createTask(task);
      toast('task created', { type: 'success' });
    } else {
      toast('failed operation', { type: 'error' });
    }
    setTask(DefaultValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          value={task.title}
          onChange={handleChange}
          placeholder='Write a title'
          className='border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2'
        />
        <textarea
          name='description'
          value={task.description}
          onChange={handleChange}
          rows={3}
          placeholder='Write a description'
          className='border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2'
        ></textarea>
        <label className='inline-flex items-center gap-x-2'>
          <input
            type='checkbox'
            name='done'
            checked={task.done}
            onChange={(e) => setTask({ ...task, done: e.target.checked })}
            className='form-checkbox h-5 w-5 text-indigo-600  transition duration-150 ease-in-out'
          />
          <span>Done</span>
        </label>

        <button
          type='submit'
          className='bg-indigo-500 px-3 block py-2 w-full rounded-lg'
        >
          Save
        </button>
      </form>
    </div>
  );
}
