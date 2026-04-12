import React, { useEffect, useState } from 'react';
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from '../assets/assets';
import Loading from '../Component/Loading';
import EmployeeDashboard from '../Component/EmployeeDashboard'; // Ensure default import matches your file
import AdminDashboard from '../Component/AdminDashboard';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // MISTAKE FIX: In a real app, you'd check a user's login status here.
    // For now, let's toggle this or ensure it matches the user you want to test.
    const currentUserRole = "ADMIN"; // Change to "EMPLOYEE" to test the other view

    if (currentUserRole === "ADMIN") {
      setData(dummyAdminDashboardData);
    } else {
      setData(dummyEmployeeDashboardData);
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup timeout if component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;
  
  if (!data) return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-red-500">Failed to load dashboard</p>
    </div>
  );

  return (
    <div className="animate-fade-in">
      {data.role === "ADMIN" ? (
        <AdminDashboard data={data} /> 
      ) : (
        <EmployeeDashboard data={data} />
      )}
    </div>
  );
};

export default Dashboard;