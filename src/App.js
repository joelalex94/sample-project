import React from 'react';
import {BrowserRouter , Routes, Route} from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import View from './pages/View';
import Order from './pages/Order';
import AddOrder from './pages/Order/addOrder';
import Employee from './pages/Employee';

function App() {
  return (  
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" Component={Home}/>
          <Route exact path="/view/:id" Component={View}/>
          <Route exact path="/order/orderlist" Component={Order}/>
          <Route exact path="/order/addorder" Component={AddOrder}/>
          <Route exact path="/employee/employee-list" Component={Employee}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
