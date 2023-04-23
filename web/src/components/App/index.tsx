import { useEffect, useState } from 'react';
import { Header } from '../Header';
import { InputAddTask } from '../InputAddTask';

import { TasksList } from '../TasksList';
import { api } from '../../api';

import '../../global.css';
import style from './App.module.css';


export interface TaskProps {
  id: string;
  content: string;
}

export function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  async function loadTask() {
    const response = await api.get('/tasks');

    setTasks(response.data);
  }

  useEffect(() => {
    loadTask();
  }, [tasks]);

  async function handleDeleteTask(id: string) {
    await api.delete(`/tasks/${id}`);
  }

  return (
    <>
      <Header />
      <div className={style.container}>
        <InputAddTask/>
        <TasksList
          contents={tasks}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </>

  );
}
