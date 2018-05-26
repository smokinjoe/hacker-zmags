import axios from 'axios';

const NUM_ARTICLES = 10;

// export const actions = {};
export const types = {};

/**
* fetch article json from hacker news api
*/

types.GET_ARTICLES_JSON = 'GET_ARTICLES_JSON';

export const getArticles = () => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'Content-Type: application/json'
      }
    })
    .then(items => {
      dispatch(getRandomArticles(items.data));
      resolve(items);
    })
    .catch(error => {
      console.error('ERROR: ', error);
      reject();
    });
  });
};

const getRandomArticles = (jsonArray) => {
  const articles = new Array(NUM_ARTICLES);
  const taken = new Array(len);
  let len = jsonArray.length;
  let n = NUM_ARTICLES;

  if (n > len) {
    // throw new RangeError("getRandom: more elements taken than available");
    console.error('getRandomArticles: more elements taken than available');
  }

  while (n--) {
    const x = Math.floor(Math.random() * len);
    articles[n] = jsonArray[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }

  return {
    type: types.GET_ARTICLES_JSON,
    data: articles
  };
};