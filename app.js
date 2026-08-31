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

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

cancel.addEventListener("click", () => {
  dialog.close();
  form.reset();
});

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
  removeBtn.setAttribute("data-uid", `${book.id}`);
  buttons.appendChild(statusToggleBtn);
  buttons.appendChild(removeBtn);
  bookCard.appendChild(buttons);
  bookCard.setAttribute("data-uid", `${book.id}`);
  cardsContainer.appendChild(bookCard);
}

myLibrary.map((book) => {
  renderCard(book);
});
