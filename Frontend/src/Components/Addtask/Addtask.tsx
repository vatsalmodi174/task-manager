import { useContext, useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { TaskContext } from '../../context/StoreContext';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskType } from '../../assets/assets';

function AddTask() {
  const { tasks, setTasks } = useContext(TaskContext);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [input, setInput] = useState(false);
  const [showToastTwo, setShowToastTwo] = useState(false);

  const isEditMode = Boolean(id);

  const [form, setForm] = useState<TaskType>({
    id: '',
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'Pending',
  });

  useEffect(() => {
    if (isEditMode && id) {
      const taskToEdit = tasks.find((t: TaskType) => t.id === id);
      if (taskToEdit) {
        setForm(taskToEdit);
      }
    }
  }, [id, tasks]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.dueDate) {
      setInput(true);
      return;
    }

      if (isEditMode && id) {
        const updated = tasks.map((t: TaskType) => (t.id === id ? form : t));
        setTasks(updated);
      } else {
        const newTask: TaskType = {
          ...form,
          id: Date.now().toString(),
        };
        setTasks([...tasks, newTask]);
      }

    setShowToastTwo(true);
    setTimeout(() => {
      setShowToastTwo(false);
    }, 3000);

    setTimeout(() => {
      navigate('/dashboard');
    }, 3000);
  };

  return (
    // {Add task form}
    <div className='flex items-center justify-center min-h-screen'>
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h1 className="text-4xl font-bold text-white mb-8">{isEditMode ? "Edit Task" : "Create Task"}</h1>

          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Title"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
            />
            {input && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
          </div>

          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
            {input && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
          </div>

          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            />
            {input && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
          </div>

          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            {input && <p className="text-red-500 text-xs italic">Please fill out this field.</p>}
          </div>

          <button className="bg-white text-purple-700 font-bold py-2 px-6 rounded-full mt-4 ml-32">
            {isEditMode ? "Update Task" : "Save Task"}
          </button>
        </form>
      </div>

{/* {Toast Massage} */}
      {showToastTwo && (
        <div className="fixed bottom-4 right-4 flex items-center w-full max-w-xs p-4 text-white-500 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow dark:text-white-400 dark:bg-gray-800" role="alert">
          <svg className="w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="ms-3 text-sm font-normal">Task Added successfully.</div>
          <button
            onClick={() => setShowToastTwo(false)}
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default AddTask;
