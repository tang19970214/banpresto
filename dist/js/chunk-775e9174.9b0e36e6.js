(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-775e9174"],{"146f":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"product"}},[s("div",{staticClass:"w-100 mb-70"},t._l(t.filterProduct(t.productList),(function(e,a){return s("div",{key:"PL_"+a,staticClass:"titleCard w-100 d-flex align-items-center flex-column"},[s("img",{attrs:{src:e.bannerPath,alt:"",width:"100%"}}),s("div",{staticClass:"w-100"},[s("div",{staticClass:"p-20"},[s("div",{staticClass:"w-100 d-flext flex-column"},[s("strong",{staticClass:"font-s-24"},[t._v(" "+t._s(e.titleName)+" ")]),s("div",{staticClass:"mt-20 titleCard-leftNum d-inline-flex"},[s("strong",{staticClass:"font-s-18"},[t._v("剩餘籤數："+t._s(e.leftTickets))])]),s("div",{staticClass:"titleCard-price w-100 d-flex align-items-start flex-row mt-30"},[s("strong",{staticClass:"font-s-20"},[t._v("售價：")]),s("div",{staticClass:"w-100 d-flex align-items-center justify-content-start"},[s("div",{staticClass:"w-100 d-flex flex-column"},[s("p",{staticClass:"m-0 font-s-18 pb-10"},[t._v("1抽 "+t._s(e.price_one))]),s("p",{staticClass:"m-0 font-s-18"},[t._v("5抽 "+t._s(e.price_five))])])])]),t._m(0,!0),"ghost_train"==e.value?s("div",{staticClass:"w-100 mt-30 d-flex align-items-end justify-content-center"},[s("img",{attrs:{src:i("ab1d"),alt:"",width:"80px"},on:{click:function(e){t.specialAward=!0}}}),s("img",{staticClass:"pos-absolute ml-60 mt-10",attrs:{src:i("bbf8"),alt:"",width:"40px"}})]):t._e()])]),s("div",{staticClass:"w-100 mt-20"},[s("iframe",{attrs:{width:"100%",src:e.videoPath,frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}})]),e.menuPath?s("div",{staticClass:"w-100 mt-20"},[s("img",{attrs:{src:e.menuPath,alt:"",width:"100%"}})]):t._e(),e.reward?s("div",{staticClass:"w-100 mt-20"},[s("div",{staticClass:"p-20"},t._l(e.reward,(function(e,i){return s("div",{key:"RW_"+i,staticClass:"titleCard-rewardList mb-20"},[s("div",{staticClass:"w-100 d-flex align-items-center flex-column"},[s("div",{staticClass:"w-100 py-10 d-flex align-items-center text-center flex-column"},[s("strong",{staticClass:"font-s-24"},[t._v(t._s(e.title))]),s("strong",{staticClass:"font-s-18"},[t._v(t._s(e.name))]),s("p",{staticClass:"m-0"},[t._v(t._s(e.amount))])]),s("img",{attrs:{src:e.imgURL,alt:"Reward",width:"100%"}})])])})),0)]):t._e()])])})),0),s("el-dialog",{attrs:{title:"特別活動",visible:t.specialAward,width:"90%"},on:{"update:visible":function(e){t.specialAward=e}}},[s("span",{staticClass:"font-s-14"},[t._v(" 即日起，只要五抽皆同獎項（例：5抽皆H），即贈 "),s("strong",{staticClass:"font-s-22"},[t._v(" 『2D 索隆』 ")])]),s("img",{staticClass:"mt-30",attrs:{src:i("ac01"),alt:"ZORO",width:"100%"}}),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{staticClass:"w-100",attrs:{type:"primary",plain:""},on:{click:function(e){t.specialAward=!1}}},[t._v("確認")])],1)])],1)},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"w-100 mt-20"},[i("p",{staticClass:"m-0"},[t._v("（實際已店家張貼之價格為主）")])])}],n=(i("4de4"),{data:function(){return{productList:[{value:"kabi",bannerPath:"https://bpnavi.jp/s/fc/bnp_media/image/3377/JOTVvldWsEhb8D.jpg",titleName:"一番くじ 星のカービィ Starlight Theater",leftTickets:"32張",price_one:"NT$320",price_five:"NT$1500",videoPath:"https://www.youtube.com/embed/56q71a4ntmU",menuPath:"https://sn.bpnavi.jp/page/kirby/kirby13/0925/kk10m_ST_banner_1002x9490 _0925-01_zK5JX3wu.jpg"},{value:"ghost_third",bannerPath:"https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu3/images/main.jpg",titleName:"一番くじ 鬼滅の刃 ～参～",leftTickets:"42張",price_one:"NT$320",price_five:"NT$1500",videoPath:"https://www.youtube.com/embed/ykRZwEsKdyk",menuPath:"https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu3/images/cp01.jpg?v2"},{value:"sailorMoon",bannerPath:"https://bpnavi.jp/s/fc/bnp_media/image/3376/RGNgXBDmwP97yU.jpg",titleName:"一番くじ 劇場版「美少女戦士セーラームーンEternal」Let's party!",leftTickets:"54張",price_one:"NT$320",price_five:"NT$1500",videoPath:"",menuPath:"https://sn.bpnavi.jp/page/sailormoon/sailormoon9/0807/9sm_web_0803-01.jpg"},{value:"rem",bannerPath:"https://bpnavi.jp/s/fc/bnp_media/image/3431/wrfRats938JMKk.jpg",titleName:"一番くじ Re:ゼロから始める異世界生活－物語は、To be continued－",leftTickets:"50張",price_one:"NT$420",price_five:"NT$2000",videoPath:"https://www.youtube.com/embed/DgJWKII-D2k",menuPath:"https://sn.bpnavi.jp/page/re-zero/re-zero8/2020_10m_RZR_web_0930_3.jpg"},{value:"ghost_train",bannerPath:"https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/main.jpg",titleName:"一番くじ 鬼滅の刃 ～無限列車編～",leftTickets:"65張",price_one:"NT$480",price_five:"NT$2300",videoPath:"https://www.youtube.com/embed/NJT6NpKL9S4",menuPath:"",reward:[{title:"A賞",name:"煉獄杏寿郎 フィギュア",amount:"全1種 / 約20cm",imgURL:"https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/A.jpg"},{title:"B賞",name:"竈門炭治郎 フィギュア",amount:"全1種 / 約18cm",imgURL:"https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/B.jpg"},{title:"C賞",name:"我妻善逸 フィギュア",amount:"全1種 / 約16cm",imgURL:"https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/C.jpg"},{title:"D賞",name:"嘴平伊之助 フィギュア",amount:"全1種 / 約14cm",imgURL:"https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/D.jpg"},{title:"E賞",name:"竈門禰豆子 フィギュア",amount:"全1種 / 約17cm",imgURL:"https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/E.jpg"},{title:"F賞",name:"グラス・湯呑みセレクション",amount:"全6種 / 約8cm",imgURL:"https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/F.jpg"},{title:"G賞",name:"ラバーストラップ～無限列車編～",amount:"全12種 / 約6～7.5cm",imgURL:"https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/G.jpg"},{title:"H賞",name:"ミニノートセット",amount:"全8種 / A6",imgURL:"https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/H.jpg"},{title:"I賞",name:"ちょこのっこフィギュア～うたた寝ver.～",amount:"全6種 / 約4cm",imgURL:"https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/I.jpg"},{title:"ラストワン賞",name:"ラストワンver. 煉獄杏寿郎 フィギュア",amount:"約20cm",imgURL:"https://sn.bpnavi.jp/1kuji_kimetsu/kimetsu4/images/item/LO.jpg"}]}],specialAward:!1}},computed:{filterProduct:function(){var t=this;return function(e){var i=[];return e.filter((function(e,s){e.value==t.$route.params.productName&&i.push(e)})),i}}}}),m=n,r=(i("df0d"),i("2877")),l=Object(r["a"])(m,s,a,!1,null,null,null);e["default"]=l.exports},"1f27":function(t,e,i){},"4de4":function(t,e,i){"use strict";var s=i("23e7"),a=i("b727").filter,n=i("1dde"),m=i("ae40"),r=n("filter"),l=m("filter");s({target:"Array",proto:!0,forced:!r||!l},{filter:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},ab1d:function(t,e,i){t.exports=i.p+"img/medal.52bf9f4e.png"},ac01:function(t,e,i){t.exports=i.p+"img/zoro.0d1019b2.jpg"},bbf8:function(t,e,i){t.exports=i.p+"img/click.f8211875.png"},df0d:function(t,e,i){"use strict";i("1f27")}}]);
//# sourceMappingURL=chunk-775e9174.9b0e36e6.js.map