import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import "./css/variables.css";
import Homepage from "./js/Homepage.js";
import CustomerView from "./js/CustomerView.js";
import CounterManagement from "./js/CounterManagement.js"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage/>}/>
          <Route path="/custview" element={<CustomerView/>}/>
          <Route path="/countmng" element={<CounterManagement/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
