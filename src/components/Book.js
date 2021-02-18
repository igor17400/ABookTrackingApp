import React from "react";
import Shelf from "./Shelf";
import PropTypes from "prop-types";

// Let's create a stateless component in order
//      to better separate components in the project
const Book = (props) => {
    const { book, books, shelfHandle } = props;

    var bookImage = ""
    try {
        bookImage = book.imageLinks.smallThumbnail;
    } catch {
        bookImage = "https://images.pexels.com/videos/3045163/free-video-3045163.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }
    const title = book.title;

    // The code below is repeated several times in the App.js.
    //      The idea is to create a more reusable code, that will
    //      be used to achieve the same result as before but
    //      more organized.
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 188,
                            backgroundImage: `url(${bookImage})`,
                        }}
                    />
                    <Shelf
                        book={book}
                        books={books}
                        shelfHandle={shelfHandle}
                    />
                </div>
                <div className="book-title">{title}</div>
                {/* Check for authors and render each on separate line if exist*/
                book.authors &&
                    book.authors.map((author, index) => (
                        <div className="book-authors" key={index}>
                            {author}
                        </div>
                    ))}
            </div>
        </li>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    shelfHandle: PropTypes.func.isRequired,
};

export default Book;
