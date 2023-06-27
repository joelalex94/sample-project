import { collection, getDocs, query, where } from "firebase/firestore";
import {db} from '../../firebase';
import { useState ,useEffect  } from 'react';
import {Link} from "react-router-dom";
import ExtraHourDataService from '../../services/extrahourservice';
// import DataTable from "react-data-table-component";
import Sidebars from '../../components/Sidebar';

import { MenuUnfoldOutlined,MenuFoldOutlined,EditOutlined,DeleteOutlined } from '@ant-design/icons';
import { Layout, theme ,Button ,Card, Table,Space, Input,Form,Row,Col} from 'antd';

const { Header, Content } = Layout;

const ExtraHour = () => {
    const [collapsed, setCollapsed] = useState(false);

    const [extraHours, setExtraHours] = useState([]); 
    const [search, setSearch] = useState(''); 
    const [filterextrahours, setFilterExtraHours] = useState([]); 
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // const columns = [
    //     {name : "No", selector:(row) => row.no},
    //     {name : "Date", selector:(row) => row.orderDate, sortable:true},
    //     {name : "Employee Name", selector:(row) => row.clientName, sortable:true},
    //     {name : "Hours", selector:(row) => row.hours},
    //     {   
    //         name:"Action",
    //         cell: (row ) =>[ 
    //             <Link to={`/extra-hours/editextrahour/${row.id}`}><button type="button" className="btn btn-secondary m-1"><i className="bi bi-pencil"></i></button></Link>,
    //             <button type="button" className="btn btn-danger m-1"  onClick={(e) => deleteHandler(row.id)}><i className="bi bi-trash"></i></button>
    //         ]
 
    //     },
       
      
    // ];

    const columns = [
        {title : "No", dataIndex:"key",},
        {title : "Employee Name", dataIndex:"clientName",align:"center",showOnResponse: true,showOnDesktop: true, sorter: (a,b) => a.clientName.length - b.clientName.length},
        {title : "Date", dataIndex:"orderDate",align:"center",showOnResponse: true,showOnDesktop: true},
        {title : "Hours", dataIndex:"hours",align:"center",showOnResponse: true,showOnDesktop: true},
        
        
        {title : "Action", key:"action",align:"center", render: (action) => (<Space size="middle">  <Link to={`/extra-hours/editextrahour/${action.id}`}><button type="button" className="btn btn-secondary m-1"><EditOutlined /></button></Link> <button type="button" className="btn btn-danger m-1"  onClick={(e) => deleteHandler(action.id)}><DeleteOutlined /></button></Space>),},
       
      
    ];

    const fetchPost = async () => {
       
        await getDocs(collection(db, "extraHours"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                .map((doc,index) => ({...doc.data(), id:doc.id, key:index+1}));
                setExtraHours(newData);                
                setFilterExtraHours(newData);                
                console.log(newData.length);
            })
       
    }

    useEffect(()=>{
        fetchPost();
    }, [])
    useEffect(()=>{
        const result = extraHours.filter(extrahour =>{
            return extrahour.clientName?.toLowerCase().match(search?.toLowerCase());
        });

        setFilterExtraHours(result);
    }, [search])

    const deleteHandler = async (id) => {
         await ExtraHourDataService.deleteExtraHour(id);
         fetchPost();
    }

    const {
        token: { colorBgContainer },
      } = theme.useToken();

    // const searchDate = async(value) => {
    //     const q = query(collection(db, "extraHours"),where('orderDate','==',value));
    //         const querySnapshot = await getDocs(q);
    //         const response = querySnapshot.docs
    //             .map((doc,index) => ({...doc.data(), id:doc.id, key:index+1}));       
    //             setFilterExtraHours(response);   
    // }
    const filterData = async () =>{
       
       
        const q = query(collection(db, "extraHours"),where('orderDate','>=',startDate),where('orderDate','<=',endDate));
        const querySnapshot = await getDocs(q);
        const response = querySnapshot.docs
            .map((doc,index) => ({...doc.data(), id:doc.id, key:index+1}));       
            setFilterExtraHours(response);           
            console.log(response);
            
           
        alert(response);
    
}
    return ( 
        // <>
        //     <div className="container">
        //         <div className="card">
        //             <div className="card-header">
        //                 Extra Hours
        //             </div>

        //             <div className="card-body d-md-flex justify-content-md-end">
        //                 {/* <h5 className="card-title">Special title treatment</h5>
        //                 <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
        //                 <Link to='/extra-hours/addhour'> 
        //                     <label className="btn btn-primary ">Add Extra Hours</label>
        //                 </Link>
        //             </div>
        //         </div>
        //     </div>
        //     <div className="container">
        //         <div className="card">
        //             <div >
        //             <DataTable
        //                     title="Extra Hours"
        //                     keyField='id'
        //                     columns={columns} 
        //                     data={filterextrahours}
        //                     pagination
        //                     fixedHeader
        //                     highlightOnHover
        //                     subHeader
        //                     subHeaderComponent={
        //                         <input type="text" placeholder="search here" className="w-25 form-control" value={search} onChange={(e) => setSearch(e.target.value)}/>
        //                     }

        //                 />
        //             {/* <table className="table">
        //                 <thead>
        //                     <tr>
        //                     <th scope="col">#</th>
        //                     <th scope="col">Date</th>
        //                     <th scope="col">Employee Name</th>
        //                     <th scope="col">Hours</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                 {extraHours.map((item,index) => (
                            
        //                     <tr key={item.id}>
        //                         <th scope="row">{index+1}</th>
        //                         <td>{item.orderDate}</td>
        //                         <td>{item.clientName}</td>
        //                         <td>{item.hours}</td>
                                
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
    
    <Card title="Extra Hours" extra={<Link to='/extra-hours/addhour'> <label className="btn btn-primary ">Add Extra Hours</label></Link>}>
        
                    <Space>
                        <Form className="ant-advanced-search-form" >
                            <Row gutter={24}>
                                <Col  span={24} style={{ display:  'block' }}>
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
                                
                            </Row>
                        </Form>
                        <Form className="ant-advanced-search-form" onFinish={filterData} >
                            <Row gutter={24}>
                            <Col span={8} key={''} style={{ display:  'block' }}>
                                <Form.Item 
                                    label="Date From"
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
                                        label="Date To"
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
                            
                            
                            
                            
                            
                            <Col span={8}style={{ display:  'block' }} >
                                <Button type="primary" htmlType="submit">Search</Button>
                                
                            </Col>
                            </Row>
                        </Form>
                    </Space>
                    <Table columns={columns} dataSource={filterextrahours} pagination={{ pageSize: 50 }} bordered scroll={{ x: "50vh" }} size="small"/>

    </Card>

</Content>
</Layout>
</>
     );
}
 
export default ExtraHour;