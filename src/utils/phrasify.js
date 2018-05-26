export const phrasify = () => {
  const verbs = [
    'reticulating',
    'compiling',
    'coding',
    'writing',
    'testing',
    'debugging',
    'awaiting'
  ];

  const nouns = [
    'splines',
    'modules',
    'components',
    'specs',
    'mocks',
    'reducers',
    'actions',
    'promises',
    'asyncs'
  ];

  const verbIndex = Math.floor(Math.random() * verbs.length);
  const nounIndex = Math.floor(Math.random() * nouns.length);

  return verbs[verbIndex] + ' ' + nouns[nounIndex];
};