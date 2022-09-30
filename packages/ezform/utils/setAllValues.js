const setAllValues = (obj, value) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === "object") {
      acc[key] = setAllValues(obj[key], value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {});
};

export default setAllValues;
