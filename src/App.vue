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
import SockJS from 'sockjs-client'
import Stomp from 'webstomp-client'

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
  methods: {
    connect() {
      this.socket = new SockJS("http://localhost:8080/yggdrash-websocket")
      this.stompClient = Stomp.over(this.socket, {debug: false})
      this.stompClient.connect(
        {},
        frame => {
          this.connected = true;
          this.stompClient.subscribe("/topic/blocks", tick => {
            this.$store.commit('addBlock', JSON.parse(tick.body))
          })
        }
        )
    }
  },

  mounted () {
    this.$store.dispatch('getLatestBlock')
    this.$store.dispatch('getBlocks')
    this.$store.dispatch('getBranches')
    this.connect()
  }
}
</script>
<style scoped>
  .container {
    max-width: 1200px;
  }
</style>
