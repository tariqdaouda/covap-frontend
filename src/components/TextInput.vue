<template>
  <div>
    <label>{{label}}</label>
    <input type="text"
           :name="name"
           placeholder="placeholder"
           class="uk-input">
    <br>
  </div>
</template>

<script>
  export default {
    name: 'TextInput',
    props: ['placeholder', 'label', 'name']
  }
</script>