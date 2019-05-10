<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout column>
        <v-flex mb-4>
          <v-layout align-end>
            <v-flex class="branch-name">
              <span class="font-weight-black display-2 mr-2" style="color: #e6e6e6;">
                {{ currentBranch.name }}</span>
            </v-flex>
            <v-flex>
              <v-layout wrap>
                <v-flex xs12>
                  <div>
                    <v-chip color="#66BB6A" text-color="white" small v-if="currentBranch.active">
                      ACTIVE
                    </v-chip>
                    <v-chip color="grey darken-1" text-color="white" small v-else>
                      INACTIVE
                    </v-chip>
                  </div>
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
  export default {
    data: () => ({
      currentBranch: {
        name: 'YGGDRASH',
        active: true
      }
    }),
    computed: {
    },
  }
</script>
<style lang="scss" scoped>
  .branch-name {
    flex-grow: 0;
  }

  .branch-id {
    word-break: break-all;
  }

  .v-chip--small {
    height: 18px;
  }
</style>
