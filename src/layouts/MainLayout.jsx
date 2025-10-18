import React, { useEffect, useState } from 'react'
import "./Layout.css";
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './header/Header'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { fetchCurrentuser, fetchRefreshToken, logOutUser } from '../store/userSlice';

const MainLayout = () => {
    
    const dispatch = useDispatch()
    const {user, loading} = useSelector(state => state.auth)
    const [initLoad, setInitLoad] = useState(true);
    useEffect(()=> {
        const checkUser = async () =>{
            if(user){
                try{
                    await dispatch(fetchCurrentuser()).unwrap()
                }
                catch(error){
                    try{
                        await dispatch(fetchRefreshToken()).unwrap();
    
                    }catch(err){
                        dispatch(logOutUser())
                    }
                    
                }
            }
            setInitLoad(false)
        }
        checkUser()
    }, [user, dispatch])


    return (
        <div className='main-page-container'>
            {
                initLoad ? 
                (<Loader />)
                :
                (
                    <>
                        <Header />
                        <div className='container-fluid'>
                            <Outlet />
                        </div>
                        <Footer />
                    </>
                )
            }
            
        </div>
    )
}

export default MainLayout
