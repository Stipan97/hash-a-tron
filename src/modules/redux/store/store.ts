import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { currentUserReducer } from '../reducers/currentUserReducer';

export const store = createStore(
  combineReducers({
    user: currentUserReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk)),
);
