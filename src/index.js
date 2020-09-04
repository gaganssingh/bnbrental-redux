import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Redux Setup
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import rootReducer from "./reducers/rootReducer";

// Redux Persist setup
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { PersistGate } from "redux-persist/integration/react";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import Spinner from "./utility/Spinner/Spinner";
const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ["siteModal"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const theStore = applyMiddleware(reduxPromise)(createStore)(persistedReducer);
const persistor = persistStore(theStore);

ReactDOM.render(
    <Provider store={theStore}>
        <PersistGate loading={<Spinner />} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);
