<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex mb-4>
          <v-layout align-end>
            <v-flex class="branch-name">
              <span class="font-weight-black display-2 mr-2">
                {{ currentBranch.name }}</span>
            </v-flex>
            <v-flex>
              <v-layout wrap>
                <v-flex xs12>
                  <div>
                    <v-chip color="green" text-color="white" small v-if="currentBranch.active">
                      ACTIVE
                    </v-chip>
                    <v-chip color="grey darken-1" text-color="white" small v-else>
                      INACTIVE
                    </v-chip>
                  </div>
                </v-flex>
                <v-flex xs12>
                  <span class="font-italic grey--text">
                    <strong>{{ currentBranch.id.slice(0, 16) }}</strong>{{
                    currentBranch.id.slice(16) }}
                  </span>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <router-view></router-view>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'currentBranch', 'branchesObject'
      ]),
    },
  }
</script>
<style lang="scss" scoped>
  .branch-name {
    flex-grow: 0;
  }

  .v-chip--small {
    height: 18px;
  }
</style>
