import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import { doctorsReducer, doctorReducer, userReducer } from './reducers';

const reducer = combineReducers({
  doctors: doctorsReducer,
  doctor: doctorReducer,
  user: userReducer,
});

const composeEnchancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnchancers(applyMiddleware(thunk))
);
