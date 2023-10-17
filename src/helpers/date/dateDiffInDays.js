export default (date1, date2) => {
  const diffInMilliseconds = Math.abs(new Date(date2) - new Date(date1));
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  const daysDifference = Math.floor(diffInMilliseconds / millisecondsPerDay);
  return daysDifference;
}