
const toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

const sequenceReduce = (array, cb) => array.reduce((promise, item) => promise.then(() => {
  cb(item);
}), Promise.resolve());

const sequenceRecursive = (array, cb) => {
  const chainOfPromises = (arr, index) => {
    if (index === arr.length) {
      return Promise.resolve();
    }
    return Promise.resolve(cb(arr[index])).then(() => chainOfPromises(arr, index + 1));
  };
  return chainOfPromises(array, 0);
};

const rejectWith = val => new Promise((resolve, reject) => {
  reject(val);
});

module.exports = {
  toTitleCase,
  sequenceReduce,
  sequenceRecursive,
  rejectWith,
};
