export const getFromLocalStorage = (key) => {
  console.log('xxxx')
  return localStorage.getItem(key);
};

export const setToLocalStorage = (data, name = '', isString = false) => {
if (isString){
  console.log('xxxx')
  localStorage.setItem(name, data);
} else {
  console.log('zzzz')
  localStorage.setItem(name, JSON.stringify(data));
}
};