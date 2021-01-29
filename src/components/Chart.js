import { useRef, useEffect } from 'react';
import PolygonChart from '../classes/PolygonChart';
import styled from 'styled-components';

const ChartFigure = styled.figure`
  display: block;
  height: 100%;
  position: relative;
  width: 100%;
`;

const Chart = ({ data, options }) => {

  const container = useRef();

  const chart = useRef();

  useEffect(() => {

    chart.current = new PolygonChart(container.current);

    return chart.current.setResizeHandler();

  }, []);

  useEffect(() => { chart.current.updateOptions(options); }, [options]);

  useEffect(() => { chart.current.updateData(data); }, [data]);

  useEffect(() => { chart.current.masterDraw(); }, [options, data]);

  return <ChartFigure aria-label='chart' ref={container}></ChartFigure>;

}

export default Chart;
