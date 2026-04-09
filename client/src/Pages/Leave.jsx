import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { dummyLeaveData } from '../assets/assets';

const Leave = () => {
  const statusStyles = {
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    PENDING: "bg-orange-100 text-orange-800",
  };

  const typeStyles = {
    ANNUAL: "bg-slate-100 text-slate-700",
    CASUAL: "bg-slate-100 text-slate-700",
    SICK: "bg-slate-100 text-slate-700",
  };

  return (
    <div className="min-h-[91vh] p-6 sm:p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-8 py-6 bg-slate-50 border-b">
          <h1 className="text-2xl font-bold text-slate-900">Leave Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage leave applications</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Dates</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {dummyLeaveData.map((leave) => (
                <tr key={leave._id} className="hover:bg-slate-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-slate-900 font-medium">
                    {Array.isArray(leave.employee) 
                      ? leave.employee[0].firstName + ' ' + leave.employee[0].lastName
                      : leave.employee.firstName + ' ' + leave.employee.lastName}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeStyles[leave.type]}`}>
                      {leave.type}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-700 text-sm">
                    {new Date(leave.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(leave.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-slate-700 text-sm">{leave.reason}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[leave.status]}`}>
                      {leave.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    {leave.status === "PENDING" && (
                      <>
                        <button className="p-2 bg-green-100 text-green-600 rounded-md hover:bg-green-200 transition">
                          <CheckIcon className="w-4 h-4" />
                        </button>
                        <button className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition">
                          <XIcon className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 bg-blue-50 border-t text-sm text-slate-600">
          Total Leaves: {dummyLeaveData.length}
        </div>
      </div>
    </div>
  );
};

export default Leave;