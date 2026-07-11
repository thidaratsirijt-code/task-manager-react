function Dashboard({ tasks }) {
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="stat-card">
          <h2>{tasks.length}</h2>
          <p>งานทั้งหมด</p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <p>ยังไม่มีงานเลย ลองไปเพิ่มที่หน้า Tasks ดูสิ</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dashboard