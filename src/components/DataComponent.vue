<template>
  <div class="uk-grid">
    <div class="uk-card">
      <form>
        <component v-for="(field, index) in formFields"
                   :key="index"
                   :is="field.fieldType"
                   v-bind="field"
                   class="uk-input">
        </component>
      </form>
      <button
          v-on:click="checkForm"
          class="uk-button uk-button-primary">
        Plot
      </button>
    </div>
    <div>
      <!--Plotly histogram-->
      <div ref="histogram" style="height:500px; width:800px"></div>
    </div>
  </div>
</template>

<script>
  import Plotly from 'plotly.js-cartesian-dist';
  import TextInput from './TextInput';
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
   
  Vue.use(VueAxios, axios)

  export default {
    name: 'DataComponent',
    components: {
      Plotly,
      TextInput,
      axios,
      VueAxios
    },
    data() {
      return {
        layout: {},
        data: [],
        formFields: [],
      }
    },
    created() {
      this.fetchFields();
      this.fetchData();
    },
    methods: {
      async fetchFields () {
        const { data } = await this.$http.get(
          'http://localhost:6543/api/get-fields/limit/50'
        );
        console.log(data);
        for (let [key, value] of Object.entries(data.payload)) {
          console.log(`${key}: ${value}`);
        }
      },
      async fetchData () {
        const { data } = await this.$http.post(
          'http://localhost:6543/api/get-data',
          {
            "payload": {
                "query":{
                    "Peptides.Score": {
                        "type": "float",
                        "range": [0, ":"]
                    }
                },
                "limit": 2000,
                "sort": {
                  // "field": "Peptides.Score",
                  "direction": "RAND"
                },
                "additional_fields":["Peptides.Sequence"]
            }
        }
      );
      let scores = []
      for (let line of data.payload){
        scores.push(line["Peptides.Score"])
      }
      this.data = [
        {
          x: scores,
          type: "histogram"
        }
      ];
      this.layout = {
          title: "Peptide.Score",
          plot_bgcolor: "#d3d3d3",
          paper_bgcolor: "#fff",
      }
    },
    checkForm: function () {
        this.formFields.forEach((field) => {
          console.log(field);
        });
      },

    updateHistogram: function (x0, x1) {

        let datas = [{
            x: x0,
            histnorm: 'count',
            name: 'control',
            autobinx: true,
            marker: {color: 'rgb(255, 0, 0)'},
            opacity: 1,
            type: 'histogram'
          }, {
            x: x1,
            name: 'experimental',
            autobinx: true,
            marker: {color: 'rgb(0, 0, 255)'},
            opacity: 1,
            type: 'histogram'
          }];

        let layout = {
            title: 'Binding Score',
            xaxis: {title: 'Score Distribution'},
            yaxis: {title: 'Percentage'},
            barmode: 'stack',
            bargap: 0,
            bargroupgap: 0,
            showlegend: true,
            legend: {
              x: 1,
              y: 0.5
            }
          };

        let config = {
          toImageButtonOptions: {
            format: 'svg', // one of png, svg, jpeg, webp
            filename: 'binding_score',
            height: 500,
            width: 700,
            scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
          },
          displayModeBar: true,
          displaylogo: false,
          responsive: true
        };

        // update histogram plot
        Plotly.newPlot(this.$refs.histogram, datas, layout, config);
      }
    },
    mounted() {
      this.updateHistogram(
        [1,2,3,4,5],
        [4,5,6,8]
        );
    }
  }
</script>
