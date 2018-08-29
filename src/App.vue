<template>
  <v-app>
    <v-toolbar flat dark color="primary">
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/" flat>Explorer</v-btn>
        <v-btn to="/blocks" flat>Blocks</v-btn>
        <v-btn to="/txs" flat>Transactions</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <!--<v-footer fixed app>-->
      <!--<span>&copy; 2018</span>-->
    <!--</v-footer>-->


    <v-footer
            dark
            height="auto"
    >
      <v-card
              flat
              tile
              class="primary white--text text-xs-center"
      >
        <v-card-text>
          <v-btn
                  v-for="icon in icons"
                  :key="icon"
                  class="mx-3 white--text"
                  icon
          >
            <v-icon size="24px">{{ icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          &copy;2018 — AKASHIC FOUNDATION LTD
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      title: 'YGGDRASH Explorer',
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    }
  }
}
</script>
