import {configureStore} from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { clientReducer } from './client/clientSlice';
import createSagaMiddleware from '@redux-saga/core';
import userSagas from './client/clientSagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer:{
        clientReducer
    },
    middleware:(getDefaultMiddleware)=>{
       return getDefaultMiddleware().concat(sagaMiddleware,logger);
    }
})

sagaMiddleware.run(userSagas);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch