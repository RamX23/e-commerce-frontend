import { useState } from "react"
import {NavLink } from 'react-router-dom'
import {FaTimes} from "react-icons/fa"
import { isAction } from "@reduxjs/toolkit";


const AdminMenu = () => {
    const [isMenuOpen,setMenuOpen]=useState(false);
    const toggleMenu=()=>{
        setMenuOpen(!isMenuOpen)
    }
  return (
    <div>
      <button className={`${isMenuOpen ? "top-2 right-2" : "top-5 right-7" } p-2 fixed rounded lg`} onClick={toggleMenu}>
        {isMenuOpen? (
            <FaTimes color="blue"/>
        ):(
            <>
            <div className="w-6 h-2 bg-blue-my-1">Menu</div>
            <div className="w-6 h-2 bg-blue-my-1"></div>
            <div className="w-6 h-2 bg-blue-my-1"></div>
            </>
        )}
      </button>
      {isMenuOpen && (
        <section className=" p-4 fixed right-7 top-5 bg-black">
            <ul className="list-none mt-2">
                <li>
                    <NavLink className='list-item py-2 px-3 mb-3 bg-black hover:bg-[#371515] rounded-sm' to="/admin/dashboard" style={({isActive})=>({
                   color:isActive ? 'greenyellow' : 'white'
                    })}>
                        Admin Dashboard
                    </NavLink>
                </li>
            
                <li>
                    <NavLink className='list-item py-2 px-3 mb-3 bg-black hover:bg-[#371515] rounded-sm' to="/admin/categorylist" style={({isActive})=>({
                   color:isActive ? 'greenyellow' : 'white'
                    })}>
                        Create Category
                    </NavLink>
                </li>
                <li>
                    <NavLink className='list-item py-2 px-3 mb-3 bg-black hover:bg-[#371515] rounded-sm' to="/admin/productlist" style={({isActive})=>({
                   color:isActive ? 'greenyellow' : 'white'
                    })}>
                        Create Product
                    </NavLink>
                </li>
                <li>
                    <NavLink className='list-item py-2 px-3 mb-3 bg-black hover:bg-[#371515] rounded-sm' to="/admin/allproducts" style={({isActive})=>({
                   color:isActive ? 'greenyellow' : 'white'
                    })}>
                       All Products
                    </NavLink>
                </li>
                <li>
                    <NavLink className='list-item py-2 px-3 mb-3 bg-black hover:bg-[#371515] rounded-sm' to="/admin/userlist" style={({isActive})=>({
                   color:isActive ? 'greenyellow' : 'white'
                    })}>
                        Manage Users
                    </NavLink>
                </li>
                <li>
                    <NavLink className='list-item py-2 px-3 mb-3 bg-black hover:bg-[#371515] rounded-sm' to="/admin/OrderList" style={({isActive})=>({
                   color:isActive ? 'greenyellow' : 'white'
                    })}>
                        Order List
                    </NavLink>
                </li>
         
               
            </ul>
        </section>
      )}
    </div>
  )
}

export default AdminMenu
