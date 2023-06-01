import { useTasks } from '../context/useTasks';
import { Task } from '../interfaces/task.interface';
import { IoCheckmarkDone, IoTrash } from 'react-icons/io5';
import { toast } from 'react-toastify';

interface Props {
  task: Task;
}

export default function TaskItem({ task }: Props) {
  const { deleteTask, updateTask } = useTasks();

  return (
    <div className='bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-800 hover:cursor-pointer'>
      <div>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
      </div>
      <div className='flex gap-x-2'>
        <button
          onClick={() => {
            updateTask(task._id, { done: !task.done });
            toast('updated task', { type: 'success' });
          }}
        >
          {task.done ? (
            <IoCheckmarkDone className='text-green-500' />
          ) : (
            <IoCheckmarkDone className='text-gray-500' />
          )}
        </button>

        <button
          onClick={async () => {
            if (!window.confirm('Are you sure you want to delete this task?'))
              return;

            deleteTask(task._id);
            toast('deleted task', { type: 'error' });
          }}
        >
          <IoTrash />
        </button>
      </div>
    </div>
  );
}
