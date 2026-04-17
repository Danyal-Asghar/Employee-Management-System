import React, { useState } from 'react';
import { Plus, Thermometer, CloudRain, Flower2, User } from 'lucide-react';
import { dummyLeaveData } from '../assets/assets';

// Fixed import path based on your VS Code screenshot!
import ApplyLeaveModal from './ApplyLeaveModal';

const LeaveSummaryCard = ({ icon: Icon, title, count, colorClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-slate-900">{count} <span className="text-sm font-normal text-slate-400">taken</span></p>
    </div>
  </div>
);

const LeaveEmployee = ({ userRole }) => {
  // Added state back in to control the data and the modal
  const[leaves, setLeaves] = useState(dummyLeaveData || []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const countLeaves = (type) =>
    leaves.filter((l) => l.type === type && l.status === "APPROVED").length;

  const handleAddLeave = (newLeave) => {
    setLeaves([newLeave, ...leaves]);
  };

  return (
    <div className="min-h-[91vh] p-6 sm:p-10 ">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
               <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">My Leave History</h1>
              <p className="text-slate-500">Track your personal leave requests and approvals</p>
            </div>
          </div>

          {/* CHANGED THIS FROM <Link> TO A REAL BUTTON */}
          <button 
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Apply for Leave
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <LeaveSummaryCard icon={Thermometer} title="Sick Leave" count={countLeaves("SICK")} colorClass="bg-red-50 text-red-600" />
          <LeaveSummaryCard icon={CloudRain} title="Casual Leave" count={countLeaves("CASUAL")} colorClass="bg-blue-50 text-blue-600" />
          <LeaveSummaryCard icon={Flower2} title="Annual Leave" count={countLeaves("ANNUAL")} colorClass="bg-emerald-50 text-emerald-600" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50/50">
                <tr>
                  {["TYPE", "DATES", "REASON", "STATUS"].map((h) => (
                    <th key={h} className="px-8 py-4 text-left text-xs font-bold text-slate-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leaves.map((leave) => (
                  <tr key={leave._id || Math.random()} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 uppercase">{leave.type}</span>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-600">
                      {new Date(leave.startDate).toLocaleDateString()} — {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-600">{leave.reason}</td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        leave.status === "APPROVED" ? "bg-green-50 text-green-600" : 
                        leave.status === "REJECTED" ? "bg-red-50 text-red-600" : "bg-orange-50 text-orange-600"
                      }`}>
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RENDER THE MODAL AT THE BOTTOM */}
      <ApplyLeaveModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddLeave} 
      />
    </div>
  );
};

export default LeaveEmployee;