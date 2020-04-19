<template>
  <div>
    <div class="uk-card uk-card-default we-team-card ">
        <div v-if="isHuman" class="uk-card-media-top we-team-card-top">
            <img class="we-human-picture" :src="picture" :alt=name>
        </div>
        <div v-else class="uk-card-media-top">
            <a v-if="social.website" :href="social.website" target="_blank">
                <img class="we-sponsor-picture" :src="picture" :alt=name>
            </a>
            <img v-else class="we-sponsor-picture" :src="picture" :alt=name>
        </div>
        <div class="uk-card-body we-team-card-body">
            <h3 class="uk-card-title">{{name}}</h3>
            <p class="uk-text-bolder">{{title}}</p>
            <p class="uk-text-small">{{description}}</p>
            <p v-if="occupation" class="uk-text-muted uk-text-small">{{occupation}}</p>
            <div class="uk-card-footer">    
                <a v-if="social.linkedin" :href="social.linkedin" class="uk-icon-button uk-margin-small-right" uk-icon="linkedin" target="_blank"></a>
                <a v-if="social.twitter" :href="social.twitter" class="uk-icon-button  uk-margin-small-right" uk-icon="twitter" target="_blank"></a>
                <a v-if="social.github" :href="social.github" class="uk-icon-button" uk-icon="github" target="_blank"></a>
                <a v-if="social.website" :href="social.website" class="uk-icon-button" uk-icon="link" target="_blank"></a>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TeamCard',
    props: ['name', 'title', 'description', 'picture', 'occupation', 'isHuman', "social"]
  }
</script>