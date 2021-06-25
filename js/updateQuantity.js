const searchInput = document.querySelector(`.search input`);

// selecting table elements
const tbody = document.querySelector(`tbody`);
const updateBtn = tbody.querySelector(`.tdUpdateBtn`);
const deleteBtn = tbody.querySelector(`.tdDeleteBtn`);

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
      //   const tr = document.createElement("tr");
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
        <td class="update">
            <button id="tdUpdateBtn" type="submit" onclick="populateFieldsHandler(${index})" class="tdUpdateBtn">
                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>Update
            </button>        
        </td>
        </tr>
        
        `;

      //   tbody.appendChild(tr);
    });
};

searchInput.addEventListener(`input`, searchHandler);

/**tb update btn handler:set a key in local store and put index of the item to be deleted */
const populateFieldsHandler = (index) => {
  localStorage.setItem(`updateStore`, JSON.stringify(index));
  window.location.href = `/html/updateItemDetails.html`;
};
