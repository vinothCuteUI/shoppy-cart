import "./log.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import Loader from "../../components/Loader"
import { loginUser } from "../../store/userSlice"
import { useLocation, useNavigate } from "react-router-dom"

const LoginPage = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const fromLocation = location.state?.from?.pathname || "/";

    const {user, loading, error} = useSelector(state => state.auth)
    const [logInpt, setLogInpt] = useState({
        email: "",
        password: ""
    })
    const onLogInptHandle = (e) => {
        let node = e.target;
        let {name, value} = node
        setLogInpt(prev => {
            return {...prev, [name]: value.trim()}
        })
    }

    const submitlogin = (e) => {
        e.preventDefault()
        dispatch(loginUser(logInpt))
    }

    useEffect(() => {
        if(user && user.accessToken){
            navigate(fromLocation, { replace: true });
        }
    }, [user, error])

    return (
        <div className='auth-log position-relative'>
            {
                loading && <Loader />
            }
           
            <form className='log-form' onSubmit={submitlogin}>
                <p className={`error ${error ? '' : 'hide'} `} style={{color:"red", textAlign:"center"}}>{error?.message || ''}</p>
                <div className='form-group'>
                    <label htmlFor="email">Email</label>
                    <input id='email' name="email" className='form-control' onChange={onLogInptHandle} value={logInpt.email}/>
                </div>
                <div className='form-group'>
                    <label htmlFor="password">Password</label>
                    <input id='password' name="password" type='password' className='form-control'  onChange={onLogInptHandle} value={logInpt.password} />
                </div>
                <div className='submit text'>
                    <button className='btn btn-primary d-block w-100'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
