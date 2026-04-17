// import React from 'react'
// import LeaveAdmin from '../Component/LeaveAdmin'
// import LeaveEmployee from '../Component/LeaveEmployee'

// const Leave = () => {
//   const userRole = "ADMIN" // later replace with auth context

//   return userRole === "ADMIN" ? <LeaveAdmin /> : <LeaveEmployee />
// }

// export default Leave
// import React, { useState } from 'react'
// import LeaveAdmin from '../Component/LeaveAdmin'
// import LeaveEmployee from '../Component/LeaveEmployee'

// const Leave = () => {
//   // 1. Use useState instead of const. 
//   // This tells React: "Watch this variable. If it changes, refresh the screen."
//   const [userRole, setUserRole] = useState("ADMIN") 

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* 2. TEST BUTTONS: These allow you to actually see the change happening */}
//       <div className="bg-white border-b p-4 flex justify-center gap-4 shadow-sm">
//         <p className="text-sm font-bold self-center mr-4">Test Role Switcher:</p>
//         <button 
//           onClick={() => setUserRole("ADMIN")}
//           className={`px-4 py-2 rounded-lg text-sm font-bold transition ${userRole === 'ADMIN' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}
//         >
//           Set as Admin
//         </button>
//         <button 
//           onClick={() => setUserRole("EMPLOYEE")}
//           className={`px-4 py-2 rounded-lg text-sm font-bold transition ${userRole === 'EMPLOYEE' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}
//         >
//           Set as Employee
//         </button>
//       </div>

//       {/* 3. THE ACTUAL LOGIC */}
//       {userRole === "ADMIN" ? <LeaveAdmin /> : <LeaveEmployee />}
//     </div>
//   )
// }

// export default Leave
import React from 'react'
import LeaveAdmin from '../Component/LeaveAdmin'
import LeaveEmployee from '../Component/LeaveEmployee'

// Receive userRole from App.jsx
const Leave = ({ userRole }) => {
  return (
    <>
      {/* Pass the role down to the specific component */}
      {userRole === "ADMIN" ? (
        <LeaveAdmin userRole={userRole} />
      ) : (
        <LeaveEmployee userRole={userRole} />
      )}
    </>
  )
}

export default Leave