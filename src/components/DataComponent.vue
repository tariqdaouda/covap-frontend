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
        // data: [],
        formFields: [],
        graphData: []
      }
    },
    created() {
      // this.fetchFields();
      this.fetchData();
    },
    methods: {
      async fetchFields () {
        const { data } = await this.$http.get(
          'https://api.epitopes.world/get-fields/limit/50'
        );
        console.log(data);
        for (let [key, value] of Object.entries(data.payload)) {
          console.log(`${key}: ${value}`);
        }
      },
      async tidyfy(data){
        let tidy = []
        for (let line of data.payload){
          tidy.push(line["Peptides.Score"])
        }
        return tidy
      },
      async fetchData () {
        let ret1 = await this.$http.post(
          'https://api.epitopes.world/get-data',
          // 'http://localhost:6543/api/get-data',
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
                  "direction": "RAND"
                },
                "additional_fields":["Peptides.Sequence"]
            }
        }
      );
      let baseline1 = await this.tidyfy(ret1.data);
      this.graphData.push({label: "baseline", values: baseline1 , color: 'rgb(255, 0, 0)'})

      let ret2 = await this.$http.post(
          'https://api.epitopes.world/get-data',
          {
            "payload": {
                "query":{
                    "Peptides.Score": {
                        "type": "float",
                        "range": [0, 0.7]
                    }
                },
                "limit": 2000,
                "sort": {
                  "direction": "RAND"
                },
                "additional_fields":["Peptides.Sequence"]
            }
        }
      );
      let baseline2 = await this.tidyfy(ret2.data)
      this.graphData.push({label: "baseline2", values: baseline2, color: 'rgb(0, 255, 0)'})
      
      let ret = await this.$http.post(
          'https://api.epitopes.world/get-data',
          {
            "payload": {
                "query":{
                    "Peptides.Score": {
                        "type": "float",
                        "range": [0.8, ":"]
                    }
                },
                "limit": 2000,
                "sort": {
                  "direction": "RAND"
                },
                "additional_fields":["Peptides.Sequence"]
            }
        }
      );
      let scores = await this.tidyfy(ret.data)
      this.graphData.push({label: "scores", values: scores, color: 'rgb(0, 0, 255)'})
    },
    checkForm: function () {
        this.formFields.forEach((field) => {
          console.log(field);
        });
      }
    }
    // updateData: function() {
    //   this.graphData = [
    //       {label: 'control', values: [1,2,3,4,5], color: 'rgb(0, 0, 255)'},
    //       {label: 'experimental', values: [4,5,6,8], color: 'rgb(255, 0, 0)'}
    //     ]
    // }
  }
</script>
