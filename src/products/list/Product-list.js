import { render } from "@testing-library/react";
import axios from "axios";
import React from "react";

class ProductList extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            products:[],
        };
    }
    componentDidMount(){
        this.getAllProducts();
    }

    getAllProducts=()=>{
        let dataURL ="http://127.0.0.1:5000/api/products/";
        axios.get(dataURL)
        .then((response)=>{
            console.log(response.data.Product);
            this.setState({
                products:response.data.Product,                
            })
        })
        .catch((error)=>{
            console.error(error);
        });
    };
    render()
    {
        let {products} =this.state;
        return(
            <React.Fragment>
                <section className="p-3">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="h3 text-success">Product List</p>
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Eligendi placeat, tempora. Accusantium debitis deleniti dolorem,
                            ea facilis in maiores nesciunt nisi nostrum pariatur placeat
                            quibusdam recusandae soluta ullam vitae voluptate?
                                </p>
                            </div>
                        </div>                        
                    </div>
                </section>
                <section>
                    <div className="container">
                        <div className="row">
                            {products.length > 0 ? (
                                <React.Fragment>
                                    {products.map((product)=>{
                                        return(
                                            <div className="col-md-3" key={product._id}>
                                                <div className="card">
                                                    <div className="card-header text-center bg-white">
                                                        <img
                                                        src={product.image}
                                                        alt=""
                                                        width="150"
                                                        height="150"
                                                        />                                                        
                                                    </div>
                                                    <div className="card-body">
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                NAME : {product.name}
                                                            </li>
                                                            <li className="list-group-item">
                                                                Price : &#8377; {product.price.toFixed(2)}
                                                            </li>
                                                            <li className="list-group-item">
                                                                Qty : {product.qty}kg
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </React.Fragment>
                            ):(
                                <React.Fragment>
                                    <p className="h5 text-danger">
                                        -------NO PRODUCT FOUND-------
                                    </p>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}
export default ProductList;