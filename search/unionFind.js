const find = (c, array) => {
  if (c !== array[c]) array[c] = find(array[c]);

  return array[c];
};

const union = (c1, c2, array) => {
  let p1 = find(c1, array);
  let p2 = find(c2, array);

  if (p1 !== p2) array[p1] = p2;
};
