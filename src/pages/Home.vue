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
                <p class="uk-margin-top we-abstract-disclaimer">
                    {{$t("home.release_info")}}
                </p>
                <Countdown 
                    start-date="Apr 22, 2020 01:06:00"
                    target-date="May 5, 2020 17:05:05"
                    expired-text="Done."
                ></Countdown>
                <a class="uk-button uk-button-large we-hero-button" href="/#/contact">
                    {{$t("home.register")}}
                </a>
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
                </div>
                <div class="uk-width-1-1@m uk-width-1-1@s uk-text-center uk-margin-auto uk-margin-auto-vertical">
                    <div class="uk-button-group we-hero-buttons">
                        <a v-if="!inConstruction" class="uk-button uk-button-primary we-hero-button">{{$t("home.read_paper")}}</a>
                        <a v-if="!inConstruction" class="uk-button uk-button-primary" href="/#/data">{{$t("home.explore_data")}}</a>
                        <a class="uk-button uk-button-primary" href="/#/research">{{$t("home.learn_more")}}</a>
                        <a class="uk-button uk-button-primary" href="/#/contact">{{$t("home.contact_us")}}</a>
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
    data(){
        return{
            inConstruction: IN_CONSTRUCTION
        }
    }
  }
</script>
