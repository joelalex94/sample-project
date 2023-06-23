import React,{useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {db} from '../../firebase';
import { collection, addDoc } from "firebase/firestore";
import EmployeeDataService from '../../services/employeeservice';

import Sidebars from '../../components/Sidebar';

import { MenuUnfoldOutlined,MenuFoldOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { Layout, Menu, theme ,Button ,Card, Table,Space, Input,Form,Row,Col,Select} from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { TextArea } = Input;

const AddEmployee = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [clientName, setClientName] = useState('');
    const [designation, setDesignation] = useState('');
    const [phone, setPhone] = useState('');

    const [message, setMessage] =useState({error : false, msg : ""});
    const {id} = useParams();
    const [form] = Form.useForm();

    const history = useNavigate ();
    const fetchEmployee = async (para) => {
       
        try {
            const docSnap = await EmployeeDataService.getEmployee(id);
            
            setEmployees(docSnap.data());
            const response=docSnap.data();
            form.setFieldsValue({ clientName: response.clientName,designation: response.designation,phone:response.phone });
            setClientName(docSnap.data().clientName);
            setDesignation(docSnap.data().designation);
            setPhone(docSnap.data().phone);
           
          } catch (error) {
            console.error ('Error fetching item: ', error);
        }
       
    }

    React.useEffect(()=>{
        if(id !== undefined && id !== ""){
            fetchEmployee();
        }
        
    }, [id])

    const handleSubmit = async (values) => {
        // e.preventDefault();  
        setMessage("");

        // const newEmployee = {
        //     clientName : clientName, 
        //     designation: designation,
        //     phone : phone, 
            
        // }
        const newEmployee = values

        try{

            if(id !== undefined && id !== ""){
                
                await EmployeeDataService.updateEmployee(id, newEmployee);
    
                setMessage({error:false, msg:"New employee added successfully!"});
                history('/employee');
            }else{
    
                await EmployeeDataService.addEmployee(newEmployee);
    
                setMessage({error:false, msg:"New Employee added successfully!"});
                history('/employee');
            }
            
        }catch(err){
            setMessage({error: true, msg : err.message});
            console.log(err)
        }
        
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
                {/* <h2>{id !== undefined && id !== "" ? `Edit Employee  ${id}` : "Add Employee"}</h2> */}
                <Card title={id !== undefined && id !== "" ? `Edit Employee  ${id}` : "Add Employee"}>
                    <Form form={form}  onFinish={handleSubmit} >
                        <Row gutter={[16, 16]}>
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}  key={''} style={{ display:  'block' }}>
                            {/* <input type="text" className="form-control" id="clientName" name="clientName" placeholder="Full Name" value={clientName} onChange={(e) => setClientName(e.target.value)} /> */}
                            <Form.Item 
                                label="Client Name"
                                name="clientName"
                                rules = {[{
                                    required: true,
                                    message: 'Input something!',
                                }
                                ]}
                            >
                                <Input placeholder={employees !== undefined && employees !== "" ? `${employees.clientName}` : "Please enter a Client Name"} value={clientName}  onChange={(e) => setClientName(e.target.value)} type="text"/>
                            
                            </Form.Item>
                            </Col>
                            
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}  key={''} style={{ display:  'block' }}>
                            {/* <select id="designation" className="form-select" placeholder="designation" name="designation" value={designation} onChange={(e) => setDesignation(e.target.value)} >
                            <option> Designation </option>
                            <option value="Test1"> Test1 </option>
                            <option value="Test2"> Test2 </option>
                            <option value="Test3"> Test3 </option>
                            </select> */}
                            <Form.Item
                                name="designation"
                                label="Designation"
                                rules={[{ required: true, message: 'Please select designation!' }]}
                                >
                                <Select placeholder={employees !== undefined && employees !== "" ? `${employees.designation}` : "Please select a designation"}  value={designation} >
                                    <Option value="Test1"> Test1 </Option>
                                    <Option value="Test2"> Test2</Option>
                                    <Option value="Test3"> Test3 </Option>
                                    <Option value="Test4"> Test4 </Option>
                                </Select>
                            </Form.Item>
                            </Col>
                        </Row>
                        
                        <Row gutter={[16, 16]} className="pt-4">
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}  key={''} style={{ display:  'block' }}>
                            {/* <input type="number" className="form-control" id="phone" name="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} /> */}
                            <Form.Item 
                                label="Phone"
                                name="phone"
                                rules = {[{
                                    required: true,
                                    message: 'Input phone number!',
                                }
                                ]}
                            >
                                
                                
                                <Input placeholder={employees !== undefined && employees !== "" ? `${employees.phone}` : "Please enter a Phone number"} value={phone} onChange={(e) => setPhone(e.target.value)} rows={4}/>
                            </Form.Item>
                            </Col>
                            
                            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            {/* <button type="submit" className="btn btn-primary">Save</button> */}
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

export default AddEmployee;