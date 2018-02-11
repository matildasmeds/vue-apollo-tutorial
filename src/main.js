import Vue from 'vue'
import App from './App'
import router from './router'
import 'tachyons'
import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

Vue.config.productionTip = false

// Would this in reality need to be an environment value?
const networkInterface = createBatchingNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cjdiut1q31tai0162n8hs2lbl'
})

const apolloClient = new ApolloClient({
  networkInterface,
  connectToDevTools: true
})

// Does the order matter here?
// What other Vue-plugins exist?
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider, // And does order matter here?
  router,
  render: h => h(App)
})
