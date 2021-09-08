import React from 'react';
import { csv } from 'd3';

const useFetchCsvData = (csvUrl) => {
  const [csvData, setCsvData] = React.useState(null);

  React.useEffect(() => {
    getCrvData();

    async function getCrvData() {
      const rowDataModifier = (d) => {
        d.Population = parseFloat(d['2020']) * 1000;
        return d;
      };

      const parsedCsvData = await csv(csvUrl, rowDataModifier);
      // filter data
      const filteredData = parsedCsvData.slice(0, 10);
      setCsvData(filteredData);
    }
  }, [csvUrl]);

  return csvData;
};

export { useFetchCsvData };
