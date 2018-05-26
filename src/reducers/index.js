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

/**
* App request state
*/

const initialAppReqState = {
  length: 0,
  state: types.IDLE
};

const requests = (state = initialAppReqState, action) => {
  // console.log('JOE: state.length: ', state.length);
  // console.log('JOE: state.state: ', state.state);
  // console.log('JOE: action.type: ', action.type);
  switch (action.type) {
    case types.IDLE:
      let idleAssignState = Object.assign({}, state);
      if (action.state.length === 0) {
        idleAssignState.type = types.IDLE;
      }
      return Object.assign({}, idleAssignState);

    case types.FETCHING:
      let fetchingAssignState = Object.assign({}, state);
      fetchingAssignState.length += 1;
      fetchingAssignState.state = types.FETCHING;
      return Object.assign({}, fetchingAssignState);

    case types.COMPLETE:
      let completeAssignState = Object.assign({}, state);
      // JOE: NOTE: need some sort of error testing
      completeAssignState.length -= 1;

      if (completeAssignState.length === 0) {
        completeAssignState.state = types.IDLE;
        // console.log('JOE: setting idle!');
      }
      else {
        completeAssignState.state = types.COMPLETE;
      }
      return Object.assign({}, completeAssignState);

    case types.ERROR:
      return Object.assign({}, state, {
        state: types.ERROR
      });

    default:
      return state;

  }
};


const reducers = {
  articles,
  authors,
  requests
};

const rootReducer = combineReducers(reducers);
export default rootReducer;