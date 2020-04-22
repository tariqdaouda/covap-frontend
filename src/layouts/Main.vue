<template>
  <div id="app">
    <div id="offcanvas-reveal" uk-offcanvas="mode: reveal; overlay: true">
        <div class="uk-offcanvas-bar">
            <button class="uk-offcanvas-close" type="button" uk-close></button>
            <ul class="uk-list uk-list-divider">
              <li v-for="(route, index) in routes" :key="index">
                <a :href="route.route">{{ $t(route.name) }}</a>
              </li>
            </ul>
            <NavLocaleSwitch></NavLocaleSwitch>
        </div>
    </div>
    <a href="#" class="uk-navbar-item uk-logo uk-hidden@m">
      epitopes.world
    </a>
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
      
      <nav class="uk-navbar-container uk-visible@m" uk-navbar>
        <a href="#" class="uk-navbar-item uk-logo">
          epitopes.world
        </a>
        <div class="uk-navbar-center">
          <ul class="uk-navbar-nav ">
            <li v-for="(route, index) in routes" :key="index" class="uk-parent">
              <a :href="route.route">{{ $t(route.name) }}</a>
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
import { IN_CONSTRUCTION } from '../configuration.js'
import NavLocaleSwitch from '../components/NavLocaleSwitch';
import CookieLaw from 'vue-cookie-law'

export default {
  name: 'MainLayout',
  components:{
    NavLocaleSwitch,
    CookieLaw
  },
  data() {
      let routes = null;
      if (!IN_CONSTRUCTION) {
        routes = [
          {name: "menu.home", route: "/#/"},
          {name: "menu.explore", route: "/#/data"},
          {name: "menu.research", route: "/#/research"},
          {name: "menu.about", route: "/#/about"},
          {name: "menu.contact", route: "/#/contact"}
        ]
      }else{
        routes = [
          {name: "menu.home", route: "/#/"},
          {name: "menu.research", route: "/#/research"},
          {name: "menu.about", route: "/#/about"},
          {name: "menu.contact", route: "/#/contact"}
        ]
      }
    return {
      routes: routes
    }
  }
}
</script>

<style lang="css">
  @import "../assets/css/main.css";
</style>

<style lang="less">
  @import "../../node_modules/uikit/src/less/uikit.less";
</style>
