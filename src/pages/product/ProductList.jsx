import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { fetchProduct } from '../../store/productSlice'
import ProductCard from '../../components/productCard/ProductCard'
import "./Product.css"
import { addToCart } from '../../store/cartSlice'

const ProductList = () => {
    const dispatch = useDispatch()
    const {list, loading, error} = useSelector(state => state.product)
    const {user, loading: userLoad, error: userError} = useSelector(state => state.auth)

    const addCartHandle = useCallback((id) => {
        let product = list.find(p => p._id == id)
        dispatch(addToCart({product, quantity: 1}))
    }, [list, dispatch])

    useEffect(() => {
        dispatch(fetchProduct())
    }, [dispatch])

    return(
        <div className='postion-relative' style={{height:`${loading ? '100vh' : 'auto'}`}}>
            {(loading || userLoad) ? 
                <Loader /> :
                <div className='row'>
                    {
                        list?.map((item, inx) => {
                            return (
                                <div className='col-md-4 mb-3' key={item._id}>
                                    <ProductCard id={item._id} name={item.name} brand={item.brand} price={item.price} discount={item.discount} stock={item.stock} addToCart={addCartHandle} />
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
        
        
}

export default ProductList;
