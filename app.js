const myLibrary = [
  {
    title: "The Tenant",
    author: "Frieda McFadden",
    pageCount: 350,
    read: false,
    id: "0867fc28-71d8-44c4-93ae-1302e36dc295",
  },
  {
    title: "The Tenant",
    author: "Frieda McFadden",
    pageCount: 350,
    read: true,
    id: "88b73827-188c-480e-86d8-4ed6826986d4",
  },
  {
    title: "The Tenant",
    author: "Frieda McFadden",
    pageCount: 350,
    read: true,
    id: "b578c24f-6765-4cb9-94a2-9a8c5ee6b56e",
  },
  {
    title: "The Hobbit",
    author: "Frieda McFadden",
    pageCount: 350,
    read: false,
    id: "55b33e72-f00c-4ec5-b964-c8039192e384",
  },
];

const addBookBtn = document.querySelector(".add-book-btn");
const dialog = document.querySelector(".dialog");
const cancel = document.querySelector(".cancel");
const form = document.querySelector("#form");
const cardsContainer = document.querySelector(".cards");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pageCountInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancel.addEventListener("click", () => {
  dialog.close();
  form.reset();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addBookToLibrary();
  form.reset();
  dialog.close();
});

cardsContainer.addEventListener("click", (event) => {
  const bookCard = event.target.closest(".card");
  if (!bookCard) return;
  const uid = bookCard.getAttribute("data-uid");
  const bookIndex = myLibrary.findIndex((book) => book.id == uid);
  const book = myLibrary[bookIndex];
  if (event.target.classList.contains("remove-btn")) {
    myLibrary.splice(bookIndex, 1);
    bookCard.remove();
  } else if (event.target.classList.contains("status-toggle-btn")) {
    const bookCardStatus = bookCard.querySelector(".status");
    const statusToggleBtn = event.target;
    book.toggleReadStatus();
    statusToggleBtn.textContent = book.read ? "Mark Unread" : "Mark Read";
    bookCardStatus.textContent = book.read ? "Read" : "Unread";
    bookCardStatus.classList.toggle("read", book.read);
    bookCardStatus.classList.toggle("unread", !book.read);
  }
});

function Book(title, author, pageCount, read) {
  this.title = title;
  this.author = author;
  this.pageCount = Number(pageCount);
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary() {
  const title = titleInput.value;
  const author = authorInput.value;
  const read = readInput.checked;
  const pageCount = pageCountInput.value;
  const book = new Book(title, author, pageCount, read);
  myLibrary.push(book);
  renderCard(book);
}

function renderCard(book) {
  const status = book.read ? "Read" : "Unread";
  const bookCard = document.createElement("article");
  bookCard.classList.add("card");
  const outermostWrapper = document.createElement("div");
  outermostWrapper.classList.add("outermost-wrapper");
  bookCard.appendChild(outermostWrapper);
  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  outermostWrapper.appendChild(wrapper);
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = book.title;
  title.setAttribute("title", book.title);
  const author = document.createElement("div");
  author.classList.add("author");
  author.textContent = book.author;
  const pages = document.createElement("div");
  pages.classList.add("pages");
  const pageText = document.createElement("span");
  pageText.classList.add("page-text");
  pageText.textContent = "Pages:";
  const pageCount = document.createElement("span");
  pageCount.classList.add("page-text");
  pageCount.classList.add("page-count");
  pageCount.textContent = book.pageCount;
  pages.appendChild(pageText);
  pages.appendChild(pageCount);
  const statusDom = document.createElement("div");
  statusDom.classList.add("status");
  statusDom.classList.add(`${status.toLowerCase()}`);
  statusDom.textContent = status;
  wrapper.appendChild(title);
  wrapper.appendChild(author);
  wrapper.appendChild(pages);
  outermostWrapper.appendChild(statusDom);
  const buttons = document.createElement("div");
  buttons.classList.add("buttons");
  const statusToggleBtn = document.createElement("button");
  statusToggleBtn.classList.add("status-toggle-btn");
  statusToggleBtn.textContent = `Mark ${status == "Read" ? "Unread" : "Read"}`;
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("remove-btn");
  removeBtn.textContent = "Remove";
  buttons.appendChild(statusToggleBtn);
  buttons.appendChild(removeBtn);
  bookCard.appendChild(buttons);
  bookCard.setAttribute("data-uid", `${book.id}`);
  cardsContainer.appendChild(bookCard);
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

myLibrary.forEach((book) => {
  Object.setPrototypeOf(book, Book.prototype);
  renderCard(book);
});
