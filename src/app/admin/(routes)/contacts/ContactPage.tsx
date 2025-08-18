// "use client";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { contactStatus } from "./ContactData";
// import { Contact } from "@/actions/contact/getAllContact";
// import { updateContactStatus } from "@/actions/contact/updateContactStatus";

// interface ContactProps {
//   contact: Contact[];
// }

// const ContactPage: React.FC<ContactProps> = ({ contact }) => {
//   const [isStatus, setIsStatus] = useState<ContactStatus>("EnAttente");
//   const router = useRouter();

//   const statusOptions: ContactStatus[] = [
//     ContactStatus.EnAttente,
//     ContactStatus.EnCours,
//     ContactStatus.Resolved,
//   ];

//   const handleStatusChange = async (
//     contactId: string,
//     status: ContactStatus
//   ) => {
//     try {
//       const updatedStatus = await updateContactStatus(contactId, status);
//       if (updatedStatus) {
//         router.refresh();
//         toast.success("Status updated successfully!");
//       } else {
//         toast.error("Failed to update status!");
//       }
//     } catch (error) {
//       toast.error("An error occurred while updating the status.");
//       console.error(error);
//     }
//   };

//   const filteredContact = contact.filter(
//     (contact) => contact.status === isStatus
//   );

//   return (
//     <div>
//       {/* Filter by Status */}
//       <div className="flex justify-center w-full gap-3 flex-wrap my-3">
//         {contactStatus.map((statusOption, index) => (
//           <div
//             key={index}
//             className={`bg-white dark:bg-neutral-800 dark:border-neutral-600 p-2 relative rounded-lg cursor-pointer transition-all ease-in-out shadow-md text-xs ${
//               statusOption.status === isStatus
//                 ? "ring-1 ring-sky-500"
//                 : "ring-1 ring-neutral-100"
//             }`}
//             onClick={() => setIsStatus(statusOption.status as ContactStatus)}>
//             {statusOption.label}
//             {contact.filter((contact) => contact.status === statusOption.status)
//               .length ? (
//               <div className="absolute -top-2 -right-2 size-5 bg-sky-500  rounded-full text-white flex justify-center items-center font-bold">
//                 {
//                   contact.filter(
//                     (contact) => contact.status === statusOption.status
//                   ).length
//                 }
//               </div>
//             ) : null}
//           </div>
//         ))}
//       </div>

//       {/* Contact Table */}
//       <div className="overflow-x-auto w-full my-4">
//         <table className="w-full text-xs border-collapse ">
//           <thead className="bg-neutral-50 border-b dark:bg-neutral-800 dark:border-neutral-600">
//             <tr>
//               <th className="p-2 text-left">Full Name</th>
//               <th className="p-2 text-left">Phone</th>
//               <th className="p-2 text-left">Email</th>
//               <th className="p-2 text-left ">Message</th>
//               <th className="p-2 text-left">Status</th>
//               <th className="p-2 text-left">Created At</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredContact.length > 0 ? (
//               filteredContact.map((contact) => (
//                 <tr key={contact.id} className=" transition-all ease-in-out">
//                   <td className="p-2">{contact.fullName}</td>
//                   <td className="p-2">{contact.phone}</td>
//                   <td className="p-2 w-40">
//                     {contact.email || "pas de email"}
//                   </td>
//                   <td className="p-2 w-40 break-words ">{contact.message}</td>
//                   <td className="p-2">
//                     <select
//                       value={contact.status}
//                       onChange={(e) =>
//                         handleStatusChange(
//                           contact.id,
//                           e.target.value as ContactStatus
//                         )
//                       }
//                       className="p-2 rounded-md border-[1px] outline-none">
//                       {statusOptions.map((status) => (
//                         <option key={status} value={status}>
//                           {status}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td className="p-2">
//                     {new Date(contact.createdAt)
//                       .toLocaleString()
//                       .substring(0, 16)}
//                   </td>
//                   <td className="p-2">
//                     <button
//                       onClick={() => {
//                         navigator.clipboard.writeText(contact.id);
//                         toast.success(`Contact ID copied!`);
//                       }}
//                       className="text-blue-600 hover:underline">
//                       Copy ID
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={6} className="p-2 text-center">
//                   No contacts available for this status.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ContactPage;
