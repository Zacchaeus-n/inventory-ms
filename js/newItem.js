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

// clear the input fields
const clearInputs = () => {
  // clear inputs
  newItemName.value = "";
  newItemDesc.value = "";
  newQuantity.value = "";
};

const getNewDataHandler = (e) => {
  e.preventDefault();
  const newCategoryOpt = newCategory.options[newCategory.selectedIndex];
  // retrieving products from the localstore
  let storeData = getProductFromStorage();
  if (
    newItemName.value !== "" &&
    newCategoryOpt.value !== "" &&
    newItemDesc.value !== "" &&
    newQuantity.value !== ""
  ) {
    let newItemObj = {
      id: storeData.length + 1,
      title: newItemName.value.trim(),
      category: newCategoryOpt.value,
      description: newItemDesc.value.trim(),
      quantity: newQuantity.value,
    };
    storeData.push(newItemObj);

    localStorage.setItem(`products`, JSON.stringify(storeData));
    alert(`Item Added Successfully`);
    clearInputs();
  } else {
    alert(`Please Provide All Missing Values`);
  }
};

addNewItemBtn.addEventListener(`click`, getNewDataHandler);
