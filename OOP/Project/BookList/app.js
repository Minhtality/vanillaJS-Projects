//Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}
//UI Constructor
function UI() { }

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
    console.log(row);
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

////////////////////
///END PROTOTYPES///
////////////////////

//Add event listener
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
        //clear form fields
        ui.clearFields();
        //show alert
        ui.showAlert('Book added', 'success');
    }



    event.preventDefault();
})