import { ArrowRightIcon, CalendarIcon, DollarSignIcon, FileTextIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const EmployeeDashboard = ({ data }) => {
  const emp = data.employee;
  const cards = [
    {
      icon: CalendarIcon,
      value: data.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This month",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting approval",
      color: "from-yellow-400 to-yellow-500",
    },
    {
      icon: DollarSignIcon,
      value: data.latestPayslip?.netSalary
        ? `$${data.latestPayslip.netSalary.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Most recent payout",
      color: "from-green-400 to-green-600",
    },
  ];

  return (
    <div className="animate-fade-in px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="page-header mb-8">
        <h1 className="page-title text-3xl sm:text-4xl font-extrabold text-slate-900">
          Welcome, {emp?.firstName}!
        </h1>
        <p className="page-subtitle text-slate-600 mt-1 sm:mt-2">
          {emp?.position} - {emp?.department || "No Department"}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={`relative flex items-center justify-between p-6 overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-r ${card.color} text-white group`}
            >
              {/* Left glow bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/50 rounded-r-full" />

              {/* Card text */}
              <div>
                <p className="text-sm font-medium opacity-80">{card.title}</p>
                <p className="text-2xl sm:text-3xl font-bold mt-1">{card.value}</p>
                <p className="text-xs opacity-70 mt-1">{card.subtitle}</p>
              </div>

              {/* Icon */}
              <Icon className="w-12 h-12 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/attendance"
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 font-medium"
        >
          Mark Attendance
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
        <Link
          to="/Leave"
          className="flex items-center justify-center px-6 py-3 border-2 border-indigo-500 text-indigo-500 rounded-lg shadow-sm hover:bg-indigo-50 transition-all duration-300 font-medium"
        >
          Apply for Leave
        </Link>
      </div>
    </div>
  );
};