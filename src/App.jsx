import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./Pages/Home/Home";
import InfoTable from "./Pages/Address/InfoTable";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About/About";
const App = () => {
  return (
    <div className="container mx-auto ">
      <NavBar />
      <Routes>
        {}
        <Route index element={<Home />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/InfoTable" element={<InfoTable />}></Route>
        <Route path="/About" element={<About />}></Route>
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
