import InfoTable from "./InfoTable";
import LoadGraph, { FA2Graph } from "./LoadGraph";
const Home = () => {
  return (
    <div className="grid grid-cols-3 gap-4" style={{ height: 700 }}>
      <div className="rounded-xl col-span-1 bg-base-200 shadow-xl my-4 mx-auto w-full p-4">
        <div className="text-xl font-medium w-full">
          <div className="my-2">Wallet ID: 213nnasd12xvzxn123</div>
          <InfoTable />
        </div>
      </div>

      <div className="rounded-xl col-span-2 bg-base-200 shadow-xl my-4 mx-auto w-full p-4">
        <div className="text-xl font-medium w-full h-full">
          <FA2Graph />
        </div>
      </div>
    </div>
  );
};
export default Home;
