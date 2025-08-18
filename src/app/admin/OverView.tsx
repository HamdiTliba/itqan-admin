import OverViewOrdersTable from "@/components/overview/OverViewOrdersTable";
import OverViewTopProducts from "@/components/overview/OverViewTopProducts";

const OverView = () => {
  return (
    <div className="space-y-4 w-full">
      {/* <OverViewCards /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
        {/* <OverViewCharts /> */}
        <div className="flex flex-col gap-2 w-full">
          <OverViewOrdersTable />
          <OverViewTopProducts />
        </div>
      </div>
    </div>
  );
};

export default OverView;
