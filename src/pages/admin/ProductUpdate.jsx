import { useEffect, useState } from "react"
import { useNavigate,useParams } from "react-router"
import { useUpdateProductMutation,useDeleteProductMutation,useGetProductByIdQuery,useUploadProductImageMutation } from "../../redux/api/productApiSlice"
import { useFetchCategoriesQuery } from "../../redux/CategoryApiSlice"
import { toast } from "react-toastify"
import AdminMenu from "./AdminMenu"
import ProducttList from "./ProducttList"
const ProductUpdate = () => {
    const params=useParams();

    const {data:productData}=useGetProductByIdQuery(params.id)
    console.log(productData);
    const [imageUrl, setImageUrl] = useState(null);
    const [image,setImage]=useState(productData?.image || "")
    const [name,setName]=useState(productData?.name|| "")
    const [description,setDescription]=useState(productData?.description || "");
    const [price,setPrice]=useState(productData?.price || "")
    const [category,setCategory]=useState(productData?.category || "");
    const [brand,setBrand]=useState(productData?.brand || "");
    const [stock,setStock]=useState(productData?.countInStock || "");
    const [quantity,setQuantity]=useState(productData?.quantity || "");

    const navigate=useNavigate();
     const {data:categories=[]}=useFetchCategoriesQuery();
     const [uploadProductImage]=useUploadProductImageMutation();
     const [updateProduct]=useUpdateProductMutation();
     const [deleteProduct]=useDeleteProductMutation();

     useEffect(()=>{
        if(productData && productData._id){
             setImage(productData.image);
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.categoory);
            setBrand(productData.brand)
            setQuantity(productData.quantity)
            setImage(productData.image)
            setStock(productData.countInStock)
        }
        console.log("Page rendered");
     },[productData]);


     const uploadFileHandler = async (e) => {
      const productData = new productData();
      productData.append("image", e.target.files[0]);
  
      try {
        const res = await uploadProductImage(productData).unwrap();
        toast.success("Item added successfully");
        setImage(res.image);
        setImageUrl(res.image);
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }; 

    const handleUpdate = async (e) => {
      e.preventDefault();
  
      try {
        const productData = new FormData();
        productData.append("image", image);
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("category", category);
        productData.append("quantity", quantity);
        productData.append("brand", brand);
        productData.append("countInStock", stock);
  
        const { data } = await updateProduct({productId:params.id,formData:productData});
        
        if (data.error) {
          toast.error("Product update failed. Try Again.");
        } else {
          toast.success("Product updated successfully");
          navigate("/admin/allproducts");
        }
      } catch (error) {
        console.error(error);
        toast.error("Product update failed. Try Again.");
      }
    };

    const handleDelete=async()=>{
      
      try{
        let answer=window.confirm('Are you sure you want to delete product')
        if(!answer) return;
        const {data}= await deleteProduct({productId:params.id})
        toast.success("Product deleted successfully");
        navigate("/admin/allproducts");
    } catch (error) {
      console.error(error);
      toast.error("Product delete failed. Try Again.");
    }
    }
   
    return (
      <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-4/4 p-3">
          <div className="h-12">Create Product</div>

          {image && (
            <div className="text-center">
              <img
                src={image}
                alt="product"
                className="block mx-auto max-h-[200px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11 ">
              {image ? image.name : "Upload Image"}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={uploadFileHandler}
                className={!image ? "hidden" : "text-black"}
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="two ml-10 ">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3  border rounded-lg w-[95%]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg "
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleUpdate}
              className="py-2 px-5 mt-5 rounded-lg text-lg font-bold border bg-green-600 mr-5"
            >
              Update
            </button>
            <button
              onClick={handleDelete}
              className="py-2 px-5 mt-5 rounded-lg text-lg font-bold border bg-red-600"
            >
             Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductUpdate
  