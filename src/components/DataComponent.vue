<template>
  <div>
    <div id="modal-email-ask" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <button class="uk-modal-close-default" type="button" uk-close></button>
          <div class="uk-text-center"> 
            <h3>{{$t('data.emailAsk')}}</h3>
              <input type="email" id="emailAddress" name="emailAddress" v-model="email">
              <button @click="sendEmail()">OK</button>
            </div>
        </div>
    </div>
    
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
      <input class="uk-input uk-text-center uk-margin" type="text" placeholder="..." v-model="labelName">
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
      <div class="uk-margin">
        <a v-if="!validated" href="#modal-email-ask" class="uk-button uk-button-primary" uk-toggle>{{$t('data.download')}}</a>
        <button v-if="validated" v-on:click="downloadCSV()" class="uk-button uk-button-primary">{{$t('data.download')}}</button>
      </div>

    </div>

    <div class="we-explore-main">
        <GraphComponent :datas=graphData :xLabel="$t('data.distributionXLabel')" :yLabel="$t('data.distributionYLabel')"></GraphComponent>

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
              <tr v-for="(entry, index) in lastData.slice(0, 5)" :key="index">
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
  import MultiSelectInput from "./MultiSelectInput";
  import { API_URL } from '../configuration.js'
  import UIkit from 'uikit';

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
        email: null,
        validated: false,
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
              cases: ["SARS-CoV-2", "SARS-CoV-1", "Human[Decoy]", "Human[MAPs]"]
            },
            Length: {
              type: "enumeration",
              cases: [8, 9, 10, 11]
            }
          },
        },
        plotHue: 15,
        lastData: [],
        columns: [
          this.$t('data.distributionXLabel'),
          this.$t('data.sequence'),
          'Accession',
          'Sub_accession',
          this.$t('data.name'),
          this.$t('data.length')
        ]
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
              "limit": 5000,
              "sort": {
                "direction": "RAND"
              },
              "additional_fields":["Peptides.Sequence", "Peptides.Accession", "Peptides.Sub_accession", "Peptides.Name", "Peptides.Length"]
            }
          }
        ).then(ret1 => {
          let values = this.tidyfy(ret1.data);
          this.graphData.push({label: this.labelName, values: values, color: this.getPlotColor()});

          // tmp sort until its done on backend side
          let tmp = ret1.data.payload
          tmp.sort(function(a, b) {
            return b['Peptides.Score'] - a['Peptides.Score']
          })
          this.lastData = tmp
          this.fetching = false
        }).catch(error => console.log(error));
      },
      popLast(){
        this.graphData.pop();
      },
      getPlotColor(){
        return 'hsl(' + this.plotHue + ', 100%, 50%)'
      },
      JsonToCSV: function (){
        // create columns row
        var csvStr = this.columns.join(",") + "\n";
        var csvFields = ["Peptides.Score", "Peptides.Sequence", "Peptides.Accession", "Peptides.Sub_accession", "Peptides.Name", "Peptides.Length"];

        // iterate over each rows and populate csv
        this.lastData.forEach(row => {
            csvFields.forEach(field => {
              csvStr += row[field] + ','
            })
            csvStr += "\n";
          })
        return csvStr;
      },
      // emailPrompt(){
      //   const html = '<label for="email">Enter your email:</label> <input type="email" id="emailAddress" name="emailAddress"><button onclick="sendEmail()">submit</button>'
      //   UIkit.modal.dialog(html).then(function() {
      //       console.log('Confirmed.')
      //   }, function () {
      //       console.log('Rejected.')
      //   });
      // },

      sendEmail(){
        this.$http.post(
          API_URL + "/contacts",
          {
            "payload": {
              "email": this.email
            }
          }
        ).then(rval => {
          console.log("Thank you.", rval)
          console.log(rval.data.error)
          if (!rval.data.error) {
            this.validated=true
            UIkit.modal("#modal-email-ask").hide()
          }
        }).catch(error => console.log(error));
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
      labelName() {
        return this.$t("data.labelName");
      },
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
