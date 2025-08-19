// import Skeleton from "@/components/Skeleton";
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

// const OrdersStatusChart = () => {
//   const { data: orders, isFetching: isOrdersFetching } = useAllOrders();

//   // Function to get week number of the year from a date
//   const getWeekNumber = (date: Date) => {
//     const startDate = new Date(date.getFullYear(), 0, 1);
//     const diff = date.getTime() - startDate.getTime();
//     const oneDay = 1000 * 60 * 60 * 24;
//     const dayOfYear = Math.floor(diff / oneDay);
//     return Math.ceil((dayOfYear + 1) / 7);
//   };

//   // Generate data for all weeks in the year (52 or 53 weeks)
//   const generateWeeksData = () => {
//     const weeks = [];
//     for (let i = 1; i <= 53; i++) {
//       weeks.push({
//         week: `Week ${i}`,
//       });
//     }
//     return weeks;
//   };

//   // Process orders data to calculate counts by status and week of the year
//   const statusData = orders
//     ? Object.values(
//         orders.reduce(
//           (
//             acc: Record<
//               string,
//               {
//                 week: string;
//                 EnAttente: number;
//                 EnLivraison: number;
//                 Retour: number;
//                 PaidOrder: number;
//               }
//             >,
//             order
//           ) => {
//             const week = getWeekNumber(new Date(order.createdAt));

//             const weekLabel = `Week ${week}`;

//             if (!acc[weekLabel]) {
//               acc[weekLabel] = {
//                 week: weekLabel,
//                 EnAttente: 0,
//                 EnLivraison: 0,
//                 Retour: 0,
//                 PaidOrder: 0,
//               };
//             }

//             // Increment the count for the corresponding status
//             const statusKey = order.status as
//               | "EnAttente"
//               | "EnLivraison"
//               | "Retour"
//               | "PaidOrder";

//             acc[weekLabel][statusKey] += 1;

//             return acc;
//           },
//           {}
//         )
//       )
//     : [];

//   // Merge the status data with all weeks data to ensure all weeks are accounted for
//   const mergedData = generateWeeksData().map((week) => {
//     const matchingWeek = statusData.find((data) => data.week === week.week);
//     return matchingWeek ? matchingWeek : week;
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
//             }}>
//             {/* <CartesianGrid strokeDasharray="3 3" /> */}
//             <XAxis dataKey="week" tick={false} />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="EnAttente"
//               stroke="#8884d8"
//               strokeWidth={2}
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       ) : (
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart
//             data={mergedData}
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
//               dataKey="EnAttente"
//               stroke="#8884d8"
//               strokeWidth={2}
//               activeDot={{ r: 8 }}
//             />
//             <Line
//               type="monotone"
//               dataKey="EnLivraison"
//               stroke="#ffc658"
//               strokeWidth={2}
//               activeDot={{ r: 8 }}
//             />
//             <Line
//               type="monotone"
//               dataKey="Retour"
//               stroke="#ff7300"
//               strokeWidth={2}
//               activeDot={{ r: 8 }}
//             />
//             <Line
//               type="monotone"
//               dataKey="PaidOrder"
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

// export default OrdersStatusChart;
