import { useState, useEffect } from 'react'
import TaskItem from '../components/TaskItem'
import '../App.css'

const API_URL = 'http://localhost:3000/api/tasks'

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [taskInput, setTaskInput] = useState("")
  const [noteInput, setNoteInput] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    const response = await fetch(API_URL)
    const data = await response.json()
    setTasks(data)
  }

  async function handleAddTask() {
    if (taskInput === "") {
      alert("กรุณาพิมพ์งานก่อนกดเพิ่ม")
      return
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: taskInput,
        note: noteInput,
        dueDate: dueDate
      })
    })

    const newTask = await response.json()
    setTasks([...tasks, newTask])
    setTaskInput("")
    setNoteInput("")
    setDueDate("")
  }

  async function handleDeleteTask(idToDelete) {
    await fetch(`${API_URL}/${idToDelete}`, { method: 'DELETE' })
    setTasks(tasks.filter((task) => task._id !== idToDelete))
  }

  async function handleToggleComplete(idToToggle) {
    const task = tasks.find((t) => t._id === idToToggle)

    const response = await fetch(`${API_URL}/${idToToggle}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed })
    })

    const updatedTask = await response.json()
    setTasks(tasks.map((t) => (t._id === idToToggle ? updatedTask : t)))
  }

  async function handleEditTask(idToEdit, updatedFields) {
    const response = await fetch(`${API_URL}/${idToEdit}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    })

    const updatedTask = await response.json()
    setTasks(tasks.map((t) => (t._id === idToEdit ? updatedTask : t)))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

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
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={handleAddTask}>เพิ่มงาน</button>
      </div>

      <input
        type="text"
        className="note-input-full"
        placeholder="โน้ตเพิ่มเติม (ไม่บังคับ)..."
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
      />

      <div className="filter-area">
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          ทั้งหมด
        </button>
        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => setFilter("active")}
        >
          ยังไม่เสร็จ
        </button>
        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => setFilter("completed")}
        >
          เสร็จแล้ว
        </button>
      </div>

      <ul>
        {filteredTasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onDelete={handleDeleteTask}
            onToggle={handleToggleComplete}
            onEdit={handleEditTask}
          />
        ))}
      </ul>
    </div>
  )
}

export default Tasks