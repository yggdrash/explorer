<template>
  <v-toolbar
          dark
          flat
          app
          fixed
          clipped-left
  >
    <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>

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
    toggleDrawer() {
      this.$store.commit(TOGGLE_DRAWER)
    }
  }
}
</script>

<style scoped>
  .v-toolbar {
    height: 60px;
    opacity: 0.8;
  }
</style>