
import React from 'react' // Removed useState
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './Pages/Layout'
import LoginLanding from './Pages/LoginLanding'
import Attendance from './Pages/Attendance' 
import Leave from './Pages/Leave'
import PaySlips from './Pages/PaySlips'
import Setting from './Pages/Setting'
import Dashboard from './Pages/Dashboard'
import Employee from './Pages/Employees'
import PrintPaySlips from './Pages/PrintPaySlips'
import LoginForm from './Component/LoginForm'

const App = () => {
  // ============================================================
  // CHANGE THIS LINE MANUALLY TO SWITCH THE WHOLE APP
  // Use "ADMIN" or "EMPLOYEE"
  // ============================================================
  const userRole = "EMPLOYEE"; 
  // ============================================================

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<LoginLanding />} />
        <Route path='/login/admin' element={<LoginForm role="admin" title="Admin Portal" />} />
        <Route path='/login/employee' element={<LoginForm role="employee" title="Employee Portal" />} />

        {/* 1. Pass the role to Layout so the Sidebar/Menu changes */}
        <Route element={<Layout userRole={userRole} />}>
          <Route path='/dashboard' element={<Dashboard />} />

          {/* 2. Role-based routing for Employees vs Attendance */}
          {userRole === "ADMIN" ? (
            <>
              <Route path='/employees' element={<Employee />} />
              <Route path='/attendance' element={<Navigate to="/dashboard" replace />} />
            </>
          ) : (
            <>
              <Route path='/attendance' element={<Attendance />} />
              <Route path='/employees' element={<Navigate to="/dashboard" replace />} />
            </>
          )}

          {/* 3. Pass the role to Leave so it shows Admin or Employee view */}
          <Route path='/leave' element={<Leave userRole={userRole} />} />
          
          <Route path='/payslips' element={<PaySlips />} />
          <Route path='/settings' element={<Setting />} />
        </Route>

        <Route path='/print/payslips/:id' element={<PrintPaySlips />} />
        <Route path='*' element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  )
}

export default App