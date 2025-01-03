import axios from "axios";
import React, { useState, useEffect } from "react";
import { TbLoader2 } from "react-icons/tb";
const Product = props => {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);
  if (loading) {
    return <div className=" fs-1 text fas fa-home position-absolute top-50 start-50 translate-middle"><TbLoader2 /></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <div className="container mt-5 ">
        <h1 className="text-center mb-5">Products</h1>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {products.map(product => (
            <div key={product.id} className="col">
              <div className="card h-100 shadow-sm">
              
                <img 
                  src={product.thumbnail} className="card-img-top bg-body-secondary" alt={product.name} 
                ></img>
                <div className="card-body bg-body-secondary">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="fw-bold text-success">${product.price}</p>
                  
               
                  <p>
                    <a  className="  text-purple-300 link-offset-2 link-underline link-underline-opacity-0 " href={`https://dummyjson.com/products/${product.id}`} target="_blank" rel="noopener noreferrer">
                      View Product Details
                    </a>
                  </p>
                  
           
                  {product.image && (
                    <p>
                      <a  href={`https://cdn.dummyjson.com/products${product.image}`} target="_blank" rel="noopener noreferrer">
                        View Image
                      </a>
                    </p>
                  )}
                  
          
                  <p className="text-muted">Category: {product.category}</p>
                  <p className="text-muted">Brand: {product.brand}</p>
                  <p className="text-muted">Rating: {product.rating}</p>
                  <p className="text-muted">Stock: {product.stock}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}


export default Product
