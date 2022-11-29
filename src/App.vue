<template>
  <div id="app">
    <NavbarMain />
    <router-view />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import NavbarMain from "@/components/NavbarMain";
import {mapActions} from "vuex";

export default {
  name: 'App',
  components: {
    NavbarMain
  },
  methods: {
    ...mapActions(["debugFunc"]),
    test() {
      this.debugFunc();
      console.log(this.$store.getters.getLoggedIn);
    }
  },
  // beforeMount() {
  //   this.test();
  // }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
  #app {
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
  }

  .btn.btn-primary {
    background-color: #004085!important;
    font-size: 15px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
  }

  .btn.btn-danger {
    font-size: 15px;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
  }

  .pageHeader {
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 20px;
    margin-left: 2%;
    margin-top: 2%;
  }

  .normalText {
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
    margin-left: 2%;
    margin-top: 2%;
  }

  .authComp {
    padding-top: 10%;
  }

  .authContainer {
    height: 100%;
    align-content: center;
    padding-top: 10%;
  }

  .links a{
    margin-left: 4px;
  }

  .card {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    width: 500px;
  }

</style>
