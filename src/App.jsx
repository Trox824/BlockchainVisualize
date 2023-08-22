import FA2Graph from "./components/LoadGraph";
import NavBar from "./components/NavBar";
import InfoTable from "./components/InfoTable";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div className="container mx-auto ">
      <NavBar />

      <div className="collapse collapse-arrow bg-base-200 sm:w-1/2  my-7 mx-auto w-full rounded-xl shadow-xl">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Information Table
        </div>
        <div className="collapse-content ">
          <InfoTable />
        </div>
      </div>

      <div className="divider"></div>
      <div
        className="collapse grid card rounded-xl bg-base-200 shadow-xl my-4"
        style={{ height: 700 }}
      >
        <input type="checkbox" checked="checked" />
        <div className="collapse-title text-xl font-medium">
          Wallet ID: 213nnasd12xvzxn123
        </div>
        <div className="collapse-content w-full">
          <div className="w-full h-full p-2">
            <FA2Graph />
          </div>
        </div>
      </div>

      <Footer />
      <div class="h-0.5"></div>
    </div>
  );
};

export default App;
