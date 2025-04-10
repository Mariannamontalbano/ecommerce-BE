const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Tutti possono vedere, creare e mettere like
router.get('/', reviewController.getAllReviews);
router.post('/', reviewController.createReview);
router.post('/:id/like', reviewController.likeReview); // Like pubblico

// ✅ Solo autenticati possono modificare o eliminare
router.put('/:id', authMiddleware, reviewController.updateReview);
router.delete('/:id', authMiddleware, reviewController.deleteReview);

module.exports = router;

