<template>
  <div class="container authContainer">
    <div class="d-flex justify-content-center h-100">
      <b-card>
        <b-card-header class="cardHeader">
          <p>Регистрация</p>
        </b-card-header>
        <b-card-body>
          <b-form @submit="onSubmit">

            <b-form-group
                id="input-group-1"
                label="Электронная почта:"
                label-for="input-1">
              <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  placeholder="Введите вашу почту"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Пароль:" label-for="input-2">
              <b-form-input
                  id="input-2"
                  :state="passwordState"
                  v-model="form.password"
                  type="password"
                  placeholder="Введите пароль"
                  required
              ></b-form-input>
              <b-form-invalid-feedback id="input-2-feedback">
                {{passwordMessage}}
              </b-form-invalid-feedback>
            </b-form-group>

            <b-button type="submit" variant="primary">ЗАРЕГИСТРИРОВАТЬСЯ</b-button>
          </b-form>
        </b-card-body>
        <b-card-footer class="cardFooter">
          <div class="d-flex justify-content-center links">
            Уже зарегистрированы? <router-link to="/auth">Войти</router-link>
          </div>
        </b-card-footer>
      </b-card>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "RegisterView",
  computed: {
    passwordState() {
      return this.getRegisterForm().state;
    },
    passwordMessage() {
      return this.getRegisterForm().message;
    }
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(["registerUser"]),
    ...mapGetters(['getLoggedIn', "getRegisterForm"]),
    ...mapMutations(['setRegisterForm']),

    async onSubmit(event) {
      event.preventDefault()
      let regUser = new FormData();
      regUser.append("email", this.form.email);
      regUser.append("password", this.form.password);
      await this.registerUser(regUser);

      if (this.getLoggedIn()) {
        this.setRegisterForm({
          state: null,
          message: ''
        })
        await this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
  .cardHeader {
    font-family: 'Roboto', sans-serif;
    font-weight: 900;
    font-size: 20px;
    background-color: #F6F9FF;
    text-align: center;
  }

  .cardFooter {
    background-color: #F6F9FF;
  }

</style>