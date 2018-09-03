<template>
  <v-footer
          fixed
          dark
          height="auto"
          app
  >
    <v-card
            class="flex"
            flat
            tile
    >
      <v-card-title class="grey darken-3">
        <strong class="subheading">Get connected with us on social networks!</strong>

        <v-spacer></v-spacer>

        <v-btn
                v-for="icon in icons"
                :key="icon"
                class="mx-3"
                dark
                icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-actions class="primary justify-center">
        &copy;2018 — <strong>AKASHIC FOUNDATION</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data () {
    return {
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ],
    }
  }
}
</script>
