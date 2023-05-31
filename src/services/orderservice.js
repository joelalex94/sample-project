import {db} from "../firebase";

import { collection, getDocs, getDoc, addDoc , updateDoc, deleteDoc, doc } from "firebase/firestore";

const orderCollectionRef = collection(db,"items");

class OrderDataService{

    addOrder = (newOrder) => {
        return addDoc(orderCollectionRef, newOrder);
    }

    updateOrder = (id,updatedOrder) => {

        const orderDoc=doc(db, "items", id);

        return updateDoc(orderDoc, updatedOrder);

    }
    
    deleteOrder = (id) => {

        const orderDoc=doc(db, "items", id);
        return deleteDoc(orderDoc)
    }

    getAllOrder = () => {
        return getDoc(orderCollectionRef);
    }

    getOrder = (id) => {
        const orderDoc = doc(db, "items", id);
        return getDoc(orderDoc);
    }
}


export default new OrderDataService();