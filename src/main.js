import Vue from 'vue'
import App from './App'
import router from './router'
import 'tachyons'
import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'
import { GC_USER_ID } from './constants/settings'

Vue.use(VueApollo)

Vue.config.productionTip = false

const networkInterface = createBatchingNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cjdiut1q31tai0162n8hs2lbl'
})

const apolloClient = new ApolloClient({
  networkInterface,
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

let userId = localStorage.getItem(GC_USER_ID)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider, // And does order matter here?
  router,
  data: { // $root.$data object!
    userId
  },
  render: h => h(App)
})
