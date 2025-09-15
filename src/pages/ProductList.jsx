import React, { useEffect, useState } from 'react'
import API from '../services/api'

const ProductList = () => {

    const [product, setProducts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)
            try{
                const response = await API.get("/api/product")
                console.log(response)
                setLoading(false)
            }
            catch(error){
                console.log(error)
            }
        }
        fetchProduct()
    }, [])


    return 
        <>
           {
            loading ? (
                <div >
                    loading...
                </div>
            )
            :
            (
                <div>
                    Products
                </div>
            )
           }
        </>
        
}

export default ProductList;
