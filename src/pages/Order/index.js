import { collection, getDocs } from "firebase/firestore";
import {db} from '../../firebase';
import { useState ,useEffect  } from 'react';
import "./index.css";
import {Link} from "react-router-dom";



const Order = () => {


    const [items, setItems] = useState([]); 


    const fetchPost = async () => {
       
        await getDocs(collection(db, "items"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                    setItems(newData);                
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
                        Orders
                    </div>

                    <div className="card-body d-md-flex justify-content-md-end">
                        {/* <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                        <Link to='/order/addorder'> 
                            <label className="btn btn-primary ">Add Orders</label>
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
                            <th scope="col">Order Date</th>
                            <th scope="col">Delivery Date</th>
                            <th scope="col">Client Name</th>
                            <th scope="col">Client Source</th>
                            <th scope="col">Address</th>
                            <th scope="col">Address Info</th>
                            <th scope="col">Status</th>
                            <th scope="col">Notes</th>
                            <th scope="col">Actions</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                     
                        {items.map((item,index) => (
                            
                            <tr key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td>{item.orderDate}</td>
                                <td>{item.deliveryDate}</td>
                                <td>{item.clientName}</td>
                                <td>{item.clientSource}</td>
                                <td>{item.address}</td>
                                <td>{item.addressInfo}</td>
                                <td>{item.status}</td>
                                <td>{item.notes}</td>
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
 
export default Order;