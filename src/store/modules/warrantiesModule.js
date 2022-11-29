import axiosInstance from "@/axios";
import { Buffer } from 'buffer';


const state = {
    units: {
        data: [],
        loaded: false
    },
    currentUnit: {
        data: null,
        loaded: false,
        claimStatus: null,
        photo: null,
    },
    currentUnitServices: {
        data: [],
        loaded: false
    },
    certForm: {
        state: null,
        message: ''
    },
    claimForm: {
        state: null,
        message: ''
    }
};

const actions = {
    async fetchWarranties(state) {
        state.commit("setUnitsLoaded", false);
        const response = await axiosInstance.get("/api/products/units");
        state.commit("clearUnits");
        console.log(response);
        if (response.data.message === "SUCCESS") {
            response.data.data.forEach(warranty => {
                state.commit("addUnit", warranty);
            });
            state.commit("setUnitsLoaded", true);
        }
    },
    async fetchWarranty(state, warrantyId) {
        state.commit("setUnitLoaded", false);
        state.commit("setUnitClaim", null);
        state.commit("setUnitPhoto", null);
        state.commit("setUnitServices", []);
        const response = await axiosInstance.get("/api/products/units/" + warrantyId);
        console.log(response);
        if (response.data.message === "SUCCESS") {
            state.commit("setCurrentUnit", response.data.data);
            const claimStatus = await axiosInstance.get("/api/warrantyClaim/status/" + warrantyId);
            if (claimStatus.data.message === "SUCCESS") {
                state.commit("setUnitClaim", claimStatus.data.data.status);
            }
            const photo = await axiosInstance.get("/api/products/units/photo/" + warrantyId, {
                responseType: "arraybuffer"
            });
            let strPhoto = Buffer.from(photo.data, 'binary').toString('base64');
            state.commit("setUnitPhoto", strPhoto);
            state.commit("setUnitLoaded", true);

            // const services = await axiosInstance.get("/api/serviceCenter/" + response.data.data.manufacturerId);
            // console.log(services)
            // if (services.data.message === "SUCCESS") {
            //     state.commit("setUnitServices", services.data.data);
            //     state.commit("setUnitServicesLoaded", true);
            // }
        }
    },
    async addWarranty(state, warrantyCode) {
        const response = await axiosInstance.post("/api/products/units/scan", warrantyCode);
        if (response.data.message === "SUCCESS") {
            state.commit("setCertForm", {
                state: true,
                message: "Сертификат был успешно добавлен!"
            })
            state.commit("addUnit", response.data.data);
        } else if (response.data.message === "WRONG_QR_CODE") {
            state.commit("setCertForm", {
                state: false,
                message: "Неверный код сертификата!"
            })
        } else if (response.data.message === "UNIT_NOT_EXISTS") {
            state.commit("setCertForm", {
                state: false,
                message: "Данного товара не существует!"
            })
        } else if (response.data.message === "UNIT_ALREADY_ASSIGNED") {
            state.commit("setCertForm", {
                state: false,
                message: "На данный товар уже активирована гарантия!"
            })
        }

    },
    async getServices(state, manufacturerId) {
        state.commit("setUnitServicesLoaded", false);
        const response = await axiosInstance.get("/api/serviceCenter/" + manufacturerId);
        console.log(response)
        if (response.data.message === "SUCCESS") {
            state.commit("setUnitServices", response.data.data);
            state.commit("setUnitServicesLoaded", true);
        }
    },
    async postClaim(state, form) {
        const response = await axiosInstance.post("/api/warrantyClaim/create", form)
        console.log(response)
        if (response.data.message === "SUCCESS") {
            state.commit("setClaimForm", {
                state: true,
                message: "Ваша заявка была успешно добавлена!"
            })
        } else {
            state.commit("setClaimForm", {
                state: false,
                message: "Произошла ошибка при создании вашей заявки!"
            })
        }
    }
};

const mutations = {
    setCertForm(state, payload) {
        state.certForm.state = payload.state;
        state.certForm.message = payload.message;
    },
    addUnit(state, payload) {
        state.units.data.push(payload);
    },
    clearUnits(state) {
        state.units.data = [];
    },
    setCurrentUnit(state, payload) {
        state.currentUnit.data = payload;
    },
    setUnitLoaded(state, payload) {
        state.currentUnit.loaded = payload;
    },
    setUnitClaim(state, payload) {
        state.currentUnit.claimStatus = payload;
    },
    setUnitPhoto(state, payload) {
        state.currentUnit.photo = payload;
    },
    setUnitServices(state, payload) {
        state.currentUnitServices.data = payload;
    },
    setUnitServicesLoaded(state, payload) {
      state.currentUnitServices.loaded = payload
    },
    setClaimForm(state, payload) {
        state.claimForm.state = payload.state;
        state.claimForm.message = payload.message;
    },
    setUnitsLoaded(state, payload) {
        state.units.loaded = payload;
    }
};

const getters = {
    getCertForm(state) {
        return state.certForm;
    },
    getUnits(state) {
        return state.units.data;
    },
    getCurrentUnit(state) {
        return state.currentUnit.data;
    },
    getUnitLoaded(state) {
        return state.currentUnit.loaded;
    },
    getUnitClaim(state) {
        return state.currentUnit.claimStatus;
    },
    getUnitPhoto(state) {
        return state.currentUnit.photo;
    },
    getUnitServices(state) {
        return state.currentUnitServices.data;
    },
    getUnitServicesLoaded(state) {
        return state.currentUnitServices.loaded;
    },
    getClaimForm(state) {
        return state.claimForm;
    },
    getUnitsLoaded(state) {
        return state.units.loaded;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
}
