// import useAllOrders from "@/reactQueryHook/getAllOrders";
// import React from "react";
// import {
//   CartesianGrid,
//   Legend,
//   Bar,
//   BarChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const RevenueBarChart = () => {
//   const { data: orders, isFetching } = useAllOrders();

//   const formatDate = (dateString: Date) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("default", {
//       day: "2-digit",
//       month: "short",
//     });
//   };

//   // Generate all 365 days of the year
//   const generateAllDaysOfYear = () => {
//     const days = [];
//     const currentYear = new Date().getFullYear();
//     for (let i = 0; i < 365; i++) {
//       const date = new Date(currentYear, 0, i + 1);
//       const formattedDate = formatDate(date);
//       days.push({ day: formattedDate, revenue: 0 });
//     }
//     return days;
//   };

//   // Initialize all days of the year with 0 revenue
//   let revenueData = generateAllDaysOfYear();

//   // Calculate daily revenue data dynamically
//   if (orders) {
//     revenueData = orders.reduce((acc: any[], order) => {
//       const day = formatDate(order.createdAt);
//       const existingDay = acc.find((entry) => entry.day === day);
//       if (existingDay) {
//         existingDay.revenue += order.totalPrice;
//       }
//       return acc;
//     }, revenueData);
//   }

//   return (
//     <div>
//       {isFetching ? (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={[]}
//             margin={{
//               top: 20,
//               right: 0,
//               left: 0,
//               bottom: 5,
//             }}>
//             {/* <CartesianGrid strokeDasharray="3 3" /> */}
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar
//               dataKey="revenue"
//               fill="green"
//               barSize={5}
//               radius={[10, 10, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       ) : (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={revenueData}
//             margin={{
//               top: 20,
//               right: 0,
//               left: 0,
//               bottom: 5,
//             }}>
//             {/* <CartesianGrid strokeDasharray="3 3" /> */}
//             <XAxis dataKey="day" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar
//               dataKey="revenue"
//               fill="green"
//               barSize={5}
//               radius={[10, 10, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// };

// export default RevenueBarChart;
