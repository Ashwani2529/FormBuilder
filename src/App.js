import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Render from "./Render";
import Forms from "./Forms";

function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar key={new Date()} />
        <Routes>
          <Route path="/" element={<Home />} />
         <Route path="/render" element={<Render/>}/>
         <Route path="/forms" element={<Forms/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
