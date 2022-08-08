// import {  createStore, applyMiddleware, combineReducers, compose,
// } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import { userReducerData } from './users/users-reducers';
// import { conversationReducerData } from './conversation/conversation-reducers';
// import { authReduser } from './auth/auth-reducers';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from '@redux-devtools/extension';

// const rootReducer = combineReducers({
// })

// const persistConfig = {
//   key: 'root',
//   storage,
//   // whitelist: ['filters', 'positions'],
//   // blacklist: ['positions'],
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

// const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
// const devtoolMiddleware = 
//   ext && process.env.NODE_ENV === 'development' ? ext() : f => f;

// const store = createStore(
//  combineReducers({
//   auth: authReduser,
//   users: userReducerData,
//   conversation: conversationReducerData
//  }),
//  compose(
//    applyMiddleware(thunk),
//    devtoolMiddleware
//  )
// );

// export {store};
// export const persistor = persistStore(store);




// const store = createStore(
//   persistedReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//   composeWithDevTools(
//     applyMiddleware(),
//   )

// );



























import {configureStore} from '@reduxjs/toolkit';
import { 
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  
import storage from 'redux-persist/lib/storage';
import {combineReducers} from 'redux';
import { userReducerData } from './users/users-reducers';
import { conversationReducerData } from './conversation/conversation-reducers';
import { authReduser } from './auth/auth-reducers';


const preloadedState = {
  auth: {},
  users: {
    usersData: []
  },
  conversation: {
    messages: {},
    receiverData: ''
  }
}

const rootReducer = combineReducers({
    auth: authReduser,
    users: userReducerData,
    conversation: conversationReducerData
  })



  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
    
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer);



  export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ]
      }
    })
  });

  
export const persistor = persistStore(store);