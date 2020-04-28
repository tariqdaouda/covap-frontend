<template>
  <MainLayout>
  </MainLayout>
</template>

<script>
  import MainLayout from './layouts/Main.vue'
  export default {
    components: {
      MainLayout
    },
    name: 'App',
    metaInfo() {
        return{
          title: this.$t("website.title"),
          titleTemplate: '%s - ' + this.$t("website.titleDescription"),
          meta: [
            { charset: 'utf-8' },
            { description: 'We have developed an AI algorithm to help identify useful targets for a vaccine against COVID-19. Our goal is to accelerate the development of a vaccine.' },
            // { vmid: 'description', name: 'description', content: 'reptilian' }
          ]
        }
    }
  }
</script>
