import React, {useState} from 'react';
import './register.css';
import logo from '../../components/company.png';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { NavLink, useNavigate, Link} from 'react-router-dom';
import {auth} from '../../firebase';
import { useUserAuth } from '../../context/UserAuthContext';



const Register = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const {signUp} = useUserAuth();
    const [error, setError] = useState("");

    const handleSubmit= async (e) => {
        e.preventDefault();
        setError("");
        try{
            await signUp(email, password);
            navigate("/login")
        }catch(err){
            setError(err.message);
        }

    };

    return ( 
        <>
            <div class="container">
                <div class="row justify-content-center mt-5">
                    <div class="col-lg-4 col-md-6 col-sm-6">
                        <div class="card shadow">
                            <div class="card-title text-center border-bottom">
                                <h2 class="p-3">Register</h2>
                                {error && <label class="form-label text-danger">{error}</label>}
                            </div>
                            <div class="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div class="mb-4">
                                        <label for="username" class="form-label">Username/Email</label>
                                        <input type="text" class="form-control" id="username" onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div class="mb-4">
                                        <label for="password" class="form-label">Password</label>
                                        <input type="password" class="form-control" id="password" onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                    <div class="mb-4 text-right">
                                    
                                        Do you have an account? <Link to="/login"> Login </Link>
                                    </div>
                                    <div class="d-grid">
                                        <button type="submit" class="btn text-light main-bg">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Register;