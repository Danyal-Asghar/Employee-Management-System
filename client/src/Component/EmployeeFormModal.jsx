import React, { useState, useEffect } from 'react';
import { X, User, Mail, Briefcase, Building2, ShieldCheck, Phone, Calendar, FileText, DollarSign, MinusCircle, Lock } from 'lucide-react';

const EmployeeFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    joinDate: '',
    bio: '',
    department: '',
    position: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    email: '',
    role: 'EMPLOYEE'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName || '',
        lastName: initialData.lastName || '',
        phone: initialData.phone || '',
        joinDate: initialData.joinDate ? initialData.joinDate.split('T')[0] : '',
        bio: initialData.bio || '',
        department: initialData.department || '',
        position: initialData.position || '',
        basicSalary: initialData.basicSalary || '',
        allowances: initialData.allowances || '',
        deductions: initialData.deductions || '',
        email: initialData.email || '',
        role: initialData.role || 'EMPLOYEE'
      });
    } else {
      setFormData({
        firstName: '', lastName: '', phone: '', joinDate: '', bio: '',
        department: '', position: '', basicSalary: '', allowances: '',
        deductions: '', email: '', role: 'EMPLOYEE'
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const InputField = ({ label, name, type = "text", icon: Icon, placeholder, colSpan = "col-span-1" }) => (
    <div className={`${colSpan} space-y-1`}>
      <label className="text-xs font-semibold text-slate-500 uppercase ml-1">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />}
        <input
          required={label !== 'Bio (Optional)'}
          name={name}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all text-sm`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h2 className="text-xl font-bold text-slate-800">{initialData ? 'Edit Employee' : 'Add New Employee'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto space-y-6 custom-scrollbar">
          <section>
            <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="First Name" name="firstName" placeholder="Alex" icon={User} />
              <InputField label="Last Name" name="lastName" placeholder="Matthew" icon={User} />
              <InputField label="Phone" name="phone" placeholder="9000000001" icon={Phone} />
              <InputField label="Join Date" name="joinDate" type="date" icon={Calendar} />
              <div className="col-span-2"><InputField label="Bio (Optional)" name="bio" placeholder="Brief description..." icon={FileText} /></div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4">Employment Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Department</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <select name="department" value={formData.department} onChange={handleChange} className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none appearance-none text-sm">
                    <option value="">Select Dept</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="IT Support">IT Support</option>
                    <option value="Customer Success">Customer Success</option>
                    <option value="Product Management">Product Management</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
              </div>
              <InputField label="Position" name="position" placeholder="Software Developer" icon={Briefcase} />
              <InputField label="Basic Salary" name="basicSalary" type="number" placeholder="2000" icon={DollarSign} />
              <InputField label="Allowances" name="allowances" type="number" placeholder="100" icon={DollarSign} />
              <InputField label="Deductions" name="deductions" type="number" placeholder="20" icon={MinusCircle} />
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase ml-1">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-indigo-600 uppercase tracking-wider mb-4">Account Setup</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2"><InputField label="Work Email" name="email" type="email" placeholder="alex@example.com" icon={Mail} /></div>
              <InputField label="Password" name="password" type="password" placeholder="Optional" icon={Lock} />
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase ml-1">System Role</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <select name="role" value={formData.role} onChange={handleChange} className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 outline-none appearance-none text-sm">
                    <option value="EMPLOYEE">Employee</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </div>
            </div>
          </section>
        </form>

        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
          <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl font-semibold hover:bg-white transition-all">Cancel</button>
          <button type="submit" onClick={handleSubmit} className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
            {initialData ? 'Update Employee' : 'Add Employee'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeFormModal;