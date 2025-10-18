import { useState } from "react";
import "./ProductCard.css"

const ProductCard = ({id, name, brand, price, discount, stock, addToCart}) => {
  
  return (
    <div data-target-id={id} className="product-card">
      <div className='product-brand'>{brand}</div>
      <div className='product-name'>{name}</div>
      <div className='product-price'>Price {price}</div>
      <div className='product-discount'>Discount {discount}</div>
      <div className='product-stock'>Available {stock}</div>
      <div className="d-flex gap-2">
        <button className='btn btn-primary addcart-btn' onClick={()=> addToCart(id)}>Add to cart</button>
        <button className='btn btn-secondary buy-btn'>Buy</button>
      </div>
    </div>
  )
}

export default ProductCard;
