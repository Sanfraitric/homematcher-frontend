//import 'antd/dist/antd.css';
import '../styles/globals.css';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { configureStore , combineReducers } from '@reduxjs/toolkit';
import realtys from '../reducers/realtys';
import user from '../reducers/user';
import modal from '../reducers/modal';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'

const reducers = combineReducers({ user, realtys, modal })
const persistConfig = { key: 'homeMatcher', storage}

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Home Matcher</title>
        </Head>
        <Component {...pageProps} />
        </PersistGate>
    </Provider>
  );
}

export default App;
