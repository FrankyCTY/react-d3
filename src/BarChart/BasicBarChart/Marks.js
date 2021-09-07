import React from 'react';

const Marks = ({ data, yScale, xScale, xValueAccessor, yValueAccessor }) => {
  return data.map((d) => {
    return (
      <rect
        key={d.Country}
        x={0}
        y={yScale(yValueAccessor(d))}
        width={xScale(xValueAccessor(d))}
        height={yScale.bandwidth()}
      ></rect>
    );
  });
};

export { Marks };
