import { useState } from 'react'
import './App.css'

function App() {
  const [taskInput, setTaskInput] = useState("")
  const [tasks, setTasks] = useState([])

  function handleAddTask() {
    if (taskInput === "") {
      alert("กรุณาพิมพ์งานก่อนกดเพิ่ม")
      return
    }

    setTasks([...tasks, taskInput])
    setTaskInput("")
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
          <li key={index}>{task}</li>
        ))}
      </ul>
    </div>
  )
}

export default App