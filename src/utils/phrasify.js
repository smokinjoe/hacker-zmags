export const phrasify = () => {
  const verbs = [
    'reticulating',
    'compiling',
    'coding',
    'writing',
    'testing',
    'debugging',
    'awaiting',
    'rubber ducking',
    'inheriting',
    'rendering',
    'iterating',
    'generating',
    'creating',
    'assigning',
    'exporting',
    'randomizing',
    'committing',
    'merging'
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
    'asyncs',
    'watchers',
    'listeners',
    'events',
    'prototypes',
    'objects',
    'arrays',
    'strings',
    'classes'
  ];

  const verbIndex = Math.floor(Math.random() * verbs.length);
  const nounIndex = Math.floor(Math.random() * nouns.length);

  return verbs[verbIndex] + ' ' + nouns[nounIndex];
};