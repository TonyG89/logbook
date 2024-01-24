export const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};

export const setToLocalStorage = (data, name = '', isString = false) => {
  if (isString) {
    localStorage.setItem(name, data);
  } else {
    localStorage.setItem(name, JSON.stringify(data));
  }
};
