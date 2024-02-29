const formatValues = (keys, values, isUpdate) => {
  let ins = [];
  isUpdate
    ? keys.map((key, index) => {
        if (typeof values[index] === "string") {
          ins.push(`${key}="${values[index]}"`);
        } else {
          ins.push(`${key}=${values[index]}`);
        }
      })
    : values.map((item) => {
        if (typeof item === "string") {
          ins.push(`"${item}"`);
        } else {
          ins.push(`${item}`);
        }
      });
  return ins;
};

module.exports = formatValues;
