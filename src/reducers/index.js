import { combineReducers } from 'redux';
import { types } from '../actions';

const initialArticlesState = {
  json: []
};

const articles = (state = initialArticlesState, action) => {
  switch (action.type) {
    case types.GET_ARTICLES_JSON:
      return Object.assign({}, state, {
        json: action.data
      });
    default:
      return state;
  }
};

const reducers = {
  articles
};

const rootReducer = combineReducers(reducers);
export default rootReducer;