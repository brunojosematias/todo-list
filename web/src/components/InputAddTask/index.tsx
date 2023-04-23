import { useState, ChangeEvent, FormEvent } from 'react';
import Plus from '../../assets/plus.svg';

import { api } from '../../api';

import styles from './InputAddTask.module.css';

export function InputAddTask() {
  const [content, setContent] = useState<string>('');
  const [inputNotice, setInputNotice] = useState<string>('standard');

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);

    if (event.target.value) {
      setInputNotice('standard');
    }
  }

  async function handleAddTask(event: FormEvent) {
    event.preventDefault();

    if (!content || content.startsWith(' ')) {
      setInputNotice('danger');
      setContent(content.replace(/^\s+/, ''))
    } else {
      setInputNotice('standard');
      await api.post('/tasks', { content });
      setContent('');
    }
  }

  return (
    <form onSubmit={handleAddTask}>
      <div className={styles.addTask}>
        <div className={styles.input}>
          <input
            className={styles[inputNotice]}
            type="text"
            value={content}
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
