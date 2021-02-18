import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book";
import * as BooksAPI from "../BooksAPI";

class SearchBooks extends Component {
    state = {
        query: "",
        queryBooks: [],
    };

    updateQuery = (query) => {
        this.setState({ query });
        if (query) {
            BooksAPI.search(query.trim()).then((books) => {
                this.setState(() => ({
                    queryBooks: books,
                }));
            });
        } else {
            this.setState({ queryBooks: [] });
        }
    };

    clearQuery = () => {
        this.updateQuery("");
    };

    render() {
        const { query, queryBooks } = this.state;
        const { books, shelfHandle } = this.props;

        return (
            <div className="search-books">
                <Link className="close-search" to="/">
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(event) =>
                            this.updateQuery(event.target.value)
                        }
                    />
                </div>

                {queryBooks.length !== books.length && (
                    <div>
                        <span>
                            Now showing {queryBooks.length} books
                        </span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                )}

                <div className="search-books-results">
                    <ol className="books-grid">
                        {queryBooks.map((book) => (
                            <Book
                                book={book}
                                books={books}
                                key={book.id}
                                shelfHandle={shelfHandle}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}


SearchBooks.propTypes = {
    books: PropTypes.array.isRequired,
    shelfHandle: PropTypes.func.isRequired,
};

export default SearchBooks;
