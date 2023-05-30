import React,{useState, useEffect} from "react";
import {useHistory, useParams} from "react-router-dom";
import {db, storage} from '../../firebase';
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";



const AddOrder = () => {
    // const [items, setItems] = useState([]);
    const [file, setFile] = useState(null);
    const [orderDate, setOrderDate] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [clientName, setClientName] = useState('');
    const [clientSource, setClientSource] = useState('');
    const [address, setAddress] = useState('');
    const [addressInfo, setAddressInfo] = useState('');
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');
    const [fileUrl, setFileUrl] = useState('');

    const [percent, setPercent] = useState(0);
    
   
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    // const handleDate = (e) => {
    //     var date = new Date(e.target.value);
    //     setOrderDate(date);
    //     setDeliveryDate(date  + 1);
    //     console.log( new Date(orderDate).toISOString() ,  e.target.value);
    // }


    const handleSubmit = async (e) => {
        e.preventDefault();  
       
        
        try {
            if (!file) {
                alert("Please upload an image first!");
            }
     
            const storageRef = ref(storage, `/files/${file.name}`);
            
            // progress can be paused and resumed. It also exposes progress updates.
            // Receives the storage reference and the file to upload.
            const uploadTask = uploadBytesResumable(storageRef, file);
            
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
     
                    // update progress
                    setPercent(percent);
                },
                (err) => console.log(err),
                () => {
                    // download url
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        const uls = url;
                        setFileUrl(uls);
                    });
                }
            );
           

            const docRef = await addDoc(collection(db, "items"), {
              orderDate:orderDate, deliveryDate:deliveryDate,clientName:clientName,clientSource:clientSource,address:address,addressInfo:addressInfo, status:status,notes:notes,file:fileUrl, 
            });
            console.log("Document written with ID: ", docRef.id  , fileUrl);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    
    return ( 
        <div>
            <h2>Add Order</h2>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        Orders
                    </div>
                    <div className="card-body d-md-flex justify-content-md-end">
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-md-6">
                                <label htmlFor="orderDate" className="form-label">Order Date</label>
                                <input type="date" className="form-control" id="orderDate" name="orderDate"  value={orderDate}  onChange={(e) => setOrderDate(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="deliveryDate" className="form-label">Delivery Date</label>
                                <input type="date" className="form-control" id="deliveryDate" name="deliveryDate"  value={deliveryDate}  onChange={(e) => setDeliveryDate(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="clientName" className="form-label">Client Name</label>
                                <input type="text" className="form-control" id="clientName" name="clientName"  value={clientName}  onChange={(e) => setClientName(e.target.value)}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="clientSource" className="form-label">Client Source</label>
                                <input type="text" className="form-control" id="clientSource" name="clientSource"  value={clientSource}  onChange={(e) => setClientSource(e.target.value)}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="address" className="form-label">Address</label>
                                <textarea type="text" className="form-control" id="address" placeholder="1234 Main St" name="address" value={address}  onChange={(e) => setAddress(e.target.value)}> 
                                
                                </textarea>
                                
                            </div>
                            <div className="col-12">
                                <label htmlFor="addressInfo" className="form-label">Address Info</label>
                                <textarea type="text" className="form-control" id="addressInfo" placeholder="Apartment, studio, or floor" name="addressInfo" value={addressInfo}  onChange={(e) => setAddressInfo(e.target.value)}></textarea>
                                
                            </div>
                            {/* <div className="col-md-6">
                                <label htmlFor="inputCity" className="form-label">City</label>
                                <input type="text" className="form-control" id="inputCity"/>
                            </div> */}
                            <div className="col-md-6">
                                <label htmlFor="status" className="form-label">Status</label>
                                <select id="status" className="form-select" placeholder="status" name="status"value={status} onChange={(e) => setStatus(e.target.value)} >
                                <option> Status </option>
                                <option value="pending"> Pending </option>
                                <option value="in-progress"> In Progress</option>
                                <option value="completed"> Completed </option>
                                </select>
                            </div>
                            
                            <div className="col-md-6">
                                <label htmlFor="attachments" className="form-label">Attachments</label>
                                <input type="file" className="form-control" id="attachments" name="attachments"  value={''} onChange={handleFileChange}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="notes" className="form-label">Notes</label>
                                <textarea type="text" className="form-control" id="notes" placeholder="1234 Main St" name="notes" value={notes} onChange={(e) => setNotes(e.target.value)}> 
                                
                                </textarea>
                                
                            </div>
                            
                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
     );
}
 
export default AddOrder;