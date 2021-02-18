import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";
import * as BooksAPI from "../src/BooksAPI";
import BookList from "./components/BookList";
import SearchBooks from "./components/SearchBooks";

class BooksApp extends React.Component {
    state = {
        books: [], //array that keep track of books
        booksSituation: [
            //array to save all books situations possible
            { id: "currentlyReading", situation: "Currently Reading" },
            { id: "wantToRead", situation: "Want to Read" },
            { id: "read", situation: "Read" },
        ],
    };

    //Lifecyle method
    //      When the page load we should be
    //      able to get all books
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books: books });
        });
    }

    // The API method to be used is update
    shelfHandle = (book, shelf) => {
        // Shelf is being updated, and this implies
        //    changing the book array in order to obtain
        //    an updated version of such.
        BooksAPI.update(book, shelf).then((response) => {
            book.shelf = shelf;
            this.setState((currState) => ({
                books: currState.books
                    .filter((b) => b.id !== book.id)
                    .concat(book),
            }));
        });
    };

    render() {
        const { books, booksSituation } = this.state;

        return (
            <div className="app">
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <div className="list-books">
                                <div className="list-books-title">
                                    <h1>MyReads</h1>
                                </div>
                                <BookList
                                    books={books}
                                    booksSituation={booksSituation}
                                    shelfHandle={this.shelfHandle}
                                />
                                <div className="open-search">
                                    <Link to="/search">Search a Book</Link>
                                </div>
                            </div>
                        )}
                    />
                    <Route
                        exact
                        path="/search"
                        render={() => (
                            <SearchBooks
                                books={books}
                                shelfHandle={this.shelfHandle}
                            />
                        )}
                    />
                </Switch>
            </div>
        );
    }
}

export default BooksApp;
