import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '.././context/UserAuthContext';


import {
    MenuFoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MenuUnfoldOutlined
  } from '@ant-design/icons';
  import { Button, Layout, Menu, theme } from 'antd';
  const { Header, Sider, Content } = Layout;
const Sidebars = (props) => {
    const navigate = useNavigate();
    const {user, logOut} = useUserAuth();
    const handleLogout = async () => {
        try{
            await logOut();
        }catch(err){
            console.log(err.message);
        }
    }
    
  const {
    token: { colorBgContainer },
  } = theme.useToken();
    return ( <>
        {/* <Menu 
        onClick={({key}) =>{
            if(key === "logout"){
                alert("hi");
                handleLogout();

            }else{
                navigate(key);
            }

        }}
         items={[{label:"Dashboard", key:"/"},
            {label:"Order", key:"/order"},
            {label:"Employee", key:"/employee"},
            {label:"Extra Hours", key:"/extra-hours"},
            {label:"LogOut", key:"logout"}
            ]}>

        </Menu> */}
        
      {/* <Sider
       
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical">VOFOX</div> 
        <Menu
         onClick={({key}) =>{
            if(key === "logout"){
                alert("hi");
                handleLogout();

            }else{
                navigate(key);
            }

        }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          items={[{label:"Dashboard", key:"/"},
            {label:"Order", key:"/order"},
            {label:"Employee", key:"/employee"},
            {label:"Extra Hours", key:"/extra-hours"},
            {label:"LogOut", key:"logout"}
            ]}
        />
      </Sider> */}
      
      
      <Sider trigger={null} collapsible collapsed={props.ValueCollapsed} breakpoint="lg" collapsedWidth="0" onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}>
        <div className="demo-logo-vertical" />
        <Menu
          onClick={({key}) =>{
              if(key === "logout"){
                  alert("hi");
                  handleLogout();

              }else{
                  navigate(key);
              }

          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          items={[
            {
              key: '/',
              icon: <UserOutlined />,
              label: 'Dashboard',
            },
            {
              key: '/employee',
              icon: <UserOutlined />,
              label: 'Employees',
            },
            {
              key: '/order',
              icon: <VideoCameraOutlined />,
              label: 'Orders',
            },
            {
              key: '/extra-hours',
              icon: <UploadOutlined />,
              label: 'Extra Hours',
            },
          ]}
        />
      </Sider>
      
        
    </> );
}
 
export default Sidebars;