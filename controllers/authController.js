const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// ✅ REGISTRAZIONE UTENTE
exports.register = async (req, res) => {
  try {
    const {
      nome,
      cognome,
      email,
      telefono,
      dataNascita,
      indirizzo,
      codiceFiscale,
      password,
      confermaPassword,
    } = req.body;

    if (password !== confermaPassword) {
      return res.status(400).json({ error: 'Le password non corrispondono' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      nome,
      cognome,
      email,
      telefono,
      dataNascita,
      indirizzo,
      codiceFiscale,
      password: hashedPassword,
    });

    res.status(201).json({
      message: 'Registrazione completata',
      userId: newUser.id,
    });
  } catch (error) {
    console.error('❌ Errore nella registrazione:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// ✅ LOGIN UTENTE
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('📩 Email ricevuta:', email);

    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('❌ Utente non trovato nel database');
      return res.status(400).json({ error: 'Credenziali non valide' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log('❌ Password errata');
      return res.status(400).json({ error: 'Credenziali non valide' });
    }

    // ✅ Token con tutti i dati utente utili per la dashboard
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nome: user.nome,
        telefono: user.telefono,
        codiceFiscale: user.codiceFiscale,
        indirizzo: user.indirizzo,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log('✅ Login riuscito per:', user.email);
    res.json({ token, message: 'Login effettuato con successo' });
  } catch (error) {
    console.error('❌ Errore nel login:', error.message);
    res.status(500).json({ error: error.message });
  }
};
