<template>
   <div class="uk-margin" type="slider">
     <label>{{name}}</label>
     <vue-slider :name="name" v-model="rawValues" :interval="0.01" :min="range[0]" :max="range[1]"></vue-slider>
  </div>
</template>

<script>
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/default.css'

  export default {
    components: {
      VueSlider
    },
    props: ['collection', 'name', 'range'],
    data(){
      return {
        rawValues: this.range,
        fullName: this.collection + "." + this.name
      }
    }
  }
</script>
