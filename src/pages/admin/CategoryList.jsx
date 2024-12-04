import React, { useEffect, useState } from 'react'
import {useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useFetchCategoriesQuery} from "../../redux/CategoryApiSlice.js"
  import { toast } from 'react-toastify'
import CategoryForm from '../../components/CategoryForm.jsx';
// import { createCategory } from '../../../../backend/controllers/categoryController.js';
import Modal from '../../components/Modal.jsx';
const CategoryList = () => {
  const {data:categories}=useFetchCategoriesQuery();
  const [name,setName]=useState('')
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatingName,setUpdatingName]=useState('');
  const [modelVisible,setModelVisible]=useState(false);

  const [createCategory]=useCreateCategoryMutation();
  const [updateCategory]=useUpdateCategoryMutation();
  const [deleteCategiry]=useDeleteCategoryMutation();
    useEffect(()=>{

    })
    const handleCreateCategory=async(e)=>{
      e.preventDefault();
      if(!name)
      {toast.error("Enter Category Name");
    return }
    try{
    const result=await createCategory({name}).unwrap();
    if(result.error){
      toast.error(result.error)
    }else{
      setName("");
      toast.success(`${result.name} is created`);
    }
    }catch(err){
      console.log(err);
      toast.error("Creating category failed");
    }
    }
    const handleUpdateCategory = async (e) => {
      e.preventDefault();
  
      if (!updatingName) {
        toast.error("Category name is required");
        return;
      }
  
      try {
        const result = await updateCategory({
          categoryId: selectedCategory._id,
          updatedCategory: {
            name: updatingName,
          },
        }).unwrap();
  
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success(`${result.name} is updated`);
          setSelectedCategory(null);
          setUpdatingName("");
          setModalVisible(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
  return (
    <div className='ml-[10rem] flex flex-col md:flex-row'>
      <div className="md:w-3/4 p-3">
        <div className="h-12">
          Manage Categories
        </div>
        <CategoryForm  value={name} setValue={setName} handleSubmit={handleCreateCategory}  />
        <br/>
        <hr/>

        <div className="flex flex-wrap">
          {categories && categories.map((category)=>(
            <div key={category._id}>
              <button className='bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3
              hiver:bg-pink-700  focus:outline-none focus:ring-2 focus:ring-pink-500 focus:opacity-50' onClick={()=>{{
              setModelVisible(true)
              setSelectedCategory(category)
              setUpdatingName(category.name)
              }}}>{category.name}</button>
            </div>
          ))}
        </div>
        <Modal isOpen={modelVisible} onClose={()=>setModelVisible(false)}>
          <CategoryForm value={updatingName} setValue={(value)=>setUpdatingName(value)} handleSubmit={handleUpdateCategory} buttonText='update' />
        </Modal>
      </div>
    </div>
  )
}

export default CategoryList
