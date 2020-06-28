<template>
    <div class="uk-text-center">
        <h1 class="we-page-title">{{$t("about.team_title")}}</h1>
        <p class="uk-margin-auto we-page-top">
            {{$t("about.team_intro")}}
        </p>
        <div class="uk-animation-fade uk-child-width-1-1@s uk-child-width-1-4@m uk-grid-small uk-grid-match" uk-grid>
        <!-- <div class="uk-animation-fade uk-child-width-1-1@s uk-child-width-1-4@m uk-grid-small" uk-grid="masonry: true"> -->
            <TeamCard v-for="(field, index) in people"
                       :key="index"
                       :name="field.name"
                       :title="field.title"
                       :description="field.description"
                       :occupation="field.occupation"
                       :picture="'/'+ field.picture"
                       :social="field.social"
                       is-human="true"
            ></TeamCard>
        </div>
        <h3 class="we-page-subtitle" > {{$t("about.sponsors_title")}}</h3>
        <div class="uk-animation-fade uk-child-width-1-4@m uk-grid-small uk-grid-match" uk-grid>
            <TeamCard v-for="(field, index) in sponsors"
                       :key="index"
                       :name="field.name"
                       :title="field.title"
                       :description="field.description"
                       :occupation="field.occupation"
                       :picture="'/'+ field.picture"
                       :social="field.social"
            ></TeamCard>
        </div>
        <h3 class="we-page-subtitle" > {{$t("about.acknowlegments_title")}}</h3>
        <p class="uk-margin-auto we-page-top">
            {{$t("about.acknowlegments_intro")}}
        </p>
        <div class="uk-animation-fade uk-child-width-1-4@m uk-grid-small uk-grid-match" uk-grid>
            <TeamCard v-for="(field, index) in thanks"
                       :key="index"
                       :name="field.name"
                       :title="field.title"
                       :description="field.description"
                       :occupation="field.occupation"
                       :picture="'/'+ field.picture"
                       is-human="true"
                       :social="field.social"
            ></TeamCard>
        </div>
        <div class="we-full-authors-list">
            {{$t("about.authors_intro")}}
            <ul class="uk-list">
                <li v-for="author in authors" :key="author.name">
                    {{author.name}}
                </li>
            </ul>
        </div>
        <div class="we-full-authors-list">
            {{$t("about.translators")}}
            <ul class="uk-list">
                <li>
                    Roger Palou (Espanol)
                </li>
                <li>
                    Walter Sobral (Portugues)
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import TeamCard from '../components/TeamCard'
    import { STATIC_FILES_URL } from '../configuration.js'

    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    Vue.use(VueAxios, axios)

    export default {
        name: 'About',
        components: {
            TeamCard,
        },
        metaInfo() {
            return{
              titleTemplate: '%s - ' + this.$t("about.titleDescription")
            }
        },
        data() {
          return {
            staticFilesURL: STATIC_FILES_URL,
            people: [],
            sponsors: [],
            thanks: [],
            authors: []
      }
    },
    methods: {
        async getPeople() {
            const { data } = await this.$http.get(
              '/locale/' + this.$i18n.locale + '/team.json'
            );
            this.people = data;
        },
        async getSponsors() {
            const { data } = await this.$http.get(
              '/locale/' + this.$i18n.locale + '/sponsors.json'
            );
            this.sponsors = data;
        },
        async getThanks() {
            const { data } = await this.$http.get(
              '/locale/' + this.$i18n.locale + '/thanks.json'
            );
            this.thanks = data;
        },
        async getAuthors() {
            const { data } = await this.$http.get(
              '/data/authors.json'
            );
            this.authors = data;
        },
        reload: function(){
          this.getPeople();
          this.getSponsors();
          this.getThanks();
          this.getAuthors();
        }
    },
    created() {
      this.reload()
    },
    watch:{
      "$i18n.locale": function(){
        this.reload()
      }
    }
}
</script>