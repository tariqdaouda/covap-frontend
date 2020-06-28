<template>
    <div class="we-distribution-container">
      <div ref="graph" class="we-distribution-container"></div>
    </div>
</template>

<script>
  import Plotly from 'plotly.js-dist-min';

  export default {
    name: 'GraphComponent',
    props: ['graphType', 'xLabel',  'yLabel', 'datas'],
    data() {
      return {
        // grapType could either be :
        // line, box, scatter, histogram
        // input data format    
        config: {
          toImageButtonOptions: {
            format: 'png', // one of png, svg, jpeg, webp
            filename: 'epitopes_world',
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
      getGraphData: function(data) {

        let output = {
          x:  data.x,
          name: data.label,
          marker: {
            color: data['color']
          }
        }

        if (this.graphType === 'histogram') {
          // {label: 'control', x: [1,2,3,4,5], color: 'rgb(255, 0, 0)'}
          return Object.assign(
            output,
            {
              autobinx: true,
              opacity: 1,
              type: 'histogram',
              histnorm: 'probability'
            }
          )
        } else if (this.graphType === 'scatter') {
          // {label: 'experimental', x: [4,5,6,8], y: [1,2,3,4,5], color: 'rgb(0, 0, 255)'}
          return Object.assign(
            output,
            {
              y:  data.y,
              mode: 'markers'
            }
          )
        } else if (this.graphType === 'line') {
          // {label: 'experimental', x: [4,5,6,8], y: [1,2,3,4,5], color: 'rgb(0, 0, 255)'}
          return Object.assign(
            output,
            {
              y:  data.y,
              mode: 'lines'
            }
          )
        } else if (this.graphType === 'box') {
          // {label: 'experimental', x: [4,5,6,8], y: [1,2,3,4,5], color: 'rgb(0, 0, 255)'}
          return Object.assign(
            output,
            {
              x:  data.x,
              type: 'box',
              name:data.label,
              boxmean: 'sd'
            }
          )
        } else {
          return output;
        }
      },
      getGraphLayout: function() {

        let output = {
          xaxis: {
            title: this.xLabel
          },
          yaxis: {
            title: this.yLabel
          },
          autosize: true
        }

        if (this.graphType === 'histogram') {
         return Object.assign(
            output,
            {
            barmode: 'overlay',
            autosize: true,
            bargap: 0,
            bargroupgap: 0,
            showlegend: true,
            yaxis: {
              title: 'Distribution'
            },
            legend: {
              x: 1,
              y: 0.5
            }
          }
        )
        } else if (this.graphType === 'scatter' || this.graphType === 'box') {
          return Object.assign(
            output,
            {
              showlegend: false,
              yaxis: {
                title: ''
              },
            }
          )
        } else if (this.graphType === 'stacked bar') {
          return Object.assign(
            output,
            {
              barmode: "stack"
            }
          )
        } else if (this.graphType === 'line') {
          return Object.assign(
            output,
            {
              showlegend: true
            }
          )
        } else if (this.graphType === 'density') {
          return Object.assign(
            output,
            {
              showlegend: false,
              autosize: true,
              margin: {t: 50},
              hovermode: 'closest',
              bargap: 0,
              xaxis: {
                domain: [0, 0.85],
                showgrid: false,
                zeroline: false
              },
              yaxis: {
                domain: [0, 0.85],
                showgrid: false,
                zeroline: false
              },
              xaxis2: {
                domain: [0.85, 1],
                showgrid: false,
                zeroline: false
              },
              yaxis2: {
                domain: [0.85, 1],
                showgrid: false,
                zeroline: false
              }
            }
          )
        } else if (this.graphType === 'map') {
          return Object.assign(
            output,
            {
            showlegend:false,
            geo: {
              showocean: true,
              oceancolor: "LightBlue",
              showcountries: true,
              countrycolor: 'grey',
              countrywidth: 1,
              showscale: false
              },
              height:300,
              margin: {
                "r":25,
                "l":25,
                "t":40,
                "b":10
              },
            }
          )
        } else {
          return output;
        }
      },
      updateGraph: function () {

        let graphData = [];

        if (this.graphType === 'density') {
          //density
          
          let x = [];
          let y = [];

          this.datas.map(data => x = x.concat(data.x));
          this.datas.map(data => y = y.concat(data.y));

          graphData = [
            {
              x: x,
              y: y,
              mode: 'markers',
              name: 'points',
              autosize: true,
              marker: {
                color: 'rgb(102,0,0)',
                size: 2,
                opacity: 0.4
              },
              type: 'scatter'
            },
            {
              x: x,
              y: y,
              name: 'density',
              ncontours: 20,
              colorscale: 'Hot',
              reversescale: true,
              showscale: false,
              type: 'histogram2dcontour'
            },
            {
              x: x,
              name: 'x density',
              marker: {
                color: 'rgb(102,0,0)'
              },
              yaxis: 'y2',
              type: 'histogram'
            },
            {
              y: y,
              name: 'y density',
              marker: {
                color: 'rgb(102,0,0)'
              },
              xaxis: 'x2',
              type: 'histogram'
            }
          ]
        } else if (this.graphType === 'map') {
          // map 
          graphData = [{
            type: 'choropleth',
            locationmode: 'country names',
            locations: ['Russia', 'France'],
            z: [1, 1]
          }]

        } else {
          // line / box / scatter / histogram
          graphData = this.datas.map(data => this.getGraphData(data));
        }

        Plotly.newPlot(this.$refs.graph, graphData, this.getGraphLayout(), this.config);
      }
    },
    mounted() {
      this.updateGraph();
    },
    watch: {
      datas: function () {
        this.updateGraph();
      },
      grapType: function() {
        this.updateGraph();
      }
    }
  }
</script>