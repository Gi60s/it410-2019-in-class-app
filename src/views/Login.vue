<template>
  <div class="about">
    <h2>Login</h2>
    <el-form ref="form" v-model="form" label-width="80px" @submit.prevent="login()">
      <el-form-item label="Username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">Log In</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'login',
  data: () => {
    return {
      form: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    login () {
      window.user = {
        username: this.username,
        password: this.password
      }
      this.$router.push({ name: 'home'});
    }
  }
}
</script>
