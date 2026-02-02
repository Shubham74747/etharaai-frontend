import React, { useState } from 'react'

export default function EmployeeList({ employees, onRefresh, api }) {
  const [selected, setSelected] = useState(null)
  const [attendance, setAttendance] = useState([])

  const del = async (id) => {
    if (!confirm('Delete employee?')) return
    await fetch(`${api}/api/employees/${id}`, { method: 'DELETE' })
    onRefresh()
  }

  const loadAttendance = async (id) => {
    setSelected(id)
    const res = await fetch(`${api}/api/employees/${id}/attendance`)
    if (res.ok) {
      const rows = await res.json(); setAttendance(rows)
    } else setAttendance([])
  }

  const mark = async (id, status) => {
    const date = new Date().toISOString().slice(0,10)
    await fetch(`${api}/api/employees/${id}/attendance`, { method: 'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ date, status }) })
    loadAttendance(id)
  }

  return (
    <div>
      {employees.length === 0 && <p>No employees yet.</p>}
      <ul className="list">
        {employees.map(e => (
          <li key={e.id}>
            <div>
              <strong>{e.full_name}</strong> <small>({e.employee_id})</small>
              <br /><small>{e.email} • {e.department || '—'}</small>
            </div>
            <div className="row">
              <button onClick={() => loadAttendance(e.id)}>Attendance</button>
              <button className="danger" onClick={() => del(e.id)}>Delete</button>
            </div>
            {selected === e.id && (
              <div className="attendance">
                <div className="row">
                  <button onClick={() => mark(e.id, 'Present')}>Mark Present</button>
                  <button onClick={() => mark(e.id, 'Absent')}>Mark Absent</button>
                </div>
                <h4>Recent</h4>
                {attendance.length === 0 ? <p>No records</p> : (
                  <ul>
                    {attendance.map(a=> <li key={a.id}>{a.date} — {a.status}</li>)}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
