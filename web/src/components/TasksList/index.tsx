import { useEffect, useState } from 'react';
import { TaskProps } from '../App';
import { EmptyList } from './todoList/EmptyList';
import { Tasks } from './todoList/Task';
import styles from './Task.module.css';
import { api } from '../../api';

interface TaskListProps {
  contents: TaskProps[];
  onDeleteTask: (id: string) => Promise<void>;
}

export function TasksList({ contents, onDeleteTask }: TaskListProps) {
  const [counterCompleted, setCounterCompleted] = useState<string>('');

  async function countTask() {
    const response = await api.get('/ischecked');

    setCounterCompleted(response.data.count);
  }

  useEffect(() => {
    countTask();
  }, [countTask]);

  return (
    <div className={styles.container}>
      <div className={styles.counters}>
        <small>
          Tarefas criadas
          <span>{contents.length}</span>
        </small>

        <small>
          Concluídas
          <span>{counterCompleted === '0' ? '0' : `${counterCompleted} de ${contents.length}`}</span>
        </small>
      </div>
      {
        contents.length === 0
          ? <EmptyList />
          : contents.map((task) => (
            <Tasks
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
            />
          ))
      }

      <div />

    </div>
  );
}
