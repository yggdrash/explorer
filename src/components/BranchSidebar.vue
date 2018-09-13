<template>
  <v-layout wrap>
    <v-flex v-for="(value, props) in isLong"
            :key="props" xs12 class="py-3 row">
      <div>
        <v-layout column>
          <v-flex class="font-weight-bold grey--text subheading mb-1">{{props
            }}</v-flex>
          <v-flex class="value">{{ value }}</v-flex>
        </v-layout>
      </div>
    </v-flex>
    <v-flex v-for="(value, props) in isShort"
            :key="props" xs6 class="py-3 row">
      <div>
        <v-layout column>
          <v-flex class="font-weight-bold grey--text subheading">{{props}}</v-flex>
          <v-flex class="value">{{ value }}</v-flex>
        </v-layout>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    props: ['info'],

    computed: {
      isLong() {
        return {
          description: this.info.description,
          owner: this.info.owner,
          version: this.info.version,
          reserve_address: this.info.reserve_address,
        }
      },
      isShort() {
        return {
          name: this.info.name,
          symbol: this.info.symbol,
          property: this.info.property,
          type: this.info.type
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .value {
    word-break: break-all;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.9em;
  }

  .flex.row {
    border-bottom: 1px solid #DDD
  }
</style>
