<template>
   <div class="uk-margin" type="slider">
     <label>{{name}}</label>
     <vue-slider :name="name" v-model="range" :interval="0.01" :min="0.0" :max="1.0"></vue-slider>
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
