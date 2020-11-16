<template>
  <div id="header">
    <div class="w-100 titlebar pos-fixed">
      <div class="w-100 d-flex align-items-center justify-content-center py-10">
        <router-link to="/">
          <img
            src="https://sn.bpnavi.jp/assets/img/logo_kuji.png"
            alt="LOGO"
            width="120px"
          />
        </router-link>
        <div class="pos-absolute startAward mr-10 mt-10">
          <router-link :to="{ name: 'lottery' }">
            <img src="@/assets/images/wheel.png" alt="wheel" width="30px">
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TurnTable from "./TurnTable.vue";

export default {
  components: {
    TurnTable,
  },
};
</script>

<style lang="scss">
#header {
  .titlebar {
    top: 0;
    background: black;
    border-bottom: 1px solid rgba($color: #888, $alpha: 0.8);
    z-index: 999;
  }
  .startAward {
    top: 0;
    right: 0;
    opacity: 0.8;
  }
}
</style>