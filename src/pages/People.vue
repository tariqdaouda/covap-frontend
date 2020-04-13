<template>
    <div class="uk-text-center">
        <h1 class="we-hero-title">People</h1>
        <p class="uk-margin-auto we-page-top">
            Epitopes.world is made and maintained by a multi-disciplinary team of researchers and developpers.
            We are committed to open science and developing innovative ways of disceminating research results when timing counts. 
        </p>
        <div class="uk-animation-fade uk-child-width-1-1@s uk-child-width-1-4@m uk-grid-small uk-grid-match" uk-grid>
            <TeamCard v-for="(field, index) in people"
                       :key="index"
                       :name="field.name"
                       :title="field.title"
                       :description="field.description"
                       :occupation="field.occupation"
                       :picture="apiURL + '/'+ field.picture"
                       is-human="true"
            ></TeamCard>
        </div>
        <h3> Sponsors</h3>
        <div class="uk-animation-fade uk-child-width-1-4@m uk-grid-small uk-grid-match" uk-grid>
            <TeamCard v-for="(field, index) in sponsors"
                       :key="index"
                       :name="field.name"
                       :title="field.title"
                       :description="field.description"
                       :occupation="field.occupation"
                       :picture="apiURL + '/'+ field.picture"
            ></TeamCard>
        </div>
        <h3> Acknowledgements</h3>
        <p class="uk-margin-auto we-page-top">
            These people do not directly participate to Epitopes.world, however we would like to thank them for their significant contributions. 
        </p>
        <div class="uk-animation-fade uk-child-width-1-4@m uk-grid-small uk-grid-match" uk-grid>
            <TeamCard v-for="(field, index) in thanks"
                       :key="index"
                       :name="field.name"
                       :title="field.title"
                       :description="field.description"
                       :occupation="field.occupation"
                       :picture="apiURL + '/'+ field.picture"
                       is-human="true"
            ></TeamCard>
        </div>
        <div class="we-full-authors-list">
            We would like to thank all the authors who participated to the research without whom this project could not exists. Here is the full list of authors:
            <ul class="uk-list uk-list-striped">
                <li v-for="author in authors" :key="author.name">
                    {{author.name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import TeamCard from '../components/TeamCard'
    import { API_URL } from '../configuration.js'

    import Vue from 'vue'
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    Vue.use(VueAxios, axios)

    export default {
        name: 'People',
        components: {
            TeamCard,
        },
        data() {
          return {
            apiURL: API_URL,
            people: [],
            sponsors: [],
            thanks: [],
            authors: []
      }
    },
    methods: {
        async getPeople() {
            const { data } = await this.$http.get(
              this.apiURL + '/locale/en/team.json'
            );
            this.people = data;
        },
        async getSponsors() {
            const { data } = await this.$http.get(
              this.apiURL + '/locale/en/sponsors.json'
            );
            this.sponsors = data;
        },
        async getThanks() {
            const { data } = await this.$http.get(
              this.apiURL + '/locale/en/thanks.json'
            );
            this.thanks = data;
        },
        async getAuthors() {
            const { data } = await this.$http.get(
              this.apiURL + '/data/authors.json'
            );
            this.authors = data;
        }
    },
    created() {
        this.getPeople();
        this.getSponsors();
        this.getThanks();
        this.getAuthors();
    },
}
</script>