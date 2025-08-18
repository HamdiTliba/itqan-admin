// "use client";

// import { useState } from "react";
// import OrdersChart from "./charts/OrdersChart";
// import OrdersStatusChart from "./charts/OrdersStatusChart";
// import RevenueChart from "./charts/RevenueChart";
// import RevenueBarChart from "./charts/RevenueBarChart";
// import OrdersStatusBarChart from "./charts/OrdersStatusBarChart";
// import OrdersBarChart from "./charts/OrdersBarChart";
// import ClientsLineChart from "./charts/ClientsLineChart";
// import ClientsBarChart from "./charts/ClientsBarChart";
// type ChartType = "bar" | "line";
// const OverViewCharts = () => {
//   const [chartType, setChartType] = useState<ChartType>("bar");
//   return (
//     <div>
//       <div className="flex gap-2  justify-end w-full">
//         <button
//           className={`py-1 px-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg border dark:border-neutral-600 ${
//             chartType === "bar" ? "border-blue-500" : ""
//           } `}
//           onClick={() => setChartType("bar")}>
//           Bar
//         </button>
//         <button
//           className={`py-1 px-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg border dark:border-neutral-600 ${
//             chartType === "line" ? "border-blue-500" : ""
//           } `}
//           onClick={() => setChartType("line")}>
//           Courbe
//         </button>
//       </div>
//       {chartType === "line" && (
//         <div>
//           <RevenueChart />
//           <OrdersChart />
//           <OrdersStatusChart />
//           <ClientsLineChart />
//         </div>
//       )}
//       {chartType === "bar" && (
//         <div>
//           <RevenueBarChart />
//           <OrdersBarChart />
//           <OrdersStatusBarChart />
//           <ClientsBarChart />
//         </div>
//       )}
//     </div>
//   );
// };

// export default OverViewCharts;
