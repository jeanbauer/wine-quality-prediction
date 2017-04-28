const normalize = n => (Number(parseFloat(Number(n).toString().split("e+")).toFixed(6)));

const id = n => normalize(n);

const media = function(n) {
  return id(0.5 * Math.pow(n, 2));
};

const mediaFinal = function(arr) {
  const total = arr.reduce((acc, x) => normalize(acc + x.media), 0);
  return id(total / arr.length);
};

module.exports = {
  mediaFinal,
  media,
  id
};