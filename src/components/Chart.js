import React, { useRef, useEffect } from 'react';
import PolygonChart from '../classes/PolygonChart.js';

import '../styles/Chart.scss';

function Chart ({data, options}) {

  console.log('Rendering chart...');

  const container = useRef();

  const chart = useRef();

  useEffect(() => {

    chart.current = new PolygonChart(data, container.current, options);

    if(chart.current.options.animation.animated) {

      chart.current.animate();

    } else {

      chart.current.draw();

    }

    window.addEventListener('resize', chart.current.resizeAndCenter.bind(chart.current));

    return function () {

      console.log('Unmounting chart and cleaning up event handlers...');

      window.removeEventListener('resize', chart.current.resizeAndCenter.bind(chart.current));

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    console.log('Updating chart data...')

    chart.current.updateData(data);

    if(chart.current.options.animation.animated) {

      chart.current.animate();

    } else {

      chart.current.clearCanvas();

      chart.current.draw();

    }

  }, [data]);

  return <figure aria-label='chart' className="chart" ref={container}></figure>;

}

export default Chart;
