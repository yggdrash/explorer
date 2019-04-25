<template>
  <v-navigation-drawer
          app
          fiexd
          clipped
          absolute
          temporary
          :value="drawer"
          @input="listenInput"
  >
    <v-list class="pa-3">
      <v-list-tile avatar>
        <v-list-tile-avatar >
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0" two-line subheader>
      <v-divider></v-divider>
      <v-list-tile class="pt-3"
              v-for="item in items"
              :key="item.title"
              @click="goHome"
              link
      >
        <v-list-tile-avatar>
          <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <Footer></Footer>
  </v-navigation-drawer>
</template>
<script>
  import { mapGetters, mapState } from 'vuex'
  import { TOGGLE_DRAWER } from '../../store/mutation-types'
  import Footer from './Footer'

  export default {
    components: {
        Footer,
    },
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

    data () {
        return {
            clipped: true,
            items: [
                { title: 'Home', icon: 'dashboard', path: '/', },
                { title: 'Blocks', icon: 'question_answer', path: '/', },
                { title: 'Transactions', icon: 'question_answer', path: '/', },
                { title: 'Contracts', icon: 'question_answer', path: '/', },
                { title: 'Validators', icon: 'question_answer', path: '/', }
            ]
        }
    },

    methods: {
        goHome() {
            this.$router.push("/")
        },

        listenInput(e) {
            if(this.isMobile && !e) {
                this.$store.commit(TOGGLE_DRAWER)
            }
        },
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
