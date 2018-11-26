export default (params = {}) => {
  let str = '';
  Object.keys(params).map((key, index) => {
    if (index === 0) str += '?';
    if (index >= 1) str += '&';
    str += key;
    str += '=';
    str += params[key];
    return null;
  });
  return str;
};
