
import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null
}


const authslice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
                if (action.payload) {
                    state.status=true;
                    state.userData=action.payload.userData;
                 
                }else {
                    console.error("Invalid payload",action);
                    
                }
               
            
        },
        logout:(state)=>{
            state.status=false;
            state.userData=null;
        }
    }
})
 export const {login,logout}=authslice.actions;
 const authReducers= authslice.reducer;

 export default authReducers;