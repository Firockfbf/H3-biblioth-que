const Book = require('../models/book.model.js');

exports.borrowBook = (req, res) => {
    const { bookId } = req.body;
    Book.update(bookId, { isAvailable: false }, (err, result) => {
        if (err || result.affectedRows === 0) return res.status(500).json({ error: 'Book not found or already borrowed' });
        res.json({ message: 'Book borrowed successfully!' });
    });
};
