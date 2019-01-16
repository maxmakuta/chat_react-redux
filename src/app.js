import React from "react";
import ReactDom from "react-dom";
import Chats from "./main";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reduxThunk from "redux-thunk";
import rootReducer from "./rootreducer";
import { Provider } from "react-redux";
let myStore = createStore(rootReducer, applyMiddleware(reduxPromise, reduxThunk));

ReactDom.render(<Provider store={myStore}><Chats /></Provider>, document.getElementById("reactcontainer"));