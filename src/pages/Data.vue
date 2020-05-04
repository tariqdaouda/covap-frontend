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
      let html = "<div class='uk-text-center'><h2>"+this.$t('data.popup1Title')+"</h2><p>"+this.$t('data.popup1P1')+"</p><p>"+this.$t('data.popup1P2')+"</p></div>"
      UIkit.modal.alert(html);
    }
  }
</script>
