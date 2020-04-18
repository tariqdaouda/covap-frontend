//import i18n from '../i18n'
import Vue from 'vue'


const ALLOWED_FIELDS = {
  'VirusSequences': ['Accession'],//['Accession', 'Sequence'],
  'Peptides': ['Score', 'Length']
};

export default {
  setLanguage(state, language) {
  //  i18n.locale = language
    Vue.prototype.$vuetify.lang.current = language
    localStorage.language = language
  },
  setFormField(state, field) {
    if (field.title && ALLOWED_FIELDS[field.title].includes(field.name)) {
      if (!(field.title in state.formFields)) {
        state.formFields[field.title] = {};
      }
      const oldField = state.formFields[field.title][field.name];
      state.formFields[field.title][field.name] = {
        ...oldField,
        ...field
      }
    }
  },
  toggleIsFormLoaded(state) {
     state.isFormLoaded = true;
  }
}


