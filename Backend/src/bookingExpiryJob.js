// backend/src/bookingExpiryJob.js
const db = require('./db');

const EXPIRY_MINUTES = 2;

function start() {
  // Run every 30 seconds
  setInterval(async () => {
    let client;
    try {
      client = await db.getClient();
      await client.query('BEGIN');

      // Find PENDING bookings older than EXPIRY_MINUTES
      const res = await client.query(
        `SELECT id FROM bookings
         WHERE status = 'PENDING'
           AND created_at < now() - INTERVAL '${EXPIRY_MINUTES} minutes'
         FOR UPDATE SKIP LOCKED`
      );

      const ids = res.rows.map(r => r.id);
      if (ids.length > 0) {
        await client.query(
          `UPDATE bookings SET status = 'FAILED', updated_at = now()
           WHERE id = ANY($1::int[])`,
          [ids]
        );
        await client.query(
          `UPDATE seats SET status = 'AVAILABLE', booking_id = NULL
           WHERE booking_id = ANY($1::int[])`,
          [ids]
        );
        console.log('Expired bookings:', ids);
      }

      await client.query('COMMIT');
    } catch (err) {
      if (client) await client.query('ROLLBACK').catch(()=>{});
      console.error('bookingExpiryJob error:', err.message || err);
    } finally {
      if (client) client.release();
    }
  }, 30 * 1000);
}

module.exports = { start };
