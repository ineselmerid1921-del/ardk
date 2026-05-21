const db = require("../config/db");

exports.addLigneSortie = (req, res) => {
  const { id_sortie, id_article, quantite, unite } = req.body;
 
  db.query(
    "INSERT INTO ligne_sortie_stock (quantite, unite, id_sortie, id_article) VALUES (?, ?, ?, ?)",
    [quantite, unite, id_sortie, id_article],
    (err) => {
      if (err) return res.json(err);

      db.query(
        "UPDATE stock SET quantite = quantite - ? WHERE id_stock = (SELECT id_stock FROM sortie_stock WHERE id_sortie = ?)",
        [quantite, id_sortie],
        (err2) => {
          if (err2) return res.json(err2);

          res.json({ msg: "Sortie + Stock updated" });
        }
      );
    }
  );
};