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
          <header className="topbar">
            <a className="brand" href="/">
              <div className="logo">M</div>
              <div style={{lineHeight:1}}>
                <div style={{fontWeight:800}}>Modex</div>
                <div className="muted" style={{fontSize:12}}>Ticket booking UI</div>
              </div>
            </a>

            <nav className="nav" style={{marginLeft:'auto'}}>
              <Link to="/" className="link">Home</Link>
              <Link to="/admin" className="link">Admin</Link>
            </nav>
          </header>

          <section className="hero">
            <div className="hero-left">
              <h1>Available Shows</h1>
              <div className="sub muted">Pick a show and book seats quickly — secure, concurrent-safe booking.</div>
            </div>

            <div className="hero-cta">
              <Link to="/admin" className="btn secondary">Create Show</Link>
            </div>
          </section>

          <main style={{marginTop:12}}>
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
