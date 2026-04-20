
import React from 'react';
import { User, Save } from 'lucide-react'; // Removed Lock as it's now in PasswordCard
import PasswordCard from './PasswordCard'; // Import the reusable component

const EmployeeSettings = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 space-y-6 no-scrollbar ">
      {/* Public Profile Card */}
      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <User size={20} className="text-slate-400" />
          <h2 className="text-lg font-semibold text-slate-800">Public Profile</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input type="email" placeholder="johndoe@example.com" className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Position</label>
            <input type="text" className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Bio</label>
            <textarea placeholder="Write a brief bio..." rows={4} className="w-full bg-slate-50 border-none rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
            <p className="text-xs text-slate-400">This will be displayed on your profile.</p>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-all">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      {/* REPLACED: Manual Password Card replaced with Component */}
      <PasswordCard />
    </div>
  );
};

export default EmployeeSettings;
