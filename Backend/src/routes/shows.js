const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name, start_time, total_seats } = req.body;

  const client = await db.getClient();
  try {
    await client.query("BEGIN");

    const showResult = await client.query(
      "INSERT INTO shows (name, start_time, total_seats) VALUES ($1, $2, $3) RETURNING *",
      [name, start_time, total_seats]
    );

    const show = showResult.rows[0];

    let seatValues = [];
    for (let i = 1; i <= total_seats; i++) {
      seatValues.push(`(${show.id}, ${i})`);
    }

    await client.query(`INSERT INTO seats (show_id, seat_no) VALUES ${seatValues.join(",")}`);

    await client.query("COMMIT");
    res.json(show);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "error creating show" });
  } finally {
    client.release();
  }
});

router.get('/', async (req, res) => {
  const shows = await db.query("SELECT * FROM shows ORDER BY start_time");
  res.json(shows.rows);
});

router.get('/:id', async (req, res) => {
  const showId = req.params.id;

  const show = (await db.query("SELECT * FROM shows WHERE id=$1", [showId])).rows[0];
  const seats = (await db.query("SELECT * FROM seats WHERE show_id=$1 ORDER BY seat_no", [showId])).rows;

  res.json({ show, seats });
});

module.exports = router;
