<template>
    <div>
        <h1 class="we-page-title uk-text-center">{{$t("research.title")}}</h1>
        <p class="uk-margin-auto we-page-top">
            <i18n path="research.intro" tag="p">
                <a place="IRIC" href="http://www.iric.ca">IRIC</a>
            </i18n>
        </p>
        <div class="uk-margin-auto uk-text-center we-page-top">
            <i18n path="research.tariq_ivado_video" tag="p">
                <a place="IVADO" href="http://www.ivado.ca">IVADO</a>
            </i18n>
            <iframe src="https://www.youtube-nocookie.com/embed/RZ3w6Fkoyag?autoplay=0&amp;showinfo=0&amp;rel=0&amp;modestbranding=1&amp;playsinline=1" width="640" height="385" frameborder="0" allowfullscreen uk-responsive uk-video="automute: false; autoplay: false"></iframe>
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
