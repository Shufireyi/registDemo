<template>
  <div id="app">
    <regist registApi="/api/regist" />
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
