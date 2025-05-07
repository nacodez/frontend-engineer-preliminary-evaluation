export function compose(fns) {
  if (!Array.isArray(fns)) {
    throw new TypeError("Expected an array of functions");
  }

  if (fns.length === 0) {
    return (x) => x;
  }

  fns.forEach((fn, index) => {
    if (typeof fn !== "function") {
      throw new TypeError(`Item at index ${index} is not a function`);
    }
  });

  return function composed(...args) {
    let result = fns[fns.length - 1](...args);

    for (let i = fns.length - 2; i >= 0; i--) {
      const fn = fns[i];

      if (result instanceof Promise) {
        result = result.then(fn);
      } else {
        result = fn(result);
      }
    }

    return result;
  };
}

export function pipe(fns) {
  if (!Array.isArray(fns)) {
    throw new TypeError("Expected an array of functions");
  }

  if (fns.length === 0) {
    return (x) => x;
  }

  fns.forEach((fn, index) => {
    if (typeof fn !== "function") {
      throw new TypeError(`Item at index ${index} is not a function`);
    }
  });

  return function piped(...args) {
    let result = fns[0](...args);

    for (let i = 1; i < fns.length; i++) {
      const fn = fns[i];

      if (result instanceof Promise) {
        result = result.then(fn);
      } else {
        result = fn(result);
      }
    }

    return result;
  };
}

export async function composeAsync(fns) {
  if (!Array.isArray(fns)) {
    throw new TypeError("Expected an array of functions");
  }

  if (fns.length === 0) {
    return async (x) => x;
  }

  fns.forEach((fn, index) => {
    if (typeof fn !== "function") {
      throw new TypeError(`Item at index ${index} is not a function`);
    }
  });

  return async function composedAsync(...args) {
    let result = await fns[fns.length - 1](...args);

    for (let i = fns.length - 2; i >= 0; i--) {
      const fn = fns[i];

      result = await fn(result);
    }

    return result;
  };
}
