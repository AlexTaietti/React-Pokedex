import React, { useRef, useEffect } from 'react';
import PolygonChart from '../classes/PolygonChart.js';

import '../styles/Chart.scss';

function Chart ({data, options}) {

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

    return function () { window.removeEventListener('resize', chart.current.resizeAndCenter.bind(chart.current)); }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {

    chart.current.updateData(data);

    chart.current.clearCanvas();

    if(chart.current.options.animation.animated) {

      chart.current.animate();

    } else {

      chart.current.draw();

    }

  }, [data]);

  useEffect(() => {

    chart.current.updateOptions(options);

    chart.current.clearCanvas();

    if(chart.current.options.animation.animated) {

      chart.current.animate();

    } else {

      chart.current.draw();

    }

  }, [options]);

  return <figure aria-label='chart' className="chart" ref={container}></figure>;

}

export default Chart;
