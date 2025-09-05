import { useState } from 'react';
import TaskCard from '../TaskCard/TaskCard';
import './style.css'

const task1 = {
  id: 1,
  title: "План на вечер",
  description: [{ step: "Вечер1", id: 1 }, { step: "Вечер2", id: 2 }, { step: "Вечер3", id: 3 }]
}

const task2 = {
  id: 2,
  title: "План на месяц",
  description: [{ step: "Месяц1", id: 1 }, { step: "Месяц2", id: 2 }, { step: "Месяц3", id: 3 }]
}

const initTasks = [task1, task2]

export default function App() {

  const [newTaskName, setNewTaskName] = useState('')
  const [tasks, setTasks] = useState(initTasks)

  const typeNewTaskName = (e) => {
    setNewTaskName(e.target.value)
  }

  const addNewTask = () => {
    if (newTaskName.trim().length == 0) return

    const newTask = {
      id: getTaskId(),
      title: newTaskName,
      description: []
    }
    setTasks([...tasks, newTask])
    setNewTaskName('')
  }

  const getTaskId = () => {
    const ids = tasks.map(task => task.id).sort((a, b) => a - b)

    for (let i = 0; i < ids.length; i++) {
      const expectedId = i + 1;

      if (ids[i] !== expectedId) {
        return expectedId;
      }
    }

    return tasks.length + 1
  }

  const deleteTask = (deletedTaskId) => {
    setTasks(tasks.filter(task => task.id !== deletedTaskId))
  }

  return (
    <div className='work-space'>
      <div className='box'>
        <input type='text' value={newTaskName} onChange={typeNewTaskName}></input>
        <button onClick={addNewTask}>Добавить план</button>
      </div>
      {tasks.map(task => <TaskCard key={task.id} task={task} onDelete = {deleteTask}/>)}
    </div>
  );
}


