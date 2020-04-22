<template>
    <div class="we-distribution-container">
      <div ref="histogram" class="we-distribution-container"></div>
    </div>
</template>

<script>
  import Plotly from 'plotly.js-cartesian-dist';

  export default {
    name: 'GraphComponent',
    props: ['datas', 'title', 'xLabel', 'yLabel'],
    data() {
      return {
        /*
        // input data format
        datas: [
          {label: 'control', values: [1,2,3,4,5], color: 'rgb(255, 0, 0)'},
          {label: 'experimental', values: [4,5,6,8], color: 'rgb(0, 0, 255)'}
        ],
        */
        layout: {
          title: this.title,
          xaxis: {title: this.xLabel},
          yaxis: {title: this.yLabel},
          // barmode: 'stack'/,
          barmode: 'overlay',
          bargap: 0,
          bargroupgap: 0,
          showlegend: true,
          legend: {
            x: 1,
            y: 0.5
          },
          autosize: true
        },
        config: {
          toImageButtonOptions: {
            format: 'png', // one of png, svg, jpeg, webp
            filename: this.title,
            height: 500,
            width: 700,
            scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
          },
          displayModeBar: true,
          displaylogo: false,
          responsive: true
        }
      }
    },
    methods: {
      // list of needed functions:
      updateHistogram: function () {

        let histogram_datas = [];
        for (let i=0; i < this.datas.length; i++) {
          histogram_datas.push({
              x: this.datas[i]['values'],
              name: this.datas[i]['label'],
              autobinx: true,
              marker: {color: this.datas[i]['color'],},
              opacity: 0.5,
              type: 'histogram',
            }
          )
        }
        // update histogram plot
        Plotly.newPlot(this.$refs.histogram, histogram_datas, this.layout, this.config);
      }
    },
    mounted() {
      this.updateHistogram();
    },
    watch: {
      datas: function () {
        this.updateHistogram();
      } 
    }
  }
</script>