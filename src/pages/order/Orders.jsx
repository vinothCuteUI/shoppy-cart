import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyOrder } from '../../store/orderSlice';

const Orders = () => {
    const dispatch = useDispatch();
    const {orderItems, loading, error} = useSelector(state => state.orders)

    useEffect(() => {
        dispatch(fetchMyOrder())
    }, [dispatch])

    return (
        <div className='my-orders'> 
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-8'>

                    </div>
                    <div className='col-lg-4'>
                        <div className='checkout-amount-details'>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders
