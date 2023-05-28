import "./index.css";
import {Link} from "react-router-dom";
const Order = () => {
    return ( 
        <div className="container">
            <div className="card">
                <div className="card-header">
                    Orders
                </div>

                <div className="card-body d-md-flex justify-content-md-end">
                    {/* <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                    <Link to='/order/addorder'> 
                        <label className="btn btn-primary ">Add Orders</label>
                    </Link>
                </div>
            </div>
        </div>
     );
}
 
export default Order;