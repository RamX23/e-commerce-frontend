import {FaTrash} from 'react-icons/fa'
import {addToCart,removeFromCart} from "../../redux/features/cart/cartSlice"
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
const Cart = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const cart=useSelector(state=>state.cart);
  console.log(cart);
  const {cartItems}=cart

  const addToCartHandler=(product,qty)=>{
   dispatch(addToCart({...product,qty}))
  }

  const removeFromCartHandler=(id)=>{
  dispatch(removeFromCart(id))
  }
  const checkoutHandler=()=>{
    navigate('/login?redirect=/shipping') 
  }
  return (
    <>
     <div className="container flex flex-wrap justify-around mx-auto mt-8">
      {
        cartItems.length===0 ? (
          <div>Your Cart is empty <Link to='/shop'> Go to shop </Link></div>
        ):(
          <>
          <h1 className="flex flex-col w-[80%]">
             Shopping Cart
             </h1>
             {
            cartItems.map((item)=>(
            <div key={item._id} className="flex items-center mb-[1rem] pb-2">
              <div className="w-[5rem] h-[5rem]">
              <img src={item.image} alt={item.name} srcset="" className='w-full h-full object-cover rounded' />
              </div>
              <div className="flex-1 ml-4">
                <Link to={'/product/${item._id}'} className='text-blue-500'>
                  {item.name}
                </Link>
                <div className="mt-2 text-black">{item.brand}</div>
                <div className="mt-2 text-black font-bold">$ {item.price}</div>
              </div>
              <div className="w-24">
                <select className='w-full p-1 border rounded' value={item.qty} onChange={e=>addToCartHandler(item,Number(e.target.value))}>
               {[...Array(item.countInStock).keys()].map((x)=>(
          <option value={x+1} key={x+1}>{x+1}</option>
               ))}
                </select>
              </div>
              <div>
                <button className='text-red-500 mr-[5rem]' onClick={()=>removeFromCartHandler(item._id)}><FaTrash className='ml-[1rem] mt=[0.5rem]'/></button>
              </div>
            </div>
            ))
             }
             <div className="mt-8 w-[40rem]">
              <div className="p4 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">
                  items ({cartItems.reduce((acc,item)=>acc+item.qty+1,0)}{" "})
                </h2>
                <div className="text-2xl font-bold">
                  ${cartItems.reduce((acc,item)=>acc+item.qty * item.price,0).toFixed(2)}
                </div>
                <button className='bg-green-500 mt-4 py-2 px-4 rounded-full text-lg w-full' disabled={cartItems.length===0}
                onClick={checkoutHandler}>
                  Proceed To CheckOut
                </button>
              </div>
             </div>
</>
       
        )
      }
     </div>
    </>
  )
}

export default Cart
