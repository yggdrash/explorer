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
import {
  LOAD_BLOCKS,
  LOAD_BRANCHES,
} from './store/action-types'

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

  mounted () {
    this.$store.dispatch(LOAD_BLOCKS)
    this.$store.dispatch(LOAD_BRANCHES)
  },
}
</script>
<style scoped>
  .container {
    max-width: 1200px;
  }
</style>
