
import React from 'react'
import { Link } from 'react-router-dom'
import LoginLeftSide from '../Component/LoginLeftSide'
import { Shield, User, ArrowRight } from 'lucide-react'

const LoginLanding = () => {
  const portalOptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description: "Manage employees, departments, payroll, and system configurations.",
      icon: Shield
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
      description: "View your profile, track attendance, request time off and access payslips.",
      icon: User
    }
  ]

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      
      {/* Left Side */}
      <LoginLeftSide />

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-5 py-10 sm:px-8 lg:px-16 relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-200 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200 opacity-30 rounded-full blur-3xl"></div>

        <div className="w-full max-w-md animate-fade-in relative z-10">
          
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight mb-3">
              Welcome Back 👋
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-sm">
              Select your portal to securely access the system
            </p>
          </div>

          {/* Portal list */}
          <div className="space-y-5">
            {portalOptions.map((portal) => {
              const Icon = portal.icon
              return (
                <Link
                  key={portal.to}
                  to={portal.to}
                  className="group relative block rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-5 sm:p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-200/40 hover:-translate-y-1"
                >
                  
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-indigo-100 via-transparent to-purple-100"></div>

                  <div className="relative flex items-center justify-between gap-4">
                    
                    {/* Left content */}
                    <div className="flex items-start gap-4">
                      
                      <div className="p-3 rounded-xl bg-white shadow-sm group-hover:shadow-md group-hover:bg-indigo-100 transition-all">
                        <Icon className="w-5 h-5 text-slate-600 group-hover:text-indigo-600" />
                      </div>

                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {portal.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                          {portal.description}
                        </p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>

                </Link>
              )
            })}
          </div>

          {/* Footer */}
          <div className="mt-12 text-center text-xs sm:text-sm text-slate-400">
            © {new Date().getFullYear()} Your Company. All rights reserved.
          </div>

        </div>

      </div>
    </div>
  )
}

export default LoginLanding