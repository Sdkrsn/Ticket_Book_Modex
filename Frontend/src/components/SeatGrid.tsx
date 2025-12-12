import React from 'react';
import { Seat } from '../types';

type Props = {
  seats: Seat[];
  selected: number[];
  toggle: (seatNo: number) => void;
}

export default function SeatGrid({ seats = [], selected = [], toggle }: Props): JSX.Element {
  const cols = 8;
  const styleGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 44px)`,
    gap: 8,
    marginTop: 12
  };

  return (
    <div style={styleGrid}>
      {seats.map(s => {
        const isSelected = selected.includes(s.seat_no);
        const disabled = s.status !== 'AVAILABLE';
        const cls = `seat ${disabled ? 'blocked' : isSelected ? 'selected' : 'available'}`;
        return (
          <div
            key={s.id}
            onClick={() => !disabled && toggle(s.seat_no)}
            className={cls}
          >
            {s.seat_no}
          </div>
        );
      })}
    </div>
  );
}
