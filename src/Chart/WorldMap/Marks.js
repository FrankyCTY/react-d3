import React from 'react';
import { geoNaturalEarth1, geoPath, geoGraticule } from 'd3';

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

const Marks = ({ data: { land, interiors } }) => {
  return (
    <g fill="#137B80">
      {/* background sphere */}
      <path d={path({ type: 'Sphere' })} fill="#ececec" />
      {/* Graticule */}
      <path d={path(graticule())} stroke="#C0C0BB" fill="none" />;
      {/* GeoJson to path */}
      {land.features.map((feature) => {
        return <path d={path(feature)} />;
      })}
      {/* Interiors border for areas */}
      <path d={path(interiors)} stroke="#C0C0BB" />;
    </g>
  );
};

export { Marks };
