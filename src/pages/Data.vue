<template>
  <MainLayout>
    <div class="hello">
      <label>
        <input v-model="field1" placeholder="field 1">
      </label>
      <br>
      <label>
        <input v-model="field2" placeholder="field 2">
      </label>
    </div>
  </MainLayout>
</template>

<script>
  import MainLayout from "../Main";
  export default {
    name: 'Data',
    components: {MainLayout},
    props: {
      msg: String
    },
    data() {
      return {
        field1: null,
        field2: null
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
