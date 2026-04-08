// import React from 'react'

// const LoginLeftSide = () => {
//   return (
//     <div className='hidden md:flex w-1/2 bg-indigo-950 relative overflow-hidden border-r border-slate-200'>
//     <div className="absolute -top-30 -left-30 w-72 h-72 bg-indigo-500/50 rounded-full blur-3xl"></div>
//     <div className="relative z-10 flex flex-col items-start justify-center p-12 lg:p-20 w-full h-full "> <h1 className='text-4xl lg:text-5xl font-medium text-white mb-6 leading-tight tracking-tight'>Employee <br /> Management System</h1>
//     <p className='text-slate-400 tedt-lg max-w-md leading-relaxed'>Streamline your workforce operation, track attendence, manage payroll, and empower your team securely.</p>
//     </div>
//     </div>
//   )
// }

// export default LoginLeftSide

import React from 'react'

const LoginLeftSide = () => {
  return (
    <div className="hidden md:flex w-1/2 relative overflow-hidden border-r border-slate-800 bg-gradient-to-br from-indigo-950 via-indigo-900 to-slate-900">
      
      {/* Glow Effects */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-500/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>

      {/* Grid pattern overlay (premium feel) */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center p-12 lg:p-20 w-full h-full">
        
        {/* Badge */}
        <span className="mb-6 inline-block px-4 py-1 text-xs font-medium text-indigo-200 bg-indigo-500/10 border border-indigo-400/20 rounded-full backdrop-blur">
          HR Management Platform
        </span>

        {/* Heading */}
        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-semibold text-white mb-6 leading-tight tracking-tight">
          Employee <br />
          Management System
        </h1>

        {/* Description */}
        <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed">
          Streamline your workforce operations, track attendance, manage payroll, 
          and empower your team with secure and modern tools.
        </p>

        {/* Bottom highlight */}
        <div className="mt-10 flex items-center gap-3 text-sm text-slate-400">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          Trusted by modern teams
        </div>

      </div>
    </div>
  )
}

export default LoginLeftSide