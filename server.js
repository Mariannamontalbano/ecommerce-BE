require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Configura CORS per frontend su porta 3001
const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Middleware JSON
app.use(express.json());

// ✅ Importa i modelli
const db = require('./models');

// ✅ Sincronizza il database
db.sequelize.sync()
  .then(() => {
    console.log('✅ Tabelle sincronizzate con il database 🎉');
  })
  .catch((err) => {
    console.error('❌ Errore nella sincronizzazione del database:', err);
  });

// ✅ Rotta di test
app.get('/', (req, res) => {
  res.send('Hello World! Il server è avviato.');
});

// ✅ Importa le rotte
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviews');

// ✅ Usa le rotte
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);

// ✅ Avvio server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Server in esecuzione sulla porta ${port}`);
});
