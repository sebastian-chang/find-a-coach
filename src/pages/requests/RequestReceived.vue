<template>
  <base-dialog :show="!!error" title="Fetch Error" @close="handleError">
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <base-card>
      <header>
        <h2>Request Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="!isLoading && hasRequests">
        <request-item
          v-for="req in requests"
          :key="req.id"
          :email="req.userEmail"
          :message="req.message"
        ></request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet!</h3>
    </base-card>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import RequestItem from '../../components/requests/RequestItem'

export default {
  components: {
    RequestItem,
  },
  data () {
    return {
      isLoading: false,
      error: null,
    }
  },
  computed: {
    ...mapGetters({
      requests: 'requests/requests',
      hasRequests: 'requests/hasRequests'
    }),
  },
  methods: {
    ...mapActions({
      getRequests: 'requests/getRequests'
    }),
    async loadRequests () {
      console.log('loading', this.isLoading)
      this.isLoading = true
      console.log('loading', this.isLoading)
      try {
        // await this.$store.dispatch['requests/getRequests']
        await this.getRequests()
        console.log('here')
      }
      catch (err) {
        this.error = err.message || 'Something went wrong!'
      }
      this.isLoading = false
      console.log('loading', this.isLoading)
    },
    handleError () {
      this.error = null
    }
  },
  created () {
    this.loadRequests()
  }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
