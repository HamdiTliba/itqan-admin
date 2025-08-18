/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { updateUserStatus } from "@/actions/user/updateUserStatus";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface AdminsProps {
  users: any;
}

const Admins: React.FC<AdminsProps> = ({ users }) => {
  const router = useRouter();
  const handleStatusChange = async (id: string, role: any) => {
    const updatedUser = await updateUserStatus(id, role.toUpperCase() as any);
    if (updatedUser) {
      router.refresh();
      toast.success("Le role a été modifié avec succès.");
    } else {
      toast.error("Impossible de modifier le role de l'utilisateur.");
    }
  };
  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-neutral-300 dark:border-neutral-600 ">
          <thead>
            <tr className="bg-gray-100 dark:bg-neutral-800">
              <th className="border border-neutral-300 dark:border-neutral-600  px-4 py-2">
                Nom et Prénom
              </th>
              <th className="border border-neutral-300 dark:border-neutral-600  px-4 py-2">
                Email
              </th>
              <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-2">
                Creation Date
              </th>
              <th className="border border-neutral-300 dark:border-neutral-600 px-4 py-2">
                Changer le role
              </th>
              <th className="border border-neutral-300 dark:border-neutral-600  px-4 py-2">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item: any) => (
              <tr key={item.id} className="">
                <td className="border border-neutral-300 dark:border-neutral-600  px-4 py-2">
                  {item.name || `${item.firstName} ${item.lastName}`}
                </td>
                <td className="border border-neutral-300 dark:border-neutral-600  px-4 py-2">
                  {item.email}
                </td>
                <td className="border border-neutral-300 dark:border-neutral-600 px-4 py-2">
                  {new Date(item.createdAt).toLocaleString().substring(0, 16)}
                </td>
                <td className=" border border-neutral-300 dark:border-neutral-600 px-4 py-2">
                  <select
                    className="w-full px-2 py-1 border border-neutral-300 dark:border-neutral-600 outline-none rounded-lg"
                    value={""}
                    onChange={(e) =>
                      handleStatusChange(item.id, e.target.value)
                    }>
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td
                  className={`border border-neutral-300 dark:border-neutral-600 px-4 py-2 ${
                    item.role === "ADMIN" && "text-green-600 font-bold text-lg"
                  }
                  
                  ${
                    item.role === "EDITOR" && "text-green-400 font-bold text-lg"
                  }`}>
                  {item.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admins;
