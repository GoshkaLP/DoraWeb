<template>
  <div v-if="getUnitServicesLoaded">
    <p class="pageHeader">Сервисные центры {{getCurrentUnit.manufacturer}}</p>
    <GmapMap v-if="getUnitServicesLoaded"
        class="servicesMap"
        :center="center"
        :zoom="12"
        map-type-id="terrain"
    >
      <GmapMarker
          :key="index"
          v-for="(m, index) in getServicesLocations"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          @click="markerClick"
      />
    </GmapMap>

    <b-modal id="postClaim" title="Заявка на обслуживание"
             ref="modal"
             @show="resetClaimModal"
             @hidden="resetClaimModal"
             @ok="handleClaimOk">
      <form ref="form" @submit.stop.prevent="handleClaimSubmit">
        <b-form-group id="input-group-2" label="Опишите вашу проблему:" label-for="inputProblem"
                      invalid-feedback="Необходимо заполнить поле">
          <b-form-input
              id="inputProblem"
              :state="checkProblemStatus"
              v-model="form.problem"
              placeholder="У меня сломался..."
              required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>


<script>

import {mapActions, mapGetters} from "vuex";

export default {
  name: "WarrantyClaimView",
  computed: {
    ...mapGetters(["getCurrentUnit", "getUnitServicesLoaded", "getUnitServices"]),
    getServicesLocations() {
      console.log("COMPUTED")
      let services = [];
      if (this.getUnitServicesLoaded === true) {
        this.getUnitServices.forEach(service => {
          services.push({
            position: {
              lat: parseFloat(service.latitude),
              lng: parseFloat(service.longitude),
            },
            id: service.id
          });
        })
      }
      console.log(services);
      return services;
    },
    checkProblemStatus() {
      return this.form.problem === '' ? false : null;
    }
  },
  data() {
    return {
      center: { lat: 55.77021206606889, lng: 37.61388993409446 },
      form: {
        problem: ''
      }
    }
  },
  methods: {
    ...mapActions(["getServices", "postClaim"]),
    ...mapGetters(["getClaimForm"]),
    resetClaimModal() {
      this.form.problem = ''
    },
    handleClaimOk(bvModalEvent) {
      bvModalEvent.preventDefault()
      this.handleClaimSubmit()
    },
    async handleClaimSubmit() {
      if (this.form.problem === '') {
        return
      }
      let claimData = new FormData();
      claimData.append('unit_id', this.$route.params.id);
      claimData.append('service_center_id', this.$route.params.mId);
      claimData.append('problem', this.form.problem);
      await this.postClaim(claimData);

      this.makeClaimToast();
      this.$nextTick(() => {
        this.$bvModal.hide('postClaim')
      })
    },
    makeClaimToast() {
      let variant = 'success'
      let status = true;
      if (this.getClaimForm().state === false) {
        variant = 'danger';
        status = false;
      }
      this.$root.$bvToast.toast(this.getClaimForm().message, {
        title: "Уведомление",
        variant: variant,
        solid: true
      });
      if (status) {
        this.$router.push('/warranty/' + this.$route.params.id);
      }
    },
    markerClick() {
      this.$bvModal.show('postClaim');
    }
  },
  beforeMount() {
    this.getServices(this.$route.params.mId)
  }
}
</script>

<style scoped>

  .servicesMap {
    width: 90%;
    height: 500px;

    margin: 0 auto;
  }
</style>