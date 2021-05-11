export default {
  registerCoach (context, payload) {
    const coachData = {
      id: context.rootGetters.userId,
      firstName: payload.firstName,
      lastName: payload.lastName,
      description: payload.description,
      hourlyRate: payload.rate,
      areas: payload.areas,
    }

    context.commit('registerCoach', coachData)
  }
}
