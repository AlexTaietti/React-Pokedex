import React, { useRef, useEffect } from 'react';
import PolygonChart from '../classes/PolygonChart.js';

import '../styles/Chart.scss';

function Chart ({data, options}) {

  const container = useRef();

  const chart = useRef();

  useEffect(() => {

    console.log('mounting chart')

    chart.current = new PolygonChart(data, container.current, options);

    if(chart.current.options.animation.animated) {

      chart.current.animate();

    } else {

      chart.current.draw();

    }

    window.addEventListener('resize', chart.current.resizeAndCenter.bind(chart.current));

    return function () { window.removeEventListener('resize', chart.current.resizeAndCenter.bind(chart.current)); }

  }, []);

  useEffect(() => {

    console.log('changing data');

    chart.current.updateData(data);

    chart.current.clearCanvas();

    if(chart.current.options.animation.animated) {

      chart.current.animate();

    } else {

      chart.current.draw();

    }

  }, [data]);

  useEffect(() => {

    console.log('changing options');

    chart.current.updateOptions(options);

    chart.current.clearCanvas();

    if(chart.current.options.animation.animated) {

      chart.current.animate();

    } else {

      chart.current.draw();

    }

  }, [options]);

  return <section aria-label='chart' className="stats-chart" ref={container}></section>;

}

export default Chart;
