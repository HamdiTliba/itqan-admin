// import useAllOrders from "@/reactQueryHook/getAllOrders";
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

// const OrdersStatusBarChart = () => {
//   const { data: orders, isFetching: isOrdersFetching } = useAllOrders();
//   console.log(orders);

//   const formatWeek = (dateString: Date) => {
//     const date = new Date(dateString);
//     const startOfYear = new Date(date.getFullYear(), 0, 1);
//     const diff = date.getTime() - startOfYear.getTime();
//     const oneDay = 1000 * 60 * 60 * 24;
//     const dayOfYear = Math.floor(diff / oneDay);
//     const weekNumber = Math.ceil(dayOfYear / 7);
//     return `Week ${weekNumber}`;
//   };

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
//             const week = formatWeek(order.createdAt);

//             if (!acc[week]) {
//               acc[week] = {
//                 week,
//                 EnAttente: 0,
//                 EnLivraison: 0,
//                 Retour: 0,
//                 PaidOrder: 0,
//               };
//             }
//             const statusKey = order.status as
//               | "EnAttente"
//               | "EnLivraison"
//               | "Retour"
//               | "PaidOrder";

//             acc[week][statusKey] += 1;

//             return acc;
//           },
//           {}
//         )
//       )
//     : [];

//   // Ensure all weeks are included
//   const allWeeks = Array.from({ length: 52 }, (_, i) => `Week ${i + 1}`);
//   const fullStatusData = allWeeks.map((week) => {
//     const existingData = statusData.find((data) => data.week === week);
//     return (
//       existingData || {
//         week,
//         EnAttente: 0,
//         EnLivraison: 0,
//         Retour: 0,
//         PaidOrder: 0,
//       }
//     );
//   });

//   return (
//     <div>
//       {isOrdersFetching ? (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={[]}
//             margin={{
//               top: 20,
//               right: 0,
//               left: 0,
//               bottom: 5,
//             }}
//             barSize={5}>
//             {/* <CartesianGrid strokeDasharray="3 3" /> */}
//             <XAxis dataKey="week" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="EnAttente" fill="lightGray" stackId="status" />
//             <Bar dataKey="EnLivraison" fill="blue" stackId="status" />
//             <Bar dataKey="Retour" fill="red" stackId="status" />
//             <Bar dataKey="PaidOrder" fill="green" stackId="status" />
//           </BarChart>
//         </ResponsiveContainer>
//       ) : (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart
//             data={fullStatusData}
//             margin={{
//               top: 20,
//               right: 0,
//               left: 0,
//               bottom: 5,
//             }}
//             barSize={5}>
//             {/* <CartesianGrid strokeDasharray="3 3" /> */}
//             <XAxis dataKey="week" />
//             <YAxis
//               label={{
//                 value: "Order Count",
//                 angle: -90,
//                 position: "insideLeft",
//               }}
//             />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="EnAttente" fill="lightGray" stackId="status" />
//             <Bar dataKey="EnLivraison" fill="blue" stackId="status" />
//             <Bar dataKey="Retour" fill="red" stackId="status" />
//             <Bar dataKey="PaidOrder" fill="green" stackId="status" />
//           </BarChart>
//         </ResponsiveContainer>
//       )}
//     </div>
//   );
// };

// export default OrdersStatusBarChart;
