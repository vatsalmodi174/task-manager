import { createContext, useState, useEffect, ReactNode } from "react";

// 1. Define Task type
export type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Done";
};

// 2. Define context type
interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

// 3. Create context with default value (null, will use with provider)
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

// 4. Define Props for Provider
interface TaskProviderProps {
  children: ReactNode;
}

// 5. TaskProvider component
export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Load tasks from localStorage on first render
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  }, []);

  // Sync tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
