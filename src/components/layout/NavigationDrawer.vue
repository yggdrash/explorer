<template>
  <v-navigation-drawer
          fiexd
          clipped
          class="grey lighten-4"
          app
          width="270"
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
      <v-subheader class="mt-3 grey--text text--darken-1">ACTIVATED BRANCHES</v-subheader>
      <v-list-tile avatar :to="`/branches/${yeed.id}`">
        <v-list-tile-avatar>
          <img :src="require(`@/assets/images/symbols/${yeed.symbol}.png`)" alt="">
        </v-list-tile-avatar>
        <v-list-tile-title v-text="yeed.name"></v-list-tile-title>
      </v-list-tile>

      <v-subheader class="mt-3 grey--text text--darken-1">NON-ACTIVATED BRANCHES</v-subheader>
      <v-list-tile v-for="item in nonActivated" :key="item.id" avatar
                   :to="`/branches/${item.id}`">
        <v-list-tile-avatar>
          <img :src="require(`@/assets/images/symbols/${item.symbol}.png`)" alt="">
        </v-list-tile-avatar>
        <v-list-tile-title v-text="item.name"></v-list-tile-title>
      </v-list-tile>
    </v-list>
    <!--
    <v-list-tile class="mt-3" @click="">
      <v-list-tile-action>
        <v-icon color="grey darken-1">add_circle_outline</v-icon>
      </v-list-tile-action>
      <v-list-tile-title class="grey--text text--darken-1">Browse Branches</v-list-tile-title>
    </v-list-tile>
    <v-list-tile @click="">
      <v-list-tile-action>
        <v-icon color="grey darken-1">settings</v-icon>
      </v-list-tile-action>
      <v-list-tile-title class="grey--text text--darken-1">Manage Branches</v-list-tile-title>
    </v-list-tile>
    -->
  </v-navigation-drawer>
</template>
<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'branches', 'branchesObject'
      ]),

      ...mapGetters([
        'branchesExcludeStem',
      ]),

      stem() {
        return this.branchesObject['fe7b7c93dd23f78e12ad42650595bc0f874c88f7']
      },
      yeed() {
        return this.branchesObject['a08ee962cd8b2bd0edbfee989c1a9f7884d26532']
      },

      nonActivated() {
        return this.branches.filter(b => {
          return b.name !== 'STEM' && b.name !== 'YEED'
        })
      }
    }
  }
</script>
