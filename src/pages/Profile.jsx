import { useState } from 'react'

function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState("Thidarat")
  const [email, setEmail] = useState("thidarat.sirijt@gmail.com")
  const [bio, setBio] = useState("นักศึกษาที่กำลังฝึกทำเว็บ Full Stack")

  function handleSave() {
    setIsEditing(false)
  }

  return (
    <div className="container">
      <h1>โปรไฟล์</h1>

      <div className="profile-card">
        <div className="avatar">
          {name.charAt(0).toUpperCase()}
        </div>

        {isEditing ? (
          <>
            <div className="form-group">
              <label>ชื่อ</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>อีเมล</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>เกี่ยวกับฉัน</label>
              <input
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <button onClick={handleSave}>บันทึก</button>
          </>
        ) : (
          <>
            <h2>{name}</h2>
            <p className="profile-email">{email}</p>
            <p>{bio}</p>
            <button onClick={() => setIsEditing(true)}>แก้ไขโปรไฟล์</button>
          </>
        )}
      </div>
    </div>
  )
}

export default Profile