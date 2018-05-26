import axios from 'axios';

export const actions = {};
export const types = {};

/**
* fetch article json from hacker news api
*/

types.GET_ARTICLES = 'GET_ARTICLES';

actions.getArticles = () => (dispatch) => {
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
      console.log(items);

      resolve(items);
    })
    .catch(error => {
      console.error('ERROR: ', error);
      reject();
    });


  });


}