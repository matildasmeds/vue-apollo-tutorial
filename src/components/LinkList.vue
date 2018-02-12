// :key might be used internally for maintaining the list?
<template>
  <div>
    <h4 v-if="loading">Loading...</h4>
    <link-item
      v-for="link in allLinks"
      :key="link.id"
      :link="link">
    </link-item>
  </div>
</template>

<script>
import LinkItem from './LinkItem'
import { ALL_LINKS_QUERY } from '../constants/graphql'

export default {
  name: 'LinkList',
  data () {
    return {
      allLinks: [],
      loading: 0 // After load will be incremented to 1. By Apollo?
    }
  },
  components: {
    LinkItem
  },
  apollo: {
    allLinks: {
      query: ALL_LINKS_QUERY
    }
  }
}
</script>
