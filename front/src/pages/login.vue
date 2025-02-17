<script super lang="ts">
import CardLogin from '@/components/CardLogin.vue'
export default {
  components: {
    CardLogin
  },
  layout: 'auth'
}
</script>

<template>
  <div
    class="d-flex justify-center align-center"
    style="background-color: #dee2e6"
  >
    <CardLogin />
  </div>
</template>
