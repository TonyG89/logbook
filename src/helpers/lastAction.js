const recurse = (obj, key) => {
  for (let i = 0; i < obj.length; i++) {
    if (obj[i][key]) {
      return obj[i][key];
    }
  }
};

export default (data) => {
  const lastDate = data[0]?.date;
  const lastAction = data[0]?.actions;
  const lastDistance = recurse(data, 'kilometers');
  // const lastDistance = data[0]?.kilometers ;
  const lastCategory = data[0]?.categories;
  const lastDetail = data[0]?.details;
  const lastWork = data[0]?.work;
  const lastSum = data[0]?.sum;
  const lastStatus = data[0]?.status;
  return {
    lastDate,
    lastAction,
    lastDistance,
    lastCategory,
    lastDetail,
    lastWork,
    lastSum,
    lastStatus,
  };
};
