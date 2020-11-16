<template>
  <div id="product">
    <div class="w-100 mb-70">
      <div
        class="titleCard w-100 d-flex align-items-center flex-column"
        v-for="(item, index) in filterProduct(productList)"
        :key="'PL_' + index"
      >
        <img :src="item.bannerPath" alt="" width="100%" />
        <div class="w-100">
          <div class="p-20">
            <div class="w-100 d-flext flex-column">
              <strong class="font-s-24">
                {{ item.titleName }}
              </strong>
              <div class="mt-20 titleCard-leftNum d-inline-flex">
                <strong class="font-s-18"
                  >剩餘籤數：{{ item.leftTickets }}</strong
                >
              </div>
              <div
                class="titleCard-price w-100 d-flex align-items-start flex-row mt-30"
              >
                <strong class="font-s-20">售價：</strong>
                <div
                  class="w-100 d-flex align-items-center justify-content-start"
                >
                  <div class="w-100 d-flex flex-column">
                    <p class="m-0 font-s-18 pb-10">1抽 {{ item.price_one }}</p>
                    <p class="m-0 font-s-18">5抽 {{ item.price_five }}</p>
                  </div>
                </div>
              </div>
              <div class="w-100 mt-20">
                <p class="m-0">（實際已店家張貼之價格為主）</p>
              </div>
              <div
                class="w-100 mt-30 d-flex align-items-end justify-content-center"
                v-if="item.value == 'ghost_train'"
              >
                <img
                  src="@/assets/images/medal.png"
                  alt=""
                  width="80px"
                  @click="specialAward = true"
                />
                <img
                  class="pos-absolute ml-60 mt-10"
                  src="@/assets/images/click.png"
                  alt=""
                  width="40px"
                />
              </div>
            </div>
          </div>
          <div class="w-100 mt-20">
            <iframe
              width="100%"
              :src="item.videoPath"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="w-100 mt-20" v-if="item.menuPath">
            <img :src="item.menuPath" alt="" width="100%" />
          </div>
          <div class="w-100 mt-20" v-if="item.reward">
            <div class="p-20">
              <div
                class="titleCard-rewardList mb-20"
                v-for="(items, index) in item.reward"
                :key="'RW_' + index"
              >
                <div class="w-100 d-flex align-items-center flex-column">
                  <div
                    class="w-100 py-10 d-flex align-items-center text-center flex-column"
                  >
                    <strong class="font-s-24">{{ items.title }}</strong>
                    <strong class="font-s-18">{{ items.name }}</strong>
                    <p class="m-0">{{ items.amount }}</p>
                  </div>

                  <img :src="items.imgURL" alt="Reward" width="100%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="特別活動" :visible.sync="specialAward" width="90%">
      <!-- 鐵支獎加送公仔 -->
      <span class="font-s-14">
        即日起，只要五抽皆同獎項（例：5抽皆H），即贈
        <strong class="font-s-22"> 『2D 索隆』 </strong>
      </span>
      <img class="mt-30" src="@/assets/images/zoro.jpg" alt="ZORO" width="100%" />
      <span slot="footer" class="dialog-footer">
        <el-button class="w-100" type="primary" @click="specialAward = false" plain>確認</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productList: [
        {
          value: "kabi",
          bannerPath:
            "https://bpnavi.jp/s/fc/bnp_media/image/3377/JOTVvldWsEhb8D.jpg",
          titleName: "一番くじ 星のカービィ Starlight Theater",
          leftTickets: "32張",
          price_one: "NT$320",
          price_five: "NT$1500",
          videoPath: "https://www.youtube.com/embed/56q71a4ntmU",
          menuPath:
            "https://sn.bpnavi.jp/page/kirby/kirby13/0925/kk10m_ST_banner_1002x9490 _0925-01_zK5JX3wu.jpg",
        },
        {
          value: "ghost_third",
          bannerPath:
            "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu3/images/main.jpg",
          titleName: "一番くじ 鬼滅の刃 ～参～",
          leftTickets: "42張",
          price_one: "NT$320",
          price_five: "NT$1500",
          videoPath: "https://www.youtube.com/embed/ykRZwEsKdyk",
          menuPath:
            "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu3/images/cp01.jpg?v2",
        },
        {
          value: "sailorMoon",
          bannerPath:
            "https://bpnavi.jp/s/fc/bnp_media/image/3376/RGNgXBDmwP97yU.jpg",
          titleName:
            "一番くじ 劇場版「美少女戦士セーラームーンEternal」Let's party!",
          leftTickets: "54張",
          price_one: "NT$320",
          price_five: "NT$1500",
          videoPath: "",
          menuPath:
            "https://sn.bpnavi.jp/page/sailormoon/sailormoon9/0807/9sm_web_0803-01.jpg",
        },
        {
          value: "rem",
          bannerPath:
            "https://bpnavi.jp/s/fc/bnp_media/image/3431/wrfRats938JMKk.jpg",
          titleName:
            "一番くじ Re:ゼロから始める異世界生活－物語は、To be continued－",
          leftTickets: "50張",
          price_one: "NT$420",
          price_five: "NT$2000",
          videoPath: "https://www.youtube.com/embed/DgJWKII-D2k",
          menuPath:
            "https://sn.bpnavi.jp/page/re-zero/re-zero8/2020_10m_RZR_web_0930_3.jpg",
        },
        {
          value: "ghost_train",
          bannerPath:
            "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/main.jpg",
          titleName: "一番くじ 鬼滅の刃 ～無限列車編～",
          leftTickets: "65張",
          price_one: "NT$480",
          price_five: "NT$2300",
          videoPath: "https://www.youtube.com/embed/NJT6NpKL9S4",
          menuPath: "",
          reward: [
            {
              title: "A賞",
              name: "煉獄杏寿郎 フィギュア",
              amount: "全1種 / 約20cm",
              imgURL:
                "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/A.jpg",
            },
            {
              title: "B賞",
              name: "竈門炭治郎 フィギュア",
              amount: "全1種 / 約18cm",
              imgURL:
                "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/B.jpg",
            },
            {
              title: "C賞",
              name: "我妻善逸 フィギュア",
              amount: "全1種 / 約16cm",
              imgURL:
                "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/C.jpg",
            },
            {
              title: "D賞",
              name: "嘴平伊之助 フィギュア",
              amount: "全1種 / 約14cm",
              imgURL:
                "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/D.jpg",
            },
            {
              title: "E賞",
              name: "竈門禰豆子 フィギュア",
              amount: "全1種 / 約17cm",
              imgURL:
                "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/E.jpg",
            },
            {
              title: "F賞",
              name: "グラス・湯呑みセレクション",
              amount: "全6種 / 約8cm",
              imgURL:
                "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/F.jpg",
            },
            {
              title: "G賞",
              name: "ラバーストラップ～無限列車編～",
              amount: "全12種 / 約6～7.5cm",
              imgURL:
                "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/G.jpg",
            },
            {
              title: "H賞",
              name: "ミニノートセット",
              amount: "全8種 / A6",
              imgURL:
                "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/H.jpg",
            },
            {
              title: "I賞",
              name: "ちょこのっこフィギュア～うたた寝ver.～",
              amount: "全6種 / 約4cm",
              imgURL:
                "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/I.jpg",
            },
            {
              title: "ラストワン賞",
              name: "ラストワンver. 煉獄杏寿郎 フィギュア",
              amount: "約20cm",
              imgURL:
                "https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/LO.jpg",
            },
          ],
        },
      ],
      specialAward: false,
    };
  },
  computed: {
    filterProduct() {
      return (data) => {
        const productInfo = [];
        data.filter((item, index) => {
          if (item.value == this.$route.params.productName) {
            productInfo.push(item);
          }
        });
        return productInfo;
      };
    },
  },
};
</script>

<style lang="scss">
.titleCard {
  &-leftNum {
    background: white;
    color: salmon;
  }
  &-price {
    strong {
      min-width: 70px;
      max-width: 70px;
    }
  }
  &-rewardList {
    border: 1px solid white;
    border-radius: 8px;
    img {
      border-radius: 0px 0px 7px 7px;
    }
  }
}
</style>