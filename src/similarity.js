const isUndefined = (variable) => typeof(variable) === 'undefined'
const isNull = (variable) => variable === null
const isPresent = (variable) => !isUndefined(variable) && !isNull(variable)

const stringToCharsArray = (string) => {
  return string.toString().split('')
}
const stringifyObject = (object) => {
  return object.toString()
}
const arrayToDuplicatesCountHash = (ar) => {
  return ar.reduce((objectsCountHash, object) => {
    let key = stringifyObject(object)
    objectsCountHash[key] = objectsCountHash[key] || 0
    objectsCountHash[key] += 1
    return objectsCountHash
  }, {})
}
const hashesToKeysArray = (hashes) => {
  return hashes.reduce((keys, hash) => {
    return keys.concat(Object.keys(hash))
  }, [])
}
const isCollision = (hashA, hashB, key) => {
  return isPresent(hashA[key]) && isPresent(hashB[key])
}
const substractAbsolute = (object1, object2) => {
  return Math.abs(parseInt(object1) - parseInt(object2))
}
const mergeDuplicatesCountSubstracting = (duplicatesCountA, duplicatesCountB) => {
  return hashesToKeysArray([duplicatesCountA, duplicatesCountB])
    .reduce((resultHash, key) => {

      if (isCollision(duplicatesCountA, duplicatesCountB, key)) {
        resultHash[key] = substractAbsolute(
          duplicatesCountA[key],
          duplicatesCountB[key]
        )
      } else {
        resultHash[key] =
          duplicatesCountA[key] ||
          duplicatesCountB[key]
      }
      return resultHash
    }, {})
}
const sumHashValues = (hash) => {
  let keys = Object.keys(hash)
  return keys.reduce((total, key) => {
    return total += hash[key]
  }, 0)
}
const similarityRate = (string1, string2) => {
  let dups1 = arrayToDuplicatesCountHash(stringToCharsArray(string1))
  let dups2 = arrayToDuplicatesCountHash(stringToCharsArray(string2))

  let mixedCharsCount = mergeDuplicatesCountSubstracting(dups1, dups2)

  return sumHashValues(mixedCharsCount) / Object.keys(mixedCharsCount).length
}

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
  similarityRate
}
