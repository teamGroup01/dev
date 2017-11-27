<template>
  <div>
    <el-button @click='login' type='danger'>log in</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$store.dispatch('LoginByUsername', { username: 'admin', password: 'admin' }).then(() => {
        this.$router.push({ path: '/' })
      })
    }
  }
}
</script>
