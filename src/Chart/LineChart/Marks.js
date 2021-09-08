import React from 'react';
import { line, curveNatural } from 'd3';

const Marks = ({ data, yScale, xScale, xValueAccessor, yValueAccessor }) => {
  return (
    <>
      <path
        fill="none"
        stroke="black"
        strokeWidth={5}
        d={line()
          .x((d) => xScale(xValueAccessor(d)))
          .y((d) => yScale(yValueAccessor(d)))
          .curve(curveNatural)(data)}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {data.map((d) => {
        return (
          <circle
            cx={xScale(xValueAccessor(d))}
            cy={yScale(yValueAccessor(d))}
            r={5}
          ></circle>
        );
      })}
    </>
  );
};

export { Marks };
