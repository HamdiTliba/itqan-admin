// import useAllOrders from "@/reactQueryHook/getAllOrders";
// import React from "react";
// import {
//   CartesianGrid,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// // Function to get the week number of the year
// const getWeekNumber = (date: Date) => {
//   const startDate = new Date(date.getFullYear(), 0, 1);
//   const days = Math.floor(
//     (date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
//   );
//   return Math.ceil((days + 1) / 7);
// };

// const RevenueChart = () => {
//   const { data: orders, isFetching: isOrdersFetching } = useAllOrders();

//   // Calculate revenue data dynamically for each week
//   const revenueData = orders
//     ? Object.values(
//         orders.reduce(
//           (acc: Record<string, { week: string; revenue: number }>, order) => {
//             const weekNumber = getWeekNumber(new Date(order.createdAt));
//             const weekLabel = `Week ${weekNumber}`;

//             if (!acc[weekLabel]) {
//               acc[weekLabel] = { week: weekLabel, revenue: 0 };
//             }

//             acc[weekLabel].revenue += order.totalPrice; // Increment revenue for the week
//             return acc;
//           },
//           {}
//         )
//       )
//     : [];

//   // Ensure all 52 weeks are displayed on the X-axis, even if some weeks have no revenue
//   const allWeeks = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`);
//   const fullRevenueData = allWeeks.map((week) => {
//     const existingData = revenueData.find((data) => data.week === week);
//     return existingData || { week };
//   });

//   return (
//     <div>
//       {isOrdersFetching ? (
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart
//             data={[]}
//             margin={{
//               top: 20,
//               right: 0,
//               left: 0,
//               bottom: 5,
//             }}
//           >
//             {/* <CartesianGrid strokeDasharray="3 3" /> */}
//             <XAxis dataKey="week" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="revenue"
//               stroke="#82ca9d"
//               strokeWidth={2}
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       ) : (
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart
//             data={fullRevenueData}
//             margin={{
//               top: 20,
//               right: 0,
//               left: 0,
//               bottom: 5,
//             }}
//           >
//             {/* <CartesianGrid strokeDasharray="3 3" /> */}
//             <XAxis dataKey="week" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="revenue"
//               stroke="#82ca9d"
//               strokeWidth={2}
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// };

// export default RevenueChart;
