<template>
  <div v-if="getUnitsLoaded">
    <div v-if="!unitsEmpty">
      <p class="pageHeader">Ваши гарантийные сертификаты</p>
      <vue-horizontal class="horizontal warrantiesScroller">
        <!--      <div  v-for="i in items" :key="i">-->
        <!--        <WarrantyElement class="element" :header="i" type="Блаблабла" period="xx.xx.xx" />-->
        <!--      </div>-->
        <div v-for="unit in getUnits" :key="unit.id">
          <WarrantyElement class="element" :warranty-id="unit.id" :header="unit.manufacturer + ' ' + unit.model" :type="unit.modelType" :period="unit.warrantyEndDate" />
        </div>
      </vue-horizontal>
    </div>

    <div v-if="unitsEmpty">
      <p class="pageHeader">У вас пока нет гарантиных сертификатов!</p>
    </div>


    <b-button v-b-modal.addCertificate variant="primary certificateButton">ДОБАВИТЬ СЕРТИФИКАТ</b-button>

    <b-modal id="addCertificate" title="Добавление сертификата"
             ref="modal"
             @show="resetModal"
             @hidden="resetModal"
             @ok="handleOk">
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group id="input-group-2" label="Ваш сертификат:" label-for="inputCode"
                      invalid-feedback="Необходимо заполнить поле">
          <b-form-input
              id="inputCode"
              :state="checkCodeState"
              v-model="form.code"
              placeholder="Введите код"
              required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

  </div>
</template>

<script>

import VueHorizontal from 'vue-horizontal';
import WarrantyElement from "@/components/WarrantyElement";
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "WarrantyAllView",
  data() {
    return {
      // items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      // bgColor: "#004085"
      form: {
        code: ''
      }
    }
  },
  components: {
    WarrantyElement,
    VueHorizontal
  },
  methods: {
    ...mapActions(["fetchWarranties", "addWarranty"]),
    ...mapGetters(["getCertForm"]),
    ...mapMutations(["setCurrentUnit"]),

    resetModal() {
      this.form.code = ''
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault()
      this.handleSubmit()
    },
    async handleSubmit() {
      if (this.form.code === '') {
        return
      }
      let codeData = new FormData();
      codeData.append("qr", this.form.code);
      await this.addWarranty(codeData);

      this.makeToast();
      this.$nextTick(() => {
        this.$bvModal.hide('addCertificate')
      })
    },
    makeToast() {
      let variant = 'success'
      if (this.getCertForm().state === false) {
        variant = 'danger'
      }
      this.$root.$bvToast.toast(this.getCertForm().message, {
        title: "Уведомление",
        variant: variant,
        solid: true
      })
    }

  },
  computed: {
    ...mapGetters(["getUnits", "getUnitsLoaded"]),
    checkCodeState() {
      return this.form.code === '' ? false : null;
    },
    unitsEmpty() {
      return this.getUnits.length === 0;
    }
  },
  beforeMount() {
    this.fetchWarranties();
    this.setCurrentUnit(null);
  }

}
</script>

<style scoped>

  .warrantiesScroller {
    /*margin-left: 2%;*/
    /*margin-right: 2%;*/
    /*margin-top: 2%;*/
    width: 80%; /* Can be in percentage also. */
    height: auto;
    margin: 0 auto;
    position: relative;

    /*margin: 0 auto;*/

  }


  .certificateButton {
    margin-left: 2%;
    margin-right: 2%;
    margin-top: 2%;
  }
</style>