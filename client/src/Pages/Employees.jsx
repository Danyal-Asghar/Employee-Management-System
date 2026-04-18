
import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { dummyEmployeeData, DEPARTMENTS } from '../assets/assets'; // Using your DEPARTMENTS
import EmployeeCard from '../Component/EmployeeCard'; 
import EmployeeFormModal from '../Component/EmployeeFormModal';

const Employee = () => {
  const [employees, setEmployees] = useState(dummyEmployeeData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // --- CRUD LOGIC ---
  const handleSaveEmployee = (formData) => {
    if (editingEmployee) {
      setEmployees(employees.map(emp => 
        emp._id === editingEmployee._id ? { ...emp, ...formData } : emp
      ));
    } else {
      const newEmployee = {
        ...formData,
        _id: crypto.randomUUID()
      };
      setEmployees([newEmployee, ...employees]);
    }
    setIsModalOpen(false);
    setEditingEmployee(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this employee?")) {
      setEmployees(employees.filter(emp => emp._id !== id));
    }
  };

  const openAddModal = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const openEditModal = (emp) => {
    setEditingEmployee(emp);
    setIsModalOpen(true);
  };

  // --- FILTER LOGIC ---
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch = `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === "All Departments" || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="min-h-[91vh] p-6 sm:p-10 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Employees</h1>
            <p className="text-slate-500">Manage your team members</p>
          </div>
          <button 
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all shadow-lg shadow-indigo-100"
          >
            <Plus size={20} />
            Add Employee
          </button>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="sm:w-64">
            <select 
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer text-slate-600 font-medium"
            >
              <option value="All Departments">All Departments</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* GRID */}
        {filteredEmployees.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEmployees.map((emp) => (
              <EmployeeCard 
                key={emp._id} 
                emp={emp} 
                onEdit={openEditModal} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-slate-300" size={32} />
            </div>
            <h3 className="text-lg font-medium text-slate-900">No employees found</h3>
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* MODAL */}
        <EmployeeFormModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSaveEmployee}
          initialData={editingEmployee}
        />

      </div>
    </div>
  );
};

export default Employee;