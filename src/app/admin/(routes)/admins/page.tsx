import Admins from "./Admins";
import { getUsers } from "@/actions/user/getAllUsers";

const AdminsPage = async () => {
  const users = await getUsers();
  if (!users) return <div>Pas de admins</div>;
  return (
    <div>
      <Admins users={users} />
    </div>
  );
};

export default AdminsPage;
