
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Component/SideBar';

const Layout = ({ userRole }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 ">
      <Sidebar userRole={userRole} />

      <main className="flex-1 overflow-y-auto  no-scrollbar">
        <div className="relative p-4 pt-20 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
          <Outlet context={{ userRole }} />
        </div>
      </main>
    </div>
  );
};

export default Layout;
