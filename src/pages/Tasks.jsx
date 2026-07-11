import { useState } from 'react'
import TaskItem from '../components/TaskItem'
import '../App.css'

function Tasks({ tasks, setTasks }) {
  const [taskInput, setTaskInput] = useState("")

  function handleAddTask() {
    if (taskInput === "") {
      alert("กรุณาพิมพ์งานก่อนกดเพิ่ม")
      return
    }

    setTasks([...tasks, taskInput])
    setTaskInput("")
  }

  function handleDeleteTask(indexToDelete) {
    const updatedTasks = tasks.filter((task, index) => index !== indexToDelete)
    setTasks(updatedTasks)
  }

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="เพิ่มงานใหม่..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={handleAddTask}>เพิ่มงาน</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            index={index}
            onDelete={handleDeleteTask}
          />
        ))}
      </ul>
    </div>
  )
}

export default Tasks