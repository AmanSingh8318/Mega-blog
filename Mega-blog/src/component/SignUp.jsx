import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
function SignUp() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [error, seterror] = useState("")
    const { register, handleSubmit } = useForm()

    const create=async(data)=>{
        seterror("")
        try {
            const userdata=await authService.createAccount(data);
            if (userdata) {
                const currentUser=await authService.getCurrentUser();

                if (currentUser) {
                    dispatch(login(data))
                    navigate('/')
                }
            }
        } catch (error) {
            seterror(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}>
      <div className='mb-2 flex justify-center '>
      <span className='inline-block w-full max-w-[100px]'>
        <Logo width='100%' />
      </span>
      </div>
      <h2 className='text-center text-2xl font-bold leading-tight'>Sign up to Create an Account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
            Already have any account?&nbsp;
            <Link 
            to="/login"
            className='font-medium text-primary transition-all duration-200 hover:underline'
            >
                Sign In
            </Link>
            </p>
            {error&& <p className='text-red-600 mt-8 text-center'>
            {error}
            </p>}
            <form
            onSubmit={handleSubmit(create())}
            >
                <div className='space-y-5'>
                  <Input
                  label="Full-name"
                  placeholder="enter your full Name"
                  {...register('name',{
                    required:true

                  })}
                  />
                  <Input
                    label="email"
                    placeholder="enter your email"
                    type="email"
                        {...register("email",{
                            required: true,
                            validate:{
                                matchPattern:(value)=>
                                    /^\S+@\S+\.\S+$/i.test(value) || 
                                "Email Adress must be valid Adress",
                            }
                        })}
                    />
                    <Input
                    label="password"
                    placeholder="enter your password"
                    type="password"
                    {...register("password",{
                       required:true
                    })}
                    />
                    <Button type="submit" className='w-full text-white bg-primary hover:bg-primary/70 transition-all duration-200'>
                    Create Account
                    </Button>
                </div>
            </form>
      </div>
    </div>
  )
}

export default SignUp
