<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/CommonLayout/Navbar'

export default {
  components: {
    Navbar
  }
}
</script>
