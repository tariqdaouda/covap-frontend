<template>
    <div>
        <div class="we-hero-image uk-background-cover uk-light uk-flex " uk-parallax="bgy: -200">
            <div class="uk-width-1-2@m uk-width-1-1@s uk-text-center uk-margin-auto uk-margin-auto-vertical uk-animation-fade ">
                <h2 class="we-company-name uk-text-left">
                    {{$t("home.world_epitopes")}}
                </h2>
                <div class="we-abstract">
                    <h1 class="we-hero-title uk-text-capitalize">
                        {{$t("home.main_title")}}
                    </h1>
                    <a href="https://twitter.com/TariqDaouda"> 
                        <span  class="uk-icon" uk-icon="icon: twitter; ratio: 3"></span>
                    </a>
                    <p class="uk-margin-top we-abstract-disclaimer">
                        {{$t("home.release_info")}}
                    </p>
                    <Countdown 
                        start-date="Apr 22, 2020 01:06:00"
                        target-date="May 5, 2020 17:05:05"
                        :expired-text="$t('release_done')"
                    ></Countdown>
                    <router-link v-if="inConstruction" class="uk-button uk-button-large we-superhero-button" :to="'/' + $i18n.locale + '/contact'" >{{$t("home.register")}}</router-link>
                    <div v-else class="uk-button-group we-hero-buttons uk-align-center">
                        <a href="/data/CAMAP_withFigures.pdf">{{$t("home.read_paper")}}</a>
                        <router-link class="uk-button uk-button-primary" :to="'/' + $i18n.locale + '/data'" >{{$t("home.explore_data")}}</router-link>
                        <router-link class="uk-button uk-button-primary" :to="'/' + $i18n.locale + '/research'" >{{$t("home.learn_more")}}</router-link>
                        <router-link class="uk-button uk-button-primary" :to="'/' + $i18n.locale + '/contact'" >{{$t("home.contact_us")}}</router-link>
                    </div>
                    <p class="we-abstract-p">
                        {{$t("home.intro")}}
                    </p>
                    <p v-if="inConstruction" class="uk-margin-top we-abstract-disclaimer">
                        {{$t("home.why?")}}
                    </p>
                    <p class="we-abstract-p">
                        {{$t("home.because")}}
                    </p>
                    <p v-if="!inConstruction" class="uk-margin-top we-abstract-disclaimer">
                        {{$t("home.preliminary_disclaimer")}}
                    </p>
                    <p class="we-abstract-p">
                        {{$t("home.publishing_takes_time")}}
                    </p>
                    <p v-if="inConstruction" class="we-abstract-p we-abstract-disclaimer">
                        <a href="https://twitter.com/TariqDaouda"> 
                        {{$t("home.under_construction")}}
                        <span  class="uk-icon" uk-icon="icon: twitter; ratio: 2"></span>
                        </a>
                    </p>
                    <p class="uk-margin-top we-abstract-disclaimer">
                        {{$t("home.news")}}
                    </p>
                    <div class="uk-card uk-card-default">
                        <div class="uk-margin-auto uk-text-center" uk-grid>
                                <div v-for="(entry, index) in press" :key="index" class="uk-child-width-1-1@s">
                                    <a :href="entry.article_url" target="_blank">
                                        <img class= "we-press-logo" :src="'/data/press/' + entry.image_url">
                                    </a>
                                </div>
                        </div>
                    </div>
                
                </div>
                <div v-if="inConstruction" class="uk-width-1-1@m uk-width-1-1@s uk-text-center uk-margin-auto uk-margin-auto-vertical">
                    <div class="uk-button-group we-hero-buttons">
                        <router-link class="uk-button uk-button-primary" :to="'/' + $i18n.locale + '/research'" >{{$t("home.learn_more")}}</router-link>
                        <router-link class="uk-button uk-button-primary" :to="'/' + $i18n.locale + '/contact'" >{{$t("home.contact_us")}}</router-link>
                    </div>
                </div>
                <p class="we-photo-credits uk-text-center">
                    {{$t("home.image_credits")}}: Alissa Eckert, MS; Dan Higgins, MAMS
                </p>
            </div>
        </div>
    </div>
</template>

<script>
  import { IN_CONSTRUCTION } from '../configuration.js'
  import Countdown from '../components/Countdown';
  
  export default {
    components: {
        Countdown
    },
    metaInfo() {
        return{
          titleDescription: '%s - ' + this.$t("home.titleDescription"),
        }
    },
    data(){
        return{
            inConstruction: IN_CONSTRUCTION,
            press: []
        }
    },
    methods:{
        async getPress(){
            const {data} = await this.$http.get(
              '/data/press/PressReleases.json'
            )
            this.press = data.press_releases
            console.log(this.press)
            // console.log(data)
        }
    },
    created() {
        this.getPress()
    }
  }
</script>
