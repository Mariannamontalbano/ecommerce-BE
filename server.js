require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware per il parsing del JSON e CORS
app.use(express.json());
app.use(cors());

// Rotta di test per verificare che il server funzioni
app.get('/', (req, res) => {
  res.send('Hello World! Il server è avviato.');
});

// Importa le rotte
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviews');

// Utilizzo delle rotte
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server in esecuzione sulla porta ${port}`);
});
