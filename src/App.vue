<template>
  <v-app>
    <Toolbar></Toolbar>
    <NavigationDrawer></NavigationDrawer>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Toolbar from './components/layout/ToolBar'
import NavigationDrawer from './components/layout/NavigationDrawer'
import Footer from './components/layout/Footer'

export default {
  name: 'App',
  components: {
    Toolbar,
    NavigationDrawer,
    Footer,
  },
  data () {
    return {
      title: 'YGGDRASH Explorer',
      drawer: true,
      miniVariant: false,
    }
  },
  created () {
    this.$store.dispatch('getLatestBlock')
    this.$store.dispatch('getBlocks')
    this.$store.dispatch('getBranches')
  }
}
</script>
<style scoped>
  .container {
    max-width: 1200px;
  }
</style>
