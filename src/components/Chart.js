import React, { useRef, useEffect } from 'react';

import PolygonChart from '../classes/PolygonChart.js';

import '../styles/Chart.scss';

function Chart (props) {

  const container = useRef();

  useEffect(() => {

    if(container.current.children.length) container.current.removeChild(container.current.lastChild);

    const chart = new PolygonChart(props.pokemonData, container.current, 10, {

      maxValue: 170,

      animation:{
        animated: true,
        duration: 2000,
        easingFunction: 'easeOutElastic'
      },

      style: {

        label: { font: "1.6rem Orbitron" },

        chart: {
          background: true,
          fill: 'rgba(0, 255, 255, 0.7)'
        },

        polygon: {
          contour: true,
          fill: 'rgba(255, 0, 0, 0.4)',
          stroke: 'rgba(255, 0, 0, 1)',
          lineWidth: 2
        }

      }

    });

    chart.animate();

    window.addEventListener('resize', chart.resizeAndCenter.bind(chart));

  }, [props.pokemonData]);

  return <div className="display__chart" ref={container}></div>;

}

export default Chart;
