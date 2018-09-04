<template>
  <v-navigation-drawer
          v-model="drawer"
          fiexd
          clipped
          :mini-variant="miniVariant"
          class="grey lighten-4"
          app
          width="270"
  >
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
      <v-list-tile avatar to="/">
        <v-list-tile-avatar>
          <img src="@/assets/images/yeed.png" alt="">
        </v-list-tile-avatar>
        <v-list-tile-title>STEM</v-list-tile-title>
      </v-list-tile>
      <v-subheader class="mt-3 grey--text text--darken-1">BRANCHES</v-subheader>
      <v-list>
        <v-list-tile v-for="item in items2" :key="item.text" avatar :to="`/branches/${item.text}`">
          <v-list-tile-avatar>
            <img src="@/assets/images/dart.png" alt="">
          </v-list-tile-avatar>
          <v-list-tile-title v-text="item.text"></v-list-tile-title>
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
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data () {
    return {
      items: [
        { icon: 'trending_up', text: 'Most Popular' },
        { icon: 'subscriptions', text: 'Subscriptions' },
        { icon: 'history', text: 'History' },
      ],
      items2: [
        { picture: 'yeed', text: 'YEED' },
        { picture: 'ethereum', text: 'YEEDtoETH' },
        { picture: 'dart', text: 'DART' }
      ]
    }
  }
}
</script>
