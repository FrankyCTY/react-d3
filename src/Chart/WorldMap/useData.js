import React from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

const useData = (url) => {
  const [data, setData] = React.useState(null);
  console.log(data);

  React.useEffect(() => {
    getMapJsonData();

    async function getMapJsonData() {
      const topology = await json(url);
      const { land } = topology.objects;
      // topo json (lightweight encoding) to geo json for easier usage
      setData({
        land: feature(topology, land),
        interiors: mesh(topology, land, (a, b) => a !== b),
      });
    }
  }, [url]);

  return data;
};

export { useData };
