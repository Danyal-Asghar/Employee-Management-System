
import React from 'react' 
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './Pages/Layout'
import LoginLanding from './Pages/LoginLanding'
import Attendance from './Pages/Attendance' 
import Leave from './Pages/Leave'
import PaySlips from './Pages/PaySlips'
import Dashboard from './Pages/Dashboard'
import Employee from './Pages/Employees'
import PrintPaySlips from './Pages/PrintPaySlips'
import LoginForm from './Component/LoginForm'
import Settings from './Pages/Settings'

const App = () => {
  const userRole = "ADMIN"; // Change to "ADMIN" to test

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<LoginLanding />} />
        <Route path='/login/admin' element={<LoginForm role="admin" title="Admin Portal" />} />
        <Route path='/login/employee' element={<LoginForm role="employee" title="Employee Portal" />} />

        {/* MAIN APP (WITH SIDEBAR) */}
        <Route element={<Layout userRole={userRole} />}>
          <Route path='/dashboard' element={<Dashboard userRole={userRole} />} />

          {userRole === "ADMIN" ? (
            <>
              <Route path='/employees' element={<Employee userRole={userRole} />} />
              <Route path='/attendance' element={<Navigate to="/dashboard" replace />} />
            </>
          ) : (
            <>
              <Route path='/attendance' element={<Attendance />} />
              <Route path='/employees' element={<Navigate to="/dashboard" replace />} />
            </>
          )}

          <Route path='/leave' element={<Leave userRole={userRole} />} />
          <Route path='/payslips' element={<PaySlips userRole={userRole} />} />
          <Route path='/settings' element={<Settings userRole={userRole} />} />
        </Route>

        {/* STANDALONE PAGE (NO SIDEBAR) */}
        <Route path='/print/payslips/:id' element={<PrintPaySlips />} />
        
        <Route path='*' element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  )
}

export default App