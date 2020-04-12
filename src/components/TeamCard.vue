<template>
  <div>
    <div class="uk-card uk-card-default we-team-card">
        <div class="uk-card-media-top">
            <img class="we-team-picture" :src=picture :alt=name>
        </div>
        <div class="uk-card-body">
            <h3 class="uk-card-title">{{name}}</h3>
            <p class="uk-text-bolder">{{title}}</p>
            <p class="uk-text-small">{{description}}</p>
            <p v-if="occupation" class="uk-text-muted uk-text-small">Occupation: {{occupation}}</p>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TeamCard',
    props: ['name', 'title', 'description', 'picture', 'occupation']
  }
</script>