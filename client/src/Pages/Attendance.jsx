import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar, 
  Clock, 
  AlertCircle, 
  LogIn, 
  LogOut, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
// Importing your existing dummy data and helpers
import { dummyAttendanceData } from '../assets/assets';

const Attendance = () => {
  // --- STATE MANAGEMENT ---
  
  // We initialize our records with your dummy data
  const [attendanceRecords, setAttendanceRecords] = useState(dummyAttendanceData);
  
  // tracks if the user is currently "at work"
  const [isClockedIn, setIsClockedIn] = useState(false);
  
  // Stores the timestamp of when the user clicked "Clock In"
  const [checkInTime, setCheckInTime] = useState(null);

  // --- LOGIC: CLOCK IN / CLOCK OUT ---

  const handleClockToggle = () => {
    const now = new Date();

    if (!isClockedIn) {
      // ACTION: CLOCK IN
      setIsClockedIn(true);
      setCheckInTime(now);
      console.log("Clocked in at:", now.toLocaleTimeString());
    } else {
      // ACTION: CLOCK OUT
      const newRecord = {
        _id: crypto.randomUUID(),
        employeeId: "current_user_id", // Mock ID
        date: now.toISOString(),
        checkIn: checkInTime.toISOString(),
        checkOut: now.toISOString(),
        status: "PRESENT",
        workingHours: calculateHours(checkInTime, now),
        dayType: "Full Day",
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };

      // Add the completed session to the top of the list
      setAttendanceRecords((prev) => [newRecord, ...prev]);
      
      // Reset Clock-in state
      setIsClockedIn(false);
      setCheckInTime(null);
    }
  };

  // Helper to calculate difference between two dates in hours
  const calculateHours = (start, end) => {
    const diffMs = end - start;
    const diffHrs = diffMs / (1000 * 60 * 60);
    return parseFloat(diffHrs.toFixed(1));
  };

  // --- LOGIC: CALCULATE STATISTICS ---
  // We use useMemo so these numbers only re-calculate when records change
  const stats = useMemo(() => {
    const totalDays = attendanceRecords.length;
    
    // Calculate Average Working Hours
    const totalHours = attendanceRecords.reduce((acc, curr) => acc + (curr.workingHours || 0), 0);
    const avgHours = totalDays > 0 ? (totalHours / totalDays).toFixed(1) : 0;

    // Calculate Late Arrivals (Mock logic: if check-in is after 09:30 AM)
    const lateArrivals = attendanceRecords.filter(record => {
      const checkInDate = new Date(record.checkIn);
      return checkInDate.getHours() > 9 || (checkInDate.getHours() === 9 && checkInDate.getMinutes() > 30);
    }).length;

    return {
      daysPresent: totalDays,
      lateArrivals: lateArrivals,
      avgWorkHrs: avgHours
    };
  }, [attendanceRecords]);

  // --- UTILITY: FORMATTING ---
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24">
      {/* 1. HEADER SECTION */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Attendance</h1>
        <p className="text-slate-500 mt-1 text-lg">Track your work hours and daily check-ins</p>
      </div>

      {/* 2. STATS CARDS SECTION */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Card: Days Present */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 transition-all hover:shadow-md">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Calendar size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Days Present</p>
            <p className="text-3xl font-bold text-slate-800">{stats.daysPresent}</p>
          </div>
        </div>

        {/* Card: Late Arrivals */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 transition-all hover:shadow-md">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600">
            <AlertCircle size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Late Arrivals</p>
            <p className="text-3xl font-bold text-slate-800">{stats.lateArrivals}</p>
          </div>
        </div>

        {/* Card: Avg Work Hrs */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-5 transition-all hover:shadow-md">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Avg. Work Hrs</p>
            <p className="text-3xl font-bold text-slate-800">{stats.avgWorkHrs} <span className="text-lg font-normal text-slate-400">Hrs</span></p>
          </div>
        </div>
      </div>

      {/* 3. RECENT ACTIVITY TABLE */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-slate-50">
            <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-slate-400 text-xs uppercase tracking-widest bg-slate-50/50">
                  <th className="px-8 py-4 font-semibold">Date</th>
                  <th className="px-8 py-4 font-semibold">Check In</th>
                  <th className="px-8 py-4 font-semibold">Check Out</th>
                  <th className="px-8 py-4 font-semibold">Working Hours</th>
                  <th className="px-8 py-4 font-semibold">Day Type</th>
                  <th className="px-8 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {attendanceRecords.map((record) => (
                  <tr key={record._id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5 text-sm font-medium text-slate-700">
                      {formatDate(record.date)}
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-600">
                      {formatTime(record.checkIn)}
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-600">
                      {record.checkOut ? formatTime(record.checkOut) : <span className="text-orange-400 italic">In Progress...</span>}
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-600 font-medium">
                      {record.workingHours ? `${record.workingHours}h 0m` : '--'}
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600">
                        {record.dayType || 'Full Day'}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${record.status === 'PRESENT' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                        <span className={`text-sm font-bold ${record.status === 'PRESENT' ? 'text-emerald-600' : 'text-slate-500'}`}>
                          {record.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. FLOATING ACTION BUTTON (CLOCK IN/OUT) */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={handleClockToggle}
          className={`
            group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white shadow-2xl transition-all duration-300 active:scale-95
            ${isClockedIn 
              ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-200' 
              : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
            }
          `}
        >
          {isClockedIn ? (
            <>
              <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
              <span>Clock Out</span>
            </>
          ) : (
            <>
              <LogIn size={22} className="group-hover:translate-x-1 transition-transform" />
              <span>Clock In</span>
            </>
          )}

          {/* Tooltip/Subtext inside button */}
          <span className="absolute -top-12 right-0 bg-slate-800 text-white text-[10px] px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isClockedIn ? 'End your work day' : 'Start your work day'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Attendance;
