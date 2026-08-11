const myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", 252, true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );
    myLibrary.push(book1, book2);
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");

//reset the form after submit
const formReset = () => {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  checkInput.checked = false;
  $("#demo").collapse("hide");
};

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  const titleValue = titleInput.value.trim();
  const authorValue = authorInput.value.trim();
  const pagesValue = pagesInput.value.trim();
  const pagesNumber = Number(pagesValue);

  if (
    !titleValue ||
    !authorValue ||
    !pagesValue ||
    isNaN(pagesNumber) ||
    pagesNumber <= 0 ||
    !Number.isInteger(pagesNumber)
  ) {
    userNotification("Please fill all fields!");
    return false;
  }

  const book = new Book(
    titleValue,
    authorValue,
    pagesNumber,
    checkInput.checked
  );

  myLibrary.push(book);
  formReset();
  render();
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const booksTable = document.querySelector("#display tbody");
  booksTable.innerHTML = "";

  //insert updated row and cells
  const length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    const row = booksTable.insertRow();
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //read/unread button status
    const readButton = document.createElement("button");
    readButton.className = "btn btn-success";
    readButton.textContent = myLibrary[i].check ? "Yes" : "No";

    readButton.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });
    wasReadCell.appendChild(readButton);

    //delete button to every row and render again
    const delButton = document.createElement("button");
    delButton.className = "btn btn-warning";
    delButton.innerHTML = "Delete";
    delButton.addEventListener("click", function () {
      const deletedBook = myLibrary.splice(i, 1)[0];
      render();
      // alert message when book is deleted
      userNotification(
        `You have deleted the book: ${deletedBook.title} by ${deletedBook.author}.`
      );
    });
    deleteCell.appendChild(delButton);
  }
}

function userNotification(message) {
  let note = document.getElementById("notification");

  if (!note) {
    note = document.createElement("div");
    note.id = "notification";
    note.style.cssText = `
      background: #e0f3ff;
      border: 1px solid #9ac7e0;
      padding: 10px;
      margin-top: 10px;
      border-radius: 4px;
      font-size: 14px;
    `;
    document.body.prepend(note);
  }

  note.textContent = message;

  setTimeout(() => note.remove(), 3000);
}
// Attach submit handler to the form
document
  .querySelector('input[type="submit"]')
  .addEventListener("click", function (e) {
    e.preventDefault();
    submit();
  });
