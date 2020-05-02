<template>
  <DataComponent></DataComponent>
</template>

<script>
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
  }
</script>
