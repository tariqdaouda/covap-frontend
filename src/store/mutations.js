//import i18n from '../i18n'
import Vue from 'vue'

export default {
  setLanguage(state, language) {
  //  i18n.locale = language
    Vue.prototype.$vuetify.lang.current = language
    localStorage.language = language
  },
  setformFields(state, formFields) {
    state.formFields = formFields
  },
}
