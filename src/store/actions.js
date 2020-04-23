
export default {
  setLanguage({ commit, getters }, language) {
    if (getters.languages.includes(language)) {
      commit('setLanguage', language)
    }
  },
  toggleIsFormLoaded({ commit }) {
    commit('toggleIsFormLoaded', true)
  }
}
