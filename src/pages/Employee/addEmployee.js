import React,{useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {db} from '../../firebase';
import { collection, addDoc } from "firebase/firestore";
import EmployeeDataService from '../../services/employeeservice';

const AddEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [clientName, setClientName] = useState('');
    const [designation, setDesignation] = useState('');
    const [phone, setPhone] = useState('');

    const [message, setMessage] =useState({error : false, msg : ""});
    const {id} = useParams();

    const history = useNavigate ();
    const fetchEmployee = async (para) => {
       
        try {
            const docSnap = await EmployeeDataService.getEmployee(id);
            console.log(docSnap.data());
            setClientName(docSnap.data().clientName);
            setDesignation(docSnap.data().designation);
            setPhone(docSnap.data().phone);
           
          } catch (error) {
            console.error ('Error fetching item: ', error);
        }
       
    }

    useEffect(()=>{
        if(id !== undefined && id !== ""){
            fetchEmployee();
        }
        
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();  
        setMessage("");

        const newEmployee = {
            clientName : clientName, 
            designation: designation,
            phone : phone, 
            
        }

        try{

            if(id !== undefined && id !== ""){
                
                await EmployeeDataService.updateEmployee(id, newEmployee);
    
                setMessage({error:false, msg:"New employee added successfully!"});
                history('/employee');
            }else{
    
                await EmployeeDataService.addEmployee(newEmployee);
    
                setMessage({error:false, msg:"New Employee added successfully!"});
                history('/employee');
            }
            
        }catch(err){
            setMessage({error: true, msg : err.message});
            console.log(err)
        }
        
    }
    
    return (

        <div>
            <h2>{id !== undefined && id !== "" ? `Edit Employee  ${id}` : "Add Employee"}</h2>
            <div className="container">
                
                <form className="row g-3" onSubmit={handleSubmit} >
                    
                    <div className="col-md-6">
                       
                        <input type="text" className="form-control" id="clientName" name="clientName" placeholder="Full Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
                    </div>
                    <div className="col-md-6">
                        
                        <select id="designation" className="form-select" placeholder="designation" name="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} >
                        <option> Designation </option>
                        <option value="Test1"> Test1 </option>
                        <option value="Test2"> Test2 </option>
                        <option value="Test3"> Test3 </option>
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