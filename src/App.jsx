import React, { useEffect, useState } from 'react'
import AddEmployee from './components/AddEmployee'
import EmployeeList from './components/EmployeeList'

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export default function App() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API}/api/employees`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setEmployees(data)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="container">
      <h1>HRMS Lite</h1>
      <div className="grid">
        <div className="card">
          <h2>Add Employee</h2>
          <AddEmployee onAdded={load} api={API} />
        </div>
        <div className="card">
          <h2>Employees</h2>
          {loading ? <p>Loading...</p> : error ? <p className="error">{error}</p> : <EmployeeList employees={employees} onRefresh={load} api={API} />}
        </div>
      </div>
    </div>
  )
}
