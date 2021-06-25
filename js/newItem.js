/**Selecting inputs from the add new item page */
const newItemForm = document.querySelector(`.addItem`);
const newItemName = newItemForm.querySelector(`#newItemName`);
const newItemDesc = newItemForm.querySelector(`#newItemDesc`);
const newCategory = newItemForm.querySelector(`#newCategory`);
const newQuantity = newItemForm.querySelector(`#newQuantity`);
const addNewItemBtn = newItemForm.querySelector(`#addNewItemBtn`);

// get all the products info if there is any in the local storage
const getProductFromStorage = () => {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  // returns empty array if there isn't any product info
};
/**
 * ==================================
 * ADD NEW ITEMS
 * ==================================
 */

const getNewDataHandler = (e) => {
  e.preventDefault();
  const newCategoryOpt = newCategory.options[newCategory.selectedIndex];
  // retrieving products from the localstore
  let storeData = getProductFromStorage();

  //   console.log(storeData);
  //   populating modal update form with slected item data
  let newItemObj = {
    id: storeData.length + 1,
    title: newItemName.value,
    image: `/assets/images/products/sumsung/samsung1.jpeg`,
    price: 340,
    category: newCategoryOpt.value,
    description: newItemDesc.value,
    quantity: newQuantity.value,
  };
  storeData.push(newItemObj);
  //   console.log(storeData);

  // update localstore with updateObject at index position
  //   storeData[index] = newItemObj;
  localStorage.setItem(`products`, JSON.stringify(storeData));

  //   //   calling the populateData function to display updated data
  // populateData(storeData, tbody);
};

addNewItemBtn.addEventListener(`click`, getNewDataHandler);
