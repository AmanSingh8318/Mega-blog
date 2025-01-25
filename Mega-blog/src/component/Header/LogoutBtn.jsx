import React from 'react';
import { useDispatch } from 'react-redux';
import service from '../../appwrite/auth';
import { logut_Toast } from '../../pages/Toast';
import { logout } from '../../store/authSlice';

    function LogoutBtn() {
        const dispatch=useDispatch();
        const logoutHnadler=()=>{
            service.logout().then(()=>{
              dispatch(logout());
              logut_Toast();
              setTimeout(()=>{
                window.location.reload();

              },2000)
            })    
          }
  return (
    <button 

    onClick={logoutHnadler}
    className='inline-block px-6  py-2 duration-200 hover:bg-blue-100 rounded-full'
    >logout</button>
  )
}

export default LogoutBtn;
