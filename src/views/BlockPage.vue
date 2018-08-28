<template>
  <div>
    blocks
    {{ $route.params.id }}
    <pre>
      {{ blockDetail }}
    </pre>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState([
      'blocks'
    ]),

    blockDetail () {
      console.log(this.$route.params.id)
      if(this.$route.params.id) {
        return this.blocks.filter(b => {
          if (Number.isInteger(this.$route.params.id)) {
            return b.index == this.$route.params.id
          }
          return b.hash == this.$route.params.id
        })
      }
      return this.blocks
    }
  }
}
</script>
