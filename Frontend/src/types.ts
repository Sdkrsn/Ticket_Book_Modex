export type Show = {
  id: number;
  name: string;
  start_time: string; // ISO string
  total_seats: number;
  created_at?: string;
};

export type Seat = {
  id: number;
  show_id: number;
  seat_no: number;
  booking_id?: number | null;
  status: 'AVAILABLE' | 'RESERVED' | 'BOOKED' | string;
};

export type Booking = {
  id: number;
  show_id: number;
  user_name: string;
  status: 'PENDING' | 'CONFIRMED' | 'FAILED' | string;
  created_at?: string;
  updated_at?: string;
  booking_id?: number; // some responses might use booking_id
};
