<template>
    <div class="uk-text-center uk-align-center we-overlay">
        <iframe :src="forms[$i18n.locale]" width="640" height="1000" frameborder="0" marginheight="0" marginwidth="0" scrolling="no">{{$t("loading")}}</iframe>
    </div>
</template>
<script>
  export default {
    name: 'Research',
    data(){
        return {
            defaultLocale: "en",
            forms:{
                "en": "https://docs.google.com/forms/d/e/1FAIpQLSfNOQv3SFSp3n0u4EC8ig2q_ahhDSyADJXXQcV4DbzrznewQA/viewform?embedded=true",
                "fr": "https://docs.google.com/forms/d/e/1FAIpQLSd6oj_3Be3mLuknaZCKFEPSZWbw4cB9kW3tOxVSomtwZ_D_iQ/viewform?embedded=true"
            }
        }
    }
}
</script>
