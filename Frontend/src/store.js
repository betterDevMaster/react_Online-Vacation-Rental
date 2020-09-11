import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk];
//const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(
    rootReducer,
    initialState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));


export default store;
