import { collection, getDocs } from "firebase/firestore";
import {db} from '../../firebase';
import { useState ,useEffect  } from 'react';
import {Link} from "react-router-dom";
import EmployeeDataService from '../../services/employeeservice';
import DataTable from "react-data-table-component";

const Employee = () => {

    const [employees, setEmployees] = useState([]); 
    const [search, setSearch] = useState(''); 
    const [filteremployees, setFilterEmployees] = useState([]); 

    const columns = [
        {name : "No", selector:(row) => row.no},
        {name : "Employee Name", selector:(row) => row.clientName, sortable:true},
        {name : "Designation", selector:(row) => row.designation, sortable:true},
        {name : "Phone", selector:(row) => row.phone},
        {   
            name:"Action",
            cell: (row ) =>[ 
                <Link to={`/employee/editemployee/${row.id}`}><button type="button" className="btn btn-secondary m-1"><i className="bi bi-pencil"></i></button></Link>,
                <button type="button" className="btn btn-success m-1"><i className="bi bi-eye"></i></button>,
                <button type="button" className="btn btn-danger m-1"  onClick={(e) => deleteHandler(row.id)}><i className="bi bi-trash"></i></button>
            ]
 
        },
       
      
    ];

    const fetchPost = async () => {
       
        await getDocs(collection(db, "employees"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                    .map((doc,index) => ({...doc.data(), id:doc.id, no:index+1}));
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

    const deleteHandler = async (id) => {
         await EmployeeDataService.deleteEmployee(id);
         fetchPost();
    }

    return ( 
        <>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        Employees
                    </div>

                    <div className="card-body d-md-flex justify-content-md-end">
                        {/* <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                        <Link to='/employee/addemployee'> 
                            <label className="btn btn-primary ">Add Employee</label>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="card">
                    <div >
                    <DataTable
                            title="Employee List"
                            keyField='id'
                            columns={columns} 
                            data={filteremployees}
                            pagination
                            fixedHeader
                            highlightOnHover
                            subHeader
                            subHeaderComponent={
                                <input type="text" placeholder="search here" className="w-25 form-control" value={search} onChange={(e) => setSearch(e.target.value)}/>
                            }

                        />
                    {/* <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                        {employees.map((item,index) => (
                            
                            <tr key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td>{item.clientName}</td>
                                <td>{item.designation}</td>
                                <td>{item.phone}</td>
                                
                                <td>
                                    <div className="d-flex ms-auto">
                                        <button type="button" className="btn btn-secondary mt-0 me-0"><i className="bi bi-pencil"></i></button>
                                        <button type="button" className="btn btn-success mt-0 me-0"><i className="bi bi-eye"></i></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                        </table> */}
                    </div>
                </div>
            </div>

        </>
     );
}
 
export default Employee;