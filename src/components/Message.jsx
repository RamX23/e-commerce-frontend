import React from 'react'

const Message = ({variant,children}) => {
    const getVariantClass=()=>{
   switch(variant){
    case "success":
        return "bg-green-100 text-green-600"
     case "error":
        return "bg-red-100 text-red-600"
     default:
     return "bg-blue-200 text-blue-700"    
    }
}
  return (
    <div className={`p-4 rounded ${getVariantClass}`} >
      {children}
    </div>
  )
}

export default Message
