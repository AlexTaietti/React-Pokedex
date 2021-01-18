import { useRef, useEffect } from 'react';
import PolygonChart from '../classes/PolygonChart.js';
import styled from 'styled-components';

const ChartFigure = styled.figure`
  height: 100%;
  width: 100%;
  display: block;
  position: relative;
`;

const Chart = ({ data, options }) => {

  const container = useRef();

  const chart = useRef();

  useEffect(() => {

    console.log('Creating chart, hooking its resize handler to the window and then mounting it on the view');

    chart.current = new PolygonChart(container.current);

    return chart.current.setResizeHandler();

  }, []);

  useEffect(() => {  console.log('Updating the charts options'); chart.current.updateOptions(options); }, [options]);

  useEffect(() => {  console.log('Updating the charts data'); chart.current.updateData(data); }, [data]);

  useEffect(() => {  console.log('Rendering the chart'); chart.current.masterDraw(); }, [options, data]);

  return <ChartFigure aria-label='chart' ref={container}></ChartFigure>;

}

export default Chart;
