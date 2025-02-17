<script lang="ts">
import { defineComponent } from 'vue'
import api from '@/api/api.js'

export default defineComponent({
  name: 'CardLogin',
  components: {
  },
  data: () => ({
    showPass: false,
    login: 'admin@maisa.com.br',
    password: 'passMaisA',
    loading: false,
    emailRules: [
      (value) => {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
        return 'informe um e-mail válido'
      }
    ],
    passwordRules: [
      (value) => {
        if (value?.length >= 6) return true
        return 'senha deve conter pelo menos 6 caracteres'
      }
    ],
    errorEmail: false,
    errorPassword: false
  }),
  methods: {
    async requestlogin() {
      this.errorEmail = false
      this.errorPassword = false
      this.loading = true
      try {
        const credentials = {
          email: this.login,
          password: this.password
        }
        await api.login(credentials)
        this.$router.push({ name: 'home' })
      } catch (e) {
        console.log(e)
        this.loading = false
      }
      this.loading = false
    }
  }
})
</script>

<template>
  <v-card
    class="px-6 pb-8 pt-2"
    width="300"
    style="background-color: #fff"
  >
    <div
      class="mb-5 mt-5 text-center"
      style="max-width: 250px"
    >
      <img
        src="@/assets/logo.svg"
        style="max-width: 100%"
      >
    </div>
    <v-form @submit.prevent>
      <v-text-field
        v-model="login"
        label="E-mail"
        variant="underlined"
        :rules="emailRules"
        :error-messages="errorEmail ? 'E-mail inválido' : ''"
        :disabled="loading"
        @input="errorEmail = false"
      />
      <v-text-field
        v-model="password"
        class="mb-5"
        label="Senha"
        variant="underlined"
        :type="showPass ? 'text' : 'password'"
        :rules="passwordRules"
        :error-messages="errorPassword ? 'Senha inválida' : ''"
        :disabled="loading"
        @input="errorPassword = false"
        @keydown.enter="requestlogin"
      >
        <template #append-inner>
          <v-icon
            :icon="showPass ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" 
            @click="showPass = !showPass"
          />
        </template>
      </v-text-field>
      <v-btn
        block
        class="mt-2 text-white"
        color="#2EACB3"
        :loading="loading"
        @click="requestlogin"
      >
        <span class="font-weight-medium"> Login </span>
      </v-btn>
    </v-form>
  </v-card>
</template>

<style scoped></style>
