<template>
  <div>
    <base-dialog :show="!!error" title="Fetch Error" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Refresh</base-button
          >
          <base-button v-if="!isLoggedIn" link to="/auth?redirect=register">Login to Register</base-button>
          <base-button
            link
            to="/register"
            v-if="!isCoach && !isLoading && isLoggedIn"
          >
            Register as Coach
          </base-button>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :firstName="coach.firstName"
            :lastName="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import CoachItem from '../../components/coaches/CoachItem'
import CoachFilter from '../../components/coaches/CoachFilter'

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data () {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
      isLoading: false,
      error: null,
    }
  },
  computed: {
    ...mapGetters({
      isCoach: 'coaches/isCoach',
      coaches: 'coaches/coaches',
      storeCoaches: 'coaches/hasCoaches',
      isLoggedIn: 'isAuth',
    }),
    hasCoaches () {
      return !this.isLoading && this.storeCoaches
    },
    filteredCoaches () {
      const coaches = this.coaches
      return coaches.filter(coach => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true
        }
      })
    },
  },
  methods: {
    // ...mapActions({
    //   getCoaches: 'coaches/loadCoaches'
    // }),
    setFilters (updatedFilters) {
      this.activeFilters = updatedFilters
    },
    async loadCoaches (refresh = false) {
      this.isLoading = true
      try {
        await this.$store.dispatch('coaches/loadCoaches', { forceRefresh: refresh })
      }
      catch (err) {
        this.error = err.message || 'Something went wrong!'
      }
      // await this.getCoaches()
      this.isLoading = false
    },
    handleError () {
      this.error = false
    }
  },
  created () {
    this.loadCoaches()
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
