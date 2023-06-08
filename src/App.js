import React from 'react';
import {BrowserRouter , Routes, Route} from "react-router-dom";
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import View from './pages/View';
import Order from './pages/Order';
import AddOrder from './pages/Order/addOrder';
import EditOrder from './pages/Order/editOrder';
import Employee from './pages/Employee';
import ExtraHour from './pages/Extrahour';
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import Reset from './pages/Auth/forgotpassword';
import ProtectedRoute from './pages/Auth/ProtectedRoute';
import AddEmployee from './pages/Employee/addEmployee';
import AddHour from './pages/Extrahour/addHour';
import { UserAuthContextProvider  } from './context/UserAuthContext';

function App() {

 
  return (  
    
    <BrowserRouter>
      <div className="body">
        <Header/>
        <UserAuthContextProvider>
          <Routes>
            <Route exact path="/login" Component={Login}/>
            <Route exact path="/register" Component={Register}/>
            <Route exact path="/reset" element={<Reset />} />

            <Route exact path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route exact path="/view/:id" element={<ProtectedRoute><View/></ProtectedRoute>}/>
            <Route exact path="/order" element={<ProtectedRoute><Order/></ProtectedRoute>}/>
            <Route exact path="/order/addorder" element={<ProtectedRoute><AddOrder/></ProtectedRoute>}/>
            <Route exact path="/order/editorder/:id" Component={AddOrder}/>
          <Route exact path="/order/editorder/:id" element={<ProtectedRoute><AddOrder/></ProtectedRoute>}/>
            <Route exact path="/employee" element={<ProtectedRoute><Employee/></ProtectedRoute>}/>
            <Route exact path="/extra-hours" element={<ProtectedRoute><ExtraHour/></ProtectedRoute>}/>
           <Route exact path="/employee/addemployee" Component={AddEmployee}/>
          <Route exact path="/extra-hours/addhour" Component={AddHour}/>
          <Route exact path="/employee/editemployee/:id" Component={AddEmployee}/>
          <Route exact path="/extra-hours/editextrahour/:id" Component={AddHour}/>
          </Routes>
        </UserAuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
