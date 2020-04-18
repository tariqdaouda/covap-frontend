//import i18n from '../i18n'


export default {
  switchLanguage({ commit }) {
    commit('setLanguage', 'en')//i18n.locale === 'fr' ? 'en' : 'fr')
  },
  setLanguage({ commit, getters }, language) {
    if (getters.languages.includes(language)) {
      commit('setLanguage', language)
    }
  },
  toggleIsFormLoaded({ commit }) {
    commit('toggleIsFormLoaded', true)
  }
}
