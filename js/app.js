import { books } from "./books.js";
const divEl = document.querySelector("#root");
const divLeft = document.createElement("div");
const divRight = document.createElement("div");

divEl.append(divLeft, divRight);

divLeft.className = "divLeft";
divRight.className = "divRight";

const titleEl = document.createElement("h1");
titleEl.textContent = "Библиотека";
divLeft.appendChild(titleEl);

const listLeftEl = document.createElement("ul");
const btnAddLeft = document.createElement("button");

btnAddLeft.textContent = "Add";

divLeft.append(listLeftEl, btnAddLeft);

btnAddLeft.addEventListener("click", addBook);

function renderList() {
  const booksListMarkup = books
    .map(
      ({ title, id }) =>
        `<li id="${id}"><p class="bookName">${title}</p><button type="button" data-action="edit">Редактировать</button><button type="button" data-action="delete">Удалить</button></li>`
    )
    .join("");
  listLeftEl.insertAdjacentHTML("afterbegin", booksListMarkup);

  const bookNameEl = document.querySelectorAll(".bookName");
  bookNameEl.forEach((el) => el.addEventListener("click", onRenderPreview));

  const btnEdit = document.querySelectorAll("button[data-action='edit']");
  const btnDelete = document.querySelectorAll("button[data-action='delete']");

  btnEdit.forEach((el) => el.addEventListener("click", onEditBook));
  btnDelete.forEach((el) => el.addEventListener("click", onDeleteBook));
}

renderList();

function onRenderPreview(even) {
  const findeBook = books.find(
    ({ title }) => even.target.textContent === title
  );

  const markUp = bookMarkup(findeBook);
  divRight.innerHTML = "";
  divRight.insertAdjacentHTML("afterbegin", markUp);
}

function bookMarkup({ title, author, img, plot }) {
  return `
    <div>
    <h2>${title}</h2>
    <p>${author}</p>
    <img src="${img}" alt="Обложка книги ${title}"/>
    <p>${plot}</p>
</div>`;
}

function onEditBook(event) {
  const editBtn = event.target;
  const titleEdit = editBtn.previousElementSibling;

  const findeBook = books.find(({ title }) => titleEdit.textContent === title);
}

function onDeleteBook(event) {}

function addBook() {
  const newBook = {
    id: String(Date.now()),
    title: "",
    author: "",
    img: "",
    plot: "",
  };

  const markUp = createForm();
  divRight.innerHTML = "";
  divRight.insertAdjacentHTML("afterbegin", markUp);

  const btnSave = document.querySelector("button[data-action='save']");
  // btnSave.addEventListener('click', addNewBookInArray)

  const formEl = document.querySelector("form");
  formEl.addEventListener("change", addNewBookInArray);

  function addNewBookInArray(event) {
    newBook.title = event.currentTarget.elements.title.value;
    newBook.author = event.currentTarget.elements.author.value;
    newBook.img = event.currentTarget.elements.img.value;
    newBook.plot = event.currentTarget.elements.plot.value;
  }

  btnSave.addEventListener("click", pushBook);

  function pushBook() {
    books.push(newBook);
  }
}

function createForm() {
  return `<form>
        <label>Название книги<input name="title"></label>
        <label>Автор<input name="author"></label>
        <label>Изображение<input name="img"></label>
        <label>Описание<input name="plot"></label>
        <button type="button">Сохранить</button>
    </form>`;
}
