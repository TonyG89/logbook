export default (days) => {
  if (days >= 365) {
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30); 
    return { years, months };
  } else if (days >= 30) {
    const months = Math.floor(days / 30);
    return { months };
  } else {
    return { days };
  }
}