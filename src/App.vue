<template>
  <v-app>

    <Toolbar></Toolbar>
    <NavigationDrawer></NavigationDrawer>
    <v-content>
      <v-container fluid fill-height>
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
  }
}
</script>
