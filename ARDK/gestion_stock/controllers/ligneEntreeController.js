const db = require("../config/db");

exports.addLigneEntree = (req, res) => {
  const { id_entree, id_article, quantite, unite } = req.body;

  
  db.query(
    "INSERT INTO ligne_entree_stock (quantite, unite, id_entree, id_article) VALUES (?, ?, ?, ?)",
    [quantite, unite, id_entree, id_article],
    (err) => {
      if (err) return res.json(err);

    
      db.query(
        "UPDATE stock SET quantite = quantite + ? WHERE id_stock = (SELECT id_stock FROM entree_stock WHERE id_entree = ?)",
        [quantite, id_entree],
        (err2) => {
          if (err2) return res.json(err2);

          res.json({ msg: "Entrée + Stock updated" });
        }
      );
    }
  );
};