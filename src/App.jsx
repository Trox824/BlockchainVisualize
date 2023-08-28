import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import InfoTable from "./components/InfoTable";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
const App = () => {
  return (
    <div className="container mx-auto ">
      <NavBar />
      <Routes>
        {/* <Route path="/" element={<Home />}></Route>
          <Route index element={<Home />} /></Route>
          <Route path="./components/InfoTable" element={<InfoTable />} /></Route> */}
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
