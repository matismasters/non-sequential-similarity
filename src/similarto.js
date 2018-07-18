const isUndefined = variable => typeof (variable) === 'undefined';
const isNull = variable => variable === null;
const isPresent = variable => !isUndefined(variable) && !isNull(variable);

const stringToCharsArray = string => string.toString().split('');

const stringifyObject = object => object.toString();

const arrayToDuplicatesCountHash = ar =>
  ar.reduce((objectsCountHash, object) => {
    let key = stringifyObject(object);
    objectsCountHash[key] = objectsCountHash[key] || 0;
    objectsCountHash[key] += 1;
    return objectsCountHash;
  }, {});

const hashesToKeysArray = hashes =>
  hashes.reduce(
    (keys, hash) => keys.concat(Object.keys(hash)),
    []
  );

const isCollision = (hashA, hashB, key) =>
  isPresent(hashA[key]) && isPresent(hashB[key]);

const substractAbsolute = (object1, object2) =>
  Math.abs(parseInt(object1) - parseInt(object2));

const mergeDuplicatesCountSubstracting = (duplicatesCountA, duplicatesCountB) =>
  hashesToKeysArray([duplicatesCountA, duplicatesCountB])
    .reduce((resultHash, key) => {
      if (isCollision(duplicatesCountA, duplicatesCountB, key)) {
        resultHash[key] = substractAbsolute(
          duplicatesCountA[key],
          duplicatesCountB[key]
        );
      } else {
        resultHash[key] =
          duplicatesCountA[key] ||
          duplicatesCountB[key];
      }

      return resultHash;
    }, {});

const sumHashValues = (hash) => {
  let keys = Object.keys(hash);
  return keys.reduce(
    (total, key) => total += hash[key],
    0
  );
};

const similarityRate = (string1, string2) => {
  let dups1 = arrayToDuplicatesCountHash(stringToCharsArray(string1));
  let dups2 = arrayToDuplicatesCountHash(stringToCharsArray(string2));

  let mixedCharsCount = mergeDuplicatesCountSubstracting(dups1, dups2);

  return sumHashValues(mixedCharsCount) / Object.keys(mixedCharsCount).length;
};

module.exports = {
  private: {
    isUndefined,
    isNull,
    isPresent,
    stringToCharsArray,
    stringifyObject,
    arrayToDuplicatesCountHash,
    hashesToKeysArray,
    isCollision,
    substractAbsolute,
    mergeDuplicatesCountSubstracting,
    sumHashValues,
  },
  similarityRate,
};
