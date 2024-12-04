import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import {Route,RouterProvider,createRoutesFromElements} from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import Profile from './pages/user/Profile.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import UserList from './pages/admin/UserList.jsx'
import CategoryList from './pages/admin/CategoryList.jsx'
import ProducttList from './pages/admin/ProducttList.jsx'
import AllProducts from './pages/admin/AllProducts.jsx'
import ProductUpdate from './pages/admin/ProductUpdate.jsx'
import Home from "./pages/Home.jsx"
import Favourite from './pages/Products/Favourite.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Cart from './pages/user/Cart.jsx'
import Shop from './pages/Shop.jsx'
import Shipping from './pages/Order/Shipping.jsx'
import ProgressSteps from './components/ProgressSteps.jsx'
import PlaceOrder from './pages/Order/PlaceOrder.jsx'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import Order from './pages/Order/Order.jsx'
import UserOrder from './pages/user/UserOrder.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import OrderList from './pages/admin/OrderList.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
    
      {/* user routes */}
      <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
      </Route>
    
   <Route path='/login' element={<Login/>}/>
   <Route path='/register' element={<Register/>}/>
   <Route index={true} path='/' element={<Home/>}/>
   <Route path='/favorite' element={<Favourite/>}/>
   <Route path='/product/:id' element={<ProductDetails/>}/>
   <Route path='/cart' element={<Cart/>}/>
   <Route path='/shop' element={<Shop/>}/>
   <Route path='/UserOrder/mine' element={<UserOrder/>}/>

   <Route path='/shipping' element={<Shipping/>}/>
   <Route path='/placeorder' element={<PlaceOrder/>}/>
   <Route path='/order/:id' element={<Order/>}/>
  
   
   {/* admin routes */}
   <Route path='/admin' element={<AdminRoute/>}>
    <Route path='userlist' element={<UserList/>}/>
    <Route path='categorylist' element={<CategoryList/>}/>
    <Route path='productlist' element={<ProducttList/>}/>
    <Route path='allproducts' element={<AllProducts/>}/>
    <Route path='dashboard' element={<AdminDashboard/>}/>
    <Route path='product/update/:id' element={<ProductUpdate/>}/>
    <Route path='OrderList' element={<OrderList/>}/>
   </Route>
 </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
          <Provider store={store}>
            <PayPalScriptProvider>
              <RouterProvider router={router}/>
            </PayPalScriptProvider>
          {/* <RouterProvider router={router}/> */}
          </Provider>
)
