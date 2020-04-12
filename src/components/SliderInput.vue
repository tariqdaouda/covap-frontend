<template>
   <div class="uk-margin" type="slider">
     <label>{{label}}</label>
     <vue-slider :name="name" v-model="range"></vue-slider>
  </div>
</template>

<script>
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/default.css'

  export default {
    components: {
      VueSlider
    },
    props: ['placeholder', 'label', 'name', 'range']
  }
</script>
