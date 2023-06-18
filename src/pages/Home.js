import React,{useState} from 'react';
import { useUserAuth } from '.././context/UserAuthContext';


import Sidebars from '../components/Sidebar';
import { MenuUnfoldOutlined,MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Menu, theme ,Button} from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const Home = () => {
    const {user, logOut} = useUserAuth();
    const [collapsed, setCollapsed] = useState(false);
    console.log(user);
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
      
    return ( 
<>
        <Sidebars ValueCollapsed={collapsed}/>
        <Layout style={{height: '100vh'}}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px 0',
            height:'100vh'
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
           

            
            
            <h2>Home</h2>
            <button onClick={handleLogout}>logout</button>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      
    </Layout>

        
        </>
     );
}
 
export default Home;