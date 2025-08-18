// import Skeleton from "@/components/Skeleton";
// import useAllClients from "@/reactQueryHook/getAllClients";
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

// const ClientsLineChart = () => {
//   const { data: clients, isFetching } = useAllClients();

//   // Calculate the number of clients for each week of the year
//   const clientsData = clients
//     ? Object.values(
//         clients.reduce(
//           (acc: Record<string, { week: string; clients: number }>, client) => {
//             const weekNumber = getWeekNumber(new Date(client.createdAt));
//             const weekLabel = `Week ${weekNumber}`;

//             if (!acc[weekLabel]) {
//               acc[weekLabel] = { week: weekLabel, clients: 0 };
//             }

//             acc[weekLabel].clients += 1; // Increment the count of clients for that week
//             return acc;
//           },
//           {}
//         )
//       )
//     : [];

//   // Ensure all 52 weeks are displayed on the X-axis, even if some weeks don't have clients
//   const allWeeks = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`);
//   const completedWeeks = clientsData.map((data) => data.week);

//   // Add missing weeks with 0 clients
//   const fullClientsData = allWeeks.map((week) => {
//     const existingData = clientsData.find((data) => data.week === week);
//     return existingData || { week };
//   });

//   return (
//     <div>
//       {isFetching ? (
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart
//             data={[]}
//             margin={{
//               top: 20,
//               right: 0,
//               left: 0,
//               bottom: 5,
//             }}>
//             {/* <CartesianGrid strokeDasharray="3 3" /> */}
//             <XAxis dataKey="week" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="clients"
//               stroke="#000"
//               strokeWidth={2}
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       ) : (
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart
//             data={fullClientsData}
//             margin={{
//               top: 20,
//               right: 0,
//               left: 0,
//               bottom: 5,
//             }}>
//             {/* <CartesianGrid strokeDasharray="3 3" /> */}
//             <XAxis dataKey="week" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="clients"
//               stroke="#000"
//               strokeWidth={2}
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// };

// export default ClientsLineChart;
