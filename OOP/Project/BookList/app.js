//Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI Constructor
function UI() { }

// Local Storage Constructor
function Store(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI Prototypes
UI.prototype.addBookToList = function (book) {
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

UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.showAlert = function (message, className) {
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

//Delete book prototype
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
        //show alert message
        this.showAlert('Book removed', 'success')
    }
}

// Local storage prototypes
Store.prototype.getBooks = function () {
    let books;
    if (localStorage.getItem('books') === null) {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'))
    }
    return books;
}

// Display books from Local Storage
Store.prototype.displayBooks = function () {
    const store = new Store;
    const books = store.getBooks()
    books.forEach(function (book) {
        const ui = new UI;
        ui.addBookToList(book);
    });

}
// Add books to local storage
Store.prototype.addBook = function (book) {
    const store = new Store;
    const books = store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}
// Remove book from local storage
Store.prototype.removeBook = function (isbn, index) {
    const store = new Store();
    const books = store.getBooks();

    books.forEach(function (book, index) {
        if (book.isbn === isbn) {
            books.splice(index, 1);
        }
    });
    localStorage.setItem("books", JSON.stringify(books));
}
////////////////////
///END PROTOTYPES///
////////////////////

//dom load event
const store = new Store;
document.addEventListener('DOMContentLoaded', store.displayBooks);

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
    const store = new Store();

    //Form Validation
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        //add input to UI
        ui.addBookToList(book);
        // add to local storage
        store.addBook(book);
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
    const ui = new UI;
    const store = new Store;
    //call delete book prototype
    ui.deleteBook(event.target);
    //delete from local storage
    store.removeBook(event.target.parentElement.previousElementSibling.textContent)

    event.preventDefault();
})
