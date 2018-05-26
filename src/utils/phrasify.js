export const phrasify = () => {
  const verbs = [
    'curling',
    'priming',
    'picking',
    'watching',
    'tickling',
    'spinning',
    'chasing',
    'laughing at',
    'scrubbing'
  ];

  const nouns = [
    'squirrels',
    'flowers',
    'cats',
    'tires',
    'fries',
    'boogie men',
    'dogs'
  ];

  const verbIndex = Math.floor(Math.random() * verbs.length);
  const nounIndex = Math.floor(Math.random() * nouns.length);

  return verbs[verbIndex] + ' ' + nouns[nounIndex];
};