<template>
  <li>
     <label>{{label}}</label>
     <multiselect v-model="values"
                  :options="options"
                  :close-on-select="false"
                  :clear-on-select="false"
                  :multiple="true"
                  placeholder="Select one"
                  label="name"
                  track-by="name">
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
      }
    },
    props: ['name', 'options'],
    watch: {
      values: function (oldValues, newValues) {
        this.$store.commit('setFormField', {
          title: this.title,
          name: this.name,
          values: newValues
        })
      }
    }
  }
</script>
