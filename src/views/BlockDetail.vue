<template>
<v-container>
  <v-layout row justify-center>
    <v-flex xs2 class="text-xs-center">
      <v-btn fab small color="secondary"
             :to="`/blocks/${block.index - 1}`"
      >
        <v-icon>keyboard_arrow_left</v-icon>
      </v-btn>
    </v-flex>
    <v-flex xs4 class="text-xs-center">
      <h2 class="font-weight-black display-1 py-1">Block {{ block.index }}</h2>
    </v-flex>
    <v-flex xs2 class="text-xs-center">
      <v-btn fab small color="secondary"
             :to="`/blocks/${block.index + 1}`"
      >
        <v-icon>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
  <div class="block-detail mt-5">
    <v-layout row v-for="(value, props) in block" :key="props" class="py-2">
      <v-flex xs2>{{ props }}</v-flex>
      <v-flex xs10>{{ value }}</v-flex>
    </v-layout>
  </div>
</v-container>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState([
      'blocks'
    ]),

    block () {
      if(this.$route.params.hash) {
        return this.blocks.filter(b => {
          if (isNaN(this.$route.params.hash)) {
            return b.hash === this.$route.params.hash
          }
          return String(b.index) === this.$route.params.hash
        })[0]
      }
      return this.blocks
    }
  }
}
</script>
