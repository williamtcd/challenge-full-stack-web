<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    persistent
  >
    <v-card
      prepend-icon="mdi-delete"
      title="APAGAR ALUNO(A)"
    >
      <template #text>
        <v-progress-linear
          v-if="loading"
          color="#008ABD"
          indeterminate
        />
        Tem certeza que deseja apagar o(a) aluno(a) {{ studentName }}?
      </template>
      <template #actions>
        <v-spacer />
        <v-btn
          :disabled="loading"
          @click="close"
        >
          Cancela
        </v-btn>
        <v-btn
          :disabled="loading"
          color="#CE0F2E"
          @click="deleteStudentConfirm"
        >
          Apagar
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
<script>
  import api from '@/api/api';
  import { useSnackBar } from '@/stores/snackBar.js'
  export default {
  name: 'DeleteStudents',

  props: {
    studentId: {
      type: Number,
      default: null
    },
    studentName: {
      type: String,
      default: ''
    },
    dialogDeleteStudent: {
      type: Boolean,
      default: false
    }
  },
emits: ['reload', 'close'],

  data: () => ({
    loading: false,
    name: '',
    dialog: false
  }),

  computed: {
    snackBar() {
      return useSnackBar()
    }
  },
  watch: {
    dialogDeleteStudent () {
      this.dialog = this.dialogDeleteStudent ? this.dialogDeleteStudent : false
    }
  },

  methods: {
    close () {
      this.$emit('close')
    },
    async deleteStudentConfirm () {
      this.loading = true
      try {
        await api.deleteStudent(this.studentId)
        this.$emit('reload')
        this.snackBar.increment({show: true, msg: 'Aluno excluido com sucesso', color: 'success'} )
        this.loading = false
        this.$emit('close')
      } catch (e) {
        this.loading = false
        const feedback = e?.response?.data?.message ?? 'Ocorreu um erro, tente novamente mais tarde'
        this.snackBar.increment({show: true, msg: feedback, color: 'warning'} )
      }
    }
  }
}
</script>