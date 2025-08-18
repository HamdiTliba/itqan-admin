// "use client";


// const ClientsTable = () => {
//   const { data: clients, isLoading, isError } = useAllClients();

//   if (isLoading) {
//     return <div>Loading clients...</div>;
//   }

//   if (isError || !clients) {
//     return <div>Failed to load clients. Please try again later.</div>;
//   }

//   return (
//     <div className="overflow-x-auto p-4 ">
//       <table className="min-w-full border-collapse border border-gray-200 dark:border-neutral-600">
//         <thead className="">
//           <tr className="bg-gray-100 dark:bg-neutral-800 text-left">
//             <th className="p-2 border border-gray-200 dark:border-neutral-600">
//               Full Name
//             </th>
//             <th className="p-2 border border-gray-200 dark:border-neutral-600">
//               Phone
//             </th>
//             <th className="p-2 border border-gray-200 dark:border-neutral-600">
//               Email
//             </th>
//             <th className="p-2 border border-gray-200 dark:border-neutral-600">
//               Address
//             </th>
//             <th className="p-2 border border-gray-200 dark:border-neutral-600">
//               Orders
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {clients.map((client, index) => (
//             <tr key={index} className="">
//               <td className="p-2 border border-gray-200 dark:border-neutral-600">
//                 {client.fullName}
//               </td>
//               <td className="p-2 border border-gray-200 dark:border-neutral-600">
//                 {client.phone}
//               </td>
//               <td className="p-2 border border-gray-200 dark:border-neutral-600">
//                 {client.email}
//               </td>
//               <td className="p-2 border border-gray-200 dark:border-neutral-600">
//                 {client.address}
//               </td>
//               <td className="p-2 border border-gray-200 dark:border-neutral-600">
//                 <ul className="list-disc pl-4">
//                   {client.orderproducts.length > 0 ? (
//                     client.orderproducts.map((order, index) => (
//                       <li key={index}>
//                         <span>
//                           Order ID: <strong>{order.productId}</strong>, Total:{" "}
//                           <strong>${order.price}</strong>
//                         </span>
//                       </li>
//                     ))
//                   ) : (
//                     <span>No orders</span>
//                   )}
//                 </ul>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ClientsTable;
