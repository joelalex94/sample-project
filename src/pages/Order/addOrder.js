import React,{useState, useEffect} from "react";
import {useNavigate , useParams} from "react-router-dom";
import {db, storage} from '../../firebase';
import { collection, addDoc, getDoc , getDocs, doc} from "firebase/firestore";
import { getDownloadURL, uploadBytesResumable, ref } from "firebase/storage";
import { format, addDays } from 'date-fns';
import OrderDataService from '../../services/orderservice';
import { Alert } from "bootstrap";

import Sidebars from '../../components/Sidebar';

import { MenuUnfoldOutlined,MenuFoldOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { Layout, Menu, theme ,Button ,Card, Table,Space, Input,Form,Row,Col,Select,Upload} from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const AddOrder = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [items, setItems] = useState([]);
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

    const [message, setMessage] =useState({error : false, msg : ""});
    const {id} = useParams();

    const history = useNavigate ();
    const fetchOrder = async (para) => {
       
        try {
            const docSnap = await OrderDataService.getOrder(id);
            setItems(docSnap.data());
            setOrderDate(docSnap.data().orderDate);
            setDeliveryDate(docSnap.data().deliveryDate);
            setClientSource(docSnap.data().clientSource);
            setClientName(docSnap.data().clientName);
            setAddress(docSnap.data().address);
            setAddressInfo(docSnap.data().addressInfo);
            setStatus(docSnap.data().status);
            setNotes(docSnap.data().notes);
            setFile(docSnap.data().file);
           
          } catch (error) {
            console.error ('Error fetching item: ', error);
        }
       
    }

    useEffect(()=>{
        if(id !== undefined && id !== ""){
            fetchOrder();
        }
        
    }, [id])

    
    useEffect(() => {
        // Get the current date
        const today = new Date();
    
        // Format the start date as 'yyyy-mm-dd'
        const formattedStartDate = format(today, 'yyyy-MM-dd');
    
        // Add 15 days to the current date
        const futureDate = addDays(today, 15);
    
        // Format the end date as 'yyyy-mm-dd'
        const formattedEndDate = format(futureDate, 'yyyy-MM-dd');
    
        // Set the values of start and end dates in state
        setOrderDate(formattedStartDate);
        setDeliveryDate(formattedEndDate);
      }, []);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const handleDate = (e) => {
        const date = new Date(e.target.value);
        const currentDate = format(date, 'yyyy-MM-dd');
        const deadlineDate = addDays(date, 15);
        const modifiedDeadlineDate = format(deadlineDate, 'yyyy-MM-dd');

        setOrderDate(currentDate);
        setDeliveryDate(modifiedDeadlineDate);
        
        
    }


    const handleSubmit = async (values) => {
        // e.preventDefault();  
        values.file = fileUrl;
        console.log(values);
        setMessage("");

        // const newOrder = {
        //     file : fileUrl, 
        //     orderDate : orderDate, 
        //     deliveryDate : deliveryDate, 
        //     clientName : clientName, 
        //     clientSource: clientSource,
        //     address : address, 
        //     addressInfo : addressInfo,
        //     status : status,
        //     notes :notes
        // }
        // console.log(newOrder);
        const newOrder = values
        

        try{

            if(id !== undefined && id !== ""){
                
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
                await OrderDataService.updateOrder(id, newOrder);
    
                setMessage({error:false, msg:"New order added successfully!"});
                history('/order');
            }else{
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
                
                // await OrderDataService.addOrder(newOrder);
    
                await OrderDataService.addOrder(newOrder);
    
                setMessage({error:false, msg:"New order added successfully!"});
                history('/order');
            }
            
        }catch(err){
            setMessage({error: true, msg : err.message});
            console.log(err)
        }
        
        // try {
        //     if (!file) {
        //         alert("Please upload an image first!");
        //     }
     
        //     const storageRef = ref(storage, `/files/${file.name}`);
            
        //     // progress can be paused and resumed. It also exposes progress updates.
        //     // Receives the storage reference and the file to upload.
        //     const uploadTask = uploadBytesResumable(storageRef, file);
            
        //     uploadTask.on(
        //         "state_changed",
        //         (snapshot) => {
        //             const percent = Math.round(
        //                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //             );
     
        //             // update progress
        //             setPercent(percent);
        //         },
        //         (err) => console.log(err),
        //         () => {
        //             // download url
        //             getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        //                 const uls = url;
        //                 setFileUrl(uls);
        //             });
        //         }
        //     );
           

        //     const docRef = await addDoc(collection(db, "items"), {
        //       orderDate:orderDate, deliveryDate:deliveryDate,clientName:clientName,clientSource:clientSource,address:address,addressInfo:addressInfo, status:status,notes:notes,file:fileUrl, 
        //     });
        //     console.log("Document written with ID: ", docRef.id  , fileUrl);
        //   } catch (e) {
        //     console.error("Error adding document: ", e);
        //   }
    }
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    
    return ( 
        <>
            <Sidebars ValueCollapsed={collapsed}/>
            <Layout style={{height: '100vh'}}>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                    >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                        fontSize: '16px',
                        width: 64,
                        height: 64,
                        }}
                    />
                </Header>

            
                <Content>
                            {/* <h2>{id !== undefined && id !== "" ? `Edit Order  ${id}` : "Add Order"}</h2> */}
                    
                            {/* <div className="card-header">
                                {id !== undefined && id !== "" ? `Edit Order  ${id}` : "Add Order"}
                            </div>
                            <div className="card-body d-md-flex justify-content-md-end">
                                <form className="row g-3" onSubmit={handleSubmit}>
                                    <div className="col-md-6">
                                        <label htmlFor="orderDate" className="form-label">Order Date</label>
                                        <input type="date" className="form-control" id="orderDate" name="orderDate"  value={orderDate} min={orderDate}  onChange={handleDate}/>
                                        
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="deliveryDate" className="form-label">Delivery Date</label>
                                        <input type="date" className="form-control" id="deliveryDate" name="deliveryDate"  value={deliveryDate } min={deliveryDate}  max={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)}/>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="clientName" className="form-label">Client Name</label>
                                        <input type="text" className="form-control" id="clientName" name="clientName"  value={clientName}  onChange={(e) => setClientName(e.target.value)}/>
                                    </div>
                                
                                    <div className="col-md-6">
                                        <label htmlFor="clientSource" className="form-label">Status</label>
                                        <select id="clientSource" className="form-select" placeholder="clientSource" name="clientSource"value={clientSource } onChange={(e) => setClientSource(e.target.value)} >
                                        <option> Client Source </option>
                                        <option value="Google"> Google </option>
                                        <option value="Website"> Website</option>
                                        <option value="Marketing"> Marketing </option>
                                        <option value="Client Recommendation"> Client Recommendation </option>
                                        </select>
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
                                    {/* <div className="col-md-6">
                                        <label htmlFor="status" className="form-label">Status</label>
                                        <select id="status" className="form-select" placeholder="status" name="status"value={status } onChange={(e) => setStatus(e.target.value)} >
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
                                        <textarea type="text" className="form-control" id="notes" placeholder="1234 Main St" name="notes" value={notes } onChange={(e) => setNotes(e.target.value)}> 
                                        
                                        </textarea>
                                        
                                    </div>
                                    
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary">Sign in</button>
                                    </div>
                                </form>
                            </div> */} 
                        <Card title={id !== undefined && id !== "" ? `Edit Order  ${id}` : "Add Order"}>
                            <Form className="ant-advanced-search-form" onFinish={handleSubmit} >
                                <Row gutter={24}>
                                    <Col span={12} key={''} style={{ display:  'block' }}>
                                        <Form.Item 
                                            label="Order Date"
                                            name="orderDate"
                                            value
                                            rules = {[{
                                                required: true,
                                                message: 'Input something!',
                                            }
                                            ]}
                                        >
                                            <Input placeholder="placeholder" value={orderDate} min={orderDate}  onChange={handleDate} type="date"/>
                                        
                                        </Form.Item>
                                        
                                    </Col>
                                    <Col span={12} key={''} style={{ display:  'block' }}>
                                        <Form.Item 
                                            label="Delivery Date"
                                            name="deliveryDate"
                                            rules = {[{
                                                required: true,
                                                message: 'Input something!',
                                            }
                                            ]}
                                        >
                                            <Input placeholder="placeholder" value={deliveryDate } min={deliveryDate}  max={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} type="date"/>
                                        
                                        </Form.Item>
                                        
                                    </Col>
                                
                                
                                </Row>
                                <Row gutter={24}>
                                    <Col span={12} key={''} style={{ display:  'block' }}>
                                        <Form.Item 
                                            label="Client Name"
                                            name="clientName"
                                            rules = {[{
                                                required: true,
                                                message: 'Input something!',
                                            }
                                            ]}
                                        >
                                            <Input placeholder={items !== undefined && items !== "" ? `${items.clientName}` : "Please enter a Client Name"} value={clientName}  onChange={(e) => setClientName(e.target.value)} type="text"/>
                                        
                                        </Form.Item>
                                        
                                    </Col>
                                    <Col span={12} key={''} style={{ display:  'block' }}>
                                        <Form.Item
                                            name="clientSource"
                                            label="Client Source"
                                            hasFeedback
                                            rules={[{ required: true, message: 'Please select Client Source!' }]}
                                            >
                                            <Select placeholder="Please select a Client Source" >
                                                <Option value="Google"> Google </Option>
                                                <Option value="Website"> Website</Option>
                                                <Option value="Marketing"> Marketing </Option>
                                                <Option value="Client Recommendation"> Client Recommendation </Option>
                                            </Select>
                                        </Form.Item>
                                        
                                    </Col>
                                
                                    
                                </Row>
                                <Row gutter={24}>
                                    <Col span={24} key={''} style={{ display:  'block' }}>
                                        <Form.Item 
                                            label="Address"
                                            name="address"
                                            rules = {[{
                                                required: true,
                                                message: 'Input something!',
                                            }
                                            ]}
                                        >
                                           
                                          
                                            <TextArea value={address} onChange={(e) => setAddress(e.target.value)} rows={4}/>
                                        </Form.Item>
                                        
                                    </Col>
                                </Row>
                                <Row gutter={24}>
                                    <Col span={24} key={''} style={{ display:  'block' }}>
                                        <Form.Item 
                                            label="Address Info"
                                            name="addressInfo"
                                            rules = {[{
                                                required: true,
                                                message: 'Input something!',
                                            }
                                            ]}
                                        >
                                           
                                          
                                            <TextArea value={addressInfo} onChange={(e) => setAddressInfo(e.target.value)} rows={4}/>
                                        </Form.Item>
                                        
                                    </Col>
                                
                                    
                                </Row>
                                <Row gutter={24}>
                                    <Col span={12} key={''} style={{ display:  'block' }}>
                                        <Form.Item
                                            name="status"
                                            label="Status"
                                            hasFeedback
                                            rules={[{ required: true, message: 'Please select status!' }]}
                                            >
                                            <Select placeholder="Please select a status" value={status} >
                                                <Option value="pending"> Pending </Option>
                                                <Option value="in-progress"> In Progress</Option>
                                                <Option value="completed"> Completed </Option>
                                            </Select>
                                        </Form.Item>
                                        
                                    </Col>
                                    <Col span={12} key={''} style={{ display:  'block' }}>
                                        <Form.Item 
                                            label="Attachments"
                                            
                                            rules = {[{
                                                required: true,
                                                message: 'Input something!',
                                            }
                                            ]}
                                        >
                                            <Input placeholder="placeholder" value={''} onChange={handleFileChange} type="file"/>
                                            {/* <input type="file" className="form-control" id="attachments" name="attachments"  value={''} onChange={handleFileChange}/> */}
                                        </Form.Item>
                                        
                                    </Col>
                                
                                
                                </Row>
                                <Row gutter={24}>
                                    <Col span={24} key={''} style={{ display:  'block' }}>
                                        <Form.Item 
                                            label="Notes"
                                            name="notes"
                                            rules = {[{
                                                required: true,
                                                message: 'Input something!',
                                            }
                                            ]}
                                        >
                                           
                                          
                                            <TextArea value={notes} onChange={(e) => setNotes(e.target.value)} rows={4}/>
                                        </Form.Item>
                                        
                                    </Col>
                                
                                    
                                </Row>
                                <Row gutter={24}>
                                    <Col span={8} style={{ textAlign: 'left' }}>
                                        <Button type="primary" htmlType="submit">Submit</Button>
                                        
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                </Content>
            </Layout>  

        </>
     );
}
 
export default AddOrder;