<script lang="ts">
import { defineComponent } from 'vue'
import api from '@/api/api.js'

export default defineComponent({
  name: 'NavbarPadrao',
  components: {
  },
  data: () => ({
    drawer: true,
    group: null,
    items: [
      {
        title: 'Home',
        icon: 'mdi-home',
        to: { name: 'home' }
      },
      {
        title: 'Alunos',
        icon: 'mdi-account-school-outline',
        to: { name: 'students' }
      },
    ]
  }),
  methods: {
    logout() {
      api.logOut()
    }
  }
})
</script>
<template>
  <v-app-bar color="#DEE2E6">
    <div class="d-flex flex-row justify-start align-center ml-2">
      <v-btn
        icon
        @click="drawer = !drawer"
      >
        <v-icon
          icon="mdi-menu"
          class="mr-4"
          color="#2EACB3"
        />
      </v-btn>
      <img
        src="@/assets/logo.svg"
        style="width: 80px"
      >
    </div>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    fixed
    clipped
    app
  >
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        color="#2EACB3"
      >
        <template #prepend>
          <v-icon
            :icon="item.icon"
            class="mr-4"
            color="#CE0F2E"
          />
        </template>
        {{ item.title }}
      </v-list-item>
    </v-list>

    <template #append>
      <div class="pa-2">
        <v-btn
          block
          color="#2EACB3"
          @click="logout"
        >
          <v-icon
            icon="mdi-exit-run"
            class="p-0 mr-2"
          />
          Sair
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
<style></style>
