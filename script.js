const myLibrary = [];

const submitBtn = document.getElementById("submitBtn");
const modalBackground = document.getElementById("modalBackground");

document.addEventListener("click", (e) => {
  if (e.target.id === "modalBackground" || e.target.id === "addBookBtn") {
    openModal();
  }

  if (e.target.id === "removeBook") {
    myLibrary.splice(e.target.parentElement.parentElement.dataset.id, 1);
    renderBooks();
  }

  if (e.target.id === "isRead") {
    myLibrary[e.target.parentElement.parentElement.dataset.id].isRead = true;
    renderBooks();
  }
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary(myLibrary);
  renderBooks();
  clearInput();
  openModal();
});

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function createBook() {
  const bookTitle = document.querySelector("[data-title-input]").value;
  const bookAuthor = document.querySelector("[data-author-input]").value;
  const bookPages = document.querySelector("[data-pages-input]").value;
  const isRead = document.querySelector("[data-title-input]");

  return new Book(bookTitle, bookAuthor, bookPages, isRead.checked);
}

function addBookToLibrary(library) {
  const newBook = createBook();
  library.push(newBook);
}

function openModal() {
  if (modalBackground.classList.contains("active")) {
    modalBackground.classList.remove("active");
  } else {
    modalBackground.classList.add("active");
  }
}

function clearInput() {
  const inputFields = document.querySelectorAll("input");
  inputFields.forEach((inputField) => {
    console.log(inputField);
    inputField.value = "";
  });
}

function renderBooks() {
  const bookContent = document.getElementById("booksSection");
  let bookContentHtml = "";

  myLibrary.forEach((book, index) => {
    bookContentHtml += `<div class="book-card" data-id="${index}">
          <p class="book-card-title">${book.title}</p>
          <p class="book-card-author">${book.author}</p>
          <p class="book-pages-read">${book.pages} pages</p>
          <div class="btn-group">
            <button class="btn btn-read active" id="isRead">Read</button>
            <button class="btn btn-remove" id="removeBook">Remove</button>
          </div>
        </div>`;
  });
  bookContent.innerHTML = bookContentHtml;
}
