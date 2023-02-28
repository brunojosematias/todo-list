import { useState } from 'react';
import { Trash } from 'phosphor-react';
import styles from './Task.module.css';
import { TaskProps } from '../../App';


interface TasksProps {
  task: TaskProps;
  onCounterCompleted: (counter: number) => void;
  counter: number;
  onDeleteTask: (id: number) => void
}

export function Tasks({
  task,
  onCounterCompleted,
  counter,
  onDeleteTask,
}: TasksProps) {
  const [completed, setCompleted] = useState<boolean>(false);

  function handleTaskCompleted() {
    if (!completed) {
      setCompleted(true);
      onCounterCompleted(counter + 1);
    } else {
      setCompleted(false);
      onCounterCompleted(counter - 1);
    }
  }

  function handleDeleteTask() {
    onDeleteTask(task.id);

    if (completed) {
      onCounterCompleted(counter - 1);
    }
  }

  return (
    <div className={styles.taskList}>
      <div className={styles.task}>
        <div className={styles.inputTask}>
          <input
            className={styles.roundedCheckbox}
            type="checkbox"
            checked={completed}
            onClick={handleTaskCompleted}
          />
          <div className={styles.textTask}>
            <p className={completed ? styles.taskcompleted : ''}>
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
