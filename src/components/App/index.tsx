import { useState } from 'react';
import { Header } from '../Header';
import { InputAddTask } from '../InputAddTask';

import '../../global.css';

import style from './App.module.css';
import { TasksList } from '../TasksList';

export interface TaskProps {
  id: number;
  content: string;
}

export function App() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  function handleDeleteTask(id: number) {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
  }

  return (
    <>
      <Header />
      <div className={style.container}>
        <InputAddTask
          onAddTask={setTasks}
          contents={tasks}
        />
        <TasksList
          contents={tasks}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </>

  );
}
