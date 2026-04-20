

import React from 'react';
import { Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { dummyPayslipData, dummyProfileData } from '../assets/assets';

const formatCurrency = (num) =>
new Intl.NumberFormat('en-US', {
style: 'currency',
currency: 'USD',
minimumFractionDigits: 0,
}).format(num);

const formatPeriod = (month, year) =>
new Date(year, month - 1).toLocaleString('default', {
month: 'long',
year: 'numeric',
});

const EmployeePayslip = () => {
const navigate = useNavigate();


const currentUserId = dummyProfileData._id;

const myPayslips = dummyPayslipData.filter(
    (p) => String(p.employeeId) === String(currentUserId)
);

// 🔥 PROOF TEST FUNCTION
const handleDownload = (id) => {
    console.log("🔥 BUTTON CLICKED");
    console.log("Navigating to:", `/print/payslips/${id}`);

    alert("CLICK WORKS - BUTTON IS ACTIVE");

    navigate(`/print/payslips/${id}`);
};

return (
    <div className="p-8 font-sans">
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Payslips</h1>
            <p className="text-gray-500 text-sm">Your payslip history</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Period
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Basic Salary
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Net Salary
                        </th>
                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {myPayslips.length > 0 ? (
                        myPayslips.map((payslip) => (
                            <tr key={payslip._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {formatPeriod(payslip.month, payslip.year)}
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {formatCurrency(payslip.basicSalary)}
                                </td>

                                <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                                    {formatCurrency(payslip.netSalary)}
                                </td>

                                <td className="px-6 py-4 text-right">
                                    {/* 🔥 PROOF TEST BUTTON */}
                                    <button
                                        onClick={() => handleDownload(payslip._id)}
                                        className="relative z-50 cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors"
                                    >
                                        <Download size={14} /> Download
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center py-6 text-gray-500 text-sm">
                                No payslips found for this employee
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

};

export default EmployeePayslip;
