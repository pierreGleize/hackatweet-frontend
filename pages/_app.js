import "../styles/globals.css";
import Head from "next/head";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "../reducers/user";
import likes from "../reducers/likes";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";

// const store = configureStore({
//   reducer: { user, likes },
// });

const reducers = combineReducers({ user, likes });

const persistConfig = { key: "hackatweet", storage };
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Hackatweet</title>
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
