import React from "react";
import {
  Users,
  Building2,
  CalendarCheck,
  FileClock,
  TrendingUp,
} from "lucide-react";

import {
  dummyAdminDashboardData,
  performanceOverviewData,
} from "../assets/assets";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const DashboardCard = ({ title, value, icon: Icon, subtitle }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 p-5">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="text-3xl font-bold text-slate-800 mt-2">
            {value}
          </h2>

          <div className="flex items-center gap-1 mt-3">
            <TrendingUp size={14} className="text-green-500" />
            <span className="text-xs text-green-600 font-medium">
              {subtitle}
            </span>
          </div>
        </div>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const data = dummyAdminDashboardData;

  const cards = [
    {
      title: "Total Employees",
      value: data.totalEmployees,
      icon: Users,
      subtitle: "+12% this month",
    },
    {
      title: "Departments",
      value: data.totalDepartments,
      icon: Building2,
      subtitle: "Stable growth",
    },
    {
      title: "Today's Attendance",
      value: data.todayAttendance,
      icon: CalendarCheck,
      subtitle: "85% present",
    },
    {
      title: "Pending Leaves",
      value: data.pendingLeaves,
      icon: FileClock,
      subtitle: "Needs review",
    },
  ];

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-slate-500 mt-2">
          Welcome back 👋 Here’s your premium workforce overview
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            subtitle={card.subtitle}
          />
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        {/* Performance Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Performance Overview
          </h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceOverviewData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="attendance"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Quick Insights
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-indigo-50">
              <p className="text-sm text-slate-500">Leaves Pending</p>
              <h3 className="text-xl font-bold text-slate-800">
                {data.pendingLeaves}
              </h3>
            </div>

            <div className="p-4 rounded-xl bg-green-50">
              <p className="text-sm text-slate-500">Attendance Rate</p>
              <h3 className="text-xl font-bold text-slate-800">85%</h3>
            </div>

            <div className="p-4 rounded-xl bg-orange-50">
              <p className="text-sm text-slate-500">Departments Active</p>
              <h3 className="text-xl font-bold text-slate-800">
                {data.totalDepartments}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;