<template>
  <v-layout wrap>
    <v-flex v-for="(value, props) in info"
            :key="props" xs12 v-if="isLong(value)" class="py-3"
            style="border-bottom: 1px solid #DDD;">
      <div>
        <v-layout column style="font-family: 'Roboto Mono'; font-size: 0.91em;">
          <v-flex class="font-weight-bold grey--text subheading mb-1">{{props
            }}</v-flex>
          <v-flex>{{ value }}</v-flex>
        </v-layout>
      </div>
    </v-flex>
    <v-flex v-for="(value, props) in info"
            :key="props" xs6 v-if="!isLong(value)" class="py-3"
            style="border-bottom: 1px solid #CCC;">
      <div>
        <v-layout column>
          <v-flex class="font-weight-bold grey--text subheading">{{props}}</v-flex>
          <v-flex>{{ value }}</v-flex>
        </v-layout>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    props: ['info'],
    methods: {
      isLong(value) {
        return value.length > 20
      }
    },
  }
</script>
