import { books } from './books.js';
console.log(books);

const divEl = document.getElementById('root');
// console.log(divEl);
const divLeftEl = document.createElement('div');
const divRightEl = document.createElement('div');
divEl.append(divLeftEl, divRightEl);
divLeftEl.classList.add('divLeft');
divRightEl.className = 'divRight';

const titleEl = document.createElement('h1');
titleEl.textContent = 'Библиотекарск';
divLeftEl.appendChild(titleEl);

const listLeftEl = document.createElement('ul');
const btnAddLeftEl = document.createElement('button');
btnAddLeftEl.textContent = 'Добавить';
divLeftEl.append(listLeftEl, btnAddLeftEl);
// наполнить список книг
function renderList() {
  const booksListMarkup = books
    .map(
      ({ title }) =>
        `<li><p class="bookName">${title}</p><button>Редактировать</button><button>Удалить</button></li>`,
    )
    .join('');
  listLeftEl.insertAdjacentHTML('afterbegin', booksListMarkup);
  // псевдомассив сделали все элементы с классом bookName
  const bookName = document.querySelectorAll('.bookName');
  // console.log(bookName);
  // у псевдомассива есть forEach
  bookName.forEach(el => el.addEventListener('click', onRenderPreview));
}
renderList();
function onRenderPreview(event) {
  // console.log(event.target);
  // нашли объект книги, по клику на название слева
  const findBook = books.find(
    ({ title }) => event.target.textContent === title,
  );
  // console.log(findBook);
  const markup = bookMarkup(findBook);
  console.log(markup);
  divRightEl.innerHTML = '';
  divRightEl.insertAdjacentHTML('afterbegin', markup);
}
function bookMarkup({ title, author, img, plot }) {
  return `<div>
     <h2>${title}</h2>
     <p>${author}</p>
     <img src="${img}" alt="Обложка книги ${title}">
     <p>${plot}</p>
   </div>`;
}
// ----------------------

// function onEditBook(event) {
//     const editBtn = event.target;
//     const titleEdit = editBtn.previousElementSibling;
    
//     const findBook = books.find(({ title }) =>
//         titleEdit.textContent === title);
// };

// function onDeleteBook() {
// };

// function addBook() {
//     const newBook = { id: `${Date.now()}`, title: '', author: '', img: '', plot: '' };

//     const markup = createForm();
//     divRightEl.innerHTML = '';
//     divRightEl.insertAdjacentHTML('afterbegin', markup);
// }

// function createForm() {
//     return `
//     <form>
//         <label>Название книги<input name="title"></label>
//         <label>Автор<input name="author"></label>
//         <label>Изображение<input name="img"></label>
//         <label>Описание<input name="plot"></label>
//         <button type="button">Сохранить</button>
//     </form>`;
// }