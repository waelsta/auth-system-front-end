import {createSlice} from '@reduxjs/toolkit'


const userSlice = createSlice({
    name:"userReducer",
    initialState:{
        isLoggedIn:false,
        username:"",
        password:""
    },
    reducers:{
        signIn:(state,action)=>{
            state.isLoggedIn = true;
            state.username = action.payload.username ;
            state.password = action.payload.password;
        }
    }
},)

export const{
    signIn
} = userSlice.actions
export const userReducer = userSlice.reducer