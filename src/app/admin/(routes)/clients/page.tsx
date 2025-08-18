"use client";
import Add from "@/components/svgs/Add";

const ClientsPage = () => {
  return (
    <div>
      <div className="flex w-full justify-end">
        <button className="flex justify-center items-center gap-1 text-green-600 px-4 py-2 rounded-xl border-[1px]  border-green-600">
          <Add className="size-7" />{" "}
          <span className="font-semibold">Ajouter</span>
        </button>
      </div>
      {/* <ClientsTable /> */}
    </div>
  );
};

export default ClientsPage;
