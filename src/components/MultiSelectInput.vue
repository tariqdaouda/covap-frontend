<template>
  <li class="uk-list">
     <label>{{name}}</label>
     <multiselect v-model="values"
                  :options="options"
                  :close-on-select="true"
                  :clear-on-select="false"
                  :multiple="true"
                  placeholder="Select one"
                  label="name"
                  track-by="name"
                  @input="updateRawValues()"
                  >
       <label>
         {{values}}
       </label>
     </multiselect>
  </li>
</template>

<script>
  import Multiselect from 'vue-multiselect'

  export default {
    components: {
      Multiselect
    },
    data() {
      return {
        values: [],
        rawValues: [],
        fullName: this.collection + "." + this.name
      }
    },
    props: ['collection', 'name', 'options'],
    methods: {
      updateRawValues: function(){
        this.rawValues = []
        for (let val of this.values){
          this.rawValues.push(val.name)
        }
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>