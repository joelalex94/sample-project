import { collection, getDocs , query, refEqual, where} from "firebase/firestore";
import {db} from '../../firebase';
import { useState ,useEffect  } from 'react';
import "./index.css";
import {Link} from "react-router-dom";
import OrderDataService from '../../services/orderservice';
// import BootstrapTable from "react-bootstrap-table-next";
// import'react-bootstrap-table-next/dist/react-bootstrap-table2.css';
// import paginationFactory from "react-bootstrap-table2-paginator";
import DataTable from "react-data-table-component";
import Sidebars from '../../components/Sidebar';

import { MenuUnfoldOutlined,MenuFoldOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { Layout, Menu, theme ,Button ,Card, Table,Space, Input,Form,Row,Col} from 'antd';

const { Header, Content, Footer, Sider } = Layout;




const Order = () => {
    const [collapsed, setCollapsed] = useState(false);

    const [items, setItems] = useState([]); 
    const [search, setSearch] = useState(''); 
    const [searchClientSource, setSearchClientSource] = useState(''); 
    const [searchStatus, setSearchStatus] = useState(''); 
    const [filteritems, setFilterItems] = useState([]); 
    const [sortedInfo,setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    

    // const columns = [
    //     {name : "No", selector:(row) => row.no},
    //     {name : "Order Date", selector:(row) => row.orderDate, sortable:true},
    //     {name : "Delivery Date", selector:(row) => row.deliveryDate, sortable:true},
    //     {name : "Client Name", selector:(row) => row.clientName, sortable:true},
    //     {name : "Client Source", selector:(row) => row.clientSource, sortable:true},
    //     {name : "Address", selector:(row) => row.address},
    //     {name : "Address Info", selector:(row) => row.addressInfo},
    //     {name : "Status", selector:(row) => row.status, sortable:true},
    //     {name : "Notes", selector:(row) => row.notes},
    //     {   
    //         name:"Action",
    //         cell: (row ) =>[ 
    //             <Link to={`/order/editorder/${row.id}`}><button type="button" className="btn btn-secondary m-1"><i className="bi bi-pencil"></i></button></Link>,
    //             <button type="button" className="btn btn-danger m-1"  onClick={(e) => deleteHandler(row.id)}><i className="bi bi-trash"></i></button>
    //         ]
 
    //     },
       
      
    // ];
    const columns = [
        {title : "No", dataIndex:"key",},
        {title : "Order Date", dataIndex:"orderDate",align:"center",showOnResponse: true,showOnDesktop: true , sorter: (a,b) => a.orderDate.length - b.orderDate.length, scroll},
        {title : "Delivery Date", dataIndex:"deliveryDate",align:"center",showOnResponse: true,showOnDesktop: true, sorter: (a,b) => a.deliveryDate.length - b.deliveryDate.length},
        {title : "Client Name", dataIndex:"clientName",align:"center",showOnResponse: true,showOnDesktop: true, sorter: (a,b) => a.clientName.length - b.clientName.length},
        {title : "Client Source", dataIndex:"clientSource",align:"center",showOnResponse: true,showOnDesktop: true, sorter: (a,b) => a.clientSource.length - b.clientSource.length},
        {title : "Address", dataIndex:"address",align:"center",showOnResponse: true,showOnDesktop: true},
        {title : "Address Info", dataIndex:"addressInfo",align:"center",showOnResponse: true,showOnDesktop: true},
        {title : "Status", dataIndex:"status",align:"center",showOnResponse: true,showOnDesktop: true, sorter: (a,b) => a.status.length - b.status.length},
        {title : "Notes", dataIndex:"notes",align:"center",showOnResponse: true,showOnDesktop: true},
        {title : "Action", key:"action",align:"center", render: (action) => (<Space size="middle">  <Link to={`/order/editorder/${action.id}`}><button type="button" className="btn btn-secondary m-1"><EditOutlined /></button></Link> <button type="button" className="btn btn-danger m-1"  onClick={(e) => deleteHandler(action.id)}><DeleteOutlined /></button></Space>),},
        // {   
        //     name:"Action",
        //     cell: (row ) =>[ 
        //         <Link to={`/order/editorder/${row.id}`}><button type="button" className="btn btn-secondary m-1"><i className="bi bi-pencil"></i></button></Link>,
        //         <button type="button" className="btn btn-danger m-1"  onClick={(e) => deleteHandler(row.id)}><i className="bi bi-trash"></i></button>
        //     ]
 
        // },
       
      
    ];
  

    const fetchPost = async () => {
       
        await getDocs(collection(db, "items"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc,index) => ({...doc.data(), id:doc.id, key:index+1}));
                    setItems(newData);        
                    setFilterItems(newData);           
                console.log(newData.length);
            })
       
    }

    useEffect(()=>{
        fetchPost();
    }, [])
    useEffect(()=>{
        const result = items.filter(item =>{
            return item.clientName?.toLowerCase().match(search?.toLowerCase());
        });

        setFilterItems(result);
    }, [search])
    useEffect(()=>{
        if(searchClientSource == "all"){
            const result = items;
            setFilterItems(result);
        }else{
            const result = items.filter(item =>{
                return item.clientSource?.toLowerCase().match(searchClientSource?.toLowerCase());
            
            });
            setFilterItems(result);
        }
        
    }, [searchClientSource])
    useEffect(()=>{
        if(searchStatus == "all"){
            const result = items;
            setFilterItems(result);
        }else{
            const result = items.filter(item =>{
                return item.status?.toLowerCase().match(searchStatus?.toLowerCase());
            
            });
            setFilterItems(result);
        }
        
    }, [searchStatus])

    const filterData = async () =>{
       
       
            const q = query(collection(db, "items"),where('orderDate','>=',startDate));
            const querySnapshot = await getDocs(q);
            const response = querySnapshot.docs
                .map((doc,index) => ({...doc.data(), id:doc.id, key:index+1}));       
                setFilterItems(response);           
                console.log(response);
                
               
            alert(response);
        
    }
    

    const deleteHandler = async (id) => {
         await OrderDataService.deleteOrder(id);
         fetchPost();
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
                {/* <Card Title="Orders">
                <div className="container">
                    <div className="card">
                        

                        <div className="card-body d-md-flex justify-content-md-end">
                           
                            <Link to='/order/addorder'> 
                                <label className="btn btn-primary ">Add Orders</label>
                            </Link>
                        </div>
                    </div>
                </div>
                </Card> */}
                
                <Card title="Orders" extra={<Link to='/order/addorder'> <label className="btn btn-primary ">Add Orders</label></Link>}>
                    
                    

                                {/* <DataTable
                                    title="Order List"
                                    keyField='id'
                                    columns={columns} 
                                    data={filteritems}
                                    pagination
                                    fixedHeader
                                    highlightOnHover
                                    subHeader
                                    subHeaderComponent={
                                        [<input type="text" placeholder="search here" className="w-25 form-control" value={search} onChange={(e) => setSearch(e.target.value)}/>,
                                        <select id="clientSource" className="form-select w-25 form-control" placeholder="clientSource" name="searchClientSource"value={searchClientSource } onChange={(e) => setSearchClientSource(e.target.value)} >
                                            <option value="all"> All Client Source</option>
                                            <option value="Google"> Google </option>
                                            <option value="Website"> Website</option>
                                            <option value="Marketing"> Marketing </option>
                                            <option value="Client Recommendation"> Client Recommendation </option>
                                        </select>,
                                        
                                        <select id="searchStatus" className="form-select w-25 form-control" placeholder="searchStatus" name="searchStatus"value={searchStatus} onChange={(e) => setSearchStatus(e.target.value)} >
                                            <option value="all"> All status </option>
                                            <option value="pending"> Pending </option>
                                            <option value="in-progress"> In Progress</option>
                                            <option value="completed"> Completed </option>
                                        </select>
                                        ]
                                    }

                                /> */}
                                <Space>
                                    <Form className="ant-advanced-search-form" >
                                        <Row gutter={24}>
                                            <Col span={24} key={''} style={{ display:  'block' }}>
                                                <Form.Item 
                                                    label="Search Client Name"
                                                    rules = {[{
                                                        required: true,
                                                        message: 'Input something!',
                                                    }
                                                    ]}
                                                >
                                                    <Input 
                                                        placeholder="search client name"
                                                        value={search} 
                                                        onChange={(e) => setSearch(e.target.value)}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                    <Form className="ant-advanced-search-form" onFinish={filterData} >
                                        <Row gutter={32}>
                                        <Col span={8} key={''} style={{ display:  'block' }}>
                                            <Form.Item 
                                                label="Order Date From"
                                                name={startDate}
                                                rules = {[{
                                                    required: true,
                                                    message: 'Input something!',
                                                }
                                                ]}
                                            >
                                                <Input placeholder="placeholder" value={startDate} onChange={(e) => setStartDate(e.target.value)} type="date"/>
                                                
                                                </Form.Item>
                                                
                                            </Col>
                                            <Col span={8} key={''} style={{ display:  'block' }}>
                                                <Form.Item 
                                                    label="Order Date To"
                                                    name={endDate}
                                                    rules = {[{
                                                        required: true,
                                                        message: 'Input something!',
                                                    }
                                                    ]}
                                                >
                                                    <Input placeholder="placeholder" value={endDate} onChange={(e) => setEndDate(e.target.value)} type="date"/>
                                                
                                                </Form.Item>
                                                
                                            </Col>
                                        
                                        <Col span={4}style={{ display:  'block' }} >
                                            <Button type="primary" htmlType="submit">Search</Button>
                                            
                                        </Col>
                                        </Row>
                                    </Form>
                                </Space>
                                <Table columns={columns} dataSource={filteritems} pagination={{ pageSize: 50 }} bordered scroll={{ y: "50vh" }} size="small"/>

                </Card>
            
            </Content>
            </Layout>
        </>
     );
}
 
export default Order;