import { useState } from 'react';
import { Trash } from 'phosphor-react';
import styles from './Task.module.css';
import { TaskProps } from '../../App';

import { api } from '../../../api';


interface TasksProps {
  task: any;
  onDeleteTask: (id: string) => Promise<void>;
}

export function Tasks({
  task,
  onDeleteTask,
}: TasksProps) {

  async function handleTaskCompleted() {
    if (!task.is_checked) {
      await api.put(`/tasks/${task.id}`, { is_checked: true });
    } else {
      await api.put(`/tasks/${task.id}`, { is_checked: false });
    }
  }

  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  const Ischecked = task.is_checked ? styles.taskCompleted : undefined;

  return (
    <div className={styles.taskList}>
      <div className={styles.task}>
        <div className={styles.inputTask}>
          <input
            className={styles.roundedCheckbox}
            type="checkbox"
            defaultChecked={task.is_checked}
            onClick={handleTaskCompleted}
          />
          <div className={styles.textTask}>
            <p className={Ischecked}>
              {task.content}
            </p>
          </div>
        </div>
        <button
          className={styles.trash}
          type="button"
          onClick={handleDeleteTask}
        >
          <Trash size={20} />
        </button>
      </div>
    </div >

  );
}
