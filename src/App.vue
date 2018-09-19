<template>
  <v-app>
    <Toolbar></Toolbar>
    <template v-if="loading">
      <v-container fill-height grid-list-xs class="text-xs-center">
        <img src="@/assets/images/loading.svg" style="margin: 0 auto">
      </v-container>
    </template>
    <template v-else>
      <NavigationDrawer></NavigationDrawer>
      <v-content>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-content>
    </template>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Toolbar from './components/layout/ToolBar'
import NavigationDrawer from './components/layout/NavigationDrawer'
import Footer from './components/layout/Footer'
import { mapGetters } from 'vuex'
import {
  SET_CURRENT_BRANCHE
} from './store/mutation-types'
import {
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

  computed: {
    ...mapGetters([
      'loading'
    ])
  },

  created () {
    this.$store.dispatch(LOAD_BRANCHES)
  },

  watch: {
    '$route' (to) {
      if(to.params.id != null) {
        let currentBranch = this.$store.state.branchesObject[to.params.id]
        this.$store.commit(SET_CURRENT_BRANCHE, currentBranch)
      }
    }
  }
}
</script>
<style scoped>
  .container {
    max-width: 1200px;
  }
</style>
