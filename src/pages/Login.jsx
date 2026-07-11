import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  function handleLogin() {
    if (email === "" || password === "") {
      setError("กรุณากรอกอีเมลและรหัสผ่านให้ครบ")
      return
    }

    if (!email.includes("@")) {
      setError("รูปแบบอีเมลไม่ถูกต้อง")
      return
    }

    setError("")
    alert("เข้าสู่ระบบสำเร็จ! (จำลอง ยังไม่เชื่อม backend จริง)")
    navigate("/dashboard")
  }

  return (
    <div className="container">
      <h1>เข้าสู่ระบบ</h1>

      <div className="form-group">
        <label>อีเมล</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>รหัสผ่าน</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="error-text">{error}</p>}

      <button onClick={handleLogin}>เข้าสู่ระบบ</button>
    </div>
  )
}

export default Login