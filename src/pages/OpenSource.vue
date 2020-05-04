<template>
    <div>
        <h1 class="we-page-title uk-text-center">Open source initiative</h1>
        <p class="uk-margin-auto we-page-top uk-text-center">
          Epitopes.world is an open source project to which you can contribute.
        </p>

        <div class="uk-margin-auto we-page-top uk-text-center">
          <div class="uk-child-width-1-2@s uk-grid-match" uk-grid>
              <div>
                  <div class="uk-card uk-card-secondary uk-card-hover uk-card-body uk-light">
                      <h3 class="uk-card-title">Front-end</h3>
                      <a href="https://vuejs.org/">
                        <img class="we-stack-logo" src="https://vuejs.org/images/logo.png">
                      </a>
                      <a href="https://getuikit.com/">
                        <img class="we-stack-logo" src="https://pbs.twimg.com/profile_images/818852933483823104/YYr9qgV8_400x400.jpg">
                      </a>
                      <p>The front-end handles everything you see here. It's how Epitopes.world looks, feels and acts. The front-end is written in Javascript using UIkit and VueJS.</p>
                      <a uk-icon="icon: github; ratio: 2" href="https://github.com/tariqdaouda/covap-frontend"></a>
                  </div>
              </div>
              <div>
                  <div class="uk-card uk-card-secondary uk-card-hover uk-card-body uk-light">
                      <h3 class="uk-card-title">Back-end</h3>
                      <a href="https://trypyramid.com/">
                        <img class="we-stack-logo" src="https://trypyramid.com/img/pyramid-60x60.png">
                      </a>
                      <a href="https://www.arangodb.com/">
                        <img class="we-stack-logo" src="https://www.arangodb.com/wp-content/uploads/2016/05/ArangoDB_logo_avocado_@2.png">
                      </a>
                      <p>The role of the back-end is to transfer queries from the front-end to the ArangoDB Oasis database. The back-end is written in python using pyramid and pyArango.</p>
                      <a uk-icon="icon: github; ratio: 2" href="https://github.com/tariqdaouda/covap-backend"></a>
                  </div>
              </div>
              <div>
                  <div class="uk-card uk-card-secondary uk-card-hover uk-card-body uk-light">
                      <h3 class="uk-card-title">CAMAP (soon)</h3>
                      <a href="https://pytorch.org/">
                        <img class="we-stack-logo" src="https://pbs.twimg.com/profile_images/991720032529928193/YYpjkbVn_400x400.jpg">
                      </a>
                      <p>CAMAP is the AI we use to predict epitopes from mRNA sequences. CAMAP is written using pyTorch</p>
                      <span uk-icon="icon: github; ratio: 2"></span>
                  </div>
              </div>
              <div>
                  <div class="uk-card uk-card-secondary uk-card-hover uk-card-body uk-light">
                      <h3 class="uk-card-title">Translation</h3>
                      <span uk-icon="icon: world; ratio: 2"></span>
                      <p>You can also help develop Epitopes.world by providing translations for the front-end</p>
                      <a uk-icon="icon: github; ratio: 2" href="https://github.com/tariqdaouda/covap-frontend/tree/dev/src/locales"></a>
                  </div>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
  export default {
      name: 'Research',
      metaInfo() {
            return{
              titleTemplate: '%s - ' + this.$t("research.titleDescription")
            }
        },
  }
</script>
