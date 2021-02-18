import React, { Component } from "react";
import PropTypes from "prop-types";

class Shelf extends Component {
    moveBookInShelf = (event) => {
        this.props.shelfHandle(this.props.book, event.target.value);
    };

    render() {
        const { book, books } = this.props;
        let whereInShelf = "none";
        
        // OBS: method inspired in stackoverflow/githubs forums
        // if book is in current list, set current shelf to book.shelf
        for (let i of books) {
            if (i.id === book.id) {
                whereInShelf = i.shelf;
                break;
            }
        }

        return (
            <div className="book-shelf-changer">
                <select
                    onChange={this.moveBookInShelf}
                    defaultValue={whereInShelf}
                >
                    <option value="none" disabled>
                        Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

Shelf.propTypes = {
    book: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    shelfHandle: PropTypes.func.isRequired,
};

export default Shelf;
