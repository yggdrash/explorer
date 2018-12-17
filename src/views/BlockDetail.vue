<template>
  <div>
    <h2 class="font-weight-black display-1 py-2 mb-4">BLOCK {{ block.index }}</h2>
    <div class="block-detail">
      <v-layout row wrap v-for="(value, props) in block" :key="props" class="py-2">
        <v-flex xs12 sm2 class="font-weight-bold">{{ props }}</v-flex>
        <v-flex xs12 sm10 class="value">{{ value }}</v-flex>
      </v-layout>
    </div>
    <div class="text-xs-center mt-3">
      <v-btn flat color="primary"
             :to="`${linkBase}/blocks/${block.index - 1}`"
             :disabled="isLast"
      >
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <span class="pipe">&nbsp;</span>
      <v-btn flat color="primary"
             :to="`${linkBase}/blocks/${block.index + 1}`"
             :disabled="isFirst"
      >
        <v-icon>arrow_forward</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapState } from 'vuex'
  import {
    LOAD_BLOCK
  } from '../store/action-types'

  export default {
    computed: {
      ...mapState([
        'latestBlock', 'selectedBlock'
      ]),
      ...mapState({
        block: 'selectedBlock'
      }),

      ...mapGetters([
        'linkBase'
      ]),

      isFirst() {
        return this.latestBlock.index === this.block.index
      },

      isLast() {
        return this.block.index === 0
      }
    },

    mounted() {
      let blockId = this.$route.params.blockId
      this.$store.dispatch(LOAD_BLOCK, blockId)
    },

    watch: {
      '$route' (to) {
        this.$store.dispatch(LOAD_BLOCK, to.params.blockId)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .block-detail {
    .row {
      &:nth-child(odd) {
        border-left: 3px solid #E0E0E0;
        background-color: white;
      }
      &:nth-child(even) {
        border-left: 3px solid #06b67b;
      }

      .flex {
        padding: 4px 1.5em;

        &.value {
          word-break: break-all;
          font-family: 'Roboto Mono', monospace;
        }
      }
    }
  }

  .pipe {
    display: inline-block;
    margin: 15px 0;
    width: 2px;
    background-color: #06b67b;
  }
</style>
