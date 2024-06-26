// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4000/allproducts");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllProducts(data.products); // Ensure you're setting the products array correctly
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const remove_product = async (id)=>{
    await fetch('http://localhost:4000/removeproduct', {
      method:'Post',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
    await fetchProducts();
  }

  return (
    <div className="list-product">
      <h1>All Products List</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.length > 0 ? (
          allProducts.map((product, index) => {
            return <>
              <div
                key={index}
                className="listproduct-format-main listproduct-format"
              >
                {console.log("Image URL:", product.image)}
                <img src={`http://localhost:4000/images/${product.image}`} className="listproduct-product-icon" crossOrigin="anonymous" alt={product.image} />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>

                <img
                  src={cross_icon}
                  onClick={()=>{remove_product(product.id)}}
                  alt="Remove"
                  className="listproduct-remove-icon"
                />
              </div>
               <hr />
            </>
          })
        ) : (
          <p>No products found.</p>
        )}
      </div>
     
    </div>
  );
};

export default ListProduct;