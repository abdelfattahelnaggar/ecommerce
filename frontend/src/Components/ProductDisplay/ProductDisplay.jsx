import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);

  // Check if product is defined before accessing its properties
  if (!product) {
    return <div>Loading...</div>; // or any other appropriate loading indicator
  }

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img crossOrigin="anonymous" src={`http://localhost:4000/images/${product.image}`} alt="" />
          <img crossOrigin="anonymous" src={`http://localhost:4000/images/${product.image}`} alt="" />
          <img crossOrigin="anonymous" src={`http://localhost:4000/images/${product.image}`} alt="" />
          <img crossOrigin="anonymous" src={`http://localhost:4000/images/${product.image}`} alt="" />
          <p className="productdisplay-right-category">
          <span>Category :</span> {product.category ? product.category : 'Unknown'}
        </p>
        </div>
        <img className="productdisplay-main-img" crossOrigin="anonymous" src={`http://localhost:4000/images/${product.image}`} alt={product.image}  />
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ${product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with a
          round neckline and short sleeves, worn as an undershirt or outer
          garment.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
        {/* Conditional rendering for category */}
        
      </div>
    </div>
  );
};

export default ProductDisplay;
