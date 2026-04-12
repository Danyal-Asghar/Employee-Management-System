import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { dummyEmployeeData, DEPARTMENTS } from '../assets/assets'
import EmployeeCard from '../Component/EmployeeCard' // <--- New Import
import {
  Plus,
  Search,
  X,
} from 'lucide-react'

const defaultFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  joinDate: '',
  bio: '',
  department: 'Engineering',
  position: '',
  basicSalary: 0,
  allowances: 0,
  deductions: 0,
  email: '',
  password: '',
  role: 'EMPLOYEE',
}

const Employees = () => {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedDept, setSelectedDept] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [formData, setFormData] = useState(defaultFormData)

  const fetchEmployees = useCallback(async () => {
    setLoading(true)
    setTimeout(() => {
      setEmployees(dummyEmployeeData)
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const fullName = `${emp?.firstName ?? ''} ${emp?.lastName ?? ''}`.toLowerCase()
      const query = search.toLowerCase()
      const matchesSearch = fullName.includes(query) || emp?.email?.toLowerCase().includes(query)
      const matchesDept = !selectedDept || emp.department === selectedDept
      return matchesSearch && matchesDept
    })
  }, [employees, search, selectedDept])

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingEmployee(null)
    setFormData(defaultFormData)
  }

  const openModal = (employee = null) => {
    if (employee) {
      setEditingEmployee(employee)
      setFormData({ ...defaultFormData, ...employee })
    } else {
      setEditingEmployee(null)
      setFormData(defaultFormData)
    }
    setIsModalOpen(true)
  }

  const handleDelete = useCallback((id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return
    setEmployees((prev) => prev.filter((emp) => emp._id !== id))
  }, [])

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp._id === editingEmployee._id ? { ...emp, ...formData } : emp))
      )
    } else {
      const newEmployee = { ...formData, _id: crypto.randomUUID(), employmentStatus: 'ACTIVE' }
      setEmployees((prev) => [newEmployee, ...prev])
    }
    closeModal()
  }

  // Helper components for the Modal
  const FormSection = ({ title, children }) => (
    <div className="mb-8">
      <h3 className="text-base font-semibold text-slate-800 mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  )

  const InputField = ({ label, type = "text", value, onChange, placeholder, required = false, fullWidth = false }) => (
    <div className={`${fullWidth ? 'md:col-span-2' : ''}`}>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
      />
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Employees</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your team members and departments</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-indigo-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2 hover:bg-indigo-700 shadow-sm transition-all"
        >
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-col md:flex-row gap-4">
        <div className="relative flex-[4]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search employees by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-sm rounded-2xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        <div className="flex-[1] min-w-[180px]">
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full py-4 px-4 text-sm rounded-2xl border border-slate-200 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
          >
            <option value="">Department</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content - Using the new EmployeeCard component */}
      {loading ? (
        <div className="text-center py-20 text-slate-500">Loading employees...</div>
      ) : filteredEmployees.length === 0 ? (
        <div className="text-center py-20 text-slate-400 text-lg">No employees found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((emp) => (
            <EmployeeCard 
              key={emp._id} 
              emp={emp} 
              onEdit={() => openModal(emp)} 
              onDelete={() => handleDelete(emp._id)} 
            />
          ))}
        </div>
      )}

      {/* Modal (Remains the same as previous response) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[32px] w-full max-w-2xl my-8 shadow-2xl overflow-hidden">
            <div className="px-8 pt-8 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {editingEmployee ? 'Update employee profile details' : 'Create a user account and employee profile'}
                  </p>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400">
                  <X size={24} />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="px-8 pb-8">
              <div className="max-h-[70vh] overflow-y-auto pr-2">
                <FormSection title="Personal Information">
                  <InputField label="First Name" required value={formData.firstName} onChange={handleInputChange} placeholder="e.g. John" />
                  <InputField label="Last Name" required value={formData.lastName} onChange={handleInputChange} placeholder="e.g. Doe" />
                  <InputField label="Phone Number" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 000-0000" />
                  <InputField label="Join Date" type="date" value={formData.joinDate} onChange={handleInputChange} />
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bio (Optional)</label>
                    <textarea
                      rows="3"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Brief description..."
                      className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </FormSection>

                <FormSection title="Employment Details">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    >
                      {DEPARTMENTS.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <InputField label="Position" value={formData.position} onChange={handleInputChange} placeholder="e.g. Software Engineer" />
                  <InputField label="Basic Salary" type="number" value={formData.basicSalary} onChange={handleInputChange} placeholder="0" />
                  <InputField label="Allowances" type="number" value={formData.allowances} onChange={handleInputChange} placeholder="0" />
                  <InputField label="Deductions" type="number" value={formData.deductions} onChange={handleInputChange} placeholder="0" />
                </FormSection>

                <FormSection title="Account Setup">
                  <InputField label="Work Email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="john@company.com" />
                  <InputField label="Temporary Password" type="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" />
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">System Role</label>
                    <select
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="w-full border border-slate-200 p-2.5 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                    >
                      <option value="EMPLOYEE">Employee</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                </FormSection>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-all">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-all">
                  {editingEmployee ? 'Update Employee' : 'Create Employee'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Employees