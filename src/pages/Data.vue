<template>
  <DataComponent></DataComponent>
</template>

<script>
  import UIkit from 'uikit';
  
  import DataComponent from '../components/DataComponent'
  export default {
    name: 'Data',
    metaInfo() {
        return{
          titleTemplate: '%s - ' + this.$t("data.titleDescription")
        }
    },
    components: {
      DataComponent,
    },
    created(){
      let html = "<div class='uk-text-center'><h2>Explore CAMAP results for SARS-CoV-2</h2><p>Unless stated otherwise Score refers to CAMAP score</p><p>This interface loads at most 5000 examples, distributions might change slighlty between queries</p></div>"
      UIkit.modal.alert(html);
    }
  }
</script>
