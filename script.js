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

// BOOK FACTORY FUNCTION

const bookFactory = () => {
  const title = document.querySelector("[data-title-input]").value;
  const author = document.querySelector("[data-title-input]").value;
  const pages = document.querySelector("[data-pages-input]").value;
  const isReadInput = document.querySelector("[data-checkbox]").checked;

  return { title, author, pages, isReadInput };
};

function addBookToLibrary(library) {
  if (!isInLibrary()) {
    const newBook = bookFactory();
    library.push(newBook);
  }
}

function renderBooks() {
  const bookContent = document.getElementById("booksSection");
  let bookContentHtml = "";
  let readBtnClass = "";
  let readBtnText = "";

  myLibrary.forEach((book, index) => {
    if (!book.isReadInput) {
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
  book.isReadInput = !book.isReadInput;
  renderBooks();
}

function clearInput() {
  const inputFields = document.querySelectorAll("input");
  inputFields.forEach((inputField) => {
    inputField.value = "";
    inputField.checked = false;
  });
}