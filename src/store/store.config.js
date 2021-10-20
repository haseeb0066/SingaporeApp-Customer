import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import axios from 'axios';
import Env from '../env/env';
import authReducer from './reducer/auth.reducer';
import HomeReducer from './reducer/dashboard.reducer';
import CartReducer from './reducer/cart.reducer';

// Axios config
axios.defaults.baseURL = Env.BASE_URL;
axios.defaults.headers.appkey = Env.APP_KEY;
axios.interceptors.request.use(
  (config) => {
    config.headers.sessiontoken = STORE.getState()?.auth?.user?.successData
      ?.session?.session_key
      ? STORE.getState()?.auth?.user?.successData?.session?.session_key
      : STORE.getState()?.auth?.user?.session?.session_key;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// REDUX CONFIGURATIONS
const rootReducer = combineReducers({
  auth: authReducer,
  dashboard: HomeReducer,
  cart: CartReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // whitelist: ['auth']
  // blacklist: []
};
const middleware = applyMiddleware(promise, thunk);

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const STORE = createStore(
  persistedReducer,
  composeEnhancers(middleware),
);
export const PERSISTOR = persistStore(STORE);
