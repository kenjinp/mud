export const selectRandomElement = (items: any[]) => {
  return items[selectRandomElementIndex(items)];
};

export const selectRandomElementIndex = (items: any[]) => {
  return Math.floor(Math.random() * items.length);
};
