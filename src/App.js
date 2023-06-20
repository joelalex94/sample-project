import React from 'react';
import {BrowserRouter , Routes, Route} from "react-router-dom";
import './App.css';
// import Header from './components/Header';
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
import {
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Breadcrumb } from 'antd';
import { useState } from 'react';
const { Header, Sider, Content, Footer } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (  
    <BrowserRouter>
      <Layout style={{height:"100%"}}>
        {/* <Header/> */}
        <UserAuthContextProvider>
          <Routes>
            <Route exact path="/login" Component={Login}/>
            <Route exact path="/register" Component={Register}/>
            <Route exact path="/reset" element={<Reset />} />

            <Route exact path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
            <Route exact path="/view/:id" element={<ProtectedRoute><View/></ProtectedRoute>}/>
            <Route exact path="/order" element={<ProtectedRoute><Order/></ProtectedRoute>}/>
            <Route exact path="/order/addorder" element={<ProtectedRoute><AddOrder/></ProtectedRoute>}/>
            <Route exact path="/order/editorder/:id" element={<ProtectedRoute><AddOrder/></ProtectedRoute>}/>
            <Route exact path="/employee" element={<ProtectedRoute><Employee/></ProtectedRoute>}/>
            <Route exact path="/extra-hours" element={<ProtectedRoute><ExtraHour/></ProtectedRoute>}/>
            <Route exact path="/employee/addemployee" element={<ProtectedRoute><AddEmployee/></ProtectedRoute>}/>
            <Route exact path="/extra-hours/addhour" element={<ProtectedRoute><AddHour/></ProtectedRoute>}/>
            <Route exact path="/employee/editemployee/:id" element={<ProtectedRoute><AddEmployee/></ProtectedRoute>}/>
            <Route exact path="/extra-hours/editextrahour/:id" element={<ProtectedRoute><AddHour/></ProtectedRoute>}/>
          </Routes>
        </UserAuthContextProvider>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
