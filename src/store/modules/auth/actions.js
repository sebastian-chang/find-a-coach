let timer

export default {
  async login (context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    })
  },
  async signUp (context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signUp',
    })
  },
  async auth (context, payload) {
    const mode = payload.mode
    const apiKey = process.env.VUE_APP_API_KEY
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`
    if (mode === 'signUp') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`
    }
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      })
    })
    const resData = await res.json()

    if (!res.ok) {
      const error = new Error(resData.message || 'Failed to authenticate')
      throw error
    }

    const expIn = resData.expiresIn * 1000
    const expDate = new Date().getTime() + expIn

    localStorage.setItem('token', resData.idToken)
    localStorage.setItem('userId', resData.localId)
    localStorage.setItem('tokenExp', expDate)

    timer = setTimeout(() => {
      context.dispatch('autoLogout')
    }, expIn)

    context.commit('setUser', {
      token: resData.idToken,
      userId: resData.localId,
    })
  },
  autoLogin (context) {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const tokenExp = localStorage.getItem('tokenExp')

    const expIn = +tokenExp - new Date().getTime()

    if (expIn < 10000) {
      return
    }

    timer = setTimeout(() => context.dispatch('autoLogout'), expIn)

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
      })
    }
  },
  logout (context) {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExp')

    clearTimeout(timer)

    context.commit('setUser', {
      token: null,
      userId: null,
    })
  },
  autoLogout(context){
    context.dispatch('logout')
    context.commit('setAutoLogout')
  }
}
