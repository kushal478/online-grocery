import { render } from "@testing-library/react";
import React from "react";
import { Redirect } from "react-router";
import Axios from "axios";

class UpdateProduct extends React.Component
{
    constructor(props){
        super(props)
        this.state={
            productId:this.props.match.params.product_id,

            selectedProduct:{
                     name: "",
                     image: "",
                     price: "",
                     qty: "",
                     info:"",
            },
            isSubmitted:false,
        };
    }
    componentDidMount(){
        let dataURL = `http://127.0.0.1:5000/api/products/${this.state.productId}`;
        console.log(dataURL);
        Axios.get(dataURL)
        .then((response)=>{
            console.log(response.data.Product);
            this.setState({
                ...this.state,
                selectedProduct: response.data.Product,
            })
        }).catch((error)=>{
            console.error(error);
        });
    }
    updateInput=(event)=>{
        this.setState({
            ...this.state,
            selectedProduct:{
                ...this.state.selectedProduct,
                [event.target.name]:event.target.value,
            },
        });
    };

    updateImage= async (event)=>{

        let imageFile= event.target.files[0];

        let base64Image = await this.convertBase64String(imageFile);
        this.setState({
            ...this.state,
            selectedProduct:{
                ...this.state.selectedProduct,
                image:base64Image,
            },
        });

    };

    convertBase64String =(imageFile)=>{
        return new Promise((resolve, reject)=>{
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.addEventListener("load",()=>{
                if (fileReader.result) {
                    resolve(fileReader.result);
                } else {
                    reject("Error Occurred");
                }
            });    
        });
    };  

    submitUpdateProduct = (event) => {
        event.preventDefault();
        let dataURL = `http://127.0.0.1:5000/api/products/${this.state.productId}`;
        Axios.put(dataURL, this.state.selectedProduct)
        .then((response) => {
        this.setState({
        ...this.state,
        isSubmitted: true,
        });
        })
        .catch((error) => {
        console.error(error);
        });
        };
    render()
    {
        let { selectedProduct } = this.state;
        return(
            <React.Fragment>
                {
                    this.state.isSubmitted ? ( <Redirect to="/product/admin"/>
                    ): (
               
            <React.Fragment>
                <section className="p-3">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="h3 text-danger">Update a Product</p>
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Eligendi placeat, tempora. Accusantium debitis deleniti dolorem,
                            ea facilis in maiores nesciunt nisi nostrum pariatur placeat
                            quibusdam recusandae soluta ullam vitae voluptate.
                                </p>
                            </div>
                        </div>                        
                    </div>
                </section>
                {/* <pre>{JSON.stringify(this.state.product)}</pre> */}
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 m-auto">
                                <div className="card">
                                    <div className="card-header bg-secondary text-white">
                                        <p className="h4">Update Product</p>
                                    </div>
                                    <div className="card-body rgba-purple-light">
                                        <form onSubmit={this.submitUpdateProduct}>
                                            <div className="form-group">
                                                <input
                                                    name="name"
                                                    value={selectedProduct.name}
                                                    onChange={this.updateInput}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Name"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-file">
                                                    <input                                                         
                                                        onChange={this.updateImage}
                                                        type="file"
                                                        className="custom-file-input"
                                                        id="customFile"                                                       
                                                    />
                                                    <label className="custom-file-label" htmlFor="customFile">
                                                        {selectedProduct.image.length> 0 ? (
                                                            <img src={selectedProduct.image} alt="" width="25" height="25"/>
                                                        ): (
                                                            "product image"
                                                        )}
                                                        </label>
                                                </div>                                                                                 
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    name="price"
                                                    value={selectedProduct.price}
                                                    onChange={this.updateInput} 
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="price"
                                                />                                        
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    name="qty"
                                                    value={selectedProduct.qty}
                                                    onChange={this.updateInput} 
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Qty"
                                                />                                         
                                            </div>
                                            <div className="form-group">
                                                <textarea
                                                    name="info"
                                                    value={selectedProduct.info}
                                                    onChange={this.updateInput}
                                                    rows="3"
                                                    className="form-control"
                                                    placeholder="info"
                                                />                                                                                       
                                            </div>
                                            <div className="form-group">
                                                <input 
                                                    type="submit"
                                                    className="btn btn-primary btn-sm"
                                                    value="update"                                                  
                                                />                                        
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
                    )}
             </React.Fragment>
        )
    }
}
export default UpdateProduct;