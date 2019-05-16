<template>
  <v-toolbar flat app color="primary" fixed clipped-left>
    <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
    <v-btn icon flat >
      <v-icon @click="goHome">
        home
      </v-icon>
    </v-btn >
    <v-btn icon flat >
      <v-icon>
        arrow_back
      </v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-menu offset-y>
        <v-btn slot="activator" flat >
          TESTNET
          <v-icon>
            arrow_drop_down
          </v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>TESTNET</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
  import { mapState } from 'vuex'
  import {
    TOGGLE_DRAWER
  } from '../../store/mutation-types'
export default {
    computed: {
      ...mapState([
        ''
      ])
    },

  methods: {
    goHome() {
        this.$router.push("/")
    },
    toggleDrawer() {
      this.$store.commit(TOGGLE_DRAWER)
    }
  }
}
</script>

<style lang="scss" scoped>
  .v-btn {
    color: white;
  }
</style>
