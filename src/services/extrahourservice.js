import {db} from "../firebase";

import { collection, getDocs, getDoc, addDoc , updateDoc, deleteDoc, doc } from "firebase/firestore";

const orderCollectionRef = collection(db,"extraHours");

class ExtraHourDataService{

    addExtraHour = (newExtraHour) => {
        return addDoc(orderCollectionRef, newExtraHour);
    }

    updateExtraHour = (id,updatedExtraHour) => {

        const orderDoc=doc(db, "extraHours", id);

        return updateDoc(orderDoc, updatedExtraHour);

    }
    
    deleteExtraHour = (id) => {

        const orderDoc=doc(db, "extraHours", id);
        return deleteDoc(orderDoc)
    }

    getAllExtraHours = () => {
        return getDoc(orderCollectionRef);
    }

    getExtraHour = (id) => {
        const orderDoc = doc(db, "extraHours", id);
        return getDoc(orderDoc);
    }
    
}


export default new ExtraHourDataService();