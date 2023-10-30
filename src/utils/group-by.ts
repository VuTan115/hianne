type KeyFinderFunction<T> = (item: T) => any;

export const groupBy = <T>(
  values: T[],
  keyFinder: KeyFinderFunction<T> | string
) => {
  // using reduce to aggregate values
  return values.reduce((a: Record<string, T[]>, b: T) => {
    // depending upon the type of keyFinder
    // if it is a function, pass the value to it
    // if it is a property, access the property
    const key =
      typeof keyFinder === 'function'
        ? keyFinder(b)
        : (b as Record<string, any>)[keyFinder];

    // aggregate values based on the keys
    if (!a[key]) {
      a[key] = [b];
    } else {
      a[key] = [...a[key], b];
    }

    return a;
  }, {});
};
