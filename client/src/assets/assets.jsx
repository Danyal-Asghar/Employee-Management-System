
export const DEPARTMENTS = [
"Engineering",
"Human Resources",
"Marketing",
"Sales",
"Finance",
"Operations",
"IT Support",
"Customer Success",
"Product Management",
"Design"
];

export const dummyAdminDashboardData = {
role: "ADMIN",
totalEmployees: 3,
totalDepartments: 10,
todayAttendance: 1,
pendingLeaves: 1,
};

export const dummyEmployeeDashboardData = {
currentMonthAttendance: 20,
pendingLeaves: 2,
latestPayslip: {
netSalary: 2000,
},
employee: {
firstName: "John",
lastName: "Doe",
position: "Software Engineer",
department: "Engineering",
},
};

export const dummyProfileData = {
_id: "69b411e6f8a807df391d7b13",
firstName: "John",
lastName: "Doe",
email: "[johndoe@example.com](mailto:johndoe@example.com)",
image: null,
};

export const dummyEmployeeData = [
{
_id: "emp1",
userId: { _id: "u1", email: "[david@example.com](mailto:david@example.com)", role: "EMPLOYEE" },
department: "IT Support",
firstName: "David",
lastName: "Michael",
email: "[david@example.com](mailto:david@example.com)",
position: "Associate Business Support",
},
{
_id: "emp2",
userId: { _id: "u2", email: "[alex@example.com](mailto:alex@example.com)", role: "EMPLOYEE" },
department: "Engineering",
firstName: "Alex",
lastName: "Matthew",
email: "[alex@example.com](mailto:alex@example.com)",
position: "Software Developer",
},
{
_id: "69b411e6f8a807df391d7b13",
userId: { _id: "u3", email: "[johndoe@example.com](mailto:johndoe@example.com)", role: "EMPLOYEE" },
department: "Engineering",
firstName: "John",
lastName: "Doe",
email: "[johndoe@example.com](mailto:johndoe@example.com)",
position: "Senior Software Developer",
},
];

export const dummyPayslipData = [
{
_id: "ps1",
employeeId: "69b411e6f8a807df391d7b13",
employee: dummyEmployeeData.find(e => e._id === "69b411e6f8a807df391d7b13"),
month: 2,
year: 2026,
basicSalary: 2000,
allowances: 200,
deductions: 20,
netSalary: 2180,
},
{
_id: "ps2",
employeeId: "emp2",
employee: dummyEmployeeData.find(e => e._id === "emp2"),
month: 2,
year: 2026,
basicSalary: 2000,
allowances: 200,
deductions: 20,
netSalary: 2180,
},
{
_id: "ps3",
employeeId: "emp1",
employee: dummyEmployeeData.find(e => e._id === "emp1"),
month: 2,
year: 2026,
basicSalary: 1000,
allowances: 100,
deductions: 10,
netSalary: 1090,
}
];

export const dummyLeaveData = [
{
_id: "l1",
employeeId: "emp2",
type: "ANNUAL",
status: "APPROVED",
employee: dummyEmployeeData[1],
},
{
_id: "l2",
employeeId: "69b411e6f8a807df391d7b13",
type: "SICK",
status: "PENDING",
employee: dummyEmployeeData[2],
},
];

export const dummyAttendanceData = [];

export const performanceOverviewData = [
{ day: "Mon", attendance: 78, employeesPresent: 2, leaves: 1 },
{ day: "Tue", attendance: 85, employeesPresent: 3, leaves: 0 },
{ day: "Wed", attendance: 82, employeesPresent: 2, leaves: 1 },
];
