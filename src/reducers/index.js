import { combineReducers } from 'redux';
import { types } from '../actions';

const initialArticlesState = [];

const articles = (state = initialArticlesState, action) => {
  switch (action.type) {
    case types.GET_ARTICLES:
      return Object.assign({}, state, action.data);
    default:
      return state;
  }
};

const reducers = {
  articles
};

const rootReducer = combineReducers(reducers);
export default rootReducer;