import { collection, getDocs } from "firebase/firestore";
import {db} from '../../firebase';
import { useState ,useEffect  } from 'react';
import {Link} from "react-router-dom";

const ExtraHour = () => {

    const [extraHours, setExtraHours] = useState([]); 

    const fetchPost = async () => {
       
        await getDocs(collection(db, "extraHours"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                    setExtraHours(newData);                
                console.log(newData.length);
            })
       
    }

    useEffect(()=>{
        fetchPost();
    }, [])

    return ( 
        <>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        Extra Hours
                    </div>

                    <div className="card-body d-md-flex justify-content-md-end">
                        {/* <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                        <Link to='/extra-hours/addhour'> 
                            <label className="btn btn-primary ">Add Extra Hours</label>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="card">
                    <div className="card-body d-md-flex justify-content-md-end">
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                        {extraHours.map((item,index) => (
                            
                            <tr key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td>{item.orderDate}</td>
                                <td>{item.clientName}</td>
                                <td>{item.hours}</td>
                                
                                <td>
                                    <div className="d-flex ms-auto">
                                        <button type="button" className="btn btn-secondary mt-0 me-0"><i className="bi bi-pencil"></i></button>
                                        <button type="button" className="btn btn-success mt-0 me-0"><i className="bi bi-eye"></i></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
     );
}
 
export default ExtraHour;