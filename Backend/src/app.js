require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const showsRouter = require('./routes/shows');
const bookingsRouter = require('./routes/bookings');
const bookingExpiryJob = require('./bookingExpiryJob');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/shows', showsRouter);
app.use('/api/bookings', bookingsRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Backend running on", PORT);
  bookingExpiryJob.start();
});
