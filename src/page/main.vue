<template lang="pug">
  .pageMain
    header-body()
    .frameBottom()
      .frameMenu
        menu-body
      .frameBody
        router-view(v-if="islogin")
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '../store/types'
import menuBody from '../modular/menu'
import headerBody from '../modular/header'
export default {
  name: 'MAIN_BODY',
  components: {
    menuBody,
    headerBody
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  beforeMount () {

  },
  methods: {
  },
  computed: {
    ...mapState([
      'islogin'
    ])
  },
}
</script>

<style>
</style>
