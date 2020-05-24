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
      <button v-on:click="fetchData" v-bind:class="{ 'disabled': !fetching, 'uk-button uk-button-primary': !fetching, 'uk-button uk-button-secondary': fetching}">
        <span uk-icon="icon: search; ratio: 1" v-if="!fetching"></span>
        <div uk-spinner v-if="fetching"></div>
      </button>
      <div class="uk-margin">
        <button v-on:click="downloadCSV()" class="uk-button uk-button-primary">
            Export
        </button>
      </div>

      <hr>

      <!--TODO make translation for this part of the form-->
      <h3 class="we-page-subtitle">Graph</h3>

      <!--graph axis-->
      <div class="uk-margin">
        <!--graph X axis field combobox-->
        <!--<label class="we-page-subtitle we-data-collection-title">X Axis</label>-->
        <multiselect v-model="selectedXAxis" :options="graphSanitizedColumns"></multiselect>
        
        <!--graph Y axis field combobox
        <label class="we-page-subtitle we-data-collection-title">Y Axis</label>
        <multiselect v-model="selectedYAxis" :options="graphSanitizedColumns"></multiselect>
        -->
      </div>

      <!--Layer option-->
      <div>

        <!--Layer label name-->
        <input class="uk-input uk-text-center uk-margin" type="text" :placeholder="this.$t('data.labelName')" v-model="labelName">

        <!--Layer color-->
        <div class="we-data-color-shower">
          <label v-bind:style="{ color: getPlotColor()}" >{{$t("data.color")}}</label>  
        </div>
        <div class="uk-margin">
          <input class="uk-range" type="range" value="100" min="0" max="360" step="1" v-model="plotHue">
        </div>

        <div class="uk-button-group">
          <button v-on:click="addLayer" v-bind:class="{ 'disabled': !addingLayer, 'uk-button uk-button-primary': !addingLayer, 'uk-button uk-button-secondary': addingLayer}">
            <span uk-icon="icon: plus-circle; ratio: 2" v-if="!addingLayer"></span>
            <div uk-spinner v-if="addingLayer"></div>
          </button>
          <button v-on:click="resetGraph" class="uk-button uk-button-primary">
            <span uk-icon="icon: refresh; ratio: 2"></span>
          </button>
        </div>
      </div>

      <!--Todo add a list of created layer with a delete button so they could be removed individually-->

    </div>

    <div class="we-explore-main">
        <GraphComponent :datas=graphData :xLabel="selectedXAxis" :yLabel="$t('data.distributionYLabel')"></GraphComponent>

        <table class="uk-table uk-table-striped we-data-table uk-text-center uk-align-center">
          <thead>
              <tr>
                  <th>{{$t('data.distributionXLabel')}}</th>
                  <th>{{$t('data.sequence')}}</th>
                  <th>Accession</th>
                  <th>Sub_accession</th>
                  <th>{{$t('data.name')}}</th>
                  <th>{{$t('data.length')}}</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(entry, index) in tableData" :key="index">
                  <td>{{entry["Peptides.Score"]}}</td>
                  <td>{{entry["Peptides.Sequence"]}}</td>
                  <td>{{entry["Peptides.Accession"]}}</td>
                  <td>{{entry["Peptides.Sub_accession"]}}</td>
                  <td>{{entry["Peptides.Name"]}}</td>
                  <td>{{entry["Peptides.Length"]}}</td>
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
  import Multiselect from 'vue-multiselect'
  import MultiSelectInput from "./MultiSelectInput";
  import { API_URL } from '../configuration.js'

  Vue.use(VueAxios, axios);

  export default {
    name: 'DataComponent',
    components: {
      TextInput,
      SliderInput,
      GraphComponent,
      Multiselect,
      MultiSelectInput,
      axios,
      VueAxios,
    },
    data() {
      return {
        fetching: false,
        addingLayer: false,
        backendFields: {
          Peptides: {
            Score: {
              type: "float",
              range: [0, 1]
            },
            // Accession: {
            //   type: "enumeration",
            //   cases: ["NC_045512", "NC_004718", "GRCh37.75[Decoy]", "GRCh37.75[Hits]"]
            // },
            Name: {
              type: "enumeration",
              cases: ["SARS-CoV-2", "SARS-CoV-1", "Human[Decoy]", "Human[Hits]"]
            },
            Length: {
              type: "enumeration",
              cases: [8, 9, 10, 11]
            }
          },
        },
        plotHue: 15,
        tableData: [],
        columns: [
          this.$t('data.distributionXLabel'),
          this.$t('data.sequence'),
          'Accession',
          'Sub_accession',
          this.$t('data.name'),
          this.$t('data.length')
        ],
        labelName: '',
        selectedXAxis: null,
        //selectedYAxis: null
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
              "limit": 5000,
              "sort": {
                "direction": "RAND"
              },
              "additional_fields":["Peptides.Sequence", "Peptides.Accession", "Peptides.Sub_accession", "Peptides.Name", "Peptides.Length"]
            }
          }
        ).then(ret1 => {

          // tmp sort until its done on backend side
          let tmp = ret1.data.payload
          tmp.sort(function(a, b) {
            return b['Peptides.Score'] - a['Peptides.Score']
          })
          this.tableData = tmp
          this.fetching = false

        }).catch(error => console.log(error));
      },
      popLast(){
        this.graphData.pop();
      },
      getPlotColor() {
        return 'hsl(' + this.plotHue + ', 100%, 50%)'
      },
      addLayer () {
        let values = this.tableData.map( elt => { return elt[this.selectedXAxis]})
        this.graphData.push({label: this.labelName, values: values, color: this.getPlotColor()});
      },
      resetGraph () {
        var r = confirm("You are about to delete all graph layers! Do you wanna continue?");
        if (r == true) {
         this.graphData = [];
        }
      },
      JsonToCSV: function (){
        // create columns row
        var csvStr = this.columns.join(",") + "\n";
        var csvFields = ["Peptides.Score", "Peptides.Sequence", "Peptides.Accession", "Peptides.Sub_accession", "Peptides.Name", "Peptides.Length"];

        // iterate over each rows and populate csv
        this.tableData.forEach(row => {
            csvFields.forEach(field => {
              csvStr += row[field] + ','
            })
            csvStr += "\n";
          })
        return csvStr;
      },
      downloadCSV: function () {
        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(this.JsonToCSV());
        hiddenElement.target = '_blank';
        hiddenElement.download = 'epitopes.csv';
        hiddenElement.click();
      }
    },
    computed: {
      formFields() {
        return this.$store.state.formFields;
      },
      graphData:
      {
          get()
          {
              return this.$store.state.graphData;
          },
          set(value)
          {
              this.$store.state.graphData = value;
          }
      },
      isFormLoaded() {
        return this.$store.state.isFormLoaded;
      },
      graphSanitizedColumns() {

        if (this.tableData.length == 0) {
          return []
        }

        let dataColumns = Object.keys(this.tableData[0])
        let outColumns = []
        dataColumns.forEach( item => {
          try {
            // check that column is a number int/float
            if (Number(this.tableData[0][item]) === this.tableData[0][item]) {
              outColumns.push(item);
            }
          } catch (err) {
          //do nothing
          }
        })
        return outColumns
      }
    }
  }
</script>
