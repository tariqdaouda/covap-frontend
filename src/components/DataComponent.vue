<template>
  <div>
    <div class="we-explore-menu uk-text-center">
      <h3 class="we-page-subtitle">{{$t("data.title")}}</h3>
      <div v-if="isFormLoaded">
        <div v-for="(fields, collection) in formFields" :key="collection">
          <label class="we-page-subtitle we-data-collection-title">{{ collection }}</label>
          <div class="uk-margin">
            <component v-for="(field, index) in fields"
                       :key="index"
                       :is="field.type"
                       v-bind="field"
                       ref="fields"
                       >
            </component>
          </div>
        </div>
      </div>
      <input class="uk-input uk-text-center uk-margin" type="text" placeholder="..." v-model="plotName">
      <div class="we-data-color-shower">
        <label v-bind:style="{ color: getPlotColor()}" >{{$t("data.color")}}</label>  
      </div>
      <div class="uk-margin">
        <input class="uk-range" type="range" value="100" min="0" max="360" step="1" v-model="plotHue">
      </div>
      <div class="uk-button-group">
        <button v-if="!fetching" v-on:click="fetchData" class="uk-button uk-button-primary">
          <span uk-icon="icon: plus-circle; ratio: 2"></span>
        </button>
        <span v-if="fetching" class="uk-button uk-button-primary" uk-spinner></span>
        <button v-on:click="popLast" class="uk-button uk-button-primary">
          <span uk-icon="icon: minus-circle; ratio: 2"></span>
        </button>
      </div>
    </div>

    <div class="we-explore-main">
        <GraphComponent :datas=graphData :xLabel="$t('data.distributionXLabel')" :yLabel="$t('data.distributionYLabel')"></GraphComponent>
        <table class="uk-table uk-table-striped we-data-table uk-text-center uk-align-center">
          <thead>
              <tr>
                  <th>{{$t('data.distributionXLabel')}}</th>
                  <th>{{$t('data.sequence')}}</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(entry, index) in lastData.payload" :key="index">
                  <td>{{entry["Peptides.Score"]}}</td>
                  <td>{{entry["Peptides.Sequence"]}}</td>
              </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>

<script>
  import TextInput from './TextInput';
  import GraphComponent from './GraphComponent';
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
      MultiSelectInput,
      axios,
      VueAxios,
    },
    data() {
      return {
        fetching: false,
        backendFields: {
          Peptides: {
            Score: {
              type: "float",
              range: [0, 1]
            },
            Accession: {
              type: "enumeration",
              cases: ["NC_045512", "GRCh37.75[Decoy]", "GRCh37.75[Hits]"]
            },
            Length: {
              type: "enumeration",
              cases: [8, 9, 10, 11]
            }
          },
        },
        plotName: this.$t("data.plotName"),
        plotHue: 15,
        lastData: []
      }
    },
    created() {
      this.fetchFields();
    },
    methods: {
      fetchFields () {
        for (let [collection, fields] of Object.entries(this.backendFields)) {
          for (let [fieldName, field] of Object.entries(fields)) {
            const schema = schemas[field['type']];
            const loaded = schema(fieldName, field, collection);
            if (loaded)
              this.$store.commit('setFormField', loaded);
          }
        }
        this.$store.commit('toggleIsFormLoaded');
      },
      tidyfy(data){
        let tidy = []
        for (let line of data.payload){
          tidy.push(line["Peptides.Score"])
        }
        return tidy
      },
      buildQuery() {
        let query = {};
        for (let compo of this.$refs.fields){
          query[compo.fullName] = {
            values: compo.rawValues
          }
        } 
        return query;
      },
      fetchData () {
        const query = this.buildQuery();
        this.fetching = true;
        this.$http.post(
          API_URL +'/get-data',
          {
            "payload": {
              "query": query,
              "limit": 1000,
              "sort": {
                "direction": "RAND"
              },
              "additional_fields":["Peptides.Sequence"]
            }
          }
        ).then(ret1 => {
          let values = this.tidyfy(ret1.data);
          this.graphData.push({label: this.plotName, values: values, color: this.getPlotColor()});
          this.lastData = ret1.data
          this.fetching = false
        }).catch(error => console.log(error));
      },
      popLast(){
        this.graphData.pop();
      },
      getPlotColor(){
        return 'hsl(' + this.plotHue + ', 100%, 50%)'
      }
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
  }
</script>
