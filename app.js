const addBookBtn = document.querySelector(".add-book-btn");
const dialog = document.querySelector(".dialog");
const cancel = document.querySelector(".cancel");
const form = document.querySelector("#form");

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancel.addEventListener("click", () => {
  dialog.close();
  form.reset();
});
