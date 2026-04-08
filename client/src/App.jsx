import { Navigate, Route } from 'react-router-dom'
import {Toaster } from 'react-hot-toast'
import { Routes } from 'react-router-dom'
import Layout from './Pages/Layout'
import LoginLanding from './Pages/LoginLanding'
import Attendence from './Pages/Attendence'
import Leave from './Pages/Leave'
import PaySlips from './Pages/PaySlips'
import Setting from './Pages/Setting'
import Dashboard from './Pages/Dashboard'
import Employee from './Pages/Employee'
import PrintPaySlips from './Pages/PrintPaySlips'
import LoginForm from './Component/LoginForm'

const App = () => {
  return (
    <>
    <Toaster />
    <Routes>
      <Route path='/login' element={<LoginLanding />} />
      <Route path='/login/admin' element={<LoginForm  role="admin" title="Admin Portal " subtitle="Sign in to manage organization"/>} />
      <Route path='/login/employee' element={<LoginForm role="employee" title="Employee Portal " subtitle="Sign in to access your account " />} />
      <Route element={<Layout />}>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='employee' element={<Employee />} />
         <Route path='attendence' element={<Attendence />} />
          <Route path='leave' element={<Leave />} />
           <Route path='paySlips' element={<PaySlips />} />
            <Route path='setting' element={<Setting />} />
      </Route>
      <Route path='print/payslips/:id' element={<PrintPaySlips />}  />
    
    </Routes>
    </>
  )
}

export default App