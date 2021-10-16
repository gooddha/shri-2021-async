module.exports = function (Homework) {

  const { AsyncArray, add, subtract, multiply, divide, less, equal, lessOrEqual } = Homework;
  let getLength = async (array) => {
    return await new Promise((resolve) => {
      array['length']((res) => resolve(res));
    });
  }

  let getValue = async (i, array) => {
    return await new Promise((resolve) => {
      array.get(i, (res) => resolve(res));
    });
  }

  let calc = async (method, a, b) => {
    return await new Promise((resolve) => {
      method(a, b, (res) => resolve(res));
    });
  }

  return async (asyncArray, fn, initialValue, cb) => {

    let length = await getLength(asyncArray)

    let acc = initialValue;
    let i = 0;

    while (await calc(less, i, length)) {
      let current = await getValue(i, asyncArray);
      console.log(current)

      acc = await calc(add, current, acc)

      i = await calc(add, 1, i);
    }

    cb(acc);
  }
}