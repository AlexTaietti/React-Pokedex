import React, { useRef, useEffect } from 'react';
import PolygonChart from '../classes/PolygonChart.js';

import '../styles/Chart.scss';

function Chart ({ data, options }) {

  const container = useRef();

  const chart = useRef();

  useEffect(() => {  console.log('Creating chart and mounting it on the view'); chart.current = new PolygonChart(container.current); }, []);

  useEffect(() => {  console.log('Updating the charts options'); chart.current.updateOptions(options); }, [options]);

  useEffect(() => {  console.log('Updating the charts data'); chart.current.updateData(data); }, [data]);

  useEffect(() => {  console.log('Rendering the chart'); chart.current.masterDraw(); }, [options, data]);

  return <figure aria-label='chart' className="chart" ref={container}></figure>;

}

export default Chart;
