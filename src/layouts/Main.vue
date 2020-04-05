<template>
  <div id="app">
    <ul class="my-navbar">
      <li class="my-navbar-item">
        <router-link to="/">Home</router-link>
      </li>
      <li class="my-navbar-item">
        <router-link to="/data">Explore</router-link>
      </li>
      <li class="my-navbar-item">
        <router-link to="/about">About</router-link>
      </li>
    </ul>

  <div class="my-main-container">
    <router-view></router-view>
    <slot></slot>
  </div>
  </div>
</template>

<script>
//import DataComponent from './components/DataComponent.vue'

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
