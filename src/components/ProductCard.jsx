import React from 'react'

const ProductCard = ({id, name, brand, price, discount, stock}) => {
  return (
    <div>
      <div className='product-brand'>{brand}</div>
      <div className='product-name'>{name}</div>
      <div className='product-price'>Price {price}</div>
      <div className='product-discount'>Discount {discount}</div>
      <div className='product-stock'>Available {stock}</div>
      <div>
        <button className='addcart-btn'>Add to cart</button>
        <button className='buy-btn'>Buy</button>
      </div>
    </div>
  )
}

export default ProductCard;
