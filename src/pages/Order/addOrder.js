import React,{useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import db from '../../firebase';

const initialState ={
    orderDate:"",
    deliveryDate:"",
    clientName:"",
    clientSource:"",
    address:"", 
    addressInfo:"",
    status:"",
    attachments:"",
    notes:""
}
const AddOrder = () => {
    const [state,setState] = useState(initialState);
    const [data,setData]= useState({})

    const {orderDate,deliveryDate,clientName,clientSource,address,addressInfo,status,attachments,notes} = state;
    return ( 
        <div>
            <h2>Add Order</h2>
        </div>
     );
}
 
export default AddOrder;