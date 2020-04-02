<template>
  <div id="app" @click="appClick">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/CommonLayout/Navbar'
import AppMethods from './methods/App'
const appMethods = new AppMethods()

export default {
  components: {
    Navbar
  },
  methods: {
    appClick() {
      appMethods.removeNavbar2()
      appMethods.removeHelp()
    }
  }
}
</script>
