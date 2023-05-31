import React,{useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {db} from '../../firebase';
import { collection, addDoc } from "firebase/firestore";

const AddEmployee = () => {
    const [items, setItems] = useState([]);
    const [clientName, setClientName] = useState('');
    const [designation, setDesignation] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();  
       
        try {
            const docRef = await addDoc(collection(db, "items"), {
              clientName:clientName,designation:designation,phone:phone
            });
            // console.log("Document written with ID: ", docRef.id  , fileUrl);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    
    return (

        <div>
            <h2>Add Employee</h2>
            <div className="container">
                
                <form className="row g-3" onSubmit={handleSubmit} >
                    
                    <div className="col-md-6">
                       
                        <input type="text" className="form-control" id="clientName" name="clientName" placeholder="Full Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        
                        <select id="designation" className="form-select" placeholder="designation" name="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} >
                        <option> Designation </option>
                        <option value="pending"> Test1 </option>
                        <option value="in-progress"> Test2 </option>
                        <option value="completed"> Test3 </option>
                        </select>
                    </div>
                    
                    <div className="col-md-6">
                        
                        <input type="number" className="form-control" id="phone" name="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        
                    </div>
                    
                    
                    
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
                    
            </div>

        </div>
    );
}

export default AddEmployee;