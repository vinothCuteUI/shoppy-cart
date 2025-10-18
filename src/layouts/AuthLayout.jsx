import "./Layout.css"
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='auth-container d-flex justify-content-center align-items-center'>
        <Outlet />
    </div>
  )
}

export default AuthLayout
