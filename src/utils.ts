export const selectRandomElement = (items: any[]) => {
  return items[Math.floor(Math.random() * items.length)];
};
