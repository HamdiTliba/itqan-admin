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

// // Function to calculate the week number of the year
// const getWeekNumber = (date: Date) => {
//   const startDate = new Date(date.getFullYear(), 0, 1);
//   const days = Math.floor(
//     (date.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
//   );
//   return Math.ceil((days + startDate.getDay() + 1) / 7);
// };

// const OrdersChart = () => {
//   const { data: orders, isFetching: isOrdersFetching } = useAllOrders();
//   console.log(orders);

//   // Calculate number of orders per week dynamically
//   const ordersData = orders
//     ? Object.values(
//         orders.reduce(
//           (acc: Record<string, { week: string; orders: number }>, order) => {
//             const orderDate = new Date(order.createdAt);
//             const week = `Week ${getWeekNumber(orderDate)}`;
//             if (!acc[week]) {
//               acc[week] = { week, orders: 0 };
//             }
//             acc[week].orders += 1; // Increment the count of orders for the week
//             return acc;
//           },
//           {}
//         )
//       )
//     : [];

//   // Ensure all 52 weeks are displayed on the X-axis, even if some weeks have no orders
//   const allWeeks = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`);
//   const fullOrdersData = allWeeks.map((week) => {
//     const existingData = ordersData.find((data) => data.week === week);
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
//             }}>
//             {/* <CartesianGrid strokeDasharray="3 3" /> */}
//             <XAxis dataKey="week" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="orders"
//               stroke="#8884d8"
//               strokeWidth={2}
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       ) : (
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart
//             data={fullOrdersData}
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
//               dataKey="orders"
//               stroke="#8884d8"
//               strokeWidth={2}
//               activeDot={{ r: 8 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// };

// export default OrdersChart;
