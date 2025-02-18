import { Injectable } from '@angular/core';
import { Author } from '../classes/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor() { }

  makeRows(authors: Author[]) {
    const authorTable = document.querySelector("tbody");
    if (!authorTable) return;
    authorTable.innerHTML = '';

    let i = 0;
    authors.forEach(author => {
      authorTable.innerHTML += `
        <tr>
            <td>${author.firstName} ${author.lastName}</td>
            <td>${author.countOfBooks}</td>
            <td>
                <button class="btn btn-primary btn-details btn-sm" data-author-index="${i}">Деталі</button>
                <button class="btn btn-primary btn-edit btn-sm" data-author-index="${i}">Редагувати</button>
                <button class="btn btn-primary btn-delete btn-sm" data-author-index="${i}">Видалити</button>
            </td>
        </tr>`;
      i++;
    });
  }

  showAuthorDetails(authors: Author[], index: number) {
    const author = authors[index];
    console.log("Автор:", author);
    const authorDetailsSection = document.querySelector(".author-details");
    authorDetailsSection!.classList.remove("d-none");
    authorDetailsSection!.setAttribute("data-author-index", index.toString());

    const authorName = document.getElementById("author-name");
    const authorBirth = document.getElementById("author-birthyear");
    const booksList = document.getElementById("author-books");
    if (!authorName) return;
    else if (!authorBirth) return;
    else if (!booksList) return;

    authorName.textContent = ` ${author.lastName} ${author.firstName} ${author.middleName || ''}`;
    authorBirth.textContent = ` ${author.birthYear.toString()}`;
    booksList.innerHTML = author.books.map((book, i) => `<li>"№${i} ${book.title}" - ${book.genre}, ${book.pages} сторінок</li>`).join("");
  }
}
