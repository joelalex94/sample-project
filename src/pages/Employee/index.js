import { collection, getDocs, query, where } from "firebase/firestore";
import {db} from '../../firebase';
import { useState ,useEffect  } from 'react';
import {Link} from "react-router-dom";
import EmployeeDataService from '../../services/employeeservice';
import DataTable from "react-data-table-component";
import Sidebars from '../../components/Sidebar';

import { MenuUnfoldOutlined,MenuFoldOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { Layout, Menu, theme ,Button ,Card, Table,Space, Input,Form,Row,Col,Select, Popconfirm} from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

const Employee = () => {
    const [collapsed, setCollapsed] = useState(false);
    
    const [employees, setEmployees] = useState([]); 
    const [search, setSearch] = useState(''); 
    const [searchDesignation, setSearchDesignation] = useState('');
    const [filteremployees, setFilterEmployees] = useState([]); 

    // const columns = [
    //     {name : "No", selector:(row) => row.no},
    //     {name : "Employee Name", selector:(row) => row.clientName, sortable:true},
    //     {name : "Designation", selector:(row) => row.designation, sortable:true},
    //     {name : "Phone", selector:(row) => row.phone},
    //     {   
    //         name:"Action",
    //         cell: (row ) =>[ 
    //             <Link to={`/employee/editemployee/${row.id}`}><button type="button" className="btn btn-secondary m-1"><i className="bi bi-pencil"></i></button></Link>,
    //             <button type="button" className="btn btn-danger m-1"  onClick={(e) => deleteHandler(row.id)}><i className="bi bi-trash"></i></button>
    //         ]
 
    //     },
       
      
    // ];

    const columns = [
        {title : "No", dataIndex:"key",},
        {title : "Client Name", dataIndex:"clientName",align:"center",showOnResponse: true,showOnDesktop: true, sorter: (a,b) => a.clientName.length - b.clientName.length},
        {title : "Designation", dataIndex:"designation",align:"center",showOnResponse: true,showOnDesktop: true},
        {title : "Phone", dataIndex:"phone",align:"center",showOnResponse: true,showOnDesktop: true},
        
        
        {title : "Action", key:"action",align:"center", render: (action) => (<Space size="middle">  <Link to={`/employee/editemployee/${action.id}`}><button type="button" className="btn btn-secondary m-1"><EditOutlined /></button></Link> <Popconfirm title="Delete Employee" description="Are you sure you want to delete this employee?" onConfirm={(e) => deleteHandler(action.id)}> <button type="button" className="btn btn-danger m-1" ><DeleteOutlined /></button></Popconfirm></Space>),},
       
      
    ];

    const fetchPost = async () => {
       
        await getDocs(collection(db, "employees"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc,index) => ({...doc.data(), id:doc.id, key:index+1}));
                    setEmployees(newData);                
                    setFilterEmployees(newData);
                console.log(newData.length);
            })
       
    }

    useEffect(()=>{
        fetchPost();
    }, [])
    useEffect(()=>{
        const result = employees.filter(employee =>{
            return employee.clientName?.toLowerCase().match(search?.toLowerCase());
        });

        setFilterEmployees(result);
    }, [search])
    useEffect(()=>{
        if(searchDesignation == "all"){
            const result = employees;
            setFilterEmployees(result);
        }else{
            const result = employees.filter(employee =>{
                return employee.designation?.toLowerCase().match(searchDesignation?.toLowerCase());
            
            });
            setFilterEmployees(result);
        }
        
    }, [])

    const deleteHandler = async (id) => {
         await EmployeeDataService.deleteEmployee(id);
         fetchPost();
    }

    const {
        token: { colorBgContainer },
      } = theme.useToken();

      const filterDesignation = async (value) => {
        console.log(value);
        setSearchDesignation(value);
        const q = query(collection(db, "employees"),where('designation','==',value));
            const querySnapshot = await getDocs(q);
            const response = querySnapshot.docs
                .map((doc,index) => ({...doc.data(), id:doc.id, key:index+1}));       
                setFilterEmployees(response);           
                console.log(response);
      } 

    return ( 
        // <>
        //     <div className="container">
        //         <div className="card">
        //             <div className="card-header">
        //                 Employees
        //             </div>

        //             <div className="card-body d-md-flex justify-content-md-end">
        //                 {/* <h5 className="card-title">Special title treatment</h5>
        //                 <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
        //                 <Link to='/employee/addemployee'> 
        //                     <label className="btn btn-primary ">Add Employee</label>
        //                 </Link>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="container">
        //         <div className="card">
        //             <div >
        //             <DataTable
        //                     title="Employee List"
        //                     keyField='id'
        //                     columns={columns} 
        //                     data={filteremployees}
        //                     pagination
        //                     fixedHeader
        //                     highlightOnHover
        //                     subHeader
        //                     subHeaderComponent={
        //                         [<input type="text" placeholder="search here" className="w-25 form-control" value={search} onChange={(e) => setSearch(e.target.value)}/>,
        //                         <select id="designation" className="form-select w-25 form-control" placeholder="designation" name="searchDesignation"value={searchDesignation } onChange={(e) => setSearchDesignation(e.target.value)} >
        //                             <option value="all"> All</option>
        //                             <option value="Test1"> Test1 </option>
        //                             <option value="Test2"> Test2</option>
        //                             <option value="Test3"> Test3 </option>
                                    
        //                         </select>,
        //                         ]
        //                     }

        //                 />
        //             {/* <table className="table">
        //                 <thead>
        //                     <tr>
        //                     <th scope="col">#</th>
        //                     <th scope="col">Employee Name</th>
        //                     <th scope="col">Designation</th>
        //                     <th scope="col">Phone</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                 {employees.map((item,index) => (
                            
        //                     <tr key={item.id}>
        //                         <th scope="row">{index+1}</th>
        //                         <td>{item.clientName}</td>
        //                         <td>{item.designation}</td>
        //                         <td>{item.phone}</td>
                                
        //                         <td>
        //                             <div className="d-flex ms-auto">
        //                                 <button type="button" className="btn btn-secondary mt-0 me-0"><i className="bi bi-pencil"></i></button>
        //                                 <button type="button" className="btn btn-success mt-0 me-0"><i className="bi bi-eye"></i></button>
        //                             </div>
        //                         </td>
        //                     </tr>
        //                 ))}
        //                 </tbody>
        //                 </table> */}
        //             </div>
        //         </div>
        //     </div>

        // </>

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
    
    <Card title="Employees" extra={<Link to='/employee/addemployee'> <label className="btn btn-primary ">Add Employee</label></Link>}>
        
                    <Space>
                        <Form className="ant-advanced-search-form" >
                            <Row gutter={24}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} key={''} style={{ display:  'block' }}>
                                    <Form.Item 
                                        label="Search Client Name"
                                        
                                    >
                                        <Input 
                                            placeholder="search client name"
                                            value={search} 
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={12} sm={12} md={12} lg={12} xl={12}  key={''} style={{ display:  'block' }}>
                            
                                <Form.Item
                                    name="searchDesignation"
                                    label="Designation"
                                    
                                    >
                                    <Select placeholder="select a designation"  onChange={ filterDesignation}>
                                        <Option value="Test1"> Test1 </Option>
                                        <Option value="Test2"> Test2</Option>
                                        <Option value="Test3"> Test3 </Option>
                                        <Option value="Test4"> Test4 </Option>
                                    </Select>
                                </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <Form className="ant-advanced-search-form" onFinish={filteremployees} >
                            <Row gutter={24}>
                            
                            <Col span={4}style={{ display:  'block' }} >
                                <Button type="primary" htmlType="submit">Search</Button>
                                
                            </Col>
                            </Row>
                        </Form>
                    </Space>
                    <Table columns={columns} dataSource={filteremployees} pagination={{ pageSize: 50 }} bordered scroll={{ x: "50vh" }} size="small"/>

    </Card>

</Content>
</Layout>
</>
     );
}
 
export default Employee;