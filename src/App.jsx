import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
// import Documentation from "../src/Pages/About/Documentation";
import { NodeContext, NodeContextProvider } from "./Pages/Address/GraphContext";
import Address from "./Pages/Address/Address";
import Txn from "./Pages/Address/Txn";
import Documentation from "./Pages/About/Documentation";
const App = () => {
  return (
    <NodeContextProvider>
      <div className="container mx-auto">
        <NavBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Address/:address_id" element={<Address />} />
          <Route path="/txn/:hash" element={<Txn />} />
          <Route path="/Documentation" element={<Documentation />} />
        </Routes>
        <Footer />
      </div>
    </NodeContextProvider>
  );
};

export default App;
