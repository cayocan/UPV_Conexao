// reducers.js
import { clickReducer } from './clickReducer';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

const Reducers = (history) => combineReducers({
  router: connectRouter(history),
  clickState: clickReducer,
  //otherState: otherReducer
})
export default Reducers