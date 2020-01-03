// configureStore.js
import Reducers from '../reducers';
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';


export const history = createBrowserHistory();

export default function configureStore(preloadedState) {
  const store = createStore(
    Reducers(history), // root reducer with router state
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  )

  return store
}