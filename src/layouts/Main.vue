<template>
  <div id="app">
    <div id="offcanvas-reveal" uk-offcanvas="mode: reveal; overlay: true">
        <div class="uk-offcanvas-bar">
            <button class="uk-offcanvas-close" type="button" uk-close></button>
            <ul class="uk-list uk-list-divider">
              <li v-for="(route, index) in routes" :key="index">
                <a :href="route.route">{{route.name}}</a>
              </li>
            </ul>
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
              <a :href="route.route">{{route.name}}</a>
            </li>
          </ul>
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
  </div>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      routes: [
        {name: "Home", route: "/#/"},
        {name: "Explore", route: "/#/data"},
        {name: "Research", route: "/#/research"},
        {name: "People", route: "/#/people"}
      ]
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
