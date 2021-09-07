import React from 'react';
import { arc } from 'd3';

function Mouth({ mouthRadius, mouthWidth }) {
  const mothArc = arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidth)
    // .startAngle(Math.PI / 2)
    .startAngle(Math.PI / 2)
    .endAngle(Math.PI * 1.5);

  return <path d={mothArc()} />;
}

export { Mouth };
