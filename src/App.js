import React from 'react';
import {BrowserRouter , Routes, Route} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import View from './pages/View';
import Order from './pages/Order';
import AddOrder from './pages/Order/addOrder';
import Employee from './pages/Employee';
import ExtraHour from './pages/Extrahour';

function App() {
  return (  
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route exact path="/" Component={Home}/>
          <Route exact path="/view/:id" Component={View}/>
          <Route exact path="/order" Component={Order}/>
          <Route exact path="/order/addorder" Component={AddOrder}/>
          <Route exact path="/employee" Component={Employee}/>
          <Route exact path="/extra-hours" Component={ExtraHour}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
