import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authSlice from './features/authSlice'

import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


// Define the persist config for authSlice
const authPersistConfig = {
  key: 'auth',
  storage,
}

// Combine all the slices into the root reducer
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
})

// Configure the store with the combined reducer using configureStore

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: {
              ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
      }),
});


// Create the persistor
const persistor = persistStore(store)

export { store, persistor }
export default store
