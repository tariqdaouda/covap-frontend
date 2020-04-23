import i18n from '../i18n'

const ALLOWED_FIELDS = {
  'Peptides': ['Score', 'Length', 'Accession']
};

export default {
  setFormField(state, field) {
    if (field.collection && ALLOWED_FIELDS[field.collection].includes(field.name)) {
      if (!(field.collection in state.formFields)) {
        state.formFields[field.collection] = {};
      }
      const oldField = state.formFields[field.collection][field.name];
      state.formFields[field.collection][field.name] = {
        ...oldField,
        ...field
      }
    }
  },
  toggleIsFormLoaded(state) {
     state.isFormLoaded = true;
  },
  setLanguage(state, language) {
    i18n.locale = language;
    localStorage.language = language;
  },
}


