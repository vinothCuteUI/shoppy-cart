import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, removeCart, updateQuantity } from '../../store/cartSlice';
import Loader from '../../components/Loader';
import CartCard from '../../components/cartCard/CartCard';
import { convertRupee } from '../../utils/rupeeFormat';
import { checkout } from '../../store/orderSlice';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {user, loading:userLoad, error: userError} = useSelector(state => state.auth)
    const {cartItems, loading, error} = useSelector(state => state.cart)
    const onUpdateQtyHandle = useCallback((productId, mode)=> {
        const findCart = cartItems.find(c => c.product._id === productId)
        if(findCart){
            const qty = mode == "INC" ? findCart.quantity+1 : findCart.quantity-1
            if(qty > 0 && qty <= findCart.product.stock)
            {
                dispatch(updateQuantity({productId, quantity: qty}))
            }
        }
    }, [cartItems, dispatch])

    const onRemoveCartHandle = useCallback((productId)=> {
           
        dispatch(removeCart(productId))
        
    }, [cartItems, dispatch])

    const totalAmout = useMemo(()=> {
        if(cartItems.length){
            let totalPrice = cartItems.reduce((ac, crn) => {
                return ac + (crn.product.finalPrice * crn.quantity)
            }, 0)
            return convertRupee(totalPrice)
        }
        return 0
    }, [cartItems, dispatch])


    useEffect(()=> {
        dispatch(fetchCart())
    }, [dispatch, user])

    return (
        <div className='container cart-page-container'> 
            <div className='page-header'>
                <h3>Cart Items</h3>
            </div>
            {
                (loading || userLoad) ? 
                <Loader />
                :
                (   
                    <>
                        <div className='cart-list'>
                        {
                            cartItems.map((item) => {
                                let {_id: id, name, price, finalPrice, discount, stock} = item.product
                                let quantity = item.quantity
                                return (<CartCard 
                                    key={id} 
                                    id={id} 
                                    name={name} 
                                    stock={stock} 
                                    finalPrice={finalPrice} 
                                    price={price} 
                                    discount={discount} 
                                    quantity={quantity} 
                                    onUpdateQty={onUpdateQtyHandle}
                                    onRemoveCart={onRemoveCartHandle} />)
                            })
                        }
                        </div>
                        <div className='cart-total'>
                            Total Amout: {totalAmout}
                        </div>
                        {
                            (cartItems.length &&
                            <div className='checkout'>
                                <Link to={"/checkout"} className='btn btn-primary'>Proceed to pay</Link>
                            </div>)
                        }
                    </>
                    
                )
            }
            
        </div>
    )
}

export default CartPage
