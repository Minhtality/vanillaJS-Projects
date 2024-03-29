class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        //create element per book
        const row = document.createElement('tr');
        //insert book into row
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
        `
        list.appendChild(row);
    }

    showAlert(message, className) {
        const container = document.querySelector('.container');
        const bookForm = document.getElementById('book-form');
        //create div
        const errorDiv = document.createElement('div');
        //add class name
        errorDiv.className = `alert ${className}`;
        //insert inner HTML to div
        errorDiv.appendChild(document.createTextNode(message));
        container.insertBefore(errorDiv, bookForm);

        //set TimeOut
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 2000);
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
            //show alert message
            this.showAlert('Book removed', 'success')
        }
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}
//Local storage class
class Store {
    static getBooks() {
        let books;

        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books;
    }
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(book => {
            const ui = new UI;
            //add book to list
            ui.addBookToList(book);
        });
    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach((book, i) => {
            if (book.isbn === isbn) {
                books.splice(i, 1);
            }
        });
        localStorage.setItem('books', JSON.stringify(books));
    }
}
//add on dom load listeneer
document.addEventListener('DOMContentLoaded', Store.displayBooks);

//Add event listener for adding book
document.getElementById('book-form').addEventListener('submit', function (event) {
    //grab element values
    const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    //instantiate book
    const book = new Book(title, author, isbn);

    //instantiate UI
    const ui = new UI();

    //Form Validation
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        //add input to UI
        ui.addBookToList(book);
        //add to local storage
        Store.addBook(book)
        //show alert
        ui.showAlert('Book added', 'success');
        //clear form fields
        ui.clearFields();

    }

    event.preventDefault();
});

//Event Listener for delete
document.getElementById('book-list').addEventListener('click', function (event) {

    //instanciate UI
    const ui = new UI();

    //call delete book prototype
    ui.deleteBook(event.target);
    //remove book from local storage 
    Store.removeBook(event.target.parentElement.previousElementSibling.textContent);

    event.preventDefault();
})
