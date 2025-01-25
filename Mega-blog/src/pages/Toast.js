import { toast } from 'react-toastify'

 export const login_Toast=()=>{
    toast.success('Login Successfull')
}
 export const register_Toast=()=>{
    toast.success('Account Created Successfully')
    }

    export const logut_Toast=()=>{
        toast.error('Logout Successfull')
    }
 export   const addPost=()=>{
        toast.success('Post Added Successfully')
    }
  export  const deletePost=()=>{
        toast.error('Post Deleted Successfully')
        }
   export     const updatePost=()=>{
            toast.success('Post Updated Successfully')
            }