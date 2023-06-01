import React,{useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {db} from '../../firebase';
import { collection, addDoc } from "firebase/firestore";

const AddHour = () => {

    const [items, setItems] = useState([]);
    const [clientName, setClientName] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [hours, setHours] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();  
       
        try {
            const docRef = await addDoc(collection(db, "items"), {
              clientName:clientName,orderDate:orderDate,hours:hours
            });
            // console.log("Document written with ID: ", docRef.id  , fileUrl);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    return (

        <div>
            <h2>Add Extra Hours</h2>
            <div className="container">
                
                <form className="row g-3" >

                    <div className="col-md-6">
                        
                        <input type="date" className="form-control" id="orderDate" name="orderDate" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
                    </div>
                    
                    <div className="col-md-6">
                        
                        <select id="clientName" className="form-select" placeholder="Employee Name" name="name" value={clientName} onChange={(e) => setClientName(e.target.value)}>
                        <option> Employee Name </option>
                        <option value="pending"> Test1 </option>
                        <option value="in-progress"> Test2 </option>
                        <option value="completed"> Test3 </option>
                        </select>
                    </div>
                    
                    
                    <div className="col-md-6">
                        
                        <input type="text" className="form-control" id="hours" name="hours" placeholder="Extra Hours" value={hours} onChange={(e) => setHours(e.target.value)} />
                        
                    </div>
                    
                    
                    
                    <div className="col-md-6">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
                    
            </div>

        </div>
    );
}

export default AddHour;