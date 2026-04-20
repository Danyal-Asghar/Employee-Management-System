
import React, { useState } from 'react';
import { Plus, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dummyPayslipData } from '../assets/assets';
import GeneratePayslipModal from './GeneratePayslipModal';

const formatCurrency = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(num);
const formatPeriod = (month, year) => new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });

const AdminPayslip = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleGeneratePayslip = (formData) => {
        console.log("Payslip Data:", formData);
        alert("Payslip generated successfully!");
    };

    return (
        <div className="p-8 font-sans">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Payslips</h1>
                    <p className="text-gray-500 text-sm">Generate and manage employee payslips</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all shadow-sm">
                    <Plus size={18} /> Generate Payslip
                </button>
            </div>

            <GeneratePayslipModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onGenerate={handleGeneratePayslip} />

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Employee</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Period</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Basic Salary</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Net Salary</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {dummyPayslipData.map((payslip) => (
                            <tr key={payslip._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm font-medium text-gray-800">{payslip.employee?.firstName} {payslip.employee?.lastName}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{formatPeriod(payslip.month, payslip.year)}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{formatCurrency(payslip.basicSalary)}</td>
                                <td className="px-6 py-4 text-sm font-semibold text-gray-800">{formatCurrency(payslip.netSalary)}</td>
                                <td className="px-6 py-4 text-right">
                                    <button 
                                        onClick={() => navigate(`/print/payslips/${payslip._id}`)}
                                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50"
                                    >
                                        <Download size={14} /> Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPayslip;