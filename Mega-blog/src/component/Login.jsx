import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
function Login() {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const [register,handleSubmit] =useForm()
    const [error,seterror]=useState("")
                const Login=async(data)=>{
                    seterror("")
                    try {
                        const session=await authService.login(data);
                        if (session) {
                            const userData=await authService.getCurrentuser();
                            if(userData){
                                dispatch(authLogin(userData))
                                navigate('/')
                            }
                        }
                    } catch (error) {
                        seterror(error.message)
                    }
                }
                return (
                    <>
                    
                    <div className='flex item-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100
        rounded-xl p-10 border border-black/10`}> 
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo widhth='100%' />
                </span>

            </div>

            <h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your Account</h2>
            <p className='mt-2 text-center text-base text-black/60'>
            Don&apos;t  have any account?&nbsp;
            <Link 
            to="/signup"
            className='font-medium text-primary transition-all duration-200 hover:underline'
            >
                Sign up
            </Link>
            </p>
            {error&& <p className='text-red-600 mt-8 text-center'>
            {error}
            </p>}

            <form onSubmit={handleSubmit(Login)} className='mt-8'>
                <div className='space-y-5'>
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
                    type="password"
                    placeholder="enter your email"
                    label="password"
                    {...register ("password",{

                        required: true,
                        validate:{
                                  minLength:8,
                         maxLength:10,
            pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                     }
                    })}
                    />
                    <Button
                    type='submit'
                    className='w-full'
                    >SignIn</Button>
                </div>
            </form>
      </div>
    </div>
                    </>
                )

}

export default Login;
