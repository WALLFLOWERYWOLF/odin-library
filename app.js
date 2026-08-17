const addBookBtn = document.querySelector(".add-book-btn");
const dialog = document.querySelector(".dialog");
const cancel = document.querySelector(".cancel");
addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});
cancel.addEventListener("click", () => {
  dialog.close();
});
