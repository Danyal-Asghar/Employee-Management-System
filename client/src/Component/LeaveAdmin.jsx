
import React, { useState } from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { dummyLeaveData } from '../assets/assets';

const LeaveAdmin = () => {
  // We use state so that when the admin clicks Approve/Reject, the UI updates immediately
  const [leaves, setLeaves] = useState(dummyLeaveData);

  const statusStyles = {
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    PENDING: "bg-orange-100 text-orange-800",
  };

  const typeStyles = {
    ANNUAL: "bg-blue-100 text-blue-700",
    CASUAL: "bg-indigo-100 text-indigo-700",
    SICK: "bg-red-100 text-red-700",
  };

  // The function that makes the buttons actually work
  const handleStatusChange = (id, newStatus) => {
    setLeaves((prev) =>
      prev.map((l) => (l._id === id ? { ...l, status: newStatus } : l))
    );
  };

  return (
    <div className="min-h-[91vh] p-6 sm:p-10 ">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Leave Management</h1>
          <p className="text-slate-500">Review and approve employee leave requests</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  {["EMPLOYEE", "TYPE", "DATES", "REASON", "STATUS", "ACTIONS"].map((head) => (
                    <th key={head} className="px-6 py-4 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {leaves.map((leave) => (
                  <tr key={leave._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-slate-900 font-medium">
                      {/* Safe check for employee object structure */}
                      {Array.isArray(leave.employee) 
                        ? `${leave.employee[0].firstName} ${leave.employee[0].lastName}`
                        : `${leave.employee?.firstName} ${leave.employee?.lastName}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${typeStyles[leave.type] || 'bg-slate-100'}`}>
                        {leave.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 text-sm">
                      {new Date(leave.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(leave.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 text-sm">{leave.reason}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusStyles[leave.status]}`}>
                        {leave.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {leave.status === "PENDING" && (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleStatusChange(leave._id, "APPROVED")}
                            className="p-1.5 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition"
                            title="Approve"
                          >
                            <CheckIcon className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(leave._id, "REJECTED")}
                            className="p-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition"
                            title="Reject"
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveAdmin;