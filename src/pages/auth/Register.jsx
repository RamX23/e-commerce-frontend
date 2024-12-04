import { useState,useEffect } from 'react'
import {Link,useLocation,useNavigate, useParams} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import { setCredientials} from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { useRegisterMutation } from '../../redux/userApiSlice'
import Login from './Login'
const Register = () => {
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [register,{isLoading}]=useRegisterMutation();
    const {userInfo}=useSelector(state=>state.auth) 
    
    const {search}=useLocation();
    const sp=new URLSearchParams(search)
    const redirect=sp.get("redirect") || '/'

    useEffect(()=>{
        if(userInfo){
            navigate('redirect')
        }
    },[navigate,redirect,userInfo])

    const handleRegister=async(e)=>{
    e.preventDefault();
    if(password!=confirmPassword){
        toast.error("Password do not match");
    }else{
        try{
         const res=await {username,email,password}.unwrap();
         dispatch(setCredientials({...res}));
         navigate(redirect);
         toast.success("User registered successfully");
        }catch(error){
            console.log(error)
            toast.error(error.data.mesaage);
        }
    }
    }



  return (
    <section className='pl-[10rem] flex'>
        <div className="mr-[4rem] mt-[5rem]">
            <h1 className="text 2xl font-semibold mb-4">Register</h1>
            <form action="" className="container w-[40rem]" onSubmit={handleRegister}>
                <div className="my-[2rem]">
                    <label htmlFor='name' className='black text-sm font-medium'>Name</label>
                    <input type="text" id='name' className='mt-1 p-2 border rounded w-full'
                    placeholder='username' value={username} onChange={(e)=>setUsername(e.target.value)} />
                </div>
                
                <div className="my-[2rem]">
                    <label htmlFor='email' className='black text-sm font-medium'>Email Address</label>
                    <input type="email" id='email' className='mt-1 p-2 border rounded w-full'
                    placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className="my-[2rem]">
                    <label htmlFor='password' className='black text-sm font-medium'>Password</label>
                    <input type="password" id='password' className='mt-1 p-2 border rounded w-full'
                    placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div className="my-[2rem]">
                    <label htmlFor='confirmPassword' className='black text-sm font-medium'>Confirm Password</label>
                    <input type="password" id='confirmPassword' className='mt-1 p-2 border rounded w-full'
                    placeholder='confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                </div>
           <button disabled={isLoading} type='submit' className='bg-blue-500 text-white px-4 py02 rounded cursor-pointer my-[1rem]'>
            {isLoading ? "Registering..." : "Register" }
           </button>
   {isLoading && <Loader/>}
            </form>
        <div className="mt-4">
            <p >
                Alreadt have an account? {" "}
                <Link to={redirect? `/login?redirect=${redirect}` : '/login'} className='text-blue-500 hover:underline'>Login</Link>
            </p>
        </div>
        </div>
        <img
        src="https://images.unsplash.com/photo-1576502200916-3808e07386a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2065&q=80"
        alt=""
        className="h-[65rem] w-[59%] xl:block md:hidden sm:hidden rounded-lg"
      />
      
    </section>
  )
}

export default Register
