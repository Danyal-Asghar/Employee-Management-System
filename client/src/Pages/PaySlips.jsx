
import React from "react";
import { useOutletContext } from 'react-router-dom';
import { Download } from 'lucide-react';
import { dummyPayslipData, dummyEmployeeData } from '../assets/assets';
import AdminPayslip from '../Component/AdminPayslip';
import EmployeePayslip from '../Component/EmployeePayslip';

const formatCurrency = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(num);
const formatPeriod = (month, year) => new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });

const PaySlips = () => {
    // This grabs the userRole from the <Layout /> component via the Outlet context
    const { userRole } = useOutletContext(); 

    const currentUserId = dummyEmployeeData[0]._id; 
    const myPayslips = dummyPayslipData.filter(p => p.employeeId === currentUserId);

    return (
        <div className="p-8 font-sans">
            <div className="mb-8">
  {userRole !== "ADMIN" && (
    <>
      <h1 className="text-2xl font-bold text-gray-900">Payslips</h1>
      <p>Your monthly salary statements</p>
    </>
  )}
</div>

            {/* Conditional Rendering based on Role */}
            {userRole === "ADMIN" ? (
                <AdminPayslip userRole={userRole} />
            ) : (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Period</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Basic Salary</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Net Salary</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {myPayslips.map((payslip) => (
                                <tr key={payslip._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-500">{formatPeriod(payslip.month, payslip.year)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{formatCurrency(payslip.basicSalary)}</td>
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">{formatCurrency(payslip.netSalary)}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors">
                                            <Download size={14} /> Download
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaySlips;