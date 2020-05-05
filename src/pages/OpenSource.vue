<template>
    <div>
        <h1 class="we-page-title uk-text-center">{{$t("openSource.title")}}</h1>
        <p class="uk-margin-auto we-page-top uk-text-center">
          {{$t("openSource.description")}}
        </p>

        <div class="uk-margin-auto we-page-top uk-text-center">
          <div class="uk-child-width-1-2@s uk-grid-match" uk-grid>
              <div>
                  <div class="uk-card uk-card-secondary uk-card-hover uk-card-body uk-light">
                      <h3 class="uk-card-title">{{$t("openSource.frontendTitle")}}</h3>
                      <a target="_blank" href="https://vuejs.org/">
                        <img class="we-stack-logo" src="https://vuejs.org/images/logo.png">
                      </a>
                      <a target="_blank" href="https://getuikit.com/">
                        <img class="we-stack-logo" src="https://pbs.twimg.com/profile_images/818852933483823104/YYr9qgV8_400x400.jpg">
                      </a>
                      <p>{{$t("openSource.frontenDescription")}}</p>
                      <a target="_blank" uk-icon="icon: github; ratio: 2" href="https://github.com/tariqdaouda/covap-frontend"></a>
                  </div>
              </div>
              <div>
                  <div class="uk-card uk-card-secondary uk-card-hover uk-card-body uk-light">
                      <h3 class="uk-card-title">{{$t("openSource.backendTitle")}}</h3>
                      <a target="_blank" href="https://trypyramid.com/">
                        <img class="we-stack-logo" src="https://trypyramid.com/img/pyramid-60x60.png">
                      </a>
                      <a target="_blank" href="https://www.arangodb.com/">
                        <img class="we-stack-logo" src="https://www.arangodb.com/wp-content/uploads/2016/05/ArangoDB_logo_avocado_@2.png">
                      </a>
                      <p>{{$t("openSource.backendDescription")}}</p>
                      <a target="_blank" uk-icon="icon: github; ratio: 2" href="https://github.com/tariqdaouda/covap-backend"></a>
                  </div>
              </div>
              <div>
                  <div class="uk-card uk-card-secondary uk-card-hover uk-card-body uk-light">
                      <h3 class="uk-card-title">{{$t("openSource.CAMAPTitle")}}</h3>
                      <a target="_blank" href="https://pytorch.org/">
                        <img class="we-stack-logo" src="https://pbs.twimg.com/profile_images/991720032529928193/YYpjkbVn_400x400.jpg">
                      </a>
                      <p>{{$t("openSource.CAMAPDescription")}}</p>
                      <span uk-icon="icon: github; ratio: 2"></span>
                  </div>
              </div>
              <div>
                  <div class="uk-card uk-card-secondary uk-card-hover uk-card-body uk-light">
                      <h3 class="uk-card-title">{{$t("openSource.translateTitle")}}</h3>
                      <span uk-icon="icon: world; ratio: 2"></span>
                      <p>{{$t("openSource.translateDescription")}}</p>
                      <a target="_blank" uk-icon="icon: github; ratio: 2" href="https://github.com/tariqdaouda/covap-frontend/tree/dev/src/locales"></a>
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
