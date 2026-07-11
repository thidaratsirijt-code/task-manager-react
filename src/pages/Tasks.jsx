import { useState } from 'react'
import TaskItem from '../components/TaskItem'
import '../App.css'

function Tasks({ tasks, setTasks }) {
  const [taskInput, setTaskInput] = useState("")
  const [noteInput, setNoteInput] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [filter, setFilter] = useState("all")

  function handleAddTask() {
    if (taskInput === "") {
      alert("กรุณาพิมพ์งานก่อนกดเพิ่ม")
      return
    }

    const newTask = {
      id: Date.now(),
      text: taskInput,
      note: noteInput,
      completed: false,
      dueDate: dueDate
    }

    setTasks([...tasks, newTask])
    setTaskInput("")
    setNoteInput("")
    setDueDate("")
  }

  function handleDeleteTask(idToDelete) {
    setTasks(tasks.filter((task) => task.id !== idToDelete))
  }

  function handleToggleComplete(idToToggle) {
    setTasks(
      tasks.map((task) =>
        task.id === idToToggle
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  function handleEditTask(idToEdit, updatedFields) {
    setTasks(
      tasks.map((task) =>
        task.id === idToEdit
          ? { ...task, ...updatedFields }
          : task
      )
    )
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
            key={task.id}
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