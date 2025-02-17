<!-- eslint-disable vue/v-slot-style -->
<template>
  <v-app>
    <v-main style="background-color: #ADAAA9">
      <component
        :is="layout.showLayout"
        v-if="layout.showLayout !== ''"
      >
        <RouterView class="fill-height" />

        <v-snackbar
          :key="snackBar.id"
          v-model="snackBar.show"
          multi-line
          timeout="3000"
        >
          {{ snackBar.msg }}

          <template v-slot:actions>
            <v-btn
              :color="snackBar.color"
              variant="text"
              @click="snackBar.show = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </component>
    </v-main>
  </v-app>
</template>

<script super lang="ts">
import axios from '@/api/axios'
import DefaultLayout from '@/layouts/Default-layout.vue'
import AuthLayout from '@/layouts/Auth-layout.vue'
import { useLayoutStore } from './stores/layout'
import { useSnackBar } from '@/stores/snackBar.js'

export default {
  components: {
    DefaultLayout,
    AuthLayout
  },

  computed: {
    layout() {
      return useLayoutStore()
    },

    snackBar () {
      return useSnackBar().showSnackBar
    }
  },
  async created() {
    this.setupAxiosToken()
  },
  methods: {
    setupAxiosToken () {
      if (localStorage.getItem('token')) {
        axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
        return
      }
      this.$router.push({ name: 'login'})
      
    },
  }
}
</script>
