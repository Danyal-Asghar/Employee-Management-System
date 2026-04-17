import React, { useEffect, useState } from 'react';
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from '../assets/assets';
import Loading from '../Component/Loading';
import EmployeeDashboard from '../Component/EmployeeDashboard';
import AdminDashboard from '../Component/AdminDashboard';
import { useOutletContext } from 'react-router-dom';

const Dashboard = () => {
  const { userRole } = useOutletContext();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userRole === "ADMIN") {
      setData(dummyAdminDashboardData);
    } else {
      setData(dummyEmployeeDashboardData);
    }

    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [userRole]);

  if (loading) return <Loading />;

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Failed to load dashboard</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {userRole === "ADMIN" ? (
        <AdminDashboard data={data} />
      ) : (
        <EmployeeDashboard data={data} />
      )}
    </div>
  );
};

export default Dashboard;