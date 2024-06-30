import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"
function App() {
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Dashboard" element={<Dashboard/>}></Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;
