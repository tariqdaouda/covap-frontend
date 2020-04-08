<template>
  <canvas
    ref="thecanvas"
    style=" z-index:-1; position:absolute; left:0px; width:100%; height:100%;"
  ></canvas>
</template>

<script>
export default {
  mounted() {
    // Initialising the canvas
    var canvas = this.$refs.thecanvas,
      ctx = canvas.getContext('2d')

    // Setting the width and height of the canvas
    //var ratio = window.innerWidth / window.innerHeight
    canvas.width = window.innerWidth
    canvas.height = 480 //1024 * ratio //window.innerHeight

    console.log(' canvas.width  = ' + canvas.width)
    console.log(' canvas.height  = ' + canvas.height)
    // Setting up the letters
    var letters = 'COVID19CORONAVIRUSSARS'
    letters = letters.split('')

    // Setting up the columns
    var fontSize = 10,
      columns = canvas.width / fontSize

    // Setting up the drops
    var drops = []
    for (var i = 0; i < columns; i++) {
      drops[i] = Math.floor((Math.random() * canvas.height) / 10)
    }

    // Setting up the draw function
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, .1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      for (var i = 0; i < drops.length; i++) {
        var text = letters[Math.floor(Math.random() * letters.length)]
        ctx.fillStyle = '#fb7'
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)
        drops[i]++
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
          drops[i] = 0
        }
      }
    }

    // Loop the animation
    setInterval(draw, 66)
  },
}
</script>

<style lang="css" scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  background: #000;
}
canvas {
  display: block;
}
</style>
