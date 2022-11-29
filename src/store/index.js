import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import UsersModule from "./modules/usersModule"
import WarrantiesModule from "@/store/modules/warrantiesModule";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        UsersModule,
        WarrantiesModule
    },
    plugins: [createPersistedState()]
});

