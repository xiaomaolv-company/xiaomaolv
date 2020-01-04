/**
 * 对象类型元素的数组去重
 * @param arr 要去重的数组
 * @param key  对象的key
 * @returns {*}
 */
export const arrayRepeatByKey = (arr, key) => {
  let obj = {};
  return arr.reduce((current, next) => {
    obj[next[key]] ? "" : obj[next[key]] = true && current.push(next);
    return current;
  }, [])
};

/**
 * 一维数组去重
 * @param arr 要去重的数组
 * @returns {unknown[]}
 */
export const arrRepeat = (arr) => Array.from(new Set(arr));

