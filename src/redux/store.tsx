import {configureStore} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { userReducer } from './user/userSlice';

export const store = configureStore({
    reducer:{
        userReducer
    },
    middleware:(getDefaultMiddleware)=>{
       return getDefaultMiddleware().concat(logger);
    }
})