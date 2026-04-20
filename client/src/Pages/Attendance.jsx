
import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  AlertCircle,
  LogIn,
  LogOut,
} from 'lucide-react';
import { dummyAttendanceData } from '../assets/assets';

const Attendance = () => {

  // 🔥 ADDING 2 EXTRA DUMMY RECORDS SAFELY
  const extraDummyData = [
    {
      _id: "extra_1",
      employeeId: "69b411e6f8a807df391d7b13",
      date: "2026-04-18T00:00:00.000Z",
      checkIn: "2026-04-18T09:15:00.000Z",
      checkOut: "2026-04-18T17:30:00.000Z",
      status: "PRESENT",
      workingHours: 8.2,
      dayType: "Full Day",
    },
    {
      _id: "extra_2",
      employeeId: "69b411e6f8a807df391d7b13",
      date: "2026-04-19T00:00:00.000Z",
      checkIn: "2026-04-19T09:45:00.000Z",
      checkOut: "2026-04-19T16:45:00.000Z",
      status: "PRESENT",
      workingHours: 7,
      dayType: "Three Quarter Day",
    },
  ];

  const [attendanceRecords, setAttendanceRecords] = useState([
    ...extraDummyData,
    ...dummyAttendanceData,
  ]);

  const [isClockedIn, setIsClockedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  const calculateHours = (start, end) => {
    const diffMs = end - start;
    const diffHrs = diffMs / (1000 * 60 * 60);
    return parseFloat(diffHrs.toFixed(1));
  };

  const handleClockToggle = () => {
    const now = new Date();

    if (!isClockedIn) {
      setIsClockedIn(true);
      setCheckInTime(now);
    } else {
      const newRecord = {
        _id: crypto.randomUUID(),
        employeeId: "current_user",
        date: now.toISOString(),
        checkIn: checkInTime.toISOString(),
        checkOut: now.toISOString(),
        status: "PRESENT",
        workingHours: calculateHours(checkInTime, now),
        dayType: "Full Day",
      };

      setAttendanceRecords((prev) => [newRecord, ...prev]);

      setIsClockedIn(false);
      setCheckInTime(null);
    }
  };

  const stats = useMemo(() => {
    const totalDays = attendanceRecords.length;

    const totalHours = attendanceRecords.reduce(
      (acc, curr) => acc + (curr.workingHours || 0),
      0
    );

    const avgHours =
      totalDays > 0 ? (totalHours / totalDays).toFixed(1) : 0;

    const lateArrivals = attendanceRecords.filter((record) => {
      if (!record.checkIn) return false;

      const checkInDate = new Date(record.checkIn);

      return (
        checkInDate.getHours() > 9 ||
        (checkInDate.getHours() === 9 &&
          checkInDate.getMinutes() > 30)
      );
    }).length;

    return {
      daysPresent: totalDays,
      lateArrivals,
      avgWorkHrs: avgHours,
    };
  }, [attendanceRecords]);

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <div className="pb-24">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Attendance
        </h1>
        <p className="text-slate-500 mt-1 text-lg">
          Track your work hours and daily check-ins
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-4">
          <Calendar className="text-indigo-600" />
          <div>
            <p className="text-sm text-slate-500">Days Present</p>
            <p className="text-2xl font-bold">{stats.daysPresent}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-4">
          <AlertCircle className="text-orange-500" />
          <div>
            <p className="text-sm text-slate-500">Late Arrivals</p>
            <p className="text-2xl font-bold">{stats.lateArrivals}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-4">
          <Clock className="text-green-600" />
          <div>
            <p className="text-sm text-slate-500">Avg Work Hrs</p>
            <p className="text-2xl font-bold">
              {stats.avgWorkHrs} hrs
            </p>
          </div>
        </div>

      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Check In</th>
                <th className="px-6 py-4">Check Out</th>
                <th className="px-6 py-4">Hours</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {attendanceRecords.map((record) => (
                <tr key={record._id} className="border-t">
                  <td className="px-6 py-4">
                    {formatDate(record.date)}
                  </td>
                  <td className="px-6 py-4">
                    {formatTime(record.checkIn)}
                  </td>
                  <td className="px-6 py-4">
                    {record.checkOut
                      ? formatTime(record.checkOut)
                      : "In Progress"}
                  </td>
                  <td className="px-6 py-4">
                    {record.workingHours
                      ? `${record.workingHours} hrs`
                      : "--"}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    {record.status}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Clock Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={handleClockToggle}
          className={`px-6 py-3 rounded-xl text-white font-bold ${
            isClockedIn ? "bg-red-500" : "bg-indigo-600"
          }`}
        >
          {isClockedIn ? (
            <>
              <LogOut className="inline mr-2" />
              Clock Out
            </>
          ) : (
            <>
              <LogIn className="inline mr-2" />
              Clock In
            </>
          )}
        </button>
      </div>

    </div>
  );
};

export default Attendance;