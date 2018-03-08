<template>
  <div>
    <div class="flex flex-column mt3">
      <input
        class="mb2"
        v-model="description"
        type="text"
        placeholder="A description for the link">
      <input
        class="mb2"
        v-model="url"
        type="text"
        placeholder="The URL for the link">
    </div>
    <button @click="createLink()">Submit</button>
  </div>
</template>

<script>
import { ALL_LINKS_QUERY, CREATE_LINK_MUTATION } from '../constants/graphql'
import { GC_USER_ID } from '../constants/settings'

export default {
  name: 'CreateLink',
  data () {
    return {
      description: '',
      url: ''
    }
  },
  methods: {
    createLink () {
      const postedById = localStorage.getItem(GC_USER_ID)
      if (!postedById) {
        alert('No user logged in')
        return
      }
      // I am removing these for now, as I don't understand
      // if they really are necessary
      // https://github.com/howtographql/vue-apollo/blob/master/src/components/CreateLink.vue#L39-L42

      this.$apollo.mutate({
        mutation: CREATE_LINK_MUTATION,
        variables: {
          description: this.description,
          url: this.url,
          postedById
        },
        // update callback of the mutation
        update: (store, { data: { createLink } }) => {
          // read cache and update with result of mutation
          // neater than manual alternatives, or fetching all resources :)
          // look into docs for more detail, tutorial not detailed
          const data = store.readQuery({
            query: ALL_LINKS_QUERY
          })
          data.allLinks.push(createLink)
          store.writeQuery({ query: ALL_LINKS_QUERY, data })
        }
      }).then((data) => {
        this.$router.push({ path: '/' })
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>
