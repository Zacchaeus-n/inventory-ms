// animating search field
const searchfield = document.querySelectorAll(
  `.search input[type="text"] + span`
);

searchfield.forEach((element) => {
  element.addEventListener(`click`, () => {
    element.previousElementSibling.value = "";
  });
});
