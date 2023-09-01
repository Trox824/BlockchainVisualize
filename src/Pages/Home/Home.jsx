import InfoTable from "../Address/InfoTable";
import { FA2Graph } from "../Address/LoadGraph";
const Home = () => {
  return (
    <div className="grid grid-rows-6 grid-cols-3 gap-x-4 gap-y-2 h-1200 lg:h-700">
      <div className="rounded-xl row-start-1 row-span-3 col-span-3 lg:col-span-1 lg:row-start-1 lg:row-span-6 bg-base-200 shadow-xl my-4 mx-auto w-full p-4">
        <div className="text-xl font-medium w-full">
          <div className="my-2">Wallet ID: 213nnasd12xvzxn123</div>
          <InfoTable />
        </div>
      </div>

      <div className="rounded-xl row-start-4 row-span-3 col-span-3 lg:col-span-2 lg:row-start-1 lg:row-span-6 bg-base-200 shadow-xl my-4 mx-auto w-full p-4">
        <div className="text-xl font-medium w-full h-full">
          <FA2Graph />
        </div>
      </div>
    </div>
  );
};
export default Home;
