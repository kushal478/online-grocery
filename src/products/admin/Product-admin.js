import { render } from "@testing-library/react";
import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class ProductAdmin extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            products:[],
        };
    };
    componentDidMount(){
        this.getAllProducts();
    }

    getAllProducts=()=>{
        let dataURL = "http://127.0.0.1:5000/api/products/";
        Axios.get(dataURL)
        .then((response)=>{
            console.log(response.data);
            this.setState({
                products:response.data.Product,
            });
        })
        .catch((error)=>{
            console.error(error);
        });
        console.log(this.state.products)
    };

    clickDeleteProduct=(productId)=>{
        let dataURL=`http://127.0.0.1:5000/api/products/${productId}`;
        Axios.delete(dataURL)
        .then((response)=>{
            this.getAllProducts();
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    render(){
    let {products}=this.state;
    
        return(
            <React.Fragment>
                <section className="p-3">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="h3 text-success">Product Admin</p>
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Eligendi placeat, tempora. Accusantium debitis deleniti dolorem,
                            ea facilis in maiores nesciunt nisi nostrum pariatur placeat
                            quibusdam recusandae soluta ullam vitae voluptate?
                                </p>
                                <Link to="/product/create" className="btn btn-success btn-sm">
                                    Create New
                                </Link>
                            </div>
                        </div>                        
                    </div>
                </section>
                {/* <pre>{JSON.stringify(this.state.products)}</pre> */}
                
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <table className="table table-hover text-center table-stiped table-success">
                                    <thead className="bg-dark text-success">
                                        <tr>
                                            <th>Sno</th>
                                            <th>Product</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Info</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    {products && products.length > 0 ?
                                    (
                                        <tbody>
                                            {this.state.products.map((product)=>{
                                                return(
                                                    <tr key={product._id}>
                                                        <td>
                                                            {product._id.substr(product._id.length-5)}
                                                        </td>
                                                        <td>
                                                            <img
                                                            src={product.image}
                                                            alt=""
                                                            width="50"
                                                            height="50"
                                                            />
                                                        </td>
                                                        <td>{product.name}</td>
                                                        <td>&#8377; {product.price.toFixed(2)}</td>
                                                        <td>{product.qty}kg</td>
                                                        <td>{product.info}</td>
                                                        <td>
                                                           <Link 
                                                           to={`/products/admin/${product._id}`}
                                                           className="btn btn-secondary btn-sm"
                                                           >update
                                                           </Link>                                                        
                                                            <button 
                                                            className="btn btn-danger btn-sm"
                                                            onClick={this.clickDeleteProduct.bind(this,product._id)}
                                                            >Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    );
                                            })}
                                        </tbody>
                                    ): (
                                        <tbody>
                                        <tr>
                                        <td colSpan="6" className="text-danger">
                                        ------ NO Products Found ---------
                                        </td>
                                        </tr>
                                        </tbody>
                                    ) }
                                </table>
                            </div>
                        </div>
                    </div>

                </section>
            </React.Fragment>
        )
    }
}
export default ProductAdmin;