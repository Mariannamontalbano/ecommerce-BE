const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Chiunque può vedere e pubblicare recensioni
router.get('/', reviewController.getAllReviews);
router.post('/', reviewController.createReview);

// ✅ Solo utenti autenticati possono modificare o cancellare
router.put('/:id', authMiddleware, reviewController.updateReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;

