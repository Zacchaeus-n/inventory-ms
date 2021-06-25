/**
 * ==================================
 * DOM ELEMENTS SELECTION
 * ==================================
 */
// selecting top summary elements
const topSummary = document.querySelector(`.topSummary`);
const totalItems = topSummary.querySelector(`.totalItems`);
const stockItems = topSummary.querySelector(`.stockItems`);
const totalCategories = topSummary.querySelector(`.totalCategories`);
const headphonesCount = topSummary.querySelector(`.headphonesCount`);
const iphonesCount = topSummary.querySelector(`.iphoneCount`);
const sumsungsCount = topSummary.querySelector(`.sumsungCount`);

// selecting the left side list items
// const leftSibarPaper = document.querySelector(`.leftSibarPaper`);
// const listItemAddBtn = leftSibarPaper.querySelector(`.listItemAddBtn`);

// selecting table elements
const tbody = document.querySelector(`tbody`);
const updateBtn = tbody.querySelector(`.tdUpdateBtn`);
const deleteBtn = tbody.querySelector(`.tdDeleteBtn`);

//selecting modal elements
const modalOuter = document.querySelector(`.modal__outer`);
const modalInner = modalOuter.querySelector(`.modal__inner`);
const yesDelete = modalInner.querySelector(`.btnYes`);
const noDelete = modalInner.querySelector(`.btnNo`);

//Global Variables
let totalItemCount;
let totalCategoryCount;
let stockItemCount = [];
let headphoneCount = [];
let iphoneCount = [];
let sumsungCount = [];

/**
 * ==================================
 * SUPPORT FUNCTIONS
 * ==================================
 */

//close the modal
const closeModal = () => {
  modalOuter.classList.remove(`open`);
  //   ModalTitle.textContent = `UPDATE ITEM`;

  //   clearInputs();
};
//identifying when a click event is outside the inner modal
modalOuter.addEventListener(`click`, (e) => {
  const isOutSide = !e.target.closest(`.modal__inner`);
  if (isOutSide) {
    closeModal();
  }
});

// closing the modal with the escape key
window.addEventListener(`keydown`, (e) => {
  if (e.key === `Escape`) {
    closeModal();
  }
});

// open the modal
const openModal = () => {
  modalOuter.classList.add(`open`);
};

// clear the input fields
const clearInputs = () => {
  //   let categoryOpt = category.options[category.selectedIndex];
  // clear inputs
  title.value = ``;
  description.value = ``;
  //   categoryOpt.textContent = ``;
  quantity.value = 0;
};

// get all the products info if there is any in the local storage
const getProductFromStorage = () => {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  // returns empty array if there isn't any product info
};
const calculateCategory = () => {
  let uniqueItems = [];
  // retrieving products from the localstore
  let storeData = getProductFromStorage();
  for (let item of storeData) {
    if (!uniqueItems.includes(item.category)) {
      uniqueItems.push(item.category);
    }
  }

  return uniqueItems;
};

totalCategoryCount = calculateCategory();
const calculateItemStock = () => {
  let total = 0;
  let storeData = getProductFromStorage();
  storeData.forEach((storeItem) => {
    total += parseInt(storeItem.quantity);
  });
  return total;
};

// get the summaries
const getItemSummary = () => {
  // retrieving products from the localstore
  let storeData = getProductFromStorage();
  totalItemCount = storeData.length;
  storeData.forEach((storeItem) => {
    stockItemCount.push(storeItem.quantity); // if (!totalCategoryCount.includes(storeItem.category)) {
    //   totalCategoryCount.push();
    // }

    switch (storeItem.category) {
      case `Headphone`:
        headphoneCount.push(storeItem.quantity);
        break;
      case `IPhone`:
        iphoneCount.push(storeItem.quantity);
        break;
      case `Samsung`:
        sumsungCount.push(storeItem.quantity);
        break;

      default:
        console.log(`Category not found`);
        break;
    }
  });
};

getItemSummary();

const summaryCalculator = (totalTally, currentValue) =>
  parseInt(totalTally) + parseInt(currentValue);

headphonesCount.textContent = headphoneCount.reduce(summaryCalculator, 0);
iphonesCount.textContent = iphoneCount.reduce(summaryCalculator, 0);
sumsungsCount.textContent = sumsungCount.reduce(summaryCalculator, 0);
totalItems.textContent = totalItemCount;

stockItems.textContent = calculateItemStock();
totalCategories.textContent = totalCategoryCount.length;

const noDeleteHandler = () => closeModal();
const showDeleteModalHandler = (index) => {
  // After showing add to modal
  openModal();
  yesDelete.addEventListener(`click`, () => {
    deleteItem(index);
    closeModal();
  });

  noDelete.addEventListener(`click`, noDeleteHandler);
};

const deleteItem = (index) => {
  let items = JSON.parse(localStorage.getItem("products"));
  items.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(items));
  populateData(tbody);
  window.location.href = "./index.html";
};

/**
 * ==================================
 * LOADING DATA FROM PRODUCTS JSON FILE AND DISPLAYING ON THE PAGE
 * ==================================
 */
let storedProducts;
let PRODUCTS = [];
let jsonLoaded = false;
if (localStorage.getItem("jsonLoaded")) {
  jsonLoaded = JSON.parse(localStorage.getItem("jsonLoaded"));
}

if (!jsonLoaded) {
  fetch(`../js/data.json`)
    .then((res) => res.json())
    .then((loadedItems) => {
      PRODUCTS = loadedItems.products;

      localStorage.setItem("products", JSON.stringify(PRODUCTS));
      localStorage.setItem("jsonLoaded", JSON.stringify(true));
      //   calling the populateData function to display data
      populateData(tbody);
      getItemSummary();
    })
    .catch((error) => {
      console.log(error);
    });
}

/**
 * ==================================
 * POPULATING THE TABLE WITH PRODUCTS
 * ==================================
 */

// custom function that takes an array and html element
// and display the array items in the html element
const populateData = (displayArea) => {
  productData = JSON.parse(localStorage.getItem("products"));
  displayArea.innerHTML = productData
    .map((productItem, index) => {
      //   console.log(productItem);
      //   console.log(index);
      return `
        
        <tr data-index=${index}>
        <td>${index + 1}</td>
        <td>${productItem.title}</td>
        <td>${productItem.description}</td>
        <td>${productItem.category}</td>
        <td>${productItem.quantity}</td>
        <td>${
          productItem.quantity == 0
            ? "<div class='outOfStock'>Out of Stock</div>"
            : productItem.quantity > 0 && productItem.quantity < 20
            ? "<div class='aOutOfStock'>Almost Out of Stock</div>"
            : "<div class='inStock'>In Stock</div>"
        }</td>
        <td class="update">
            <button id="tdUpdateBtn" type="submit" onclick="populateFieldsHandler(${index})" class="tdUpdateBtn">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>Update
            </button>        
        </td>
        <td>
            <button id="tdDeleteBtn" type="submit" onclick="showDeleteModalHandler(${index})" class="tdDeleteBtn">
                <i class="fa fa-trash" aria-hidden="true"></i>Delete
            </button> 
        </td>
        </tr>
        
        `;
    })
    .join("");
};

populateData(tbody);

/**
 * ==================================
 * HANDLERS
 * ==================================
 */

/**tb update btn handler:set a key in local store and put index of the item to be deleted */
const populateFieldsHandler = (index) => {
  localStorage.setItem(`updateStore`, JSON.stringify(index));
  window.location.href = `/html/updateItemDetails.html`;
};

/**
 * setTimeout(() => {
    elementDiv.remove()
}, 1500);
 */
