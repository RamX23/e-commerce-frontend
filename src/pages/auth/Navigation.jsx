import React from "react";
import "./Navigation.css";
import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { useLoginMutation,useLogoutMutation } from "../../redux/userApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoriteCount from "../Products/FavoriteCount";


const Navigation = () => {

  const {userInfo}=useSelector(state=>state.auth)
  const {cartItems}=useSelector(state=>state.cart)
  const [showDropDown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const toggledropdown = () => {
    setShowDropdown(!showDropDown);
  };
  const togglesidebar = () => {
    setShowSidebar(!sidebar);
  };

  const closesidebar = () => {
    setSidebar(false);
  };

const dispatch=useDispatch()
const navigate=useNavigate()

const [logoutApiCall]=useLogoutMutation()

const logoutHandler=async()=>{
 try{
    await logoutApiCall().unwrap();
    dispatch(logout());
    navigate("/login");
 } 
 catch(error){
  console.error(error);
 }
}

  return (
    <div
    style={{ zIndex: 9999 }}
    className={`${
      showSidebar ? "hidden" : "flex"
    } xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100vh]  fixed `}
    id="navigation-container"
  >
    <div className="flex flex-col justify-center space-y-4">
      <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineHome className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">HOME</span>{" "}
        </Link>
        <Link
          to="/shop"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShopping className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">SHOP</span>{" "}
        </Link>

        <Link
          to="/Cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineShoppingCart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Cart</span>{" "}
          <div className="absolute top-9">
            {cartItems.length>0 && (
              <span>
                <span className="px-1 py-0 text-sm text-black bg-blue-500 rounded-full">
                {cartItems.reduce((a,c)=>a+c.qty,0)}
                </span>
                </span>
            )}
          </div>
        </Link>
       
        <Link
          to="/favorite"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FaHeart className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Favourite</span>{" "}
          <FavoriteCount/>
        </Link>
      </div>
    
    <div className="relative">
      <button onClick={toggledropdown} className="flex items-center text-gray-8000 focus:outline-none">
        {userInfo ? <span className="text-white">{userInfo.username}</span>:(<></>)}

        {userInfo && (
           <svg
           xmlns="http://www.w3.org/2000/svg"
           className={`h-4 w-4 ml-1 ${
            showDropDown ? "transform rotate-180" : ""
           }`}
           fill="none"
           viewBox="0 0 24 24"
           stroke="white"
         >
           <path
             strokeLinecap="round"
             strokeLinejoin="round"
             strokeWidth="2"
             d={showDropDown ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
           />
         </svg>
        )}
      </button>
   
      {showDropDown && userInfo && (
        <ul className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${!userInfo.isAdmin ? "-top-20" : "-top-80"}`}>
         {userInfo.isAdmin && (
          <>
          <li>
            <Link to={'/admin/dashboard'} className="block px-4 py-2 hover:bg-gray-100">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to={'/admin/productlist'} className="block px-4 py-2 hover:bg-gray-100">
             Products
            </Link>
          </li>
          <li>
            <Link to={'/admin/categorylist'} className="block px-4 py-2 hover:bg-gray-100">
             Category
            </Link>
          </li>
            <li>
              <Link to={'UserOrder/mine'} className="block px-4 py-2 hover:bg-gray-100">
              Orders
              </Link>
            </li>
            <li>
              <Link to={'/admin/userlist'} className="block px-4 py-2 hover:bg-gray-100">
              User
              </Link>
            </li>
          </>
         )}
  
       
      <li>
              <Link to={'/profile'} className="block px-4 py-2 hover:bg-gray-100">
              Profile
              </Link>
            </li>
            <li>
              <button onClick={logoutHandler} className="block px-4 py-2 hover:bg-gray-100">
              
              Logout
           
              </button>
            </li>
        </ul>
      )}
 
   
   {!userInfo && (<ul>
      <li>
      <Link
          to="/login"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineLogin className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Login</span>{" "}
        </Link>
      </li>
      <li>
      <Link
          to="/register"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <AiOutlineUserAdd className="mr-2 mt-[3rem]" size={26} />
          <span className="hidden nav-item-name mt-[3rem]">Register</span>{" "}
        </Link>
      </li>
    </ul>
  )}
 </div>   
</div>
  );
};

export default Navigation;
