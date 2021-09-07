import React from 'react';
import { Eye } from './Eye';
import { Mouth } from './Mouth';

const canvasWidth = 160;
const canvasHeight = 100;

const centerX = canvasWidth / 2;
const centerY = canvasHeight / 2;
const strokeWidth = 10;
const radius = centerY - strokeWidth / 2;

const eyeOffsetX = 20;
const eyeOffsetY = 10;
const eyeRadius = 15;

const mouthWidth = 2;
const mouthRadius = 16;

function SmileyFace() {
  return (
    <svg width={canvasWidth} height={canvasHeight}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        <circle
          r={radius}
          fill="yellow"
          stroke="black"
          strokeWidth={strokeWidth}
        />

        <Eye cx={-eyeOffsetX} cy={-eyeOffsetY} radius={eyeRadius} />
        <Eye cx={eyeOffsetX} cy={-eyeOffsetY} radius={eyeRadius} />

        <g transform={`translate(0, ${10})`}>
          <Mouth mouthRadius={mouthRadius} mouthWidth={mouthWidth} />
        </g>
      </g>
    </svg>
  );
}

export { SmileyFace };
