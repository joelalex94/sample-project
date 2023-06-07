import React, {useState} from 'react';
import './login.css';
import { useNavigate, Link } from 'react-router-dom';
import { useUserAuth } from '../../context/UserAuthContext';



const Reset = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const {forgotPassword} = useUserAuth();
    const [error, setError] = useState("");

    const handleSubmit= async (e) => {
        e.preventDefault();
        setError("");
        try{
            await forgotPassword(email);
            alert("Password reset link sent!");
            navigate("/")
        }catch(err){
            setError(err.message);
        }

    };

    

    return ( 
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="card shadow">
                            <div className="card-title text-center border-bottom">
                                <h2 className="p-3">Forgot password</h2>
                                {error && <label className="form-label text-danger">{error}</label>}
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="username" className="form-label">Username/Email</label>
                                        <input type="email" className="form-control" id="username" onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                   
                                    <div className="mb-4 text-right">
                                    
                                        Don't have an account? <Link to="/login"> Login </Link>
                                    </div>
                                    <div className="d-grid">
                                        <button type="submit" className="btn text-light main-bg">send</button>
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
 
export default Reset;