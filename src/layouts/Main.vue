<template>
  <div id="app">
    <div uk-sticky class="uk-navbar-container tm-navbar-container uk-active">
      <div class="uk-container uk-container-expand">
        <nav uk-navbar>
          <div class="uk-navbar-left">
            <a href="#" class="uk-navbar-item uk-logo">
              epitopes.world
            </a>
          </div>
        </nav>
      </div>
    </div>

    <div id="sidebar" class="tm-sidebar-left uk-background-default">
      <ul class="uk-nav uk-nav-default">
        <li><a href="/#/">Home</a></li>
        <li><a href="/#/data">Explore</a></li>
        <li><a href="/#/about">About</a></li>
      </ul>
    </div>
    <router-view></router-view>
    <div class="uk-grid">
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
