<template>
  <div class="mx-10 my-10">
    <v-card
      prepend-icon="mdi-account-school-outline"
      :title="(updateStudent ? 'Editar': 'Cadastrar') + ' Aluno(a)'"
    >
      <template #text>
        <v-progress-linear
          v-if="loading"
          color="#008ABD"
          indeterminate
        />
        <v-text-field
          v-model="student.name"
          label="Nome"
          variant="underlined"
          :rules="nameRules"
          :disabled="loading"
          class="mt-10"
        />
        <v-text-field
          v-model="student.email"
          label="E-mail"
          :rules="emailRules"
          variant="underlined"
          :disabled="loading"
        />
        <v-text-field
          v-model="student.cpf"
          label="CPF"
          :rules="cpfRules"
          variant="underlined"
          :disabled="loading"
        />
        <v-text-field
          v-model="student.ra"
          label="R.A"
          variant="underlined"
          :rules="raRules"
          :disabled="updateStudent || loading"
          class="mb-10"
        />
      </template>
      <template #actions>
        <v-spacer />
        <v-btn
          :disabled="loading"
          @click="$router.push({ name: 'students'})"
        >
          Cancela
        </v-btn>
        <v-btn
          :disabled="loading"
          color="#2EACB3"
          @click="checkAction"
        >
          Salvar
        </v-btn>
      </template>
    </v-card>
  </div>
</template>
<script>
import api from '@/api/api';
import { useSnackBar } from '@/stores/snackBar.js'

  export default {
    name: 'EditStudents',

    props: {
      studentId: {
        type: Number,
        default: null
      },
      studentName: {
        type: String,
        default: ''
      },
      dialogEditStudent: {
        type: Boolean,
        default: false
      }
    },
  data: () => ({
    loading: false,
    dialog: false,
    updateStudent: false,

    emailRules: [
      (value) => {
        if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
        return 'informe um e-mail válido'
      }
    ],
    cpfRules: [
      (value) => {
        if (value?.length >= 11) return true
        return 'CPF deve conter pelo menos 11 caracteres'
      }
    ],
    nameRules: [
      (value) => {
        if (value?.length >= 3) return true
        return 'Nome deve conter pelo menos 3 caracteres'
      }
    ],
    raRules: [
      (value) => {
        if (value?.length >= 3) return true
        return 'RA deve conter pelo menos 3 caracteres'
      }
    ],
    student: {
      name: null,
      cpf: null,
      email: null,
      ra: null
    }
  }),
  computed: {
    snackBar() {
      return useSnackBar()
    },
    id() {
      return this.$route.params.id
    }
  },
  watch: {
    studentName () {
      this.name = this.studentName
    },
    dialogEditStudent () {
      this.dialog = this.dialogEditStudent ? this.dialogEditStudent : false
    }
  },
  async created () {
    if (this.id) {
      await this.getStudent()
    }
  },

  methods: {
    async getStudent() {
      try {
        const res = await api.getStudent(this.id)
        if (res.data) {
          this.student = res.data
          this.updateStudent = true
        }
      } catch {
        this.updateStudent = false
        this.snackBar.increment({show: true, msg: 'Não foi possível obter os dados do aluno', color: 'warning'} )
      }
    },

    async checkAction () {
      if (this.updateStudent) {
        await this.update()
        return
      }
      await this.save()
    },

    async save () {
      this.loading = true
      const data = {
        name: this.student.name,
        cpf: this.student.cpf,
        email: this.student.email,
        ra: this.student.ra
      }
      try {
        await api.createStudent(data)
        this.snackBar.increment({show: true, msg: 'Aluno cadastrado com sucesso', color: 'success'} )
        this.loading =false
        this.$router.push({ name: 'students'})
      } catch (e) {
        this.loading =false
        const feedback = e?.response?.data?.message ?? 'Ocorreu um erro, tente novamente mais tarde'
        this.snackBar.increment({show: true, msg: feedback, color: 'warning'} )
      }
    },

    async update () {
      this.loading = true
      const data = {
        name: this.student.name,
        cpf: this.student.cpf,
        email: this.student.email
      }
      try {
        await api.updateStudent(this.id, data)
        this.snackBar.increment({show: true, msg: 'Aluno atualizado com sucesso', color: 'success'} )
        this.loading = false
        this.$router.push({ name: 'students'})
      } catch (e) {
        this.loading = false
        const feedback = e?.response?.data?.message ?? 'Ocorreu um erro, tente novamente mais tarde'
        this.snackBar.increment({show: true, msg: feedback, color: 'warning'} )
      }
    }
  }
}
</script>