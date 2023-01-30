export const limitForPage = (items, num) => {
  if (items.length < num) {
    return [items];
  } else {
    let itemsForPage = [];
    let itemForPage = [];
    items?.map((val, index) => {
      itemForPage.push(val);
      if ((index + 1) % num == 0 || index + 1 === items.length) {
        itemsForPage.push(itemForPage);
        itemForPage = [];
      }
    });
    return itemsForPage;
  }
};
