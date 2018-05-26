import { combineReducers } from 'redux';
import { types } from '../actions';

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
      // state.data.push(action.data);

      const data = state.data.slice();
      data.push(action.data);

      return Object.assign({}, state, {
        data: data
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