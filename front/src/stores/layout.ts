import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state() {
    return {
      layout: ''
    }
  },

  actions: {
    increment(value: string) {
      this.$state.layout = value
    }
  },

  getters: {
    showLayout(): string {
      return this.layout
    }
  }
})
