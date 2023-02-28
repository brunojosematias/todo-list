import { useState, ChangeEvent, FormEvent } from 'react';
import Plus from '../../assets/plus.svg';
import { TaskProps } from '../App';

import styles from './InputAddTask.module.css';

interface InputAddTaskProps {
  contents: TaskProps[];
  onAddTask: (contents: TaskProps[]) => void
}

export function InputAddTask({ contents, onAddTask }: InputAddTaskProps) {
  const [newTask, setNewTask] = useState<string>('');
  const [inputNotice, setInputNotice] = useState<string>('standard');

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);

    if (event.target.value) {
      setInputNotice('standard');
    }
  }

  function handleAddTask(event: FormEvent) {
    event.preventDefault();

    if (!newTask) {
      setInputNotice('danger');
    } else {
      setInputNotice('standard');
      onAddTask([...contents, { id: contents.length + 1, content: newTask }]);
      setNewTask('');
    }
  }

  return (
    <form onSubmit={handleAddTask}>
      <div className={styles.addTask}>
        <div className={styles.input}>
          <input
            className={styles[inputNotice]}
            type="text"
            value={newTask}
            placeholder="Adicione uma nova tarefa"
            onChange={handleNewTask}
          />
          {inputNotice === 'danger' && <small className={styles.notice}>Precisa informar a tarefa</small>}
        </div>

        <button
          type="submit"
        >
          Criar
          <img src={Plus} alt="Ícone de +" />
        </button>
      </div>
    </form>
  );
}
