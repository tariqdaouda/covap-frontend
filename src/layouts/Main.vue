<template>
  <div id="app">
    <div id="mobile-menu" uk-offcanvas="mode: push; overlay: true">
        <div class="uk-offcanvas-bar">
          <ul class="we-off-navbar uk-text-right">
            <li class="we-navbar-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="we-navbar-item">
              <router-link to="/data">Explore</router-link>
            </li>
            <li class="we-navbar-item">
              <router-link to="/about">About</router-link>
            </li>
          </ul>
        </div>
    </div>
    
    <ul class="uk-hidden@s we-navbar uk-text-center">
      <li class="we-navbar-item">
        <button uk-icon="icon: menu; ratio: 2" uk-toggle="target: #mobile-menu"></button>
      </li>
    </ul>

    <ul class="uk-visible@s we-navbar uk-text-right">
      <li class="we-navbar-item">
        <router-link to="/">Home</router-link>
      </li>
      <li class="we-navbar-item">
        <router-link to="/data">Explore</router-link>
      </li>
      <li class="we-navbar-item">
        <router-link to="/about">About</router-link>
      </li>
    </ul>

  <div class="we-main-container">
    <router-view></router-view>
    <div class="uk-container">
      <slot></slot>
    </div>
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
