import React, { useEffect, useState } from 'react';
import { dummyAdminDashboardData, dummyEmployeeDashboardData } from '../assets/assets';
import Loading from '../Component/Loading';
import { EmployeeDashboard } from '../Component/EmployeeDashboard';
import AdminDashboard from '../Component/AdminDashboard';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(dummyEmployeeDashboardData);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loading />
  if (!data) return <p>Failed to load dashboard</p>;

  if (data.role === "ADMIN") {
    return <AdminDashboard />
  } else {
    return <EmployeeDashboard data={data}/> 
  }
};

export default Dashboard;