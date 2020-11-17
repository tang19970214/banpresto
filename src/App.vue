<template>
  <div id="app">
    <el-backtop></el-backtop>
    <Header />
    <router-view class="mt-90"></router-view>
    <Footer v-if="$route.name !== 'lottery'" />
    <div
      class="lineLink pos-fixed mr-20 mb-150"
      v-if="$route.name !== 'lottery'"
      @click="openLineGroup"
    >
      <!-- <a href="http://line.me/ti/g/R3Rrwe8sqb" target="_blank"> -->
      <img src="@/assets/images/line.png" alt="" width="70px" />
      <!-- </a> -->
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
  methods: {
    openLineGroup() {
      window.close();
      window.open("http://line.me/ti/g/R3Rrwe8sqb");
    },
  },
};
</script>

<style lang="scss">
.lineLink {
  bottom: 0;
  right: 0;
}
</style>