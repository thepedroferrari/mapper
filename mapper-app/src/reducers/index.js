import { combineReducers } from 'redux';

const data = fetch('http://localhost:3001/mappers/')
    .then(response => response.json())
    .then(data => data )



const appReducer = combineReducers({
    toBeRemoved: (ignoredAction) => ({}),
    data: () => data
});



export default appReducer;
