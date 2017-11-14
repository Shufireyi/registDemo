<template>
  <div id="app">
    <regist registApi="http://127.0.0.1:8080/api" />
  </div>
</template>

<script>
import regist from './components/regist'

export default {
  name: 'app',
  components: {
    regist
  }
}
</script>

<style>

</style>
