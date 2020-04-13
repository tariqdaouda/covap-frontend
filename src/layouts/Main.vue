<template>
  <div id="app">
    <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky">
      <nav class="uk-navbar-container" uk-navbar>
        <a href="#" class="uk-navbar-item uk-logo uk-sticky">
          epitopes.world
        </a>
        <div class="uk-navbar-center">
          <ul class="uk-navbar-nav">
            <li class="uk-parent"><a href="/#/">Home</a></li>
            <li class="uk-parent"><a href="/#/data">Explore</a></li>
            <li class="uk-parent"><a href="/#/research">Research</a></li>
            <li class="uk-parent"><a href="/#/people">People</a></li>
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
}
</script>

<style lang="css">
  @import "../assets/css/main.css";
</style>

<style lang="less">
  @import "../../node_modules/uikit/src/less/uikit.less";
</style>
