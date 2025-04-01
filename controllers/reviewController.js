const { Review } = require('../models');

// Recupera tutte le recensioni
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Crea una nuova recensione (NON richiede autenticazione)
exports.createReview = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === '') {
      return res.status(400).json({ error: 'Il contenuto della recensione è obbligatorio.' });
    }

    const newReview = await Review.create({
      content,
      likes: 0,
      userId: null // oppure potresti rimuovere del tutto `userId` se non è obbligatorio nel model
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Aggiorna una recensione esistente
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, likes } = req.body;

    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).json({ error: 'Recensione non trovata' });
    }

    if (content !== undefined) review.content = content;
    if (likes !== undefined) review.likes = likes;

    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Elimina una recensione
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ error: 'Recensione non trovata' });
    }

    await review.destroy();
    res.json({ message: 'Recensione eliminata con successo' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
