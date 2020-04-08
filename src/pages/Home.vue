<template>
  <div>                         
      <div height="400px">
          <the-matrix></the-matrix>
          <br />                    
        <h1 class="uk-text-center uk-light ">World Epitopes</h1>
      
            <p class="uk-text-center ">
              <em>COVID-19 vaccin targets prediction</em>
            </p>
            <br />                    
      </div>
    

      <vk-grid class="uk-child-width-expand@s">
        <div  class="uk-background-secondary uk-padding uk-light ">
          <vk-card class="uk-card-secondary">
            <h4 class="headline">The COVID-19 is a pandemic of humongous human and economical consequences. We have developed an AI algorithm that we believe can help identify vaccin targets against COVID-19.</h4>
          </vk-card>
        </div>
        <div  class="uk-background-secondary uk-padding uk-grid-item-match">
            <vk-card>
            <h4>These are preliminary results</h4>                
                  <p>
                    Publishing scientific findings takes months. Given the urgency of the situation, we have decided to make our results freely available now. To both the research community and the general public.
                    
                  </p>
                  </vk-card>
        </div>
      </vk-grid>

    <div class="uk-width-1-2@m uk-width-1-1@s uk-text-center uk-margin-auto uk-margin-auto-vertical">
        <div class="uk-button-group we-hero-buttons">
            <button class="uk-button uk-button-primary we-hero-button">Read paper</button>
            <button class="uk-button uk-button-primary">Explore results</button>
        </div>
    </div>
  </div>
</template>

<script>
import TheMatrix from '../components/Matrix.vue'

export default {
  components: {
    TheMatrix   
  },
}
</script>