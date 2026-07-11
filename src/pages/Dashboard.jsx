import { useState, useEffect } from 'react'

const API_URL = 'http://localhost:3000/api/tasks'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [viewFilter, setViewFilter] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    const response = await fetch(API_URL)
    const data = await response.json()
    setTasks(data)
  }

  function isTaskOverdue(task) {
    return (
      task.dueDate &&
      !task.completed &&
      new Date(task.dueDate) < new Date().setHours(0, 0, 0, 0)
    )
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const activeTasks = totalTasks - completedTasks
  const overdueTasks = tasks.filter(isTaskOverdue).length

  function getFilteredList() {
    if (viewFilter === "completed") return tasks.filter((t) => t.completed)
    if (viewFilter === "active") return tasks.filter((t) => !t.completed)
    if (viewFilter === "overdue") return tasks.filter(isTaskOverdue)
    return tasks
  }

  const displayedTasks = getFilteredList()

  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="stats">
        <div
          className={`stat-card ${viewFilter === "all" || viewFilter === null ? "stat-active" : ""}`}
          onClick={() => setViewFilter("all")}
        >
          <h2>{totalTasks}</h2>
          <p>งานทั้งหมด</p>
        </div>
        <div
          className={`stat-card ${viewFilter === "active" ? "stat-active" : ""}`}
          onClick={() => setViewFilter("active")}
        >
          <h2>{activeTasks}</h2>
          <p>ยังไม่เสร็จ</p>
        </div>
        <div
          className={`stat-card ${viewFilter === "completed" ? "stat-active" : ""}`}
          onClick={() => setViewFilter("completed")}
        >
          <h2>{completedTasks}</h2>
          <p>เสร็จแล้ว</p>
        </div>
        <div
          className={`stat-card overdue-card ${viewFilter === "overdue" ? "stat-active" : ""}`}
          onClick={() => setViewFilter("overdue")}
        >
          <h2>{overdueTasks}</h2>
          <p>เลยกำหนด</p>
        </div>
      </div>

      {displayedTasks.length === 0 ? (
        <p>ไม่มีงานในหมวดนี้</p>
      ) : (
        <ul>
          {displayedTasks.map((task) => (
            <li key={task._id} className={task.completed ? "task-completed" : ""}>
              <div className="task-content">
                <span className="task-text">{task.text}</span>
                {task.note && <p className="task-note">📝 {task.note}</p>}
                {task.dueDate && (
                  <span className={isTaskOverdue(task) ? "due-date overdue" : "due-date"}>
                    {isTaskOverdue(task) ? "⚠️ เลยกำหนด: " : "📅 "}
                    {task.dueDate}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dashboard