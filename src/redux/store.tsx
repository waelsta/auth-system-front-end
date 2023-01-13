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
import clientSagas from './client/clientSagas';
import { uiReducer } from './ui/uiSlice';

const rootPersistConfig = {
  key: 'root',
  storage
};
const clientPersistConfig = {
  key: 'clientReducer',
  storage,
  whitelist: ['client']
};

const uiPersistConfig = {
  key: 'uiReducer',
  storage,
  blacklist: ['uiReducer']
};

const rootReducer = combineReducers({
  clientReducer: persistReducer(clientPersistConfig, clientReducer),
  uiReducer: persistReducer(uiPersistConfig, uiReducer)
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

sagaMiddleware.run(clientSagas);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
