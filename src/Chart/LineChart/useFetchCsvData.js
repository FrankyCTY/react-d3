import React from 'react';
import { csv } from 'd3';

const useFetchCsvData = (csvUrl) => {
  const [csvData, setCsvData] = React.useState(null);

  React.useEffect(() => {
    getCrvData();

    async function getCrvData() {
      // parse string into number
      const rowDataModifier = (d) => {
        d.temperature = +d.temperature;
        d.timestamp = new Date(d.timestamp);
        return d;
      };

      const parsedCsvData = await csv(csvUrl, rowDataModifier);
      setCsvData(parsedCsvData);
    }
  }, [csvUrl]);

  return csvData;
};

export { useFetchCsvData };
