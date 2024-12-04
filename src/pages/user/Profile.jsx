import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { setCredientials } from '../../redux/features/auth/authSlice'
import { Link } from 'react-router-dom'
import { useProfileMutation } from '../../redux/userApiSlice'
const Profile = () => {
    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [confirmPassword,setConfirmPassword]=useState("");
    
    const {userInfo}=useSelector((state)=>state.auth);

    const [updateProfile,{isLoading:loadingUpdatedProfile}]=useProfileMutation();
    
    useEffect(()=>{
      setUsername(userInfo.username);
      setEmail(userInfo.email)
  },[userInfo.email,userInfo.username]);

  const dispatch=useDispatch();

   const submitHandler=async(e)=>{
    e.preventDefault();
    if(password!=confirmPassword){
      toast.error("Password does not match");
    }
    else{
      try{
       const res=await updateProfile({_id:userInfo._id,username,email,password}).unwrap();
      //  console.log(res);
       dispatch(setCredientials({...res}));
       toast.success("Profile Updated Successfully");
      }
      catch(err){
        toast.error(err?.data?.message || err.message);
      }
    }
   }
  return (
    <div className='container mx-auto p-4 mt-[10rem]'>
      <div className="flex justify-center align-center md:flex md:space-x-4">
      <div className="md:w1/3">
        <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
      <form onSubmit={submitHandler}>
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
               <div className="flex justify-between">
                <button className='bg-blue-500 text-white py-2 px-4  rounded hover:bg-blue-700 ' type='submit'>Update</button>
               <Link to='/users/orders' className='bg-blue-500 text-white py-2 px-4 hover:bg-blue-7000'>My Orders</Link>
               </div>
        </form>
      </div>
        </div>      
    </div>
  )
}

export default Profile
