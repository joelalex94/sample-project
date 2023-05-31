import React,{useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {db, storage} from '../../firebase';
import { collection, addDoc, getDoc , doc} from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { format, addDays } from 'date-fns';

const EditOrder = () => {
    return ( 

        <h1>Edit Order</h1>
     );
}
 
export default EditOrder;