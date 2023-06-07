import React from 'react';
import { useUserAuth } from '.././context/UserAuthContext';

const Home = () => {
    const {user, logOut} = useUserAuth();
    console.log(user);
    const handleLogout = async () => {
        try{
            await logOut();
        }catch(err){
            console.log(err.message);
        }
    }
    return ( 
        <div>
            <h2>Home</h2>
            <button onClick={handleLogout}>logout</button>

        </div>
     );
}
 
export default Home;