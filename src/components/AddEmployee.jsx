import React, { useState } from 'react'

export default function AddEmployee({ onAdded, api }) {
  const [employee_id, setEmployeeId] = useState('')
  const [full_name, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [department, setDepartment] = useState('')
  const [msg, setMsg] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    try {
      const res = await fetch(`${api}/api/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employee_id, full_name, email, department })
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed')
      }
      setMsg({ type: 'success', text: 'Employee added' })
      setEmployeeId(''); setFullName(''); setEmail(''); setDepartment('')
      onAdded()
    } catch (err) {
      setMsg({ type: 'error', text: err.message })
    }
  }

  return (
    <form onSubmit={submit} className="form">
      {msg && <p className={msg.type === 'error' ? 'error' : 'success'}>{msg.text}</p>}
      <label>Employee ID<input value={employee_id} onChange={e=>setEmployeeId(e.target.value)} required /></label>
      <label>Full Name<input value={full_name} onChange={e=>setFullName(e.target.value)} required /></label>
      <label>Email<input value={email} onChange={e=>setEmail(e.target.value)} required type="email" /></label>
      <label>Department<input value={department} onChange={e=>setDepartment(e.target.value)} /></label>
      <div className="actions"><button type="submit">Add</button></div>
    </form>
  )
}
