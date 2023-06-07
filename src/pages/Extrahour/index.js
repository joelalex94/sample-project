import { collection, getDocs } from "firebase/firestore";
import {db} from '../../firebase';
import { useState ,useEffect  } from 'react';
import {Link} from "react-router-dom";
import ExtraHourDataService from '../../services/extrahourservice';
import DataTable from "react-data-table-component";


const ExtraHour = () => {

    const [extraHours, setExtraHours] = useState([]); 
    const [search, setSearch] = useState(''); 
    const [filterextrahours, setFilterExtraHours] = useState([]); 

    const columns = [
        {name : "No", selector:(row) => row.no},
        {name : "Date", selector:(row) => row.orderDate, sortable:true},
        {name : "Employee Name", selector:(row) => row.clientName, sortable:true},
        {name : "Hours", selector:(row) => row.hours},
        {   
            name:"Action",
            cell: (row ) =>[ 
                <Link to={`/extra-hours/editextrahour/${row.id}`}><button type="button" className="btn btn-secondary m-1"><i className="bi bi-pencil"></i></button></Link>,
                <button type="button" className="btn btn-success m-1"><i className="bi bi-eye"></i></button>,
                <button type="button" className="btn btn-danger m-1"  onClick={(e) => deleteHandler(row.id)}><i className="bi bi-trash"></i></button>
            ]
 
        },
       
      
    ];

    const fetchPost = async () => {
       
        await getDocs(collection(db, "extraHours"))
            .then((querySnapshot)=>{              
                const newData = querySnapshot.docs
                .map((doc,index) => ({...doc.data(), id:doc.id, no:index+1}));
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

    return ( 
        <>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        Extra Hours
                    </div>

                    <div className="card-body d-md-flex justify-content-md-end">
                        {/* <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                        <Link to='/extra-hours/addhour'> 
                            <label className="btn btn-primary ">Add Extra Hours</label>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="card">
                    <div >
                    <DataTable
                            title="Extra Hours"
                            keyField='id'
                            columns={columns} 
                            data={filterextrahours}
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
                            <th scope="col">Date</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Hours</th>
                            </tr>
                        </thead>
                        <tbody>
                        {extraHours.map((item,index) => (
                            
                            <tr key={item.id}>
                                <th scope="row">{index+1}</th>
                                <td>{item.orderDate}</td>
                                <td>{item.clientName}</td>
                                <td>{item.hours}</td>
                                
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
 
export default ExtraHour;