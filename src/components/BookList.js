import React, { Component } from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class BookList extends Component {
    render() {
        const { books, booksSituation, shelfHandle } = this.props;

        // We created a loop for each book situatin available
        return (
            <div className="list-books-content">
                {booksSituation.map((bSituation, index) => {
                    const filterByShelf = books.filter(
                        (b) => b.shelf === bSituation.id
                    );

                    return (
                        <div className="bookshelf" key={index}>
                            <h2 className="bookshelf-title">
                                {bSituation.situation}
                            </h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {filterByShelf.map((book) => (
                                        <Book
                                            book={book}
                                            books={filterByShelf}
                                            key={book.id}
                                            shelfHandle={shelfHandle}
                                        />
                                    ))}
                                </ol>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

BookList.propTypes = {
    books: PropTypes.array.isRequired,
    booksSituation: PropTypes.array.isRequired,
    shelfHandle: PropTypes.func.isRequired,
};

export default BookList;
