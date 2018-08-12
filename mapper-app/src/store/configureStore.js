import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/index';



const configureStore = (preloadedState) => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line


    const store = createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(createLogger())),
    );

    return store;
};

export default configureStore;
