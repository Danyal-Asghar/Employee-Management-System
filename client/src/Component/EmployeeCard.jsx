import React from 'react';
import { Briefcase, Mail, Pencil, Trash2 } from 'lucide-react';

const EmployeeCard = ({ emp, onEdit, onDelete }) => {
  return (
    <div className="group relative p-6 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Hover Actions */}
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents any accidental click bubbling
            onEdit();
          }}
          className="p-2 rounded-full border bg-white shadow-sm hover:bg-slate-50 text-slate-600"
          title="Edit Employee"
        >
          <Pencil size={14} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 rounded-full border bg-white shadow-sm hover:bg-slate-50 text-red-500"
          title="Delete Employee"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-700 text-lg">
          {emp?.firstName?.[0] ?? ''}
          {emp?.lastName?.[0] ?? ''}
        </div>

        <div>
          <h3 className="font-bold text-slate-800 text-lg">
            {emp.firstName} {emp.lastName}
          </h3>
          <p className="text-xs uppercase text-indigo-500 font-semibold tracking-wide">
            {emp.department}
          </p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Briefcase size={14} />
          {emp.position}
        </div>

        <div className="flex items-center gap-2">
          <Mail size={14} />
          {emp.email}
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;