import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducer';

//https://www.freecodecamp.org/forum/t/my-redux-store-updates-but-react-view-doesnt/200474
const store = createStore(
    reducer, {}, 
    applyMiddleware(thunk, 
        logger

        ));
export default store;