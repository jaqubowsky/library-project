// EVENT READERS
document.addEventListener("click", (e) => {
  if (e.target.id === "modalBackground" || e.target.id === "addBookBtn")
    openModal();

  if (e.target.id === "removeBook") {
    myLibrary.splice(e.target.parentElement.parentElement.dataset.id, 1);
    renderBooks();
  }

  if (e.target.id === "isRead") {
    isBookRead(myLibrary[e.target.parentElement.parentElement.dataset.id]);
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
const myLibrary = [];

const bookFactory = () => {
  const title = document.querySelector("[data-title-input]").value;
  const author = document.querySelector("[data-title-input]").value;
  const pages = document.querySelector("[data-pages-input]").value;
  const isRead = document.querySelector("[data-checkbox]").checked;

  return { title, author, pages, isRead };
};

// MAIN FUNCTIONS

function addBookToLibrary(library) {
  if (isInLibrary()) return;
  const newBook = bookFactory();
  library.push(newBook);
}

function renderBooks() {
  let bookContentHtml = "";

  if (!myLibrary) return
  
  myLibrary.forEach((book, index) => {
    let readBtnClass = "active";
    let readBtnText = "Read";

    if (!book.isRead) {
      readBtnClass = "";
      readBtnText = "Not Read";
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

// UTILITY FUNCTIONS
function isInLibrary() {
  return myLibrary.some(
    (book) =>
      book.title.toLowerCase() ===
      document.querySelector("[data-title-input]").value.toLowerCase()
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

function isBookRead(book) {
  book.isRead = !book.isRead;
  renderBooks();
}

function clearInput() {
  document.querySelectorAll(".input").forEach((inputField) => {
    inputField.value = "";
  });
  document.querySelector(".checkbox").checked = false;
}
