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
import Login from './pages/Auth/login';
import Register from './pages/Auth/register';
import ProtectedRoute from './pages/Auth/ProtectedRoute';

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

            <Route exact path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route exact path="/view/:id" element={<ProtectedRoute><View/></ProtectedRoute>}/>
            <Route exact path="/order" element={<ProtectedRoute><Order/></ProtectedRoute>}/>
            <Route exact path="/order/addorder" element={<ProtectedRoute><AddOrder/></ProtectedRoute>}/>
            <Route exact path="/order/editorder/:id" element={<ProtectedRoute><AddOrder/></ProtectedRoute>}/>
            <Route exact path="/employee" element={<ProtectedRoute><Employee/></ProtectedRoute>}/>
            <Route exact path="/extra-hours" element={<ProtectedRoute><ExtraHour/></ProtectedRoute>}/>
          
          </Routes>
        </UserAuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
