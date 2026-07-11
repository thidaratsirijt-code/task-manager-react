import { useState } from 'react'

function TaskItem({ task, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const [editNote, setEditNote] = useState(task.note || "")
  const [editDueDate, setEditDueDate] = useState(task.dueDate || "")

  const isOverdue =
    task.dueDate &&
    !task.completed &&
    new Date(task.dueDate) < new Date().setHours(0, 0, 0, 0)

  function handleSaveEdit() {
    if (editText.trim() === "") {
      alert("ข้อความงานห้ามว่างเปล่า")
      return
    }
    onEdit(task.id, {
      text: editText,
      note: editNote,
      dueDate: editDueDate
    })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <li className="task-editing">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
        <input
          type="text"
          placeholder="โน้ตเพิ่มเติม..."
          value={editNote}
          onChange={(e) => setEditNote(e.target.value)}
        />
        <input
          type="date"
          value={editDueDate}
          onChange={(e) => setEditDueDate(e.target.value)}
        />
        <button className="save-btn" onClick={handleSaveEdit}>บันทึก</button>
        <button className="cancel-btn" onClick={() => setIsEditing(false)}>ยกเลิก</button>
      </li>
    )
  }

  return (
    <li className={task.completed ? "task-completed" : ""}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <div className="task-content">
        <span className="task-text">{task.text}</span>
        {task.note && <p className="task-note">📝 {task.note}</p>}
        {task.dueDate && (
          <span className={isOverdue ? "due-date overdue" : "due-date"}>
            {isOverdue ? "⚠️ เลยกำหนด: " : "📅 "}
            {task.dueDate}
          </span>
        )}
      </div>
      <button className="edit-btn" onClick={() => setIsEditing(true)}>แก้ไข</button>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>ลบ</button>
    </li>
  )
}

export default TaskItem