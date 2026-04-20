
import React from 'react';
import { useParams } from 'react-router-dom';
import { dummyPayslipData } from '../assets/assets';

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

const PrintPaySlips = () => {
    const { id } = useParams();
    const payslip = dummyPayslipData.find((p) => p._id === id);

    if (!payslip) {
        return <div className="flex items-center justify-center h-screen text-xl font-semibold">Payslip not found.</div>;
    }

    const { employee, basicSalary, allowances, deductions, netSalary, month, year } = payslip;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-100 py-16 px-4 print:bg-white print:p-0 print:py-0">
            
            {/* The Document Container */}
            <div className="max-w-3xl mx-auto bg-white shadow-2xl print:shadow-none print:border-none print:max-w-full print:m-0 overflow-hidden">
                
                {/* 1. Top Decorative Bar */}
                <div className="h-1.5 bg-indigo-600 w-full"></div>

                <div className="p-12 print:p-10">
                    
                    {/* 2. Header Section */}
                    <div className="flex justify-between items-start mb-16">
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 tracking-tighter">PAYSLIP</h1>
                            <p className="text-indigo-600 font-bold text-lg mt-1">{formatPeriod(month, year)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Document ID</p>
                            <p className="text-sm font-mono text-gray-600">{payslip._id.slice(-8).toUpperCase()}</p>
                        </div>
                    </div>

                    {/* 3. Employee Details Grid */}
                    <div className="grid grid-cols-2 gap-x-16 gap-y-10 mb-16">
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Employee Name</label>
                            <p className="text-lg font-bold text-gray-800">{employee?.firstName} {employee?.lastName}</p>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Position</label>
                            <p className="text-lg font-semibold text-gray-700">{employee?.position}</p>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email Address</label>
                            <p className="text-md text-gray-600">{employee?.email}</p>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Pay Period</label>
                            <p className="text-md text-gray-600">{formatPeriod(month, year)}</p>
                        </div>
                    </div>

                    {/* 4. Financial Table Section */}
                    <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                <tr>
                                    <td className="px-6 py-5 text-gray-700 font-medium">Basic Salary</td>
                                    <td className="px-6 py-5 text-gray-900 text-right font-semibold">${basicSalary.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-5 text-gray-700 font-medium">Total Allowances</td>
                                    <td className="px-6 py-5 text-green-600 text-right font-bold">+${allowances.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-5 text-gray-700 font-medium">Total Deductions</td>
                                    <td className="px-6 py-5 text-red-600 text-right font-bold">-${deductions.toLocaleString()}</td>
                                </tr>
                                <tr className="bg-blue-50/50">
                                    <td className="px-6 py-6 text-blue-900 font-black text-xl">Net Salary</td>
                                    <td className="px-6 py-6 text-blue-900 font-black text-2xl text-right">${netSalary.toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* 5. Footer Note */}
                    <div className="mt-20 text-center">
                        <p className="text-gray-400 text-[11px] italic">This is a computer-generated document. No signature is required.</p>
                    </div>
                </div>
            </div>

            {/* 6. Print Button (Hidden during print) */}
            <div className="mt-12 flex justify-center print:hidden">
                <button
                    onClick={handlePrint}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl transition-all active:scale-95"
                >
                    Print Payslip
                </button>
            </div>

            {/* 7. Print Optimization Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page { 
                        margin: 0; 
                        size: auto; 
                    }
                    html, body { 
                        background-color: white !important; 
                        margin: 0 !important; 
                        padding: 0 !important;
                        overflow: visible !important;
                    }
                    .print\\:hidden { 
                        display: none !important; 
                    }
                    .print\\:shadow-none { 
                        box-shadow: none !important; 
                    }
                    .print\\:border-none { 
                        border: none !important; 
                    }
                    .print\\:max-w-full { 
                        max-width: 100% !important; 
                    }
                    .print\\:p-0 { 
                        padding: 0 !important; 
                    }
                    .print\\:m-0 { 
                        margin: 0 !important; 
                    }
                }
            `}} />
        </div>
    );
};

export default PrintPaySlips;