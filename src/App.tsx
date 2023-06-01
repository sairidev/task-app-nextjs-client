import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { TasksProvider } from './context/TaskContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className='bg-zinc-900 h-screen text-white flex items-center justify-center '>
      <div className='bg-gray-950 p-4 w-2/5 rounded-lg'>
        <h1 className='text-3xl font-bold text-center block my-2'>Task App</h1>

        <TasksProvider>
          <TaskForm />
          <TaskList />
        </TasksProvider>

        <ToastContainer
          autoClose={2000}
          hideProgressBar={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
        />
      </div>
    </div>
  );
}
