export const initializeStore = (headers, inventory) => {
  let id = 1;
  const store = {};

  inventory.forEach((lineItem) => {
    const storeItem = { id: `${id}` };
    headers.forEach((value, key) => {
      storeItem[value] = lineItem[key];
    });
    store[id] = storeItem;
    id += 1;
  });

  return store;
};

export const buildWeaponStore = () => {
  const weaponHeaders = [
    'name', 'description', 'weaponClickPower', 'cost', 'owned', 'equipped',
  ];
  const weaponInventory = [
    ['Fist', 'The thumb goes on the outside!', 1, 0, true, true],
    ['Stick', 'It\'s brown and sticky', 2, 10, false, false],
    ['Rusty Shovel', 'Well, it\'s better than a stick', 5, 200, false, false],
    ['Push Lawn Mower', 'PUSH!', 10, 500, false, false],
    ['Tractor', 'Where\'s my tractor?', 25, 1000, false, false],
    ['Chuck Norris', 'Of course', 1000, 100000, false, false],
  ];
  return initializeStore(weaponHeaders, weaponInventory);
};

export const buildMItemStore = () => {
  const mItemHeader = [
    'name', 'description', 'iterationLength', 'coinsPerIteration',
    'cost', 'owned', 'equipped',
  ];
  const mItemInventory = [
    ['Toy Wand', 'Found this in a Cracker Jack box!', 20, 1, 0, true, true],
    ['Top Hat', 'Rabbit not included', 10, 2, 10, false, false],
    ['Tarot Cards', 'Gotta collect \'em all!', 1, 1, 200, false, false],
    ['Waluigi Board', 'What do you WAAAAAAnt?', 1, 2, 500, false, false],
    ['Crystal Ball', 'Predicting the future means more coins.', 1, 5, 1000, false, false],
    ['Harry Potter', 'Accio coins!', 1, 100, 100000, false, false],
  ];
  return initializeStore(mItemHeader, mItemInventory);
};

export const equipItem = (
  item, updates, itemCollection, updateItemCollection,
  buying,
) => {
  const itemCollectionKeys = Object.keys(itemCollection);
  const itemCollectionCopy = { ...itemCollection };
  itemCollectionKeys.forEach((itemId) => {
    if (itemId === item.id) {
      itemCollectionCopy[itemId].equipped = true;
      if (buying) {
        itemCollectionCopy[itemId].owned = true;
      }
    } else {
      itemCollectionCopy[itemId].equipped = false;
    }
  });
  updateItemCollection(itemCollectionCopy);
  updates.forEach((updateObj) => {
    updateObj.func(updateObj.value);
  });
};
