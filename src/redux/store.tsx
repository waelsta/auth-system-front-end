import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { clientReducer } from './client/clientSlice';
import createSagaMiddleware from '@redux-saga/core';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import { uiReducer } from './ui/uiSlice';
import userReducer from './user/userSlice';
import { rootSagas } from './rootSagas';

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['clientReducer', 'userReducer'],
  blacklist: ['uiReducer']
};
const clientPersistConfig = {
  key: 'clientReducer',
  storage,
  whitelist: ['client']
};

const uiPersistConfig = {
  key: 'uiReducer',
  storage,
  blacklist: ['ui']
};

const userPersistConfig = {
  key: 'userReducer',
  storage,
  whitelist: ['userReducer']
};

const rootReducer = combineReducers({
  clientReducer: persistReducer(clientPersistConfig, clientReducer),
  uiReducer: persistReducer(uiPersistConfig, uiReducer),
  userReducer: persistReducer(userPersistConfig, userReducer)
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(sagaMiddleware, logger);
  }
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSagas);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
