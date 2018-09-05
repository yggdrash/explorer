<template>
  <v-toolbar flat dark color="primary" app fixed clipped-left>
    <v-toolbar-side-icon @click.native="miniVariant = !miniVariant"></v-toolbar-side-icon>
    <span class="title ml-3 mr-5" @click="goHome" style="cursor: pointer">
      YGGDRASH&nbsp;<span class="font-weight-light">Explorer</span>
    </span>
    <v-text-field
            solo-inverted
            flat
            hide-details
            label="Block Height, Hash, Address or Transaction Id"
            prepend-inner-icon="search"
    ></v-text-field>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-menu offset-y>
        <v-btn slot="activator" flat>
          TESTNET
          <v-icon>
            arrow_drop_down
          </v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>TESTNET</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>MAINNET</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-btn icon>
        <v-icon>apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>notifications</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
<script>
export default {
  methods: {
    goHome() {
      this.$router.push("/")
    }
  }
}
</script>
