import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import "./style.scss"

const Sidebar = () => {
    return (
        <div className='sidebar__wrapper'>
            <h2>
                Dashboard
            </h2>
            <ul>
                <li>
                    <NavLink className={'sidebar__link'} to={'/'}>Home</NavLink>
                </li>
                <li>
                    <NavLink className={'sidebar__link'} to={'/dashboard/manage-product'}>Manage Products</NavLink>
                </li>
                <li>
                    <NavLink className={'sidebar__link'} to={'/dashboard/manage-category'}>Manage Categories</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar