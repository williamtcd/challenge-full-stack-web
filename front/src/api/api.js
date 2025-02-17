import axios from '@/api/axios'
import router from '@/router'
export async function login(credentials) {
  const login = await axios.post('/auth/login', credentials)
  localStorage.setItem('token', login.data.accessToken)
  axios.defaults.headers.common.Authorization = `Bearer ${login.data.accessToken}`
  await this.check()
}

export async function check() {
  try {
    await axios.post('/auth/check')
  } catch {
    this.logOut()
  }
}

export function logOut() {
  localStorage.removeItem('token')
  delete axios.defaults.headers.common.Authorization
  router.push({ name: 'login' })
}

export async function listStudents() {
  return axios.get('/students')
}
export async function getStudent(id) {
  return axios.get('/students/' + id)
}
export async function createStudent(student) {
  return axios.post('/students', student)
}
export async function updateStudent(id, student) {
  return axios.put('/students/' + id, student)
}
export async function updatePartialStudent(id, student) {
  return axios.put('/students/' + id, student)
}
export async function deleteStudent(id) {
  return axios.delete('/students/' + id)
}

export default {
  login,
  logOut,
  check,
  listStudents,
  getStudent,
  createStudent,
  updateStudent,
  updatePartialStudent,
  deleteStudent
}
