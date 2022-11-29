<template>
  <div>
    <div class="warrantyElement" @click="openWarranty">
      <img
          src="../assets/warranty.svg"
          class="warrantyElementSubtract"
       alt=""/>
      <p class="warrantyElementHeader">{{ header }}</p>
      <p class="warrantyElementType">{{ type }}</p>
      <p class="warrantyElementPeriod">Гарантия: {{ period }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "WarrantyElement",
  props: ['header', 'type', 'period', 'warrantyId'],
  methods: {
    openWarranty() {
      // alert(this.$props.header);
      this.$router.push("/warranty/" + this.$props.warrantyId);
    }
  }
}
</script>

<style scoped>
.warrantyElement {
  width: 156px;
  height: 209px;
  display: flex;
  position: relative;
  filter: drop-shadow(0px 4px 4px rgb(0 0 0 / 0.25));
  border-color: transparent;
  margin-bottom: 10px;
  margin-top: 10px;
}
.warrantyElementSubtract {
  width: 156px;
  height: 209px;
  position: absolute;
}
.warrantyElementHeader {
  top: 23px;
  left: 0;
  right: 0;
  color: black;
  height: auto;
  position: absolute;
  font-size: 15px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  font-family: Roboto, 'sans-serif';
  font-weight: 500;
  line-height: 12px;
  /*margin-right: 0;*/
  /*margin-bottom: 0;*/

}
.warrantyElementType {
  top: 100px;
  left: 0;
  right: 0;
  color: black;
  height: auto;
  position: absolute;
  font-size: 12.5px;
  text-align: center;
  font-family: Roboto, 'sans-serif';
  font-weight: 300;
  line-height: 12px;
  font-stretch: normal;
  margin-right: auto;
  margin-left: auto;
}
.warrantyElementPeriod {
  top: 120px;
  left: 0;
  right: 0;
  color: black;
  width: 120px;
  height: auto;
  position: absolute;
  font-size: 12.5px;
  text-align: center;
  font-family: Roboto, 'sans-serif';
  font-weight: 300;
  line-height: 12px;
  margin-right: auto;
  margin-left: auto;
}
</style>