<template>
  <v-navigation-drawer
          fiexd
          clipped
          class="grey lighten-4"
          app
          width="270"
          :value="drawer"
          @input="listenInput"
  >
    <!--
    <v-layout>
      <v-flex>
        <v-card flat>
          <v-card-media src="http://cfile227.uf.daum.net/image/23030947533F72B714E409"
                        height="135px" class="white--text">
            <v-card-title>
              <div class="font-weight-black display-2">Stem</div>
              <div class="font-italic grey--text">d7ad8fd320fc117420fc117420fc1174</div>
            </v-card-title>
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>
    -->
    <v-list dense>
      <v-list-tile avatar :to="`/branches/${stem.id}`" class="mt-3">
        <v-list-tile-avatar>
          <img :src="require(`@/assets/images/symbols/${stem.symbol}.png`)" alt="">
        </v-list-tile-avatar>
        <v-list-tile-title v-text="stem.name"></v-list-tile-title>
      </v-list-tile>
      <v-divider class="my-3"></v-divider>
      <v-subheader class="mt-3 grey--text text--darken-1">ACTIVE BRANCHES</v-subheader>
      <v-list-tile v-for="item in activeBranches" :key="item.id" avatar
                   :to="`/branches/${item.id}`">
        <v-list-tile-avatar>
          <img :src="require(`@/assets/images/symbols/${item.symbol}.png`)" alt="">
        </v-list-tile-avatar>
        <v-list-tile-title v-text="item.name"></v-list-tile-title>
      </v-list-tile>
      <v-subheader class="mt-3 grey--text text--darken-1">INACTIVE BRANCHES</v-subheader>
      <v-list-tile v-for="item in inactiveBranches" :key="item.id" avatar
                   :to="`/branches/${item.id}`" class="inactive">
        <v-list-tile-avatar>
          <img :src="require(`@/assets/images/symbols/${item.symbol}.png`)" alt="">
        </v-list-tile-avatar>
        <v-list-tile-title v-text="item.name"></v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
  import { mapGetters, mapState } from 'vuex'
  import { TOGGLE_DRAWER } from '../../store/mutation-types'

  export default {
    computed: {
      ...mapState([
        'branches', 'branchesObject', 'drawer'
      ]),

      ...mapGetters([
        'branchesExcludeStem',
      ]),

      stem() {
        return this.branches.find(b => {
          return b.symbol === 'STEM'
        })
      },
      activeBranches() {
        return this.branches.filter(b => {
          return b.symbol !== 'STEM' && b.active
        })
      },

      inactiveBranches() {
        return this.branches.filter(b => {
          return b.name !== 'STEM' && !(b.active)
        })
      },

      /*
      https://github.com/vuetifyjs/vuetify/blob/dev/src/components/VNavigationDrawer/VNavigationDrawer.js
      122 line
       */
      isMobile() {
        let mobileBreakPoint = 1264
        return this.$vuetify.breakpoint.width < mobileBreakPoint
      }
    },

    methods: {
      listenInput(e) {
        if(this.isMobile && !e) {
          this.$store.commit(TOGGLE_DRAWER)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .inactive {
    img {
      filter: grayscale(100%);
    }
  }
</style>
