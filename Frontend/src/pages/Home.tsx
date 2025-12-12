import React from 'react';
import { Link } from 'react-router-dom';
import { useShows } from '../context/ShowContext';

export default function Home(): JSX.Element {
  const { shows, loading } = useShows();

  return (
    <div>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14}}>
        <div>
          <h1>Available Shows</h1>
          <div className="muted">Pick a show and book seats</div>
        </div>
        <div>
          <Link to="/admin" className="btn btn-outline">Create Show</Link>
        </div>
      </div>

      <div>
        {loading ? <div className="panel panel-inner">Loading...</div> :
          shows.length === 0 ? (
            <div className="panel panel-inner">No shows yet. Head to Admin to create a show.</div>
          ) : (
            <ul className="list" style={{marginTop:8}}>
              {shows.map(s => (
                <li key={s.id}>
                  <div style={{display:'flex', alignItems:'center', gap:12}}>
                    <div style={{width:44, height:44, borderRadius:8, background:'linear-gradient(135deg,var(--primary),var(--accent))'}} />
                    <div>
                      <div style={{fontWeight:700}}>{s.name}</div>
                      <div className="muted" style={{fontSize:13}}>{new Date(s.start_time).toLocaleString()}</div>
                    </div>
                  </div>
                  <div>
                    <Link to={`/booking/${s.id}`} className="btn">Book</Link>
                  </div>
                </li>
              ))}
            </ul>
        )}
      </div>
    </div>
  );
}
