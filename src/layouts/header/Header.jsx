import { Link, Navigate, useLocation } from "react-router-dom"
import "./Header.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchCart } from "../../store/cartSlice"
import { logOutUser } from "../../store/userSlice"

const Header = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const {user, loading: userLoad, error: userError} = useSelector(state => state.auth)
  const {cartItems, loading, error} = useSelector(state => state.cart)
  const cartCount = cartItems.reduce((ac, cr) => (ac + cr.quantity), 0)
  const onLogOut = () => {
    dispatch(logOutUser())
  }

  useEffect(()=> {
      dispatch(fetchCart())
  }, [dispatch])

  return (
    <div className='container-fluid header '>
        <div className='row justify-content-between align-items-center'>
            <div className="col-md-3">
                <div className='logo-container'>
                    Logo
                </div>
            </div>

            <div className="col-md-6">
              <div className="d-flex gap-2 justify-content-end align-items-center">
                <Link to={"/"} className="btn cart-btn">
                  Products
                </Link>
                <Link to={"/"} className="btn cart-btn">
                  Orders
                </Link>
                <Link to={"/cart-items"} className="btn cart-btn">
                  Cart - {cartCount}
                </Link>
                {
                  user ?
                  (<div>
                    <div className="user">
                      {user.email}
                    </div>
                    <button className="btn btn-primary" onClick={() => onLogOut()}>Logout</button>
                  </div>)
                  :
                  (<Link to={"/auth/login"} className="btn btn-primary" state={{from: location}}>LogIn</Link>)
                }
                
              </div>
            </div>
        </div> 
    </div>
  )
}

export default Header
