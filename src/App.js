import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Render from "./Render";
import Forms from "./Forms";
import Submit from "./Submit";
function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar key={new Date()} />
        <Routes>
          <Route path="/" element={<Home />} />
         <Route path="/render" element={<Render/>}/>
         <Route path="/forms" element={<Forms/>}/>
         <Route path="/submit" element={<Submit/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
