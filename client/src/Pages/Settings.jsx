import React from 'react';
import AdminSettings from '../Component/AdminSettings';
import EmployeeSettings from '../Component/EmployeeSettings';

const Settings = ({ userRole }) => {
  return (
    <div className=" pb-10 ">
      {/* Global Header */}
      <div className="max-w-4xl mx-auto p-6 mb-4">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm">Manage your account and preferences</p>
      </div>

      {/* Role Logic */}
      {userRole === 'ADMIN' ? <AdminSettings /> : <EmployeeSettings />}
    </div>
  );
};

export default Settings;
