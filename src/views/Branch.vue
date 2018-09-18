<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex mb-4>
          <v-layout align-end>
            <v-flex class="branch-name">
              <span class="font-weight-black display-2 mr-2">
                {{ branchName.name }}</span>
            </v-flex>
            <v-flex>
              <v-layout wrap>
                <v-flex xs12>
                  <div>
                    <v-chip color="green" text-color="white" small v-if="isStem || isYeed">
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
  import { mapState, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapState([
        'currentBranch', 'branchesObject'
      ]),

      ...mapGetters([
        'isStem',
      ]),

      isYeed() {
        return this.currentBranch.id === 'a08ee962cd8b2bd0edbfee989c1a9f7884d26532'
      },

      branchName() {
        // if(this.branchesObject !== null && this.currentBranch !== null) {
        //   return this.branchesObject[this.currentBranch.id]
        // } else {
        //   return ''
        // }

        if(this.branchesObject[this.currentBranch.id] !== null) {
          return this.branchesObject[this.currentBranch.id]
        } else {
          return {name: ''}
        }
      }
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
