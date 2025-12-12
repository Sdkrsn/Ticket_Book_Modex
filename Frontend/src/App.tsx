import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ShowProvider } from './context/ShowContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Booking from './pages/Booking';

export default function App(): JSX.Element {
  return (
    <ShowProvider>
      <BrowserRouter>
        <div className="container">
          <header className="nav">
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <a className="link" href="/" style={{fontWeight:700, fontSize:18}}>Modex</a>
              <div className="muted" style={{fontSize:13}}>Ticket Booking</div>
            </div>

            <nav style={{marginLeft:'auto', display:'flex', gap:8}}>
              <Link to="/" className="link">Home</Link>
              <Link to="/admin" className="link">Admin</Link>
            </nav>
          </header>

          <main style={{display:'grid', gap:16}}>
            <div className="panel panel-inner">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/booking/:id" element={<Booking />} />
              </Routes>
            </div>
          </main>
        </div>
      </BrowserRouter>
    </ShowProvider>
  );
}
