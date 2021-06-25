const updateItemRow = document.querySelector(`.update_item`);
const title = updateItemRow.querySelector(`#itemName`);
const description = updateItemRow.querySelector(`#itemDesc`);
const category = updateItemRow.querySelector(`#category`);
const quantity = updateItemRow.querySelector(`#quantity`);
const updateItemBtn = updateItemRow.querySelector(`.updateItemBtn`);

// retreive index of item to delete from local store
let index = localStorage.getItem(`updateStore`);

// get all the products info if there is any in the local storage
const getProductFromStorage = () => {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  // returns empty array if there isn't any product info
};

/**tb update btn handler */
const populateFieldsHandler = () => {
  let categoryOpt = category.options[category.selectedIndex];
  // retrieving products from the localstore
  let storeData = getProductFromStorage();
  console.log(storeData);
  //   populating modal update form with slected item data
  title.value = storeData[index].title;
  description.value = storeData[index].description;
  categoryOpt.textContent = storeData[index].category;
  quantity.value = storeData[index].quantity;
  //   updateIndex.value = index;
};

populateFieldsHandler();

/**modal update btn handler */
const updateItemHandler = (e) => {
  e.preventDefault();
  let categoryOpt = category.options[category.selectedIndex];
  // retrieving index from hidden input
  //   const index = updateIndex.value;
  // retrieving products from the localstore
  let storeData = getProductFromStorage();

  //   new updates object
  let updateObject = {
    id: storeData[index].id,
    title: title.value,
    category: categoryOpt.textContent,
    description: description.value,
    quantity: quantity.value,
  };

  // update localstore with updateObject at index position
  storeData[index] = updateObject;
  localStorage.setItem(`products`, JSON.stringify(storeData));
  window.location.href = `/index.html`;
  //   calling the populateData function to display updated data
  //   populateData(tbody);
  //   clearInputs();
  //   closeModal();
};

updateItemBtn.addEventListener(`click`, updateItemHandler);
