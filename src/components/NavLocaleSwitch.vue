<template>
    <select class="we-locale-switcher" v-model="language" @change="changeLocale($event)">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang" class="we-locale-switcher-item">{{ lang }}</option>
    </select>
</template>

<script>
    
    export default {
      name: 'NavLocaleSwitch',
      data () {
        return { 
          langs: this.$store.getters.languages, 
          language: this.$store.getters.language 
          }
      },
      methods: {
        getLang() {
          return this.$store.getters.language;
        },
        changeLocale(event) {
          const newLanguage = event.target.value;
          const currentPath = this.$router.currentRoute.path;
          const languageDetector = new RegExp(`^/(${this.$store.getters.languages.join("|")})?/?`);
          let newPath;
          newPath = currentPath.replace(languageDetector, `/${newLanguage}/`)

          this.$router.push({ path: newPath });
          this.$store.dispatch('setLanguage', newLanguage);
        }
      }
    }
</script>