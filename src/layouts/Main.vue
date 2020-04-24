<template>
  <div id="app">
    <div id="offcanvas-reveal" uk-offcanvas="mode: reveal; overlay: true">
        <div class="uk-offcanvas-bar">
            <button class="uk-offcanvas-close" type="button" uk-close></button>
            <ul class="uk-list uk-list-divider">
              <li v-for="(route, index) in routes" :key="index">    
                <router-link :to="'/' + $i18n.locale + '/' + route.link" v-if="route.link !== null" >{{ $t(route.name) }}</router-link>
              </li>
            </ul>
            <NavLocaleSwitch></NavLocaleSwitch>
        </div>
    </div>
    <router-link :to="'/' + $i18n.locale + '/'" class="uk-navbar-item uk-logo uk-hidden@m">
      epitopes.world
    </router-link>
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
      
      <nav class="uk-navbar-container uk-visible@m" uk-navbar>
        <router-link :to="'/' + $i18n.locale + '/'" class="uk-navbar-item uk-logo">
          epitopes.world
        </router-link>
        <div class="uk-navbar-center">
          <ul class="uk-navbar-nav ">
            <li v-for="(route, index) in routes" :key="index" class="uk-parent">
              <router-link :to="'/' + $i18n.locale + '/' + route.link" v-if="route.link !== null" >{{ $t(route.name) }}</router-link>
            </li>
          </ul>
        </div>
        <div class="uk-navbar-right">
          <NavLocaleSwitch></NavLocaleSwitch>
        </div>
      </nav>

      <nav class="uk-navbar-container uk-hidden@m" uk-navbar>
        <div class="uk-navbar-center">
          <ul class="uk-iconnav ">
              <li>
                <a class="uk-button" uk-icon="icon: table; ratio:2" uk-toggle="target: #offcanvas-reveal"></a>
              </li>
          </ul>
        </div>
      </nav>
    
    </div>
    <div class="we-main-container">
      <router-view></router-view>
      <slot></slot>
    </div>
    <cookie-law :button-text="$t('accept')">
      <div slot="message">
        {{$t("cookies")}}
      </div>
    </cookie-law>
  </div>
</template>

<script>
import NavLocaleSwitch from '../components/NavLocaleSwitch';
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'MainLayout',
  components:{
    NavLocaleSwitch,
    CookieLaw
  },
  computed: {
    language: {
      get() {
        return this.$store.getters.language
      },
    },
    routes() {
      return this.$router.options.routes;
    }
  },
  mounted(){
    document.title="Epitopes.world"
  }
}
</script>

<style lang="css">
  @import "../assets/css/main.css";
</style>

<style lang="less">
  @import "../../node_modules/uikit/src/less/uikit.less";
</style>
