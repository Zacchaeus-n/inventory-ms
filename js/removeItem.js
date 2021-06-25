const searchInput = document.querySelector(`.search input`);

// selecting table elements
const tbody = document.querySelector(`tbody`);
const updateBtn = tbody.querySelector(`.tdUpdateBtn`);
const deleteBtn = tbody.querySelector(`.tdDeleteBtn`);

//selecting modal elements
const modalOuter = document.querySelector(`.modal__outer`);
const modalInner = modalOuter.querySelector(`.modal__inner`);
const yesDelete = modalInner.querySelector(`.btnYes`);
const noDelete = modalInner.querySelector(`.btnNo`);

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

// get all the products info if there is any in the local storage
const getProductFromStorage = () => {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  // returns empty array if there isn't any product info
};

const searchHandler = () => {
  let storeData = getProductFromStorage();
  storeData
    .filter((storeItem) => {
      return (
        storeItem.title.toLowerCase().includes(searchInput.value) ||
        storeItem.category.toLowerCase().includes(searchInput.value)
      );
    })
    .forEach((productItem, index) => {
      tbody.innerHTML = `
        
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
        <td>
            <button id="tdDeleteBtn" type="submit" onclick="showDeleteModalHandler(${index})" class="tdDeleteBtn">
                <i class="fa fa-trash" aria-hidden="true"></i>Delete
            </button> 
        </td>
        </tr>
        
        `;
    });
};

searchInput.addEventListener(`input`, searchHandler);

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
  searchHandler();
};
