import React from 'react';

export default function SeatGrid({ seats = [], selected = [], toggle }) {
  const cols = 8;
  const styleGrid = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 44px)`,
    gap: 8,
    marginTop: 12
  };

  return (
    <div style={styleGrid}>
      {seats.map((s) => {
        const isSelected = selected.includes(s.seat_no);
        const disabled = s.status !== 'AVAILABLE';
        const bg = disabled ? '#ddd' : isSelected ? '#8fd' : '#fff';
        const cursor = disabled ? 'not-allowed' : 'pointer';

        return (
          <div
            key={s.id}
            onClick={() => !disabled && toggle(s.seat_no)}
            style={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #444',
              borderRadius: 6,
              background: bg,
              cursor
            }}
          >
            {s.seat_no}
          </div>
        );
      })}
    </div>
  );
}
