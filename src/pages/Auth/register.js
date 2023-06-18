// import React, {useState} from 'react';
// import './register.css';
// import logo from '../../components/company.png';
// import {  createUserWithEmailAndPassword  } from 'firebase/auth';
// import { NavLink, useNavigate, Link} from 'react-router-dom';
// import {auth} from '../../firebase';
// import { useUserAuth } from '../../context/UserAuthContext';



// const Register = () => {
//     const navigate = useNavigate();
 
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('');
//     const {signUp} = useUserAuth();
//     const [error, setError] = useState("");

//     const handleSubmit= async (e) => {
//         e.preventDefault();
//         setError("");
//         try{
//             await signUp(email, password);
//             navigate("/login")
//         }catch(err){
//             setError(err.message);
//         }

//     };

//     return ( 
//         <>
//             <div class="container">
//                 <div class="row justify-content-center mt-5">
//                     <div class="col-lg-4 col-md-6 col-sm-6">
//                         <div class="card shadow">
//                             <div class="card-title text-center border-bottom">
//                                 <h2 class="p-3">Register</h2>
//                                 {error && <label class="form-label text-danger">{error}</label>}
//                             </div>
//                             <div class="card-body">
//                                 <form onSubmit={handleSubmit}>
//                                     <div class="mb-4">
//                                         <label for="username" class="form-label">Username/Email</label>
//                                         <input type="text" class="form-control" id="username" onChange={(e) => setEmail(e.target.value)}/>
//                                     </div>
//                                     <div class="mb-4">
//                                         <label for="password" class="form-label">Password</label>
//                                         <input type="password" class="form-control" id="password" onChange={(e) => setPassword(e.target.value)}/>
//                                     </div>
//                                     <div class="mb-4 text-right">
                                    
//                                         Do you have an account? <Link to="/login"> Login </Link>
//                                     </div>
//                                     <div class="d-grid">
//                                         <button type="submit" class="btn text-light main-bg">Register</button>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//      );
// }
 
// export default Register;
import React, {useState} from 'react';
import { Form, Input, Button, Card , Row , Col} from 'antd';
import { useUserAuth } from '../../context/UserAuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './register.css';

const Register = () => {
    const navigate = useNavigate();
    const {signUp} = useUserAuth();
   
    const onFinish = async (values) => {
        
        // console.log('Received values of form: ', values);
        try {
        const { email, password } = values;
        
        //   await db.auth().signInWithEmailAndPassword(email, password);
            await signUp(email, password);
            navigate("/login");
            console.log(`Email : ${email}`, `password : ${password}`);
        } catch (error) {
            alert(`Login error: ${error.message}` );
        }
       
    };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container">
        <Card title="Register">
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
                <Col className="gutter-row" >
                    <div >Do you have an account? <Link to="/login"> Login </Link></div>
                </Col>
               
           
            </Row>
            <div>
                
            </div>
        </Card>
    </div>
  );
};

export default Register;