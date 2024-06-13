/*
function Book(title, author, pages, read){
    this.title = typeof title !== "string" ? "Wrong data type for title!" : title;
    this.author = typeof author !== "string" ? "Wrong data type for author!" : author;
    this.pages = typeof pages !== "number" ? "Wrong data type for pages!" : pages;
    this.read = typeof read !== "boolean" ? "Wrong data type for read!" : read;
}

Book.prototype.getInfo = function(){
    return `Title: ${this.title} by ${this.author}, ${this.pages} pages.
        ${this.read === true ? "I have read it.": "I have not read it."}`;
}
*/

class Book{
    constructor(title, author, pages, read){
        this.title = typeof title !== "string" ? "Wrong data type for title!" : title;
        this.author = typeof author !== "string" ? "Wrong data type for author!" : author;
        this.pages = typeof pages !== "number" ? "Wrong data type for pages!" : pages;
        this.read = typeof read !== "boolean" ? "Wrong data type for read!" : read;        
    }

    static getInfo(){
        return `Title: ${this.title} by ${this.author}, ${this.pages} pages.
        ${this.read === true ? "I have read it.": "I have not read it."}`;        
    }
}

const dummyBook = new Book("Dummy", "Anonymous", 10, false);
const dummyBook2 = new Book("Dummy 2", "Anonymous", 20, false);
const dummyBook3 = new Book("Dummy The Last Episode", "Anonymous Jr", 5, true);

const myLibrary = [];
myLibrary.push(dummyBook);
myLibrary.push(dummyBook2);
myLibrary.push(dummyBook3);

displayLibrary(myLibrary);

/*************************************************/
/*Add new book button*/
/*************************************************/
const buttonAddNewBook = document.querySelector("button#new-book");
buttonAddNewBook.addEventListener("click", () => {
        const sidebar = document.querySelector("div.sidebar");
        const main = document.querySelector("div.main");

        let flag = false;
        let i = 0;
        do{
            if(sidebar.classList[i] === "hide"){
                flag = true;
                sidebar.classList.remove("hide");
                sidebar.classList.add("show");
                main.classList.add("with-sidebar");
            }
            else if(sidebar.classList[i] === "show"){
                flag = true;
                sidebar.classList.remove("show");
                sidebar.classList.add("hide");
                main.classList.remove("with-sidebar");
            }
            i++;
        }
        while((i < sidebar.classList.length) && (flag === false));
    }
);

/*************************************************/
/*Add new book button*/
/*************************************************/
const buttonSubmitBook = document.querySelector("form>button");
buttonSubmitBook.addEventListener("click", (event) => {
        let submittedBook = makeBookFromForm();
        addBookToLibrary(submittedBook, myLibrary);
        displayLibrary(myLibrary);

        event.preventDefault();
    }
);

/*************************************************/
/*Functions*/
/*************************************************/
function addBookToLibrary(book, library){
    /*The snipper below creates a book from the user's input in popup windows
    and adds it to the library

    let bookTitle = "";
    let bookAuthor = "";
    let bookNumPages = 0;
    let bookHaveRead = "";
    let bookHaveReadBool = false;

    bookTitle = prompt("What is the title of your book?");
    bookAuthor = prompt("Who is the author of your book?");
    bookNumPages = +prompt("How many pages does your book have?");
    do{
        bookHaveRead = prompt("Have you read it ('yes' or 'no' only)?");
    }
    while(bookHaveRead !== "yes" && bookHaveRead !== "no")

    bookHaveReadBool = bookHaveRead === "yes" ? true : false;

    library.push(
        new Book(bookTitle, bookAuthor, bookNumPages, bookHaveReadBool)
    );
    */
   library.push(book);
}

function displayLibrary(library){
    const libraryContainer = document.querySelector("div.library");

    library.forEach(
        (book, i) => {
            if(i + 1 > libraryContainer.childElementCount){ //only create and display book cards that do not exist yet
                const bookCard = document.createElement("div");
                bookCard.classList.add("book-card");
                bookCard.setAttribute("data-index-number", String(i));

                libraryContainer.appendChild(bookCard);
                displayBook(bookCard, book);
            }
        }
    );
}

function displayBook(bookCard, book){
    for (let prop in book){
        if (typeof book[prop] !== "function"){
            if(prop !== "read"){
                bookCard.innerHTML += `${prop.charAt(0).toUpperCase() + prop.slice(1,)}: 
                    ${book[prop]}`;
            }
            else{
                //bookCard.innerHTML += book[prop] === true ? "I have read it." :
                    "I have not read it.";
            }
            bookCard.innerHTML += "<br>";
        }
    }

    const readStatusButton = document.createElement("button");
    readStatusButton.textContent = book.read ? "Read" : "Not read";
    readStatusButton.setAttribute("type", "input");
    readStatusButton.classList.add("read-status-button");

    readStatusButton.addEventListener("click", (event) =>{
            const buttonBookCard = event.target.parentElement;
            const buttonBookCardIndex = buttonBookCard.dataset.indexNumber;

            myLibrary[buttonBookCardIndex].read = !myLibrary[buttonBookCardIndex].read;
            console.log(myLibrary[buttonBookCardIndex]);
            event.target.textContent = myLibrary[buttonBookCardIndex].read ? "Read" : "Not read";
        }
    );

    bookCard.appendChild(readStatusButton);

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove me";
    removeButton.setAttribute("type", "input");
    removeButton.classList.add("remove-button");
    
    removeButton.addEventListener("click", (event) => {
            const buttonBookCard = event.target.parentElement;
            const buttonBookCardIndex = buttonBookCard.dataset.indexNumber;
            buttonBookCard.remove();
            reorganizeLibrary(myLibrary, buttonBookCardIndex);
        }
    );
    
    bookCard.appendChild(removeButton);
}

function reorganizeLibrary(library, deleteBookIndex){
    const libraryContainer = document.querySelector("div.library");

    let i = 0;
    for (const book of libraryContainer.children){
        book.dataset.indexNumber = String(i);
        i++;
    }

    myLibrary.splice(deleteBookIndex, 1);
}

function makeBookFromForm(){
    let bookFormInfo = getBookInfoFromForm();

    return new Book(bookFormInfo[0],
        bookFormInfo[1],
        +bookFormInfo[2],
        bookFormInfo[3]
    );
}

function getBookInfoFromForm(){
    const bookTitleInput = document.querySelector("form input#title");
    const bookAuthorInput = document.querySelector("form input#author");
    const bookNumPagesInput = document.querySelector("form input#pages");
    const bookReadInput = document.querySelector("form input#read");
    
    const bookInfo = [bookTitleInput.value,
        bookAuthorInput.value,
        bookNumPagesInput.value,
        bookReadInput.checked
    ]; 

    bookTitleInput.value = "";
    bookAuthorInput.value = "";
    bookNumPagesInput.value = "";  

    return bookInfo;
}