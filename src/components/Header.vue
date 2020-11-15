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
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#header {
  .titlebar {
    top: 0;
    background: black;
    border-bottom: 1px solid rgba($color: #888, $alpha: 0.8);
    z-index: 999;
  }
}
</style>