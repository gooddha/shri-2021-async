module.exports = function (Homework) {

  const { AsyncArray, add, subtract, multiply, divide, less, equal, lessOrEqual } = Homework;
  const getLength = async (array) => {
    return await new Promise((resolve) => {
      array['length']((res) => resolve(res));
    });
  };

  const getValue = async (i, array) => {
    return await new Promise((resolve) => {
      array.get(i, (res) => resolve(res));
    });
  };

  const calc = async (method, a, b) => {
    return await new Promise((resolve) => {
      method(a, b, (res) => resolve(res));
    });
  };

  const doFn = async (fn, acc, current, i, src) => {
    return await new Promise(resolve => {
      fn(acc, current, i, src, (res) => resolve(res));
    })
  }


  return async (asyncArray, fn, initialValue, cb) => {

    const length = await getLength(asyncArray)

    let acc = initialValue;
    let i = 0;

    while (await calc(less, i, length)) {
      let current = await getValue(i, asyncArray);

      acc = await doFn(fn, acc, current, i, asyncArray);
      i = await calc(add, 1, i);
    }

    cb(acc);
  }
}