<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fiexd
      clipped
      :mini-variant="miniVariant"
      class="grey lighten-4"
      app
      width="265"
    >
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.text" @click="" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider class="my-3"></v-divider>
        <v-subheader class="mt-3 grey--text text--darken-1">BRANCHES</v-subheader>
        <v-list>
          <v-list-tile v-for="item in items2" :key="item.text" avatar @click="">
            <v-list-tile-avatar>
              <img src="@/assets/images/dart.png" alt="">
            </v-list-tile-avatar>
            <v-list-tile-title v-text="item.text"></v-list-tile-title>
          </v-list-tile>
        </v-list>
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
      </v-list>
    </v-navigation-drawer>
    <v-toolbar flat dark color="primary" app fixed clipped-left>
      <v-toolbar-side-icon @click.native="miniVariant = !miniVariant"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">
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
        <v-btn to="/" flat>TESTNET</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view/>
      </v-container>
    </v-content>
    <v-footer
            dark
            app
            fixed
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
      drawer: true,
      miniVariant: false,
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ],
      items: [
        { icon: 'watch_later', text: 'Stem', link: '/'},
        { icon: 'trending_up', text: 'Most Popular' },
        { icon: 'subscriptions', text: 'Subscriptions' },
        { icon: 'history', text: 'History' },
      ],
      items2: [
        { picture: 'yeed', text: 'YEED' },
        { picture: 'ethereum', text: 'YEED to ETH' },
        { picture: 'dart', text: 'DART' }
      ]
    }
  }
}
</script>
