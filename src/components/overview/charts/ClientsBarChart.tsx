// import Skeleton from "@/components/Skeleton";
// import useAllClients from "@/reactQueryHook/getAllClients";
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

// const ClientsBarChart = () => {
//   const { data: clients, isFetching } = useAllClients();

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
//       days.push({ day: formattedDate, clients: 0 });
//     }
//     return days;
//   };

//   // Initialize all days of the year with 0 clients
//   let clientsData = generateAllDaysOfYear();

//   // Calculate daily clients data dynamically
//   if (clients) {
//     clientsData = clients.reduce((acc: any[], client) => {
//       const day = formatDate(client.createdAt);
//       const existingDay = acc.find((entry) => entry.day === day);
//       if (existingDay) {
//         existingDay.clients += 1;
//       }
//       return acc;
//     }, clientsData);
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
//               dataKey="clients"
//               fill="black"
//               barSize={5}
//               radius={[10, 10, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       ) : (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={clientsData}
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
//               dataKey="clients"
//               fill="black"
//               barSize={5}
//               radius={[10, 10, 0, 0]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// };

// export default ClientsBarChart;
