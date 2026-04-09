import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './Pages/Layout'
import LoginLanding from './Pages/LoginLanding'
import Attendance from './Pages/Attendance' 
import Leave from './Pages/Leave'
import PaySlips from './Pages/PaySlips'
import Setting from './Pages/Setting'
import Dashboard from './Pages/Dashboard'
import Employee from './Pages/Employee'
import PrintPaySlips from './Pages/PrintPaySlips'
import LoginForm from './Component/LoginForm'

const App = () => {
  // Now, changing this single variable will update BOTH your Routes and your Sidebar!
  const userRole = "EMPLOYEE"; 

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<LoginLanding />} />
        <Route path='/login/admin' element={<LoginForm role="admin" title="Admin Portal" />} />
        <Route path='/login/employee' element={<LoginForm role="employee" title="Employee Portal" />} />
        
        {/* We pass userRole here so Layout (and Sidebar) can use it */}
        <Route element={<Layout userRole={userRole} />}>
          <Route path='/dashboard' element={<Dashboard />} />
          
          {/* EXCLUSIVE ROUTES LOGIC */}
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

          <Route path='/leave' element={<Leave />} />
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

