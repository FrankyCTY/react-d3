import React from 'react';
import { csv, arc, pie } from 'd3';

const svgWidth = 960;
const svgHeight = 500;

const centerX = svgWidth / 2;
const centerY = svgHeight / 2;

const pieArcWidth = 200;
const pieArc = arc().innerRadius(0).outerRadius(pieArcWidth);

const unitCircleCircumference = Math.PI * 2;

const csvUrl =
  'https://gist.githubusercontent.com/FrankyCTY/5a1bfe92cfc4275528e78fe7ddca61f3/raw/a2279538a4413df04e7300495e71a543a39b8c80/cssNamedColors.csv';

function CssNamedColorChart() {
  const [csvData, setCsvData] = React.useState(null);

  React.useEffect(() => {
    getCrvData();

    async function getCrvData() {
      const parsedCsvData = await csv(csvUrl);
      setCsvData(parsedCsvData);
    }
  }, []);

  if (!csvData) return <pre>Loading...</pre>;

  const colorPie = pie().value(1);

  return (
    <svg width={svgWidth} height={svgHeight}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {colorPie(csvData).map((d, idx) => {
          return <path fill={d.data['RGB hex value']} d={pieArc(d)} />;

          // return (
          //   <path
          //     fill={d['RGB hex value']}
          //     d={pieArc({
          //       startAngle: (idx / csvData.length) * unitCircleCircumference,
          //       endAngle:
          //         ((idx + 1) / csvData.length) * unitCircleCircumference,
          //     })}
          //   />
          // );
        })}
      </g>
    </svg>
  );
}

export { CssNamedColorChart };
