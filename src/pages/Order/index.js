import { collection, getDocs } from "firebase/firestore";
import {db} from '../../firebase';
import { useState ,useEffect  } from 'react';
import "./index.css";
import {Link} from "react-router-dom";
import OrderDataService from '../../services/orderservice';
import BootstrapTable from "react-bootstrap-table-next";
import'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
import paginationFactory from "react-bootstrap-table2-paginator";



const Order = () => {


    const [items, setItems] = useState([]); 

    const columns = [
        {dataField:  'no' , text : "No"},
        {dataField:'orderDate', text : "Order Date", sort:true},
        {dataField:'deliveryDate', text : "Delivery Date", sort:true},
        {dataField:'clientName', text : "Client Name", sort:true},
        {dataField:'clientSource', text : "Client Source"},
        {dataField:'address', text : "Address"},
        {dataField:'addressInfo', text : "Address Info"},
        {dataField:'status', text : "Status", sort:true},
        {dataField:'notes', text : "Notes"},
      
    ]
    const pagination = paginationFactory({
        page : 0, // Specify the current page. It's necessary when remote is enabled
        sizePerPage : 5, // Specify the size per page. It's necessary when remote is enabled
        
        pageStartIndex: 0, // first page will be 0, default is 1
        paginationSize: 3,  // the pagination bar size, default is 5
        showTotal: true, // display pagination information
       
        alwaysShowAllBtns: true, // always show the next and previous page button
        firstPageText: 'First', // the text of first page button
        prePageText: 'Prev', // the text of previous page button
        nextPageText: 'Next', // the text of next page button
        lastPageText: 'Last', // the text of last page button
       
        onPageChange: (page, sizePerPage) => {
            console.log('page',page);
            console.log('sizePerPage',sizePerPage);
        }, // callback function when page was changing
        onSizePerPageChange: (sizePerPage, page) => {
            console.log('page',page);
            console.log('sizePerPage',sizePerPage);
        }// callback function when page size was changing
     
      });
   


    const fetchPost = async () => {
       
        await getDocs(collection(db, "items"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc,index) => ({...doc.data(), id:doc.id, no:index+1}));
                    setItems(newData);                
                console.log(newData.length);
            })
       
    }

    useEffect(()=>{
        fetchPost();
    }, [])

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

                        <BootstrapTable 
                            bootstrap4 
                            keyField='id' 
                            columns={columns} 
                            data={items}
                            pagination={pagination}
                            

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