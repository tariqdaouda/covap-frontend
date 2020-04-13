<template>
  <li>
    <label>{{label}}</label>
    <input type="text"
           :name="name"
           :placeholder="name"
           class="uk-input">
    <br>
  </li>
</template>

<script>
  export default {
    name: 'TextInput',
    props: ['placeholder', 'label', 'name']
  }
</script>