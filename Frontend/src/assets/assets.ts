import imagethree from './icons8-task-100.png'

export const images={
    imagethree
}

export interface TaskType {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Pending' | 'In Progress' | 'Done';
  }
  