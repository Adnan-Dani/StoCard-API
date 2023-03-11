const pool  = require('./../startup/db');
const CardController = {
    getAll: async (req, res) => {
        try {
          const [rows, fields] = await pool.query("SELECT * FROM cards");
          res.json({ data: rows });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
        }
      },
      getById: async (req, res) => {
        const { id } = req.params;
        try {
          const [rows, fields] = await pool.query("SELECT * FROM cards WHERE id=?", [id]);
          if (rows.length === 0) {
            res.status(404).json({ error: `Card with id ${id} not found` });
          } else {
            res.json({ data: rows[0] });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
        }
      },
      create: async (req, res) => {
        console.log(req.body);
        const {  cardNo, userId } = req.body;
        try {
          const [result] = await pool.query(
            "INSERT INTO cards ( cardNo, userId) VALUES ( ?, ?)",
            [cardNo, userId]
          );
          const id = result.insertId;
          res.status(201).json({ data: { id, cardNo, userId} });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
        }
      },
      update: async (req, res) => { 
        const { id , cardNo, userId } = req.body;
        try {
          const [result] = await pool.query(
            "UPDATE cards SET cardNo=?, userId=? WHERE id=?",
            [cardNo, userId, id]
          );
          if (result.affectedRows === 0) {
            res.status(404).json({ error: `Card with id ${id} not found` });
          } else {
            res.json({ message: `Card with id ${id} updated successfully` });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
        }
      },
      delete: async (req, res) => {
        const { id } = req.params;
        try {
          const [result] = await pool.query("DELETE FROM cards WHERE id=?", [id]);
          if (result.affectedRows === 0) {
            res.status(404).json({ error: `Card with id ${id} not found` });
          } else {
            res.json({ message: `Card with id ${id} deleted successfully` });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
        }
      },
}
module.exports = CardController;