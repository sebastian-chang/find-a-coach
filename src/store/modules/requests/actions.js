export default {
  async contactCoach (context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    }

    const res = await fetch(`https://udemy-vue-firebase-sites-4bbfc-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    })
    const responseData = await res.data()

    if (!res.ok) {
      const error = new Error(responseData.message || 'Failed to send request.')
      throw error
    }

    newRequest.id = responseData.name
    newRequest.coachId = payload.coachId

    context.commit('addRequest', newRequest)
  },
  async getRequests (context) {
    const coachId = context.rootGetters.userId
    const token = context.rootGetters.token
    const res = await fetch(`https://udemy-vue-firebase-sites-4bbfc-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`)
    const resData = await res.json()

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to get requests')
      throw error
    }

    const requests = []

    for (const key in resData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: resData[key].userEmail,
        message: resData[key].message,
      }

      requests.push(request)
    }

    context.commit('setRequest', requests)
  }
}
