<template>
    <select class="we-locale-switcher" v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang" class="we-locale-switcher-item">{{ lang }}</option>
    </select>
</template>

<script>
    export default {
      name: 'NavLocaleSwitch',
      data () {
        return { langs: ['en', 'fr'] }
      }
    }
</script>