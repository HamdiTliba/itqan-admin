import Pending from "@/components/svgs/Pending";
import { Order } from "@/db/schema";

const OrderCard = ({ orders }: { orders: Order[] | [] }) => {
  const enAttenteOrders = orders?.filter(
    (order) => order.status === "EnAttente"
  );
  const totalEnAttente = enAttenteOrders?.reduce(
    (acc, curr) => acc + parseFloat(curr.totalPrice),
    0
  );
  return (
    <div>
      <div className="flex justify-between items-center border border-neutral-300 p-1 md:p-2 rounded-2xl w-fit h-full gap-5 bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600">
        <Pending className="size-12" />
        <div className="flex flex-col justify-between">
          <h1 className="text-pink-600 text-sm text-end">En Attente</h1>
          <h1 className="text-sm  font-semibold">
            {enAttenteOrders.length} commandes
          </h1>
          <h1 className="text-sm  font-semibold text-end">
            {parseFloat(totalEnAttente.toFixed(3)) || 0}
            dt
          </h1>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
