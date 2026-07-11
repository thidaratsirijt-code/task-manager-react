import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const API_URL = 'http://localhost:3000/api/auth'

function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  async function handleRegister() {
    if (name === "" || email === "" || password === "") {
      setError("กรุณากรอกข้อมูลให้ครบ")
      return
    }

    if (password.length < 6) {
      setError("รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร")
      return
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error)
        return
      }

      alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ")
      navigate("/login")
    } catch (err) {
      setError("เกิดข้อผิดพลาด กรุณาลองใหม่")
    }
  }

  return (
    <div className="container">
      <h1>สมัครสมาชิก</h1>

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
        <label>รหัสผ่าน</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <button onClick={handleRegister}>สมัครสมาชิก</button>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        มีบัญชีแล้ว? <Link to="/login">เข้าสู่ระบบ</Link>
      </p>
    </div>
  )
}

export default Register
