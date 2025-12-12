const express = require('express');
const db = require('../db');
const router = express.Router();

router.post('/', async (req, res) => {
  const { show_id, user_name, seats } = req.body;

  const client = await db.getClient();

  try {
    await client.query("BEGIN");

    const seatQuery = `
      SELECT * FROM seats
      WHERE show_id = $1 AND seat_no = ANY($2)
      FOR UPDATE
    `;

    const seatRows = (await client.query(seatQuery, [show_id, seats])).rows;

    const unavailable = seatRows.filter(s => s.status !== "AVAILABLE");
    if (unavailable.length > 0) {
      await client.query("ROLLBACK");
      return res.status(409).json({ error: "Seat already taken" });
    }

    const bookingRes = await client.query(
      "INSERT INTO bookings (show_id, user_name, status) VALUES ($1, $2, 'CONFIRMED') RETURNING *",
      [show_id, user_name]
    );

    const booking = bookingRes.rows[0];

    await client.query(
      "UPDATE seats SET booking_id=$1, status='CONFIRMED' WHERE show_id=$2 AND seat_no = ANY($3)",
      [booking.id, show_id, seats]
    );

    await client.query("COMMIT");
    res.json(booking);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: "server error" });
  } finally {
    client.release();
  }
});

module.exports = router;
