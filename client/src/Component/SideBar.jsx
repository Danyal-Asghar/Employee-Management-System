import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import {
    UserCircle2, LayoutDashboard, CalendarDays, FileText,
    Receipt, Settings, LogOut, Menu, X, Users, ChevronRight
} from 'lucide-react'
import { dummyProfileData } from '../assets/assets'

/** * CONFIGURATION: Navigation Structure
 * Defined outside the component to prevent re-creation on every render.
 * 'roles' array determines which user types can see each link.
 */
const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'EMPLOYEE'] },
    { label: 'Employees', path: '/employees', icon: Users, roles: ['ADMIN'] },
    { label: 'Attendance', path: '/attendance', icon: CalendarDays, roles: ['EMPLOYEE'] },
    { label: 'Leave', path: '/leave', icon: FileText, roles: ['ADMIN', 'EMPLOYEE'] },
    { label: 'Payslips', path: '/payslips', icon: Receipt, roles: ['ADMIN', 'EMPLOYEE'] },
    { label: 'Settings', path: '/settings', icon: Settings, roles: ['ADMIN', 'EMPLOYEE'] }
]

/**
 * COMPONENT: SidebarUI
 * Shared presentation layer for both Mobile and Desktop versions of the sidebar.
 */
const SidebarUI = ({ pathname, setMobileOpen, userName, role, filteredNav }) => {
    
    // Simple logout handler redirecting the user to the login route
    const handleLogout = () => {
        window.location.href = '/login';
    };

    return (
        <div className='flex h-screen flex-col bg-[#0b1426] text-white overflow-y-auto'>
            {/* SECTION: Branding/Logo Area */}
            <div className='px-6 pt-8 pb-6'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <UserCircle2 className='size-6 text-indigo-400' />
                        </div>
                        <div>
                            <h2 className='text-base font-bold'>Employee MS</h2>
                            <p className='text-[10px] text-slate-500 font-bold uppercase tracking-widest'>
                                {role === 'ADMIN' ? 'Admin Panel' : 'Staff Portal'}
                            </p>
                        </div>
                    </div>
                    {/* Close button - Only visible on mobile screens */}
                    <button onClick={() => setMobileOpen(false)} className='lg:hidden p-2 text-slate-400'>
                        <X size={20} />
                    </button>
                </div>
            </div>

            {/* SECTION: User Profile Card */}
            <div className='px-4 mb-6'>
                <div className='rounded-xl bg-white/5 p-4 border border-white/10'>
                    <div className='flex items-center gap-3'>
                        {/* Avatar: Shows the first letter of the username */}
                        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold'>
                            {userName ? userName[0].toUpperCase() : 'U'}
                        </div>
                        <div className='overflow-hidden'>
                            <p className='text-sm font-semibold truncate'>{userName}</p>
                            <p className='text-[11px] text-slate-500 capitalize'>
                                {role === 'ADMIN' ? 'Administrator' : 'Employee'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION: Main Navigation Links */}
            <div className='flex-1 px-3'>
                <nav className="space-y-1">
                    {filteredNav.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            // Auto-close sidebar on mobile after clicking a link
                            onClick={() => window.innerWidth < 1024 && setMobileOpen(false)}
                            className={`group flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                                pathname === item.path 
                                ? 'bg-indigo-500 text-white shadow-lg' // Active State
                                : 'text-slate-400 hover:bg-white/5'    // Inactive State
                            }`}
                        >
                            <div className='flex items-center gap-3'>
                                <item.icon size={18} />
                                <span className='text-sm font-medium'>{item.label}</span>
                            </div>
                            {/* Visual indicator for current active page */}
                            {pathname === item.path && <ChevronRight size={14} />}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* SECTION: Footer / Logout Action */}
            <div className='p-4 mt-auto border-t border-white/5'>
                <button 
                    onClick={handleLogout}
                    className='flex items-center gap-3 w-full px-4 py-3 text-slate-400 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all duration-200'
                >
                    <LogOut size={18} />
                    <span className='text-sm font-medium'>Log out</span>
                </button>
            </div>
        </div>
    );
};

/**
 * MAIN EXPORT: Sidebar
 * Logic wrapper that handles routing, mobile toggling, and role-based filtering.
 */
const Sidebar = ({ userRole }) => {
    const { pathname } = useLocation() // Tracks current URL path
    const [mobileOpen, setMobileOpen] = useState(false) // Controls visibility on mobile
    
    // Construct full name and filter links based on the passed 'userRole' prop
    const userName = `${dummyProfileData.firstName} ${dummyProfileData.lastName}`
    const filteredNav = navItems.filter(item => item.roles.includes(userRole))

    // Bundle props to keep the SidebarUI clean
    const sidebarProps = { pathname, setMobileOpen, userName, role: userRole, filteredNav }

    return (
        <>
            {/* MOBILE HAMBURGER BUTTON: Hidden on Desktop (lg:hidden) */}
            {!mobileOpen && (
                <button 
                    onClick={() => setMobileOpen(true)} 
                    className='lg:hidden fixed top-4 left-4 z-40 p-2.5 bg-[#0b1426] rounded-xl text-white shadow-xl border border-white/10'
                >
                    <Menu size={20} />
                </button>
            )}
            
            {/* MOBILE OVERLAY: Dimmed background that closes sidebar on click */}
            {mobileOpen && (
                <div 
                    className='fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-md lg:hidden' 
                    onClick={() => setMobileOpen(false)} 
                />
            )}
            
            {/* MOBILE SIDEBAR: Slides in from the left */}
            <aside className={`fixed left-0 top-0 z-50 h-screen w-72 transform transition-transform lg:hidden ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <SidebarUI {...sidebarProps} />
            </aside>

            {/* DESKTOP SIDEBAR: Always visible on large screens, fixed/sticky position */}
            <aside className='hidden lg:block h-screen w-72 min-w-[288px] sticky top-0 border-r border-white/5'>
                <SidebarUI {...sidebarProps} />
            </aside>
        </>
    )
}

export default Sidebar

