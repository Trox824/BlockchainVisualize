import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./Pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import Introduction from "../src/Pages/About/Introduction";
import { NodeContext, NodeContextProvider } from "./Pages/Address/GraphContext";
const App = () => {
  return (
    <NodeContextProvider>
      <div className="container mx-auto ">
        <NavBar />
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/About" element={<Introduction />}></Route>
        </Routes>

        <Footer />
      </div>
    </NodeContextProvider>
  );
};

export default App;
