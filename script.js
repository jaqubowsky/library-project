let myLibrary = [];

const submitBtn = document.getElementById("submitBtn");
const modalBackground = document.getElementById("modalBackground");

document.addEventListener("click", (e) => {
  if (e.target.id === "modalBackground" || e.target.id === "addBookBtn") {
    openModal();
  }
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary(myLibrary);
  renderBooks();
  openModal();
});

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(library) {
  const bookTitle = document.querySelector("[data-title-input]").value;
  const bookAuthor = document.querySelector("[data-author-input]").value;
  const bookPages = document.querySelector("[data-pages-input]").value;
  const isRead = document.querySelector("[data-title-input]");

  const newBook = new Book(bookTitle, bookAuthor, bookPages, isRead.checked);

  library.push(newBook);
}

function openModal() {
  if (modalBackground.classList.contains("active")) {
    modalBackground.classList.remove("active");
  } else {
    modalBackground.classList.add("active");
  }
}

function renderBooks() {
  const bookContent = document.getElementById("booksSection");
  bookContentHtml = "";

  for (book of myLibrary) {
    bookContentHtml += `<div class="book-card">
          <p class="book-card-title">${book.title}</p>
          <p class="book-card-author">${book.author}</p>
          <p class="book-pages-read">${book.pages}</p>
          <div class="btn-group">
            <button class="btn btn-read active">Read</button>
            <button class="btn btn-remove">Remove</button>
          </div>
        </div>`;
  }
  bookContent.innerHTML = bookContentHtml;
}
