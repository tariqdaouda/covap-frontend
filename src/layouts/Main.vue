<template>
  <div id="app">
    <nav class="uk-navbar-container" uk-navbar>
      <a href="#" class="uk-navbar-item uk-logo">
        epitopes.world
      </a>
      <div class="uk-navbar-center">
        <ul class="uk-navbar-nav">
          <li class="uk-parent"><a href="/#/">Home</a></li>
          <li class="uk-parent"><a href="/#/data">Explore</a></li>
          <li class="uk-parent"><a href="/#/about">About</a></li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
    <slot></slot>
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
