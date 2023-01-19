// EVENT READERS
document.addEventListener("click", (e) => {
  if (e.target.id === "modalBackground" || e.target.id === "addBookBtn")
    openModal();

  if (e.target.id === "removeBook") {
    library.removeBook(e.target.parentElement.parentElement.dataset.id);
    renderBooks();
  }

  if (e.target.id === "isRead") {
    library.isBookRead(
      library.books[e.target.parentElement.parentElement.dataset.id]
    );
    renderBooks();
  }
});

document.getElementById("modalForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const newBook = new Book();
  library.addBook(newBook);
  renderBooks();
  clearInput();
  openModal();
});

// BOOK CLASS

class Book {
  title = "Unknown";
  author = "Unknown";
  pages = 0;
  isRead = false;

  constructor() {
    this.title = document.querySelector("[data-title-input]").value;
    this.author = document.querySelector("[data-title-input]").value;
    this.pages = document.querySelector("[data-pages-input]").value;
    this.isRead = document.querySelector("[data-checkbox]").checked;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  addBook(newBook) {
    if (library.isInLibrary(newBook)) return;

    this.books.push(newBook);
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }

  isBookRead(currentBook) {
    currentBook.isRead = !currentBook.isRead;
  }

  isInLibrary(currentBook) {
    return this.books.some(
      (book) => book.title.toLowerCase() === currentBook.title.toLowerCase()
    );
  }
}

const library = new Library();

// MAIN FUNCTIONS

function renderBooks() {
  let bookContentHtml = "";

  if (!library.books) return;

  library.books.forEach((book, index) => {
    let readBtnClass = "";
    let readBtnText = "Not Read";

    if (book.isRead) {
      readBtnClass = "active";
      readBtnText = "Read";
    }

    bookContentHtml += `<div class="book-card" data-id="${index}">
          <p class="book-card-title">${book.title}</p>
          <p class="book-card-author">${book.author}</p>
          <p class="book-pages-read">${book.pages} pages</p>
          <div class="btn-group">
            <button class="btn btn-read ${readBtnClass}" id="isRead">${readBtnText}</button>
            <button class="btn btn-remove" id="removeBook">Remove</button>
          </div>
        </div>`;
  });

  document.getElementById("booksSection").innerHTML = bookContentHtml;
}

function openModal() {
  const modalBackground = document.getElementById("modalBackground");

  if (modalBackground.classList.contains("active")) {
    modalBackground.classList.remove("active");
  } else {
    modalBackground.classList.add("active");
  }
}

function clearInput() {
  document.querySelectorAll(".input").forEach((inputField) => {
    inputField.value = "";
  });
  document.querySelector(".checkbox").checked = false;
}
