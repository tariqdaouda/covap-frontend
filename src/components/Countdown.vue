<template>
   <div class="uk-margin">
      <div class="count-down-text">{{countDown}}</div>
      <progress v-if="countDownProgress" class="uk-progress" :value="countDownProgress" min="0" max="100">
      </progress>
  </div>
</template>

<script>
  
  export default {
    props: ['targetDate', "startDate", "expiredText"],
    data(){
      return {
        countDown: null,
        countDownProgress: null
      }
    },
    methods:{
      getCountDown(){
        let self = this
        // Set the date we're counting down to
        let countDownDate = new Date(this.targetDate).getTime();
        let startDate = null
        if (this.startDate){
          startDate = new Date(this.startDate)
        }
        // Update the count down every 1 second
        let x = setInterval(function() {
          // Get today's date and time
          let now = new Date().getTime();
            
          // Find the distance between now and the count down date
          let distance = countDownDate - now;

          if (self.startDate){
            let totalDistance = countDownDate - startDate
            self.countDownProgress = (distance / totalDistance) * 100
            // console.log(self.countDownProgress)
          }

          // Time calculations for days, hours, minutes and seconds
          let days = Math.floor(distance / (1000 * 60 * 60 * 24));
          let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
          // Output the result in an element with id="demo"
          self.countDown = "-" + days + ":" + hours + ":"+ minutes + ":" + seconds;
          // console.log(distance, now)
          // If the count down is over, write some text 
          if (distance <= 0) {
            clearInterval(x);
            self.countDown = self.expiredText;
          }
          
        }, 1000);
      }
    },
    mounted(){
      console.log(this.expiredText)
      this.getCountDown()
    }
  }
</script>
