import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Auth from './config/auth'
import 'animate.css'
// Librerias de ususario
import 'bootstrap/scss/bootstrap.scss'
Vue.config.productionTip = false
router.beforeEach(async (to, from, next) => {
  if (to.meta.auth) {
    console.log('Necesita permiso para entrar')
    // Traer informacion actual del usuario
    let user = await Auth.checkUser()
    if (user == null) {
      // si no hay'un usuario, se redirecciona a login
      next({
        name: 'login'
      })
      return
    }
    // Si existe un usuario avanzamos a la ruta
    console.log(`Usuario logeado: ${user.email}`)
    next()
  }
  next()
})
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
