<template>
  <div v-if="getUnitLoaded">
    <p class="pageHeader">Гарантийный сертфикат на {{getCurrentUnit.manufacturer}} {{getCurrentUnit.model}}</p>

    <div class="description">
      <img class="unitPhoto" v-bind:src="'data:image/jpeg;base64,'+getUnitPhoto" />
      <p class="normalText">Тип продукта: {{getCurrentUnit.modelType}}</p>
      <p class="normalText">Производитель: {{getCurrentUnit.manufacturer}}</p>
      <p class="normalText">Серийный номер: {{getCurrentUnit.serialNumber}}</p>
      <p class="normalText">Дата окончания гарантии: {{getCurrentUnit.warrantyEndDate}}</p>




      <b-button @click="warrantyClaim" v-if="getCurrentUnit.claimable && getUnitClaim === null" variant="primary claimButton">ЗАПИСАТЬСЯ НА ОБСЛУЖИВАНИЕ</b-button>

      <b-button v-if="!getCurrentUnit.claimable && getUnitClaim === null" disabled variant="primary claimButton">ЗАПИСАТЬСЯ НА ОБСЛУЖИВАНИЕ</b-button>

      <b-button v-b-modal.modalClaimStatus v-if="getUnitClaim !== null" variant="primary claimButton">СТАТУС ЗАЯВКИ</b-button>

      <b-modal id="modalClaimStatus" title="Статус заявки">
        <p>{{ getUnitClaim }}</p>
      </b-modal>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "WarrantyOneView",
  methods: {
    ...mapActions(["fetchWarranty"]),

    warrantyClaim() {
      this.$router.push('/warranty/claim/' + this.$route.params.id + '/' + this.getCurrentUnit.manufacturerId);
    }
  },
  computed: {
    ...mapGetters(["getCurrentUnit", "getUnitLoaded", "getUnitClaim", "getUnitPhoto"]),
  },
  beforeMount() {
    this.fetchWarranty(this.$route.params.id);
  }
}
</script>

<style scoped>
  .description {
    margin-top: 8%;
  }

  .claimButton {
    margin-top: 2%;
    margin-left: 2%;
  }

  .unitPhoto {
    width: 20%;
    height: auto;
    float: right;
    margin-right: 10%;
  }
</style>