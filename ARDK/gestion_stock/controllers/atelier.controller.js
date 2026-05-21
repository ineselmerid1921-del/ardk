const pool = require('../config/db');

const getAll = async (req, res) => {
 try {
   const [rows] = await pool.query('SELECT * FROM atelier');
   res.json(rows);
 } catch (err) { res.status(500).json({ error: err.message }); }
};

const getById = async (req, res) => {
 try {
   const [rows] = await pool.query('SELECT * FROM atelier WHERE id_atelier = ?', [req.params.id]);
   res.json(rows[0]);
 } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
 const { nom, localisation, capacite_production, nom_chef, email_chef, tel_chef, tel_atelier, materiel, type_machine, experience, notes } = req.body;
 try {
   const [result] = await pool.query(
     'INSERT INTO atelier (nom, localisation, capacite_production, nom_chef, email_chef, tel_chef, tel_atelier, materiel, type_machine, experience, notes, statut) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
     [nom, localisation, capacite_production, nom_chef||null, email_chef||null, tel_chef||null, tel_atelier||null, materiel||null, type_machine||null, experience||null, notes||null, 'EN_ATTENTE']
   );
   res.status(201).json({ message: 'Atelier ajouté ✅', id: result.insertId });
 } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
 const { nom, localisation, capacite_production, nom_chef, email_chef, tel_chef, tel_atelier, materiel, type_machine, experience, notes, statut } = req.body;
 try {
   await pool.query(
     'UPDATE atelier SET nom=?, localisation=?, capacite_production=?, nom_chef=?, email_chef=?, tel_chef=?, tel_atelier=?, materiel=?, type_machine=?, experience=?, notes=?, statut=? WHERE id_atelier=?',
     [nom, localisation, capacite_production, nom_chef||null, email_chef||null, tel_chef||null, tel_atelier||null, materiel||null, type_machine||null, experience||null, notes||null, statut||'EN_ATTENTE', req.params.id]
   );
   res.json({ message: 'Atelier modifié ✅' });
 } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
 try {
   await pool.query('DELETE FROM atelier WHERE id_atelier = ?', [req.params.id]);
   res.json({ message: 'Atelier supprimé ✅' });
 } catch (err) { res.status(500).json({ error: err.message }); }
};

const accepter = async (req, res) => {
 try {
   await pool.query("UPDATE atelier SET statut='ACCEPTE' WHERE id_atelier=?", [req.params.id]);
   res.json({ message: 'Atelier accepté ✅' });
 } catch (err) { res.status(500).json({ error: err.message }); }
};

const refuser = async (req, res) => {
 try {
   await pool.query("UPDATE atelier SET statut='REFUSE' WHERE id_atelier=?", [req.params.id]);
   res.json({ message: 'Atelier refusé ✅' });
 } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getAll, getById, create, update, remove, accepter, refuser };