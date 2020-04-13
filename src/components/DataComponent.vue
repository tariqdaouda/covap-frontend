<template>
  <div class="content-padder content-background">
    <div class="uk-section-small uk-section-default header">
      <div class="uk-container uk-container-large">
        <h1><span class="ion-speedometer"></span> Data Exploration</h1>
        <ul class="uk-breadcrumb">
          <li><a href="/#/">Home</a></li>
          <li><span href="">Data Dashboard</span></li>
        </ul>
      </div>
    </div>
    <div class="uk-section-small">
      <div class="uk-container uk-container-large">
        <div uk-grid class="uk-child-width-1-4@s uk-child-width-1-4@l">
          <div>
            <div class="uk-card uk-card-default uk-card-body">
              <div v-for="(fields, title) in formFields" :key="title">
                <label>{{ title }}</label>
                <div class="uk-margin">
                  <component v-for="(field, index) in fields"
                             :key="index"
                             :is="field.type"
                             v-bind="field">
                  </component>
                </div>
              </div>
              <button v-on:click="fetchData" class="uk-button uk-button-primary">Query</button>
            </div>
          </div>
          <div>
            <div class="uk-card">
              <GraphComponent :datas=graphData></GraphComponent>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TextInput from './TextInput';
  import GraphComponent from './GraphComponent';
  import FormComponent from './FormComponent';
  import schemas from '../schemas/schemas'
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import SliderInput from "./SliderInput";
  import MultiSelectInput from "./MultiSelectInput";

  Vue.use(VueAxios, axios);

  const ALLOWED_FIELDS = {
    'VirusSequences': [],//['Accession', 'Sequence'],
    'Peptides': ['Score']
  };

  export default {
    name: 'DataComponent',
    components: {
      TextInput,
      SliderInput,
      GraphComponent,
      FormComponent,
      MultiSelectInput,
      axios,
      VueAxios
    },
    data() {
      return {
        layout: {},
        // data: [],
        formPayload: {},
        formFields: {},
        graphData: []
      }
    },
    created() {
      this.fetchFields();
      //this.fetchData();
    },
    methods: {
      pushAllowed(field) {
        if (ALLOWED_FIELDS[field.title].includes(field.name)) {
          if (!(field.title in this.formFields)) {
            this.formFields[field.title] = [];
          }
          this.formFields[field.title].push(field);
        }
      },
      fetchFields () {
        this.$http.get(
          'https://api.epitopes.world/get-fields/limit/50'
        ).then(response => {
          console.log(response.data);
          const data = response.data;
            for (let [formTitle, formField] of Object.entries(data.payload)) {
              for (let [fieldName, field] of Object.entries(formField)) {
                const schema = schemas[field['type']];
                const loaded = schema(fieldName, field, formTitle);
                this.pushAllowed(loaded);
              }
            }
            console.log(this.formFields);
            let a = this.formFields;
            this.formFields=[];
            this.formFields=a;
          }
        ).catch(
          error => console.log(error)
        )
      },
      tidyfy(data){
        let tidy = []
        for (let line of data.payload){
          tidy.push(line["Peptides.Score"])
        }
        return tidy
      },
      buildQuery() {
        var query = {};
        for (let [title, fields] of Object.entries(this.formFields)) {
          for (let field of fields) {
            query[`${title}.${field.name}`] = {
              type: field.type,
              range: field.range
            };
          }
        }
        /*
          "query": {
            "Peptides.Score": {
              "type": "float",
              "range": [0, ":"]
            }
          },
         */
        return query;
      },
      fetchData () {
        const query = this.buildQuery();
        this.$http.post(
          'https://api.epitopes.world/get-data',
          // 'http://localhost:6543/api/get-data',
          {
            "payload": {
              "query": query,
              "limit": 2000,
              "sort": {
                "direction": "RAND"
              },
              "additional_fields":["Peptides.Sequence"]
            }
          }
        ).then(ret1 => {
          let baseline1 = this.tidyfy(ret1.data);
          this.graphData.push({label: "baseline", values: baseline1, color: 'rgb(255, 0, 0)'})
        }).catch(error => console.log(error));
    },
    },
    // updateData: function() {
    //   this.graphData = [
    //       {label: 'control', values: [1,2,3,4,5], color: 'rgb(0, 0, 255)'},
    //       {label: 'experimental', values: [4,5,6,8], color: 'rgb(255, 0, 0)'}
    //     ]
    // }
  }
</script>
