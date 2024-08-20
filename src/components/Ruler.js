import React from 'react';

const Ruler = ({ width, height }) => {
  const verticalTicks = [];
  const horizontalTicks = [];

  for (let i = 0; i <= width; i += 50) {
    verticalTicks.push(
      <line
        key={`v-${i}`}
        x1={i}
        y1={0}
        x2={i}
        y2={height}
        stroke="red"
        strokeWidth={1}
        strokeDasharray="2,2"
      />
    );
  }

  for (let j = 0; j <= height; j += 50) {
    horizontalTicks.push(
      <line
        key={`h-${j}`}
        x1={0}
        y1={j}
        x2={width}
        y2={j}
        stroke="red"
        strokeWidth={1}
        strokeDasharray="2,2"
      />
    );
  }

  return (
    <svg
      style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      width={width}
      height={height}
    >
      {verticalTicks}
      {horizontalTicks}
    </svg>
  );
};

export default Ruler;
