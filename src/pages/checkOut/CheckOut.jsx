import React, { useEffect, useMemo, useState } from 'react'
import "./CheckOut.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlacedOrder } from '../../store/orderSlice';
import Loader from '../../components/Loader';
import { useNavigate } from 'react-router-dom';
import { fetchCart } from '../../store/cartSlice';
import { convertRupee } from '../../utils/rupeeFormat';
const CheckOut = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const {user} = useSelector(state => state.auth);

    const {cartItems, loading} = useSelector(state => state.cart);
    const [finalAmount, setFinalAmount] = useState(30)
    const cartCount = cartItems.reduce((ac, cr) => (ac + cr.quantity), 0)
    const totalAmout = useMemo(()=> {
        
        if(cartItems.length){
            let totalPrice = cartItems.reduce((ac, crn) => {
                return ac + (crn.product.finalPrice * crn.quantity)
            }, 0)
            setFinalAmount(totalPrice+30)
            return convertRupee(totalPrice)
        }
        return 0
    }, [cartItems, dispatch])
   


    useEffect(() => {
        if(!user){
            navigate("/auth/login")
        }else{
            dispatch(fetchCart())
        }
    }, [user, dispatch])

    return (
        <div className='checkout-orders'>
            {
                loading ? 
                (<Loader />)
                :
                (
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-8'></div>
                                <div className='col-lg-4'>
                                    <div className='checkout-items'>
                                        <h3>Order summery</h3>
                                        <ul className='summery-amount'>
                                            <li>
                                                <span className='title'>Items</span>
                                                <span className='value'>{cartCount}</span>
                                            </li>
                                            <li>
                                                <span className='title'>Subtotal</span>
                                                <span className='value'>{totalAmout}</span>
                                            </li>
                                            <li>
                                                <span className='title'>Delivery fee</span>
                                                <span className='value'>30</span>
                                            </li>
                                            <li className='checkout-total'>
                                                <span className='title'>Total</span>
                                                <span className='value'>{convertRupee(finalAmount)}</span>
                                            </li>
                                        </ul>
                                        <div className='checkout-action'></div>
                                    </div>
                                </div>
                        </div>
                        
                    </div>
                )
            }
            
        </div>
    )
}

export default CheckOut
