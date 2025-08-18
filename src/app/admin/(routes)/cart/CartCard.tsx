/* eslint-disable @typescript-eslint/no-explicit-any */
import Pending from "@/components/svgs/Pending";

const CartCard = ({ carts }: { carts: any[] | [] }) => {
  const totalEnAttente = carts?.reduce(
    (acc, curr) => acc + curr.addToCartproduct.price,
    0
  );
  return (
    <div>
      <div className="flex justify-between items-center border  p-1 md:p-2 rounded-2xl w-fit h-full gap-5 bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-600">
        <Pending className="size-12" />
        <div className="flex flex-col justify-between">
          <h1 className="text-pink-600 text-sm text-end">En Attente</h1>
          <h1 className="text-sm  font-semibold">
            {carts.length} ajout au panier
          </h1>
          <h1 className="text-sm  font-semibold text-end">
            {totalEnAttente.toFixed(3)}
            dt
          </h1>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
