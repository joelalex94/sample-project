import {db} from "../firebase";

import { collection, getDocs, getDoc, addDoc , updateDoc, deleteDoc, doc } from "firebase/firestore";

const orderCollectionRef = collection(db,"employees");

class EmployeeDataService{

    addEmployee = (newEmployee) => {
        return addDoc(orderCollectionRef, newEmployee);
    }

    updateEmployee = (id,updatedEmployee) => {

        const orderDoc=doc(db, "employees", id);

        return updateDoc(orderDoc, updatedEmployee);

    }
    
    deleteEmployee = (id) => {

        const orderDoc=doc(db, "employees", id);
        return deleteDoc(orderDoc)
    }

    getAllEmployees = () => {
        return getDoc(orderCollectionRef);
    }

    getEmployee = (id) => {
        const orderDoc = doc(db, "employees", id);
        return getDoc(orderDoc);
    }
    
}


export default new EmployeeDataService();