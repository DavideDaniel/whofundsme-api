'use strict';
exports.toTitleCase = (str) =>{
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

exports.sequenceReduce = (array, cb) => {
  return array.reduce(function chain(promise, item) {
    return promise.then(() => {
      cb(item);
    });
  }, Promise.resolve());
};

exports.sequenceRecursive = (array, cb) => {
  let chainOfPromises = (array, index) => {
    if (index == array.length) {
      return Promise.resolve()
    }
    return Promise.resolve(cb(array[index])).then(() => {
      return chainOfPromises(array, index + 1);
    });
  }
  return chainOfPromises(array, 0);
}

exports.rejectWith = (val) =>{
  return new Promise((resolve, reject) => {
    throw Error(val);
    resolve();
  });
}
