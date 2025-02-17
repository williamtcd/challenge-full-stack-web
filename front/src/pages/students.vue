<!-- eslint-disable vue/valid-v-slot -->
<template>
  <div class="mx-10 my-10">
    <v-data-table
      :headers="headers"
      :items="students"
      :sort-by="[{ key: 'name', order: 'asc' }]"
      items-per-page="5"
      :search="search"
      :loading="loading"
    >
      <template #top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Alunos</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-btn
            color="#2EACB3"
            @click="$router.push({ name: 'editStudent'})"
          >
            Cadastrar Aluno
          </v-btn>
          <DeleteStudent
            :dialog-delete-student="dialogDeleteStudent"
            :student-id="studentId"
            :student-name="studentName"
            @reload="listStudents"
            @close="closeDialogs"
          />
        </v-toolbar>

        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Digite sua busca"
          variant="underlined"
          class="mx-10 mt-2"
        />
      </template>
      <template #item.actions="{ item }">
        <v-icon
          class="me-2"
          size="small"
          color="#2EACB3"
          @click="$router.push({name: 'editStudent', params: { id:item.id }})"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          class="ml-4"
          size="small"
          color="#CE0F2E"
          @click="OpenDeleteStudent(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template #no-data>
        Nenhum aluno cadastrado
      </template>
      <template #loading>
        <v-skeleton-loader type="table-row@5" />
      </template>
    </v-data-table>
  </div>
</template>
<script>
  import api from '@/api/api'
  import DeleteStudent from '@/components/students/DeleteStudent.vue'
  import { useSnackBar } from '@/stores/snackBar.js'

    export default {
    name: 'Students',

    components: {
      DeleteStudent
    },

      data: () => ({
        dialog: false,
        search: '',
        dialogDeleteStudent: false,
        dialogEditStudent: false,
        studentName: '',
        studentId: null,
        headers: [
          {
            title: 'Registro academico',
            align: 'center',
            key: 'ra',
            sortable: true
          },
          {
            title: 'Nome',
            align: 'center',
            key: 'name',
            sortable: true
          },
          {
            title: 'CPF',
            align: 'center',
            key: 'cpf',
            sortable: true
          },

        { title: 'Ações',
          key: 'actions', 
          align: 'center',
          sortable: false
        },
        ],
        students: []
      }),

      computed: {
        snackBar() {
          return useSnackBar()
        }
      },

      watch: {
      },

      async created () {
        await this.listStudents() 
      },

      methods: {
        OpenDeleteStudent (student) {
          this.studentId = student.id
          this.studentName = student.name
          this.dialogDeleteStudent = true
        },

        closeDialogs () {
          this.dialogDeleteStudent = false
          this.studentId = null
          this.studentName = ''
        },

        async listStudents () {
          this.loading = true
          try {
            const res = await api.listStudents()
            this.students = res.data
          } catch (e) {
            const feedback = e?.response?.data?.message ?? 'Ocorreu um erro, tente novamente mais tarde'
            this.snackBar.increment({show: true, msg: feedback, color: 'warning'} )
          } finally {
            this.loading = false
          }
        }
      }
  }
</script>