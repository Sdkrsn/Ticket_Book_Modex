import React, { useState } from 'react';
import api from '../api';
import { useShows } from '../context/ShowContext';

export default function Admin(): JSX.Element {
  const [name, setName] = useState('');
  const [start, setStart] = useState('');
  const [total, setTotal] = useState<number>(40);
  const { fetchShows } = useShows();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/shows', { name, start_time: start, total_seats: total });
      await fetchShows();
      alert('Show created');
      setName(''); setStart(''); setTotal(40);
    } catch (err:any) {
      console.error(err);
      alert('Error: ' + (err?.response?.data?.error || err.message));
    }
  };

  return (
    <div className="grid" style={{gridTemplateColumns:'1fr 320px', gap:18}}>
      <div className="panel panel-inner">
        <h2>Create Show</h2>
        <form onSubmit={submit} style={{display:'grid', gap:12, marginTop:12}}>
          <label className="label">Show name
            <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
          </label>

          <label className="label">Start time
            <input className="input" type="datetime-local" value={start} onChange={e=>setStart(e.target.value)} required />
          </label>

          <label className="label">Total seats
            <input className="input" type="number" value={total} onChange={e=>setTotal(Number(e.target.value))} min={1} />
          </label>

          <div style={{display:'flex', gap:8}}>
            <button className="btn" type="submit">Create Show</button>
            <button type="button" className="btn btn-outline" onClick={()=>{ setName(''); setStart(''); setTotal(40); }}>Reset</button>
          </div>
        </form>
      </div>

      <div className="panel panel-inner">
        <h3 className="muted">Tips</h3>
        <ul className="muted">
          <li>Use the calendar to pick a date/time</li>
          <li>Seats will be auto-created</li>
          <li>Try booking via the Book button</li>
        </ul>
      </div>
    </div>
  );
}
