import React from 'react';
import { csv } from 'd3';

const useFetchCsvData = (csvUrl) => {
  const [csvData, setCsvData] = React.useState(null);

  React.useEffect(() => {
    getCrvData();

    async function getCrvData() {
      const rowDataModifier = (d) => {
        d.sepal_length = +d.sepal_length;
        d.sepal_width = +d.sepal_width;
        d.petal_length = +d.petal_length;
        d.petal_width = +d.petal_width;
        return d;
      };

      const parsedCsvData = await csv(csvUrl, rowDataModifier);
      setCsvData(parsedCsvData);
    }
  }, [csvUrl]);

  return csvData;
};

export { useFetchCsvData };
