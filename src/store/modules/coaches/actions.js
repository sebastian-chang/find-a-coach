export default {
  async registerCoach (context, payload) {
    const userId = context.rootGetters.userId
    const coachData = {
      firstName: payload.firstName,
      lastName: payload.lastName,
      description: payload.description,
      hourlyRate: payload.rate,
      areas: payload.areas,
    }

    const res = await fetch(`https://udemy-vue-firebase-sites-4bbfc-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    })
    const responseData = await res.json()

    if (!responseData.ok) {
      // error...
    }

    context.commit('registerCoach', {
      ...coachData,
      id: userId,
    })
  },
  async loadCoaches (context, payload) {
    if (!context.getters.shouldUpdate && !payload.forceRefresh) {
      return
    }

    const res = await fetch(`https://udemy-vue-firebase-sites-4bbfc-default-rtdb.firebaseio.com/coaches.json`)
    const responseData = await res.json()

    if (!res.ok) {
      // error...
      const error = new Error(responseData.message || 'Failed to fetch!')
      throw error
    }

    const coaches = []

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      }
      coaches.push(coach)
    }

    context.commit('setCoaches', coaches)
    context.commit('setFetchTimestamp')
  }
}
