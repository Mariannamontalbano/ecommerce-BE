const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// Registrazione utente
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

    // Controllo che le password coincidano
    if (password !== confermaPassword) {
      return res.status(400).json({ error: 'Le password non corrispondono' });
    }

    // Hash della password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creazione dell'utente
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

    res.status(201).json({ message: 'Registrazione completata', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login utente
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cerca l'utente in base all'email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Credenziali non valide' });
    }

    // Confronta la password inserita con quella salvata (hashata)
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Credenziali non valide' });
    }

    // Genera un token JWT valido per 1 ora
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ token, message: 'Login effettuato con successo' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
