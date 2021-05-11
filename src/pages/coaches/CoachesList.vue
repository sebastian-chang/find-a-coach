<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
  <section>
    <base-card>
      <div class="controls">
        <base-button mode="outline">Refresh</base-button>
        <base-button link to="/register" v-if="!isCoach">Register as Coach</base-button>
      </div>
      <ul v-if="hasCoaches">
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

      }
    }
  },
  computed: {
    ...mapGetters({
      isCoach: 'coaches/isCoach',
      coaches: 'coaches/coaches',
      hasCoaches: 'coaches/hasCoaches'
    }),
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
    }
  },
  methods: {
    setFilters (updatedFilters) {
      this.activeFilters = updatedFilters
    }
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
