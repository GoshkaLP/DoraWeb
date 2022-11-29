<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark" class="navbar-main">
      <b-navbar-brand class="navbar-main-brand" :to="{path: '/'}">Dora</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item v-if="getLoggedIn" :to="{path: '/'}">Сертификаты</b-nav-item>
          <b-nav-item v-if="getLoggedIn" :to="{path: '/profile'}">Личный кабинет</b-nav-item>
<!--          <b-nav-item @click="logout" href="#">Выйти</b-nav-item>-->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
// import {mapActions, mapGetters} from "vuex";

import {mapGetters} from "vuex";

export default {

  name: "NavbarMain",
  computed: {
    ...mapGetters(["getLoggedIn"])
  }
  // methods: {
  //   ...mapActions(["logoutUser"]),
  //   ...mapGetters(["getLoggedIn"]),
  //
  //   async logout() {
  //     await this.logoutUser();
  //     if (this.getLoggedIn() === false) {
  //       await this.$router.push('/auth');
  //     }
  //   }
  // }
}
</script>

<style scoped>
  .navbar.navbar-dark.bg-dark{
    background-color: #004085!important;
  }

  .navbar-main-brand {
    font-family: 'Roboto', sans-serif;
    font-weight: 900;
  }

  .navbar-main {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }
</style>