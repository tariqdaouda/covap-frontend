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

  export default {
    name: 'DataComponent',
    components: {
      Plotly,
      TextInput
    },
    data() {
      return {
        layout: {},
        data: {},
        formFields: [],
      }
    },
    created() {
      this.fetchFields();
      this.fetchData();
    },
    methods: {
      fetchFields: function () {
        this.formFields = [
          {
            fieldType: 'input',
            name: 'field1',
            label: "Field 1",
            placeholder: "Field 1",
          },
          {
            fieldType: 'input',
            name: 'field2',
            label: "Field 2",
            placeholder: "Field 2",
          },
        ]
      },
      fetchData: function () {
        this.data = [
          {
            x: [1,2,3,4],
            y: [10,15,13,17],
            type:"scatter"
          },
          {
            x: [1,2,3,4],
            y: [16,5,11,9],
            type:"scatter"
          },
        ];
        this.layout = {
          title: "Scatter Plot",
          plot_bgcolor: "#d3d3d3",
          paper_bgcolor: "#d3d3d3",
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
