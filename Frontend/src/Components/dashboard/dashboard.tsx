import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { TaskContext } from '../../context/StoreContext';
import useDebounce from '../debounce/debounce';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Pending' | 'In Progress' | 'Done';
}

function Dashboard() {
  const { tasks, setTasks } = useContext(TaskContext) as {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  };

  const [status, setStatus] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const debouncedSearchTerm = useDebounce(search, 500);

  const handleStatusChange = (id: number, newStatus: Task['status']) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updated);
  };

  const handleDelete = (id: number) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    const updated = tasks.filter(task => task.id !== taskToDelete);
    setTasks(updated);
    setShowModal(false);
    setTaskToDelete(null);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const filteredTasks = tasks
    ?.filter((task) =>
      task.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )
    .filter(task => status === 'All' || task.status === status);

  const Order: Record<Task['priority'], number> = { High: 1, Medium: 2, Low: 3 };

  const sortedTasks = [...(filteredTasks || [])].sort((a, b) => {
    return Order[a.priority] - Order[b.priority];
  });

  return (
    // {dashboard}
    <>
      <div className="flex" style={{ backgroundColor: "#242424" }}>
        <aside className="w-64 h-screen fixed top-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg p-4">
          <div className="text-4xl font-bold text-white mb-8">TaskBoard</div>
          <nav className="space-y-4">
            <a href="#" className="block text-white hover:text-gray-300 font-medium">📋 Dashboard</a>
            <a href="#" className="block text-white hover:text-gray-300 font-medium">🗓️ Tasks</a>
            <a href="#" className="block text-white hover:text-gray-300 font-medium">⚙️ Settings</a>
            <Link to={'/'}><a href="#" className="block text-white hover:text-gray-300 font-medium">🚪 Logout</a></Link>
          </nav>
        </aside>

        <main className="ml-64 flex-1 p-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-white">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <img
                  src="https://i.pravatar.cc/40"
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h1 className="text-4xl font-bold text-white mb-2">Hello Vatsal!</h1>
            <p className="text-gray-300">Have a nice day.</p>
          </div>

          <div className="flex flex-wrap items-center space-x-4 mt-10">
            {["All", "Pending", "In Progress", "Done"].map((s) => (
              <button
                key={s}
                className="bg-white text-purple-700 font-bold py-2 px-6 rounded-full hover:bg-gradient-to-r from-purple-500 to-pink-500 transition"
                onClick={() => setStatus(s)}
              >
                {s}
              </button>
            ))}
            <Link to={'/Add'}>
              <button className="bg-white text-purple-700 font-bold py-2 px-6 rounded-full hover:bg-gradient-to-r from-purple-500 to-pink-500 transition " style={{marginLeft:600}}>
                Create Task +
              </button>
            </Link>
          </div>

          <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2">
            {sortedTasks.map((task) => (
              <div key={task.id} className="bg-white rounded-xl shadow-md p-6 mb-4 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold text-purple-700">{task.title}</h2>
                  <span className={`text-sm px-3 py-1 rounded-full font-semibold
                    ${task.priority === 'High' ? 'bg-red-100 text-red-700' :
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'}`}>
                    {task.priority}
                  </span>
                </div>

                <p className="text-gray-700 mb-3">{task.description}</p>
                <p className="text-sm text-gray-500 mb-4">Due: {task.dueDate}</p>

                <div className="mb-4">
                  <label className="text-sm font-medium text-gray-600 mr-2">Status:</label>
                  <select
                    className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none text-gray-600"
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </div>

                <div className="flex space-x-4">
                  <Link to={`/edit/${task.id}`}>
                    <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Delete Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                  Are you sure you want to delete this task?
                </h3>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={confirmDelete}
                    className="text-white bg-red-600 hover:bg-red-800 px-4 py-2 rounded-lg"
                  >
                    Yes, I'm sure
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Toast Message */}
          {showToast && (
            <div
              id="toast-success"
              className="fixed bottom-4 right-4 flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
              role="alert"
            >
              <svg
                className="w-5 h-5 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div className="ms-3 text-sm font-normal">Task deleted successfully.</div>
              <button
                onClick={() => setShowToast(false)}
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Dashboard;
