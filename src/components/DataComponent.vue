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
        
      </button>
    </div>
    <div>
      <!--Plotly histogram-->
      <GraphComponent :datas=graphData></GraphComponent>
    </div>
    <div>
      <!--Form-->
      <FormComponent></FormComponent>
    </div>
  </div>
</template>

<script>
  import TextInput from './TextInput';
  import GraphComponent from './GraphComponent';
  import FormComponent from './FormComponent';
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
   
  Vue.use(VueAxios, axios)

  export default {
    name: 'DataComponent',
    components: {
      TextInput,
      GraphComponent,
      FormComponent,
      axios,
      VueAxios
    },
    data() {
      return {
        layout: {},
        data: [],
        formFields: [],
        graphData: [
          {label: 'control', values: [1,2,3,4,5], color: 'rgb(255, 0, 0)'},
          {label: 'experimental', values: [4,5,6,8], color: 'rgb(0, 0, 255)'}
        ]
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
      }
    },
    updateData: function() {
      this.graphData = [
          {label: 'control', values: [1,2,3,4,5], color: 'rgb(0, 0, 255)'},
          {label: 'experimental', values: [4,5,6,8], color: 'rgb(255, 0, 0)'}
        ]
    }
  }
</script>
