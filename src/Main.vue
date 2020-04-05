<template>
  <div id="app">
    <header>
      <div class="uk-container">
        <nav class="uk-navbar-transparent" data-uk-navbar>
          <div class="uk-navbar-left">
            <a class="uk-navbar-item uk-logo" href="#"></a>
          </div>
          <div class="uk-navbar-center uk-visible@m">
            <ul class="uk-navbar-nav">
              <li class="uk-active"><a href="/">Home</a></li>
              <li class="uk-active"><a href="/data">Data</a></li>
              <li class="uk-active"><a href="/about">About</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </header>

    <slot></slot>

  </div>
</template>

<script>
//import DataComponent from './components/DataComponent.vue'

export default {
  name: 'MainLayout',
}
</script>

<style lang="less">
  @import "../node_modules/uikit/src/less/uikit.less";
</style>
