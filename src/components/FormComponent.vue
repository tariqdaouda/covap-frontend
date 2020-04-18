<template>
    <div>
          <!--Combobox-->
          <multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one" label="name" track-by="name"></multiselect>

          <!--range uikit doesn't have advance range form input-->
          <div class="uk-margin">
              <label
                  class="uk-form-label"
                  for="fieldable_form_discount_type_percentage_percentage_amount">
                      Percentage Amount
              </label>
              <div class="uk-form-controls">
                  <div class="uk-inline-container"> <!-- Add -->
                      <span class="uk-form-icon uk-form-icon-flip" >36</span> <!-- Add -->
                      <input type="range"
                             id="fieldable_form_discount_type_percentage_percentage_amount"
                             name="fieldable_form[discount_type][percentage][percentage_amount]"
                             min="0" max="100" step="1"
                             class="uk-range uk-input"
                             value="36"
                             oninput="this.parentNode.querySelector('.uk-form-icon').innerText = this.value">
                  </div>
              </div>
          </div>
        </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'

  export default {
    name: 'FormComponent',
    //props: ['inputFields'],
    components: {
      Multiselect
    },
    data() {
      return {
        // multiselect combobox examples variables
        value: '',
        options: [
          { name: 'Vue.js', language: 'JavaScript' },
          { name: 'Rails', language: 'Ruby' },
          { name: 'Sinatra', language: 'Ruby' },
          { name: 'Laravel', language: 'PHP' },
          { name: 'Phoenix', language: 'Elixir' }
        ],
        // baked data returned by getFields request
        inputFields: this.$store.state.formFields
        /*{
          "VirusSequences": {
            "Index": {"type": "other"},
            "Accession": {
              "type": "enumeration",
              "unique": 39,
              "values": ["NC_001722", "NC_001802", "NC_004718"]
            },
            "Sequence": {
              "type": "other"
            }, 
            "Version": {
              "type": "enumeration",
              "unique": 3,
              "values": ["1", "2", "3"]
            },
            "Sub_accession": {
              "type": "enumeration",
              "unique": 39,
              "values": ["complement(NC_007605.1:116712..116945)", "complement(NC_009334.1:129454..131574)", "join(NC_001802.1:5105..5319 |NC_001802.1:5321..5396)"]
            },
            "Protein_accession": {
              "type": "enumeration",
              "unique": 39,
              "values": ["NP_042692", "NP_056839", "NP_057852"]
            },
            "Release_Date": {
              "type": "enumeration",
              "unique": 14,
              "values": ["1993-08-02T00:00:00Z", "1998-01-22T00:00:00Z", "2003-04-14T00:00:00Z"]
            },
            "Genus": {
              "type": "enumeration",
              "unique": 6,
              "values": ["Alphainfluenzavirus", "Betacoronavirus", "Cytomegalovirus"]
            },
            "Family": {
              "type": "enumeration",
              "unique": 5,
              "values": ["Coronaviridae", "Flaviviridae", "Herpesviridae"]
            },
            "Length": {
              "type": "float",
              "range": [838, 235646]
            },
            "Nuc_Completeness": {
              "type": "enumeration",
              "unique": 1,
              "values": ["RefSeq"]
            },
            "Genotype": {
              "type": "enumeration",
              "unique": 4,
              "values": ["H1N1", "H2N2", "H3N2"]
            },
            "Genome_Region":{
              "type": "other"
            },
            "Segment": {
              "type": "other"
            },
            "Authors": {
              "type": "other"
            }, 
            "Publications": {
              "type": "other"
            },
            "Geo_Location": {
              "type": "enumeration",
              "unique": 5,
              "values": ["Canada", "China", "Korea"]
            },
            "Host": {
              "type": "enumeration",
              "unique": 1,
              "values": ["Homo sapiens"]
            },
            "Isolation_Source": {
              "type": "enumeration",
              "unique": 3,
              "values": ["blood", "blood, liver, abdominal cavity", "urine"]
            },
            "Collection_Date": {
              "type": "enumeration",
              "unique": 9,
              "values": ["1968", "1994", "1999"]
            },
            "BioSample": {
              "type": "enumeration",
              "unique": 0,
              "values": []
            },
            "GenBank_Title": {
              "type": "enumeration",
              "unique": 39,
              "values": ["Betacoronavirus England 1, complete genome", "Hepacivirus B polypeptide gene, complete cds", "Hepatitis C virus genotype 7, complete genome"]
            }
          },
          "Peptides": {
            "Index": {
              "type": "float",
              "range": [0, 9999]
            },
            "Method": {
              "type": "enumeration",
              "unique": 1,
              "values": ["SGD"]
            },
            "Context_size": {
              "type": "enumeration",
              "unique": 1,
              "values": [162]
            },
            "Model_run": {
              "type": "enumeration",
              "unique": 1,
              "values": [1]
            },
            "Accession": {
              "type": "enumeration",
              "unique": 1,
              "values": ["NC_045512"]
            },
            "Sub_accession": {
              "type": "enumeration",
              "unique": 1,
              "values": ["NC_045512"]
            },
            "Position": {
              "type": "float",
              "range": [-28163, 29183]
            },
            "Length": {
              "type": "float",
              "range": [8, 9]
            },
            "Sequence": {
              "type": "other"
            },
            "Score": {
              "type": "float",
              "range": [0.06240649148821799, 0.947116315364838]
            }
          }
        }//*/
      }
    },
    methods: {
      // list of needed functions:
      // - retrieveSelectedInputsValue() => On form's submit, emit selectedInputsValue to parent component
      /*
      retrieveSelectedInputsValue: function() {
        this.$emit('retrieveSelectedInputsValue', selectedInputsValue);
      }
      */
      // multiselect combobox examples variables
      nameWithLang ({ name, language }) {
        return `${name} — [${language}]`
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>