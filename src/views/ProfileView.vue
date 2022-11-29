<template>
  <div>
    <p class="pageHeader">Сменить пароль</p>
    <b-card class="changePasswordCard">
      <b-form @submit="submitChangePassword">

        <b-form-group
            label="Введите старый пароль:"
            label-for="input-3">
          <b-form-input
              :state="oldPasswordState"
              v-model="form.oldPassword"
              id="input-3"
              type="password"
              placeholder="Ваш старый пароль"
              required
          ></b-form-input>
          <b-form-invalid-feedback id="input-3-feedback">
            {{oldPasswordMessage}}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
            label="Введите новый пароль:"
            label-for="input-4">
          <b-form-input
              v-model="form.newPassword"
              id="input-4"
              type="password"
              placeholder="Ваш новый пароль"
              required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Введите новый пароль еще раз:" label-for="input-5">
          <b-form-input
              v-model="form.newPasswordAgain"
              :state="newPasswordState"
              id="input-5"
              type="password"
              placeholder="Ваш новый пароль еще раз"
              required
          ></b-form-input>
          <b-form-invalid-feedback id="input-5-feedback">
            {{newPasswordMessage}}
          </b-form-invalid-feedback>
        </b-form-group>

        <b-button type="submit" variant="primary">СМЕНИТЬ ПАРОЛЬ</b-button>

      </b-form>


    </b-card>


    <b-button @click="logout" variant="danger logoutButton">ВЫХОД</b-button>


  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "ProfileView",
  computed: {
    oldPasswordState() {
      return this.getChangePassForm().state;
    },
    oldPasswordMessage() {
      return this.getChangePassForm().message;
    },

    newPasswordState() {
      return this.form.newPassword === this.form.newPasswordAgain ? null : false;
    },
    newPasswordMessage() {
      if (this.form.newPassword !== this.form.newPasswordAgain) {
        return 'Ваши новые пароли не совпадают.'
      }
      return '';
    }
  },
  methods: {
    ...mapActions(["logoutUser", "changePassword"]),
    ...mapGetters(["getLoggedIn", "getChangePassForm"]),
    ...mapMutations(["setChangePassForm"]),

    async logout() {
      await this.logoutUser();
      if (this.getLoggedIn() === false) {
        this.setChangePassForm({
          state: null,
          message: ''
        })
        await this.$router.push('/auth');
      }
    },

    async submitChangePassword(event) {
      event.preventDefault();
      let passwordData = new FormData();
      // console.log(localStorage.getItem("token"))
      passwordData.append("old_password", this.form.oldPassword);
      passwordData.append("new_password", this.form.newPassword);
      await this.changePassword(passwordData);
      console.log(passwordData);
      this.$root.$bvToast.toast('Вы успешно сменили пароль!', {
        title: "Уведомление",
        variant: "success",
        solid: true
      })
    }


  },
  data() {
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        newPasswordAgain: ''
      }
    }
  }
}
</script>

<style scoped>
  .changePasswordCard {
    margin-left: 2%;

  }

  .logoutButton {
    margin-left: 2%;
    margin-right: 2%;
    margin-top: 2%;
  }
</style>