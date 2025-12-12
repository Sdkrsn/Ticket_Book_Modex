CREATE TYPE booking_status AS ENUM ('PENDING','CONFIRMED','FAILED');

CREATE TABLE shows (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  start_time TIMESTAMP NOT NULL,
  total_seats INT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  show_id INT REFERENCES shows(id),
  user_name TEXT,
  status booking_status DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE seats (
  id SERIAL PRIMARY KEY,
  show_id INT REFERENCES shows(id),
  seat_no INT NOT NULL,
  booking_id INT REFERENCES bookings(id),
  status TEXT DEFAULT 'AVAILABLE',
  UNIQUE(show_id, seat_no)
);
