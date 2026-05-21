const pool = require('../config/db');



const getAll = async (req, res) => {

  try {

    const [rows] = await pool.query(
      'SELECT * FROM utilisateur'
    );

    res.json(rows);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};



const getById = async (req, res) => {

  try {

    const [rows] = await pool.query(
      'SELECT * FROM utilisateur WHERE id_utilisateur = ?',
      [req.params.id]
    );

    res.json(rows[0]);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};



const create = async (req, res) => {

  try {

    const {
      nom,
      email,
      mot_de_passe,
      role
    } = req.body;

    const [result] = await pool.query(

      `INSERT INTO utilisateur
      (nom, email, mot_de_passe, role)
      VALUES (?, ?, ?, ?)`,

      [nom, email, mot_de_passe, role]
    );

    res.status(201).json({

      message: 'Utilisateur ajouté ✅',

      user: {
        id: result.insertId,
        nom,
        email,
        role
      }
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};


const update = async (req, res) => {

  try {

    const {
      nom,
      email,
      mot_de_passe,
      role
    } = req.body;

    await pool.query(

      `UPDATE utilisateur
      SET nom = ?, email = ?, mot_de_passe = ?, role = ?
      WHERE id_utilisateur = ?`,

      [
        nom,
        email,
        mot_de_passe,
        role,
        req.params.id
      ]
    );

    res.json({
      message: 'Utilisateur modifié ✅'
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};



const remove = async (req, res) => {

  try {

    await pool.query(
      'DELETE FROM utilisateur WHERE id_utilisateur = ?',
      [req.params.id]
    );

    res.json({
      message: 'Utilisateur supprimé ✅'
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};


const login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const [rows] = await pool.query(

      'SELECT * FROM utilisateur WHERE email = ?',

      [email]
    );

    if (rows.length === 0) {

      return res.status(401).json({
        message: 'Utilisateur introuvable'
      });
    }

    const user = rows[0];

    if (user.mot_de_passe !== password) {

      return res.status(401).json({
        message: 'Email ou mot de passe incorrect'
      });
    }

    res.status(200).json({

      message: 'Connexion réussie ✅',

      user: {
        id: user.id_utilisateur,
        nom: user.nom,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
};


module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  login
};