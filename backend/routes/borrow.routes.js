const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');

router.post('/borrow', borrowController.borrowBook);

module.exports = router;
