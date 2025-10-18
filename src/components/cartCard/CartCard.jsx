import React from 'react'
import "./CartCard.css"

const CartCard = ({id, name, stock, finalPrice, price, discount, quantity, onUpdateQty, onRemoveCart}) => {
    return (
        <div className="cart-card">
            <div className='cart-card-img'>
                
            </div>
            <div className='cart-card-details'>
                <h4>{name}</h4>
                <p className='cart-title'>Price - {finalPrice} <span style={{fontSize:"0.8rem", color:"#777",textDecoration:"line-through"}}>{price}</span> <span style={{fontSize:"0.8rem",color:"red"}}>{discount}% Discount</span></p>
                <p style={{margin:"1rem 0", fontSize:"0.8rem"}}>Available stock - {stock}</p>
                <div className='d-flex gap-1 align-items-center'>
                    {
                        quantity == 1 ? 
                        <button onClick={() => onRemoveCart(id)}>Delete</button>
                        :
                        <button onClick={() => onUpdateQty(id, "DEC")}>-</button>
                    }
                    <span style={{width:"50px", textAlign:"center"}}>{quantity}</span>
                    <button onClick={() => onUpdateQty(id, "INC")}>+</button>
                </div>
            </div>
        </div>
    )
}

export default CartCard