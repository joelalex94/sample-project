import { collection, getDocs } from "firebase/firestore";
import {db} from '../../firebase';
import { useState ,useEffect  } from 'react';
import "./index.css";
import {Link} from "react-router-dom";
import OrderDataService from '../../services/orderservice';
// import BootstrapTable from "react-bootstrap-table-next";
// import'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
// import paginationFactory from "react-bootstrap-table2-paginator";
import DataTable from "react-data-table-component";



const Order = () => {


    const [items, setItems] = useState([]); 
    const [search, setSearch] = useState(''); 
    const [filteritems, setFilterItems] = useState([]); 

    const columns = [
        {name : "No", selector:(row) => row.no},
        {name : "Order Date", selector:(row) => row.orderDate, sortable:true},
        {name : "Delivery Date", selector:(row) => row.deliveryDate, sortable:true},
        {name : "Client Name", selector:(row) => row.clientName, sortable:true},
        {name : "Client Source", selector:(row) => row.clientSource, sortable:true},
        {name : "Address", selector:(row) => row.address},
        {name : "Address Info", selector:(row) => row.addressInfo},
        {name : "Status", selector:(row) => row.status, sortable:true},
        {name : "Notes", selector:(row) => row.notes},
        {   
            name:"Action",
            cell: (row ) =>[ 
                <Link to={`/order/editorder/${row.id}`}><button type="button" className="btn btn-secondary m-1"><i className="bi bi-pencil"></i></button></Link>,
                <button type="button" className="btn btn-success m-1"><i className="bi bi-eye"></i></button>,
                <button type="button" className="btn btn-danger m-1"  onClick={(e) => deleteHandler(row.id)}><i className="bi bi-trash"></i></button>
            ]
 
        },
       
      
    ];
  

    const fetchPost = async () => {
       
        await getDocs(collection(db, "items"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc,index) => ({...doc.data(), id:doc.id, no:index+1}));
                    setItems(newData);        
                    setFilterItems(newData);           
                console.log(newData.length);
            })
       
    }

    useEffect(()=>{
        fetchPost();
    }, [])
    useEffect(()=>{
        const result = items.filter(item =>{
            return item.clientName?.toLowerCase().match(search?.toLowerCase());
        });

        setFilterItems(result);
    }, [search])

    const deleteHandler = async (id) => {
         await OrderDataService.deleteOrder(id);
         fetchPost();
    }


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
                    <div >

                        <DataTable
                            title="Order List"
                            keyField='id'
                            columns={columns} 
                            data={filteritems}
                            pagination
                            fixedHeader
                            highlightOnHover
                            subHeader
                            subHeaderComponent={
                                <input type="text" placeholder="search here" className="w-25 form-control" value={search} onChange={(e) => setSearch(e.target.value)}/>
                            }

                        />

                    {/* <table className="table">
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
                                        <Link to={`/order/editorder/${item.id}`}>
                                            <button type="button" className="btn btn-secondary m-1"><i className="bi bi-pencil"></i></button>
                                        </Link>
                                        <button type="button" className="btn btn-success m-1"><i className="bi bi-eye"></i></button>
                                        <button type="button" className="btn btn-danger m-1"  onClick={(e) => deleteHandler(item.id)}><i className="bi bi-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                           
                            
                        </tbody>
                        </table> */}
                    </div>
                </div>
            </div>

        </>
     );
}
 
export default Order;