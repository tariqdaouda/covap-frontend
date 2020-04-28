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
            { keywords: "COVID-19, SARS-CoV-2, COVID, coronavirus, epitopes, targets prediction, CAMAP, IRIC, immunotherapy, viral proteins, cancer, pandemic, virus, vaccines, machine learning, scientific, AI, algorithm"},
            { "twitter:image": "../images/social_en.jpg" },
            { "og:image": "../images/social_en.jpg" }
            // { vmid: 'description', name: 'description', content: 'reptilian' }
          ]
        }
    }
  }
</script>
