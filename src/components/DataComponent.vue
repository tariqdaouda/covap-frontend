<template>
  <div>
    <div class="we-explore-sidebar uk-text-center">
      <h3 class="we-page-subtitle">Data Exploration</h3>
      <div v-if="isFormLoaded">
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
      </div>
      <button v-on:click="fetchData" class="uk-button uk-button-primary">Query</button>
    </div>
    <div class="we-explore-main">
        <GraphComponent :datas=graphData></GraphComponent>
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
  import { API_URL } from '../configuration.js'

  Vue.use(VueAxios, axios);

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
        //formFields: this.$store.state.formFields,
        //graphData: this.$store.state.graphData
      }
    },
    created() {
      this.fetchFields();
    },
    methods: {
      fetchFields () {
        if (!this.isFormLoaded) {
          this.$http.get(
            API_URL +'/get-fields/limit/500'
          ).then(response => {
              console.log(response.data);
              const data = response.data;
              for (let [formTitle, formField] of Object.entries(data.payload)) {
                for (let [fieldName, field] of Object.entries(formField)) {
                  const schema = schemas[field['type']];
                  const loaded = schema(fieldName, field, formTitle);
                  console.log(loaded)
                  if (loaded)
                    this.$store.commit('setFormField', loaded);
                  console.log(this.formFields)
                }
              }
              this.$store.commit('toggleIsFormLoaded');
              console.log(this.$store)
            }
          ).catch(
            error => console.log(error)
          )
        }
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
          console.log(title)
          console.log(fields)
          for (let [name, field] of Object.entries(fields)) {
            if (field.type === 'SliderInput') {
              console.log("Range : " + field.range);
              query[`${title}.${name}`] = {
                type: field.type,
                range: field.range
              };
            }
            if (field.type === 'MultiSelectInput') {
              // ignore for now
            }
          }
        }
        return query;
      },
      fetchData () {
        const query = this.buildQuery();
        this.$http.post(
          API_URL +'/get-data',
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
          this.graphData.push({label: "baseline", values: baseline1, color: 'rgb(255, 0, 0)'});
          
        }).catch(error => console.log(error));
      },
    },
    computed: {
      formFields() {
        return this.$store.state.formFields;
      },
      graphData() {
        return this.$store.state.graphData;
      },
      isFormLoaded() {
        return this.$store.state.isFormLoaded;
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
