<template>
  <div class="home">
    <!-- banner -->
    <div class="w-100 mb-40">
      <el-carousel trigger="click" height="180px" indicator-position="none">
        <el-carousel-item
          v-for="(item, index) in bannerList"
          :key="'BL_' + index"
        >
          <img :src="item.imgURL" alt="" width="100%" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="p-20">
      <!-- introduce -->
      <div class="w-100 mb-70">
        <div
          class="w-100 d-flex align-items-center justify-content-center flex-column"
        >
          <TitleText title="什麼是一番賞？" />
          <div
            class="w-100 d-flex align-items-center justify-content-center flex-column"
            v-for="(item, index) in introduceList"
            :key="'IL_' + index"
          >
            <p class="m-0 font-s-18" :class="item.pad">{{ item.text }}</p>
          </div>
        </div>
      </div>
      <!-- all banpresto -->
      <div class="w-100 home-product">
        <div
          class="w-100 d-flex align-items-center justify-content-center flex-column"
        >
          <TitleText title="所有商品" />
          <div
            class="w-100 d-flex align-items-center justify-content-center flex-column"
          >
            <div
              class="productCard mb-50 d-flex align-items-center flex-column"
              v-for="(item, index) in productList"
              :key="'PL_' + index"
            >
              <img :src="item.imgURL" alt="" width="100%" />
              <div class="w-100">
                <div class="p-20 d-flex align-items-center flex-column">
                  <div class="w-100 d-flex flex-column">
                    <div class="d-flex align-items-center flex-row">
                      <img
                        :src="item.statusImg"
                        alt="product status"
                        width="40px"
                        v-if="item.statusImg"
                      />
                      <strong class="font-s-20 ml-10">{{
                        item.titleName_ch
                      }}</strong>
                    </div>

                    <strong class="font-s-18 ml-10">{{
                      item.titleName_en
                    }}</strong>
                  </div>
                  <div class="w-100 mt-20 d-flex align-items-center flex-row">
                    <strong class="font-s-18">抽獎狀態：</strong>
                    <p class="m-0 font-s-16">{{ item.leftTicket }}</p>
                  </div>
                  <div class="w-100 mt-30">
                    <button class="py-10 font-s-16" @click="moreInfo(item)">
                      點我看商品資訊
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleText from "@/components/TitleText.vue";

export default {
  components: {
    TitleText,
  },
  data() {
    return {
      bannerList: [
        {
          imgURL:
            "https://bpnavi.jp/s/fc/bnp_media/image/3377/JOTVvldWsEhb8D.jpg",
        },
        {
          imgURL: "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu3/images/main.jpg",
        },
        {
          imgURL:
            "https://bpnavi.jp/s/fc/bnp_media/image/3376/RGNgXBDmwP97yU.jpg",
        },
        {
          imgURL:
            "https://bpnavi.jp/s/fc/bnp_media/image/3431/wrfRats938JMKk.jpg",
        },
        {
          imgURL: "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/main.jpg",
        },
      ],
      introduceList: [
        {
          text: "這是一種在日本全國便利商店或書店、",
          pad: "pb-10",
        },
        {
          text: "模型玩具專賣店等地點販售，",
          pad: "pb-10",
        },
        {
          text: "可以抽到原創商品且人人有獎的",
          pad: "pb-10",
        },
        {
          text: "動漫畫遊戲周邊商品抽獎。",
          pad: "pb-20",
        },
        {
          text: "一定能獲得某件商品",
          pad: "pb-20",
        },
        {
          text:
            "不僅如此，若您抽出店家最後一張抽獎券，還可以獲得特別的LAST ONE獎（最後賞）",
          pad: "",
        },
      ],
      productList: [
        {
          value: "kabi",
          imgURL:
            "https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/122750290_2105280602936033_355687309728757783_o.jpg?_nc_cat=103&ccb=2&_nc_sid=cdbe9c&_nc_ohc=InDlz1TG1iAAX-vt0mX&_nc_ht=scontent-tpe1-1.xx&oh=a43390bee140a036c6b1532e14b29dca&oe=5FD730D0",
          titleName_ch: "一番賞 星之卡比",
          titleName_en: "Starlight Theater",
          leftTicket: "剩餘32抽",
          statusImg: "",
        },
        {
          value: "ghost_third",
          imgURL:
            "https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/119564732_352024309507941_5261547502033368095_o.jpg?_nc_cat=101&ccb=2&_nc_sid=730e14&_nc_ohc=vFBA0MagV7kAX_lOyjl&_nc_ht=scontent-tpe1-1.xx&oh=5552c9cfc52c387c94584d68ddd5da51&oe=5FD4404C",
          titleName_ch: "一番賞 鬼滅之刃～參～（代理版）",
          titleName_en: "",
          leftTicket: "剩餘42抽",
          statusImg: require("@/assets/images/hot.png"),
        },
        {
          value: "sailorMoon",
          imgURL:
            "https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/120336162_120297809829553_2850251799173502667_o.jpg?_nc_cat=103&ccb=2&_nc_sid=8bfeb9&_nc_ohc=ge1lw7oNdx8AX9weje3&_nc_ht=scontent-tpe1-1.xx&oh=1f896703c30256d593e55a7d00c6432b&oe=5FD6F8C3",
          titleName_ch: "一番賞 劇場版「美少女戰士」",
          titleName_en: "Sailormoon Eternal",
          leftTicket: "剩餘54抽",
          statusImg: "",
        },
        {
          value: "rem",
          imgURL:
            "https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/123558948_2117467788383981_9188881249463876539_o.jpg?_nc_cat=107&ccb=2&_nc_sid=cdbe9c&_nc_ohc=OJ8Vagn4PGUAX8n_Mq0&_nc_oc=AQl83nqF8msHF8FfKh1QVVW3m59sJGCfBVJfqmp07cQCvxHFlMyT27Sn-bU9SdzCIrQ&_nc_ht=scontent-tpe1-1.xx&oh=70b3a5395d3ac4ccc883233941d5e291&oe=5FD6644B",
          titleName_ch: "一番賞 從零開始的異世界生活",
          titleName_en: "To be continued",
          leftTicket: "剩餘50抽",
          statusImg: require("@/assets/images/hot.png"),
        },
        {
          value: "ghost_train",
          imgURL:
            "https://scontent-tpe1-1.xx.fbcdn.net/v/t1.0-9/121621251_170498808005891_7333042428321368761_o.jpg?_nc_cat=107&ccb=2&_nc_sid=730e14&_nc_ohc=IGEpe4x454MAX9qGruv&_nc_ht=scontent-tpe1-1.xx&oh=589ef6eca72ffe7868981449f05d41a7&oe=5FD5ED65",
          titleName_ch: "一番賞 鬼滅之刃",
          titleName_en: "～無限列車篇～",
          leftTicket: "剩餘65抽",
          statusImg: require("@/assets/images/new.png"),
        },
      ],
    };
  },
  methods: {
    moreInfo(data) {
      this.$router.push({
        name: "product",
        params: { productName: data.value },
      });
    },
  },
};
</script>

<style lang="scss">
.home {
  &-product {
    .productCard {
      border: 1px solid white;
      button {
        width: 100%;
        border-radius: 10px;
        letter-spacing: 0.3rem;
        font-weight: bolder;
        background: white;
        border: 0;
      }
    }
  }
}
</style>