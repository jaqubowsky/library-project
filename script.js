const myLibrary = [];

// EVENT READERS

document.addEventListener("click", (e) => {
  if (e.target.id === "modalBackground" || e.target.id === "addBookBtn") {
    openModal();
  }

  if (e.target.id === "removeBook") {
    myLibrary.splice(e.target.parentElement.parentElement.dataset.id, 1);
    renderBooks();
  }

  if (e.target.id === "isRead") {
    isRead(myLibrary[e.target.parentElement.parentElement.dataset.id]);
    renderBooks();
  }
});

document.getElementById("modalForm").addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary(myLibrary);
  renderBooks();
  clearInput();
  openModal();
});

// BOOK CONSTRUCTOR FUNCTION

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// MAIN FUNCTIONS

function createBook() {
  const bookTitle = document.querySelector("[data-title-input]").value;
  const bookAuthor = document.querySelector("[data-author-input]").value;
  const bookPages = document.querySelector("[data-pages-input]").value;
  const isReadInput = document.querySelector("[data-checkbox]").checked;

  return new Book(bookTitle, bookAuthor, bookPages, isReadInput);
}

function addBookToLibrary(library) {
  if (!isInLibrary()) {
    const newBook = createBook();
    library.push(newBook);
  }
}

function renderBooks() {
  const bookContent = document.getElementById("booksSection");
  let bookContentHtml = "";
  let readBtnClass = "";
  let readBtnText = "";

  myLibrary.forEach((book, index) => {
    if (!book.isRead) {
      readBtnClass = "";
      readBtnText = "Not Read";
    } else {
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
  bookContent.innerHTML = bookContentHtml;
}

// UTILITY FUNCTIONS

function isInLibrary() {
  const bookTitle = document.querySelector("[data-title-input]").value;

  return myLibrary.some(
    (book) => book.title.toLowerCase() === bookTitle.toLowerCase()
  );
}

function openModal() {
  const modalBackground = document.getElementById("modalBackground");

  if (modalBackground.classList.contains("active")) {
    modalBackground.classList.remove("active");
  } else {
    modalBackground.classList.add("active");
  }
}

function isRead(book) {
  book.isRead = !book.isRead;
  renderBooks();
}

function clearInput() {
  const inputFields = document.querySelectorAll("input");
  inputFields.forEach((inputField) => {
    inputField.value = "";
    inputField.checked = false;
  });
}