import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';

type Seat = { id:number; seat_no:number; status:string; booking_id:number|null; };

export default function Booking(): JSX.Element {
  const { id } = useParams<{id:string}>();
  const showId = id ? Number(id) : null;
  const [show, setShow] = useState<any|null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selected, setSelected] = useState<number[]>([]);

  const load = async () => {
    if (!showId) return;
    const res = await api.get(`/shows/${showId}`);
    setShow(res.data.show);
    setSeats(res.data.seats || []);
  };

  useEffect(()=>{ load(); }, [showId]);

  const toggle = (sn:number) => setSelected(s => s.includes(sn) ? s.filter(x=>x!==sn) : [...s, sn]);

  const book = async () => {
    if (!showId) return;
    if (selected.length === 0) return alert('Select seats first');
    try {
      await api.post('/bookings', { show_id: showId, user_name:'guest', seats: selected });
      alert('Booked');
      setSelected([]); await load();
    } catch (err:any) {
      alert('Error: ' + (err?.response?.data?.error || err.message));
    }
  };

  if (!show) return <div className="panel panel-inner">Loading show...</div>;

  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 320px', gap:18}}>
      <div className="panel panel-inner">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
          <div>
            <h2>{show.name}</h2>
            <div className="muted">{new Date(show.start_time).toLocaleString()}</div>
          </div>
          <div style={{textAlign:'right'}}>
            <div style={{fontWeight:700}}>{show.total_seats} seats</div>
            <div className="muted">Show ID: {show.id}</div>
          </div>
        </div>

        <div style={{display:'grid', gap:12}}>
          <div style={{display:'grid', gridTemplateColumns:'repeat(8, 48px)', gap:10}}>
            {seats.map(s => {
              const isSelected = selected.includes(s.seat_no);
              const cls = s.status === 'CONFIRMED' ? 'seat blocked' : isSelected ? 'seat selected' : 'seat available';
              return (
                <div key={s.id} className={cls} onClick={()=> s.status==='AVAILABLE' && toggle(s.seat_no)}>{s.seat_no}</div>
              );
            })}
          </div>

          <div style={{display:'flex', gap:8}}>
            <button className="btn" onClick={book} disabled={selected.length===0}>Book {selected.length} seat(s)</button>
            <button className="btn btn-outline" onClick={()=>setSelected([])}>Clear</button>
          </div>

          <div className="muted">Selected: {selected.join(', ') || '—'}</div>
        </div>
      </div>

      <div className="panel panel-inner">
        <h3>Booking Summary</h3>
        <div className="muted">Confirmed seats: {seats.filter(s=>s.status==='CONFIRMED').length}</div>
        <hr style={{border:'none', height:1, background:'var(--border)', margin:'12px 0'}} />
        <div className="muted">Tip: Click available seats to select. Confirm to reserve them.</div>
      </div>
    </div>
  );
}
