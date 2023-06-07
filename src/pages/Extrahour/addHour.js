import React,{useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {db} from '../../firebase';
import { collection, addDoc } from "firebase/firestore";
import ExtraHourDataService from '../../services/extrahourservice';

const AddHour = () => {

    const [extraHours, setExtraHours] = useState([]);
    const [clientName, setClientName] = useState('');
    const [orderDate, setOrderDate] = useState('');
    const [hours, setHours] = useState('');

    const [message, setMessage] =useState({error : false, msg : ""});
    const {id} = useParams();

    const history = useNavigate ();
    const fetchExtraHour = async (para) => {
       
        try {
            const docSnap = await ExtraHourDataService.getExtraHour(id);
            console.log(docSnap.data());
            setClientName(docSnap.data().clientName);
            setOrderDate(docSnap.data().orderDate);
            setHours(docSnap.data().hours);
           
          } catch (error) {
            console.error ('Error fetching item: ', error);
        }
       
    }

    useEffect(()=>{
        if(id !== undefined && id !== ""){
            fetchExtraHour();
        }
        
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();  
        setMessage("");

        const newExtraHour = {
            clientName : clientName, 
            orderDate: orderDate,
            hours : hours, 
            
        }

        try{

            if(id !== undefined && id !== ""){
                
                await ExtraHourDataService.updateExtraHour(id, newExtraHour);
    
                setMessage({error:false, msg:"New data added successfully!"});
                history('/extra-hours');
            }else{
    
                await ExtraHourDataService.addExtraHour(newExtraHour);
    
                setMessage({error:false, msg:"New data added successfully!"});
                history('/extra-hours');
            }
            
        }catch(err){
            setMessage({error: true, msg : err.message});
            console.log(err)
        }
    }
    return (

        <div>
             <h2>{id !== undefined && id !== "" ? `Edit Extra HOur  ${id}` : "Add Extra Hours"}</h2>
            <div className="container">
                
                <form className="row g-3" onSubmit={handleSubmit}>

                    <div className="col-md-6">
                        
                        <input type="date" className="form-control" id="orderDate" name="orderDate" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} />
                    </div>
                    
                    <div className="col-md-6">
                        
                        <select id="clientName" className="form-select" placeholder="Employee Name" name="name" value={clientName} onChange={(e) => setClientName(e.target.value)}>
                        <option> Employee Name </option>
                        <option value="Test1"> Test1 </option>
                        <option value="Test2"> Test2 </option>
                        <option value="Test3"> Test3 </option>
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