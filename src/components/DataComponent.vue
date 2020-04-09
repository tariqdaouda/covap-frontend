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
      <Plotly :data="data" :layout="layout" :displayModeBar="true"/>
    </div>
  </div>
</template>

<script>
  import { Plotly } from 'vue-plotly';
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
      // this.fetchFields();
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
          'http://api.epitopes.world/get-data',
          // 'http://127.0.0.1:6543/api/get-data',
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
      }
    }
  }
</script>
