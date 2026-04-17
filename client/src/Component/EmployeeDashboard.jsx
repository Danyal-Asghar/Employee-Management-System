import React from "react";
import {
  CalendarIcon,
  FileTextIcon,
  DollarSignIcon,
  ArrowRightIcon
} from "lucide-react";

const EmployeeDashboard = ({ data }) => {
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
    <div className="animate-fade-in px-4 py-6">
      <h1 className="text-3xl font-bold">
        Welcome, {emp?.firstName}!
      </h1>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {cards.map((c, i) => (
          <div key={i} className={`p-4 rounded-xl text-white bg-gradient-to-r ${c.color}`}>
            <p>{c.title}</p>
            <h2 className="text-2xl font-bold">{c.value}</h2>
            <p className="text-xs opacity-80">{c.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDashboard;