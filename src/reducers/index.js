import { combineReducers } from 'redux';
import { types } from '../actions';

/**
* Article reducers
*/

const initialArticlesState = {
  ids: [],
  data: []
};

const articles = (state = initialArticlesState, action) => {
  switch (action.type) {
    case types.GET_ARTICLE_IDS:
      return Object.assign({}, state, {
        ids: action.data
      });
    case types.SET_ARTICLE_DETAIL:
      const data = state.data.slice();
      data.push(action.data);
      return Object.assign({}, state, {
        data: data
      });
    default:
      return state;
  }
};

/**
* Author reducers
*/

const initialAuthorsState = {};
const authors = (state = initialAuthorsState, action) => {
  switch (action.type) {
    case types.SET_AUTHOR_DETAIL:
      const authors = Object.assign({}, state.authors);
      authors[action.data.id] = action.data;
      return Object.assign({}, state, authors);
    default:
      return state;
  }
};

const reducers = {
  articles,
  authors
};

const rootReducer = combineReducers(reducers);
export default rootReducer;