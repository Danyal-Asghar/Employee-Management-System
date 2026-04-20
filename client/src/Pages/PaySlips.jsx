
import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Download } from "lucide-react";
import { dummyPayslipData, dummyEmployeeData } from "../assets/assets";
import AdminPayslip from "../Component/AdminPayslip";

const formatCurrency = (num) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(num);

const formatPeriod = (month, year) =>
  new Date(year, month - 1).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

const PaySlips = () => {
  const navigate = useNavigate();
  const { userRole } = useOutletContext();

  // 🔥 FIX: correct logged-in employee (use John for now)
  const currentUserId = "69b411e6f8a807df391d7b13";

  const myPayslips = dummyPayslipData.filter(
    (p) => p.employeeId === currentUserId
  );

  return (
   <div className="p-8 font-sans">
  {userRole === "ADMIN" ? (
    <AdminPayslip />
  ) : (
    <>
      <h1 className="text-2xl font-bold mb-6">Payslips</h1>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left">Period</th>
              <th className="p-4 text-left">Basic</th>
              <th className="p-4 text-left">Net</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {myPayslips.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No payslips found
                </td>
              </tr>
            ) : (
              myPayslips.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-4">
                    {formatPeriod(p.month, p.year)}
                  </td>
                  <td className="p-4">
                    {formatCurrency(p.basicSalary)}
                  </td>
                  <td className="p-4 font-semibold">
                    {formatCurrency(p.netSalary)}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() =>
                        navigate(`/print/payslips/${p._id}`)
                      }
                      className="inline-flex items-center gap-2 px-3 py-1 border rounded hover:bg-blue-50 text-blue-600"
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  )}
</div>
  );
};

export default PaySlips;