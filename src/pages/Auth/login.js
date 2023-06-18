import React, {useState} from 'react';
import { Form, Input, Button, Card , Row , Col, Layout} from 'antd';
import { useUserAuth } from '../../context/UserAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './login.css';
const { Header, Content, Footer } = Layout;

const Login = () => {
    const navigate = useNavigate();

    const {logIn} = useUserAuth();
    const onFinish = async (values) => {
        // console.log('Received values of form: ', values);
        try {
        const { email, password } = values;
        //   await db.auth().signInWithEmailAndPassword(email, password);
            await logIn(email, password);
            navigate("/");
            console.log(`Email : ${email}`, `password : ${password}`);
        } catch (error) {
            console.log('Login error:', error);
        }
       
    };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout>
         <Content className="site-layout" style={{ padding: '0 50px' }}>
    <div className="login-container">
        <Card title="Login">
            <Form
            name="loginForm"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                {
                    required: true,
                    message: 'Please enter your email!',
                },
                {
                    type: 'email',
                    message: 'Please enter a valid email address!',
                },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                {
                    required: true,
                    message: 'Please enter your password!',
                },
                ]}
            >
                <Input.Password  />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Log In
                </Button>
            </Form.Item>
            </Form>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" span={12}>
                    <div >Don't have an account? <Link to="/register"> Register  </Link></div>
                </Col>
                <Col className="gutter-row" span={12}>
                    <div><Link  to="/reset">Forgot Password </Link></div>
                </Col>
           
            </Row>
            
        </Card>
        
    </div>
    </Content>
    </Layout>
  );
};

export default Login;