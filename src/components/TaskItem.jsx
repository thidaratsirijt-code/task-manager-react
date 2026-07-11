function TaskItem({ task, index, onDelete }) {
  return (
    <li onClick={() => onDelete(index)}>
      {task}
    </li>
  )
}

export default TaskItem