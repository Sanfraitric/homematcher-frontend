//import 'antd/dist/antd.css';
import '../styles/globals.css';
import Head from 'next/head';
// redux imports
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from '../reducers/user';

const store = configureStore({
  reducer:{ user },
});


function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
        <Head>
          <title>Home Matcher</title>
        </Head>
        <Component {...pageProps} />
    </Provider>
  );
}

export default App;
