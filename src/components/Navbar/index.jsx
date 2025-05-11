import React from 'react'
import { Link } from 'react-router-dom'
import "./style.scss"

const Navbar = () => {
    const userRole = "admin"
  return (
    <nav className='navbar'>
        <div className='container navbar__wrapper'>
            <h2>Welcome to our shop</h2> 
            <Link to={'/dashboard'} className={userRole == "admin" ? "dashboard" : "none"}>Dashboard</Link>
        </div>
    </nav>
  )
}

export default Navbar