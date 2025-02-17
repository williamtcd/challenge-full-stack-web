import { defineStore } from 'pinia'

export const useSnackBar = defineStore('snackBar', {
  state() {
    return {
      snackbar: {
        show: false,
        msg: '',
        id: null,
        color: 'success'
      }
    }
  },

  actions: {
    increment(value) {
      value.id = value.msg + Math.random()
      this.$state.snackbar = value
    }
  },

  getters: {
    showSnackBar() {
      return this.snackbar
    }
  }
})
