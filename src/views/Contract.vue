<template>
  <v-card>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-toolbar card>
              <v-toolbar-title class="body-2 grey--text">view</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                        v-model="branchId"
                        label="Branch ID"
                        required
                ></v-text-field>
                <v-btn @click="show = !show">Query</v-btn>
              </v-form>
            </v-card-text>
            <v-slide-y-transition>
              <v-card-text v-show="show">
                {{ branchId }}
              </v-card-text>
            </v-slide-y-transition>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
  export default {
    data: ()=> ({
      show: false,
      branchId: '',
    })
  }
</script>
