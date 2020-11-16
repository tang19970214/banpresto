<template>
  <div id="turnTable">
    <div class="container">
      <div class="w-100 h-100">
        <div class="p-10 text-center">
          <strong>售價： 300元/次</strong>
        </div>
        <div class="px-5 d-flex" v-if="!correctUser">
          <el-input
            placeholder="請輸入代碼"
            v-model="checkValue"
            @keyup.enter.native="checkUser(checkValue)"
          ></el-input>
          <el-button type="primary" @click="checkUser(checkValue)" plain
            >認證</el-button
          >
        </div>
        <div class="w-100 pos-absolute" style="bottom: 0">
          <div class="px-10 font-s-13">
            <strong>遊玩須知：</strong>
            <ul class="-0">
              <li class="pb-10">
                本輪盤僅飲料店店員有權限開啟，因此抽獎由店員手機為準。
              </li>
              <li class="pb-10">
                獎品以實物為準，如遇產品缺貨或其他不可抗力之事由，主辦單位得保留更換等值獎品之權利，不另行告知。
              </li>
              <li>
                本活動若因故無法進行時，主辦單位有權決定修改、暫停或取消本活動。
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 轉盤本體 -->
      <div class="turnTable" v-show="correctUser">
        <div class="turnTable__body">
          <canvas
            class="turnTable__canvas"
            :class="animitionType"
            :style="{
              width: `${config.baseSze}px`,
              height: `${config.baseSize}px`,
            }"
          ></canvas>
        </div>
        <div class="turnTable__button" @click="animitionProc">
          <div class="turnTable__arrow"></div>
          <div class="turnTable__button__content">
            <span class="turnTable__button__text">{{ config.buttonText }}</span>
          </div>
        </div>
      </div>
      <!-- 設定按鈕 -->
      <div class="buttonArea">
        <div class="buttons" v-show="correctUser">
          <el-button type="text" @click="opendataSetting = true"
            >轉盤設定</el-button
          >
        </div>
      </div>

      <!-- 轉盤資訊設定視窗(modal) -->
      <el-dialog
        title="轉盤資訊設置"
        :visible.sync="opendataSetting"
        width="90%"
      >
        <div>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="區塊設定" name="first">
              <div
                class="w-100 d-flex align-items-center justify-content-start flex-column"
              >
                <div class="w-100">
                  <div class="editBySet w-100">
                    <table>
                      <thead class="text-center">
                        <tr>
                          <th scope="col" width="20%">機率</th>
                          <th scope="col" width="50%">獎品</th>
                          <th scope="col" width="30%">功能</th>
                        </tr>
                      </thead>
                      <draggable
                        class="dragArea"
                        :list="gifts"
                        :element="'tbody'"
                      >
                        <tr v-for="(gift, index) in gifts" :key="'GF_' + index" style="border-bottom: 0.5px solid #EEE">
                          <td class="justify-content-center">
                            <span v-show="!gift.edit">{{
                              getChance(gift.chance)
                            }}</span>
                            <el-input
                              type="number"
                              min="1"
                              step="0.1"
                              v-model.number="gift.chance"
                              v-show="gift.edit"
                            ></el-input>
                          </td>
                          <td>
                            <div>
                              <span v-show="!gift.edit">{{ gift.text }}</span>
                              <el-input
                                type="text"
                                v-model="gift.text"
                                v-show="gift.edit"
                              ></el-input>
                            </div>
                          </td>
                          <td>
                            <div class="text-center d-flex flex-column">
                              <el-button
                                type="primary"
                                v-show="!gift.edit"
                                @click.prevent="editGiftData(index)"
                                plain
                                >編輯</el-button
                              >
                              <el-button
                                type="primary"
                                v-show="!gift.edit"
                                @click.prevent="removeGiftData(index)"
                                plain
                                >刪除</el-button
                              >
                              <el-button
                                type="primary"
                                v-show="!gift.edit"
                                @click.prevent="saveGiftData(index)"
                                plain
                                >儲存</el-button
                              >
                              <el-button
                                type="primary"
                                v-show="!gift.edit"
                                @click.prevent="cancleGiftData(index)"
                                plain
                                >取消</el-button
                              >
                            </div>
                          </td>
                        </tr>
                      </draggable>
                    </table>
                    <el-button type="success" @click="addGiftData" plain
                      >新增獎項</el-button
                    >
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <!-- ------------------------------------------------------- -->
            <el-tab-pane label="轉盤設定" name="second">
              <div
                class="w-100 d-flex align-items-center justify-content-start flex-column"
              >
                <div class="w-100 d-flex flex-row">
                  <el-form ref="form">
                    <el-form-item label="停止模式：">
                      <el-radio-group v-model="config.autoStop">
                        <el-radio label="自動" checked></el-radio>
                        <el-radio label="手動"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                  <el-form class="ml-100" ref="form">
                    <el-form-item label="轉出資訊：">
                      <el-radio-group v-model="config.showAlert">
                        <el-radio label="顯示" checked></el-radio>
                        <el-radio label="關閉"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                </div>

                <div class="w-100">
                  <div class="w-100 d-flex column">
                    <label>{{
                      config.autoStop
                        ? "動畫時間長度(s)："
                        : "轉10圈的轉速(s)："
                    }}</label>
                    <el-input
                      type="number"
                      min="1"
                      step="1"
                      max="5"
                      v-model.number="config.runTime"
                    ></el-input>
                  </div>
                  <div class="w-100 d-flex column">
                    <label>轉盤尺寸設定(px)：</label>
                    <el-input
                      type="number"
                      min="150"
                      step="1"
                      v-model.number="config.baseSize"
                    ></el-input>
                  </div>
                  <div class="w-100 d-flex column">
                    <label>最大回彈角度(%)：</label>
                    <el-input
                      type="number"
                      min="0.01"
                      step="0.1"
                      max="1"
                      v-model.number="config.rollBackRange"
                      :readonly="!config.autoStop"
                    ></el-input>
                  </div>
                  <div class="w-100 d-flex column">
                    <label>區塊預設色(單數)：</label>
                    <el-input
                      type="color"
                      v-model="config.singleColor"
                      v-if="!isMobile"
                    ></el-input>
                    <el-input
                      type="text"
                      v-model="config.singleColor"
                    ></el-input>
                  </div>
                  <div class="w-100 d-flex column">
                    <label>區塊預設色(雙數)：</label>
                    <el-input
                      type="color"
                      v-model="config.doubleColor"
                      v-if="!isMobile"
                    ></el-input>
                    <el-input
                      type="text"
                      v-model="config.doubleColor"
                    ></el-input>
                  </div>
                  <div class="w-100 d-flex column">
                    <label>區塊邊框寬度：</label>
                    <el-input
                      type="number"
                      min="1"
                      step="1"
                      v-model.number="config.borderWidth"
                    ></el-input>
                  </div>
                  <div class="w-100 d-flex column">
                    <label>按鈕顏色：</label>
                    <el-input
                      type="color"
                      v-model.number="config.buttonColor"
                      v-if="!isMobile"
                    ></el-input>
                    <el-input
                      type="text"
                      v-model="config.buttonColor"
                    ></el-input>
                  </div>
                  <div class="w-100 d-flex column">
                    <label>按鈕文字：</label>
                    <el-input
                      type="text"
                      v-model="config.buttonText"
                    ></el-input>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <span slot="footer" class="dialog-footer">
          <form class="form-inline" @submit.prevent="">
            <label for="">設定檔名稱</label>
            <el-input type="text" v-model="dataName"></el-input>
          </form>
          <el-button type="primary" @click.prevent="newData" plain
            >新增</el-button
          >
          <el-button type="success" @click.prevent="saveData()" plain
            >儲存</el-button
          >
          <el-button
            type="danger"
            @click.prevent="deleteData(dataNo)"
            v-if="dataNo !== 0"
            plain
            >刪除</el-button
          >
          <el-button type="info" @click.prevent="setDefaultDatas()" plain
            >預設</el-button
          >
          <el-button type="info" @click.prevent="opendataSetting = false" plain
            >關閉視窗</el-button
          >
        </span>
      </el-dialog>

      <el-dialog title="恭喜中獎" :visible.sync="getAward" width="90%">
        <span>{{ currentResult }}</span>
        <span slot="footer" class="dialog-footer">
          <el-button
            class="w-100"
            type="primary"
            @click="getAward = false"
            plain
            >確定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      activeName: "first",
      checkValue: "07190827",
      setUser: window.localStorage.getItem("user"),
      correctUser: false,
      /** 轉動狀態 */
      isRunning: false,
      /** 手機瀏覽器，用來開關input-color */
      isMobile: false,
      /** 編輯模式: true=區塊設定模式、false="資料編輯模式" */
      giftEditMode: true,
      /** 轉動狀態 */
      turnStatus: {
        currentDeg: 0,
        targetDeg: 0,
        rollBackDeg: 0,
      },
      /** 獎項中獎角度儲存 */
      giftDegs: [],
      /** 中獎清單 */
      currentResult: "",
      // openresultList: false,
      // resultList: [],
      /** 設定紀錄 */
      opendataSetting: false,
      dataList: [],
      dataNo: 0,
      dataName: "預設",
      /** 獎項設定資料 */
      gift: {},
      defaultGift: {
        chance: 10,
        text: "",
        textColor: "",
        textSize: "",
        backgroundColor: this.defaultGiftBackgroundColor,
        edit: true,
      },
      gifts: [],
      defaultGifts: [
        {
          chance: 15,
          text: "正版公仔*1",
          textColor: "",
          textSize: "",
          backgroundColor: "",
          edit: false,
        },
        {
          chance: 20,
          text: "白證公仔*1",
          textColor: "",
          textSize: "",
          backgroundColor: "",
          edit: false,
        },
        {
          chance: 8,
          text: "金證一番賞*1",
          textColor: "",
          textSize: "",
          backgroundColor: "",
          edit: false,
        },
        {
          chance: 25,
          text: "洗衣球*1",
          textColor: "",
          textSize: "",
          backgroundColor: "",
          edit: false,
        },
        {
          chance: 17,
          text: "一番賞1抽",
          textColor: "",
          textSize: "",
          backgroundColor: "",
          edit: false,
        },
        {
          chance: 15,
          text: "Qposket*1",
          textColor: "",
          textSize: "",
          backgroundColor: "",
          edit: false,
        },
      ],

      currentResult: "",
      /** 轉盤設定 */
      config: {},
      defaultConfig: {
        autoStop: true,
        runTime: 8,
        rollBackRange: 0,
        showAlert: true,
        baseSize: 500,
        singleColor: "sandybrown",
        doubleColor: "palevioletred",
        borderWidth: 1,
        borderColor: "#ffffff",
        textColor: "#000000",
        buttonColor: "#f19393",
        buttonText: "GO",
      },
      getAward: false,
    };
  },
  computed: {
    /** 轉盤資料字串 */
    // showGiftsToTextArea() {
    //   return JSON.stringify(this.gifts);
    // },
    /** 動畫Class判斷 */
    animitionType() {
      return {
        "turnTable__canvas--manualTrun": !this.config.autoStop,
        "turnTable__canvas--autoTrun": this.isRunning && this.config.autoStop,
      };
    },
    /** 計算區塊機率值總和 */
    countDataChance() {
      let totalChance = 0;
      this.gifts.forEach((data) => {
        totalChance += data.chance;
      });
      return totalChance;
    },
    /** 預設區塊色 */
    defaultGiftBackgroundColor() {
      return this.getDefaultGiftBackgroundColor();
    },
    /** 取得裝置像素比例(至少用兩倍來避免canvas繪製模糊) */
    pixelRatio() {
      return window.devicePixelRatio * 2 || 2;
    },
  },
  watch: {
    isRunning(boolean) {
      // 手動模式要將動畫停止
      if (!this.config.autoStop) {
        const state = boolean ? "running" : "paused";
        document.documentElement.style.setProperty("--animitionState", state);
      }
    },
    /** 偵聽當資料變更就重建轉盤 */
    gifts: {
      handler() {
        this.buideTurnTable();
      },
      deep: true,
    },
    config: {
      handler() {
        this.buideTurnTable();
      },
      deep: true,
    },
    turnStatus: {
      handler() {
        this.updateturnStatus();
      },
      deep: true,
    },
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    checkUser(data) {
      window.localStorage.setItem("user", data);
      this.setUser = data;
      if (this.setUser == "07190827") {
        this.$message({
          message: "認證成功！",
          type: "success",
        });
        this.correctUser = true;
      } else {
        this.$message.error({
          message: "認證失敗，請重新輸入！",
        });
        this.correctUser = false;
      }
    },
    /** 檢查手機瀏覽器（關閉input-color) */
    checkMobile() {
      return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
    },
    /** 計算區塊機率% */
    getChance(data) {
      return `${((data / this.countDataChance) * 100).toFixed(1)}%`;
    },
    /** 取得預設區塊色彩 */
    getDefaultGiftBackgroundColor(index) {
      const number = index || this.gifts.length;
      return number % 2 === 0
        ? this.config.doubleColor
        : this.config.singleColor;
    },
    //------------------------------------
    // --設定檔 Methods
    //------------------------------------
    /** 新增設定檔 */
    newData() {
      this.dataName = "未命名";
      this.dataNo = this.dataList.length;
      this.setDefaultDatas();
    },
    /** 儲存設定檔 */
    saveData() {
      const currentData = {
        dataName: this.dataName,
        gifts: Array.from(this.gifts),
        config: Object.assign({}, this.config),
      };
      // 使用.$set可以避免下面兩種更動Array索引資料動態顯示上的問題
      this.$set(this.dataList, this.dataNo, currentData);
      // this.dataList[this.dataNo] = currentData; // 這會導致資料綁定的動態顯示失效
      // this.dataList.splice(this.dataNo, 0, currentData); // 這樣會一直新增XD
      // 存到localStrorage
      this.setDataListToLocalStorage();
    },
    /** 還原設定資料至預設值 */
    setDefaultDatas() {
      this.gifts = this.getDefaultGfits();
      this.config = this.getDefaultConfig();
    },
    /** 儲存設定檔(LocalStorage) */
    setDataListToLocalStorage() {
      const localDatas = JSON.stringify(this.dataList);
      localStorage.setItem("turnTableDataList", localDatas);
    },
    /** 取得設定檔(LocalStorage) */
    getDataListFromLocalStorage() {
      return JSON.parse(localStorage.getItem("turnTableDataList"));
    },
    //------------------------------------
    // --獎品編輯 By List Methods
    //------------------------------------
    editGiftData(index) {
      const gift = this.gifts[index];
      gift.clone = Object.assign({}, gift);
      gift.edit = true;
    },
    saveGiftData(index) {
      const gift = this.gifts[index];
      delete gift.clone;
      gift.edit = false;
    },
    cancleGiftData(index) {
      let gift = this.gifts[index];
      gift = Object.assign(gift, gift.clone);
      delete gift.clone;
      gift.edit = false;
    },
    /** 移除獎品資料 */
    removeGiftData(index) {
      this.gifts.splice(index, 1);
    },
    //------------------------------------
    // --獎品編輯 Methods
    //------------------------------------
    /** 新增獎品資料 */
    addGiftData() {
      this.gifts.push(this.gift);
      this.setDefaultGift();
    },
    /** 取得獎品資料預設值 */
    getDefaultGfits() {
      return Array.from(this.defaultGifts);
    },
    /** 設定獎品資料(透過獎品編輯Object) */
    // setGiftsByTextArea(e) {
    //   this.gifts = JSON.parse(e.target.value);
    // },
    /** 設定獎品資料預設值 */
    setDefaultGift() {
      this.gift = Object.assign({}, this.defaultGift);
    },
    //------------------------------------
    // --轉盤編輯 Methods
    //------------------------------------
    /** 取得轉盤預設值 */
    getDefaultConfig() {
      // 計算當前視窗寬高，取低值*0.6當基準值設定轉盤大小
      const innerHeight = window.innerHeight;
      const innerWidth = window.innerWidth;
      this.defaultConfig.baseSize =
        innerHeight > innerWidth
          ? Math.floor(innerWidth * 0.8)
          : Math.floor(innerHeight * 0.6);
      return Object.assign({}, this.defaultConfig);
    },
    /** 儲存轉盤設定值(LocalStorage) */
    setConfigToLocalStorage() {
      const localConfig = JSON.stringify(this.config);
      localStorage.setItem("turnTableConfig", localConfig);
    },
    //------------------------------------
    // --轉盤內容 & 動畫 Methods
    //------------------------------------
    /** 轉盤內容繪製 */
    drawCanvas() {
      const centerPoint = this.config.baseSize * (this.pixelRatio / 2);
      const turnTable = document.querySelector(".turnTable__canvas");
      const ctx = turnTable.getContext("2d");
      turnTable.setAttribute("width", this.config.baseSize * this.pixelRatio);
      turnTable.setAttribute("height", this.config.baseSize * this.pixelRatio);
      this.giftDegs = [];
      let lastAngle = 0;
      // 內部區塊繪製
      this.gifts.forEach((gift, index) => {
        // 計算角度(全部資料機率 / 單片機率 * 360)
        const deg = (gift.chance / this.countDataChance) * 360;
        // 計算弧度(角度 * PI / 180)，
        const angle = deg * (Math.PI / 180);
        // 儲存角度範圍
        this.giftDegs[index] = {
          from: index === 0 ? 0 : this.giftDegs[index - 1].to,
          to: index === 0 ? deg : this.giftDegs[index - 1].to + deg,
          name: gift.text,
        };
        // 開始繪製
        ctx.save();
        ctx.beginPath();
        ctx.translate(centerPoint, centerPoint);
        ctx.moveTo(0, 0);
        // 旋轉弧度 = 上次的區塊弧度(初始0)
        ctx.rotate(lastAngle);
        // 繪製區塊，半徑-外框線 避免 框線擠到canvas邊框
        ctx.arc(0, 0, centerPoint - this.config.borderWidth, 0, angle, false);
        // 更新最後一次的結束角度
        lastAngle += angle;
        // 區塊底色填充
        ctx.fillStyle =
          gift.backgroundColor || this.getDefaultGiftBackgroundColor(index);
        ctx.fill();
        /** 邊框繪製 */
        ctx.lineWidth = this.config.borderWidth * this.pixelRatio;
        ctx.strokeStyle = this.config.borderColor;
        ctx.closePath();
        ctx.stroke();
        // 內容文字繪製
        ctx.rotate(angle / 2);
        ctx.fillStyle = gift.textColor || this.config.textColor;
        ctx.font = gift.textSize
          ? `${gift.textSize}px Microsoft JhengHei`
          : `${
              (this.config.baseSize / gift.text.length) * (this.pixelRatio / 4)
            }px Microsoft JhengHei`;
        ctx.textBaseline = "middle";
        ctx.fillText(gift.text, centerPoint / 2.25, 0);
        //
        ctx.restore();
      });
      // 自動停止模式動畫結束時要跑autoTurnStop function
      if (this.config.autoStop) {
        turnTable.addEventListener("animationend", this.autoTurnStop);
      } else {
        turnTable.removeEventListener("animationend", this.autoTurnStop);
      }
    },
    /** 轉動模式 */
    animitionProc() {
      if (this.config.autoStop) {
        this.autoTurnStart();
      } else {
        this.manualTrun();
      }
    },
    /** 手動模式(手動停止) */
    manualTrun() {
      this.isRunning = !this.isRunning;
    },
    /** 自動模式(自動停止) */
    autoTurnStart() {
      // 如果正在執行中不動作
      if (this.isRunning) return;
      // 取得隨機角度(預設至少跑10圈)
      const randomDeg = Math.floor(Math.random() * (360 - 0)) + 3600;
      // 取得隨機回彈角度
      const randomRollBackDeg = Math.random() * this.config.rollBackRange + 1;
      // 設定回彈角度
      this.turnStatus.rollBackDeg =
        randomRollBackDeg < 1.01 ? 1 : randomRollBackDeg;
      // 設置動畫的目標角度
      this.turnStatus.targetDeg = randomDeg;
      // 開始旋轉動畫
      this.isRunning = true;
    },
    /** 自動模式停止事件(由繪製區的addEventListener('animationend')觸發) */
    autoTurnStop() {
      // 關閉動畫
      this.isRunning = false;
      // 紀錄本次角度
      this.turnStatus.currentDeg = Math.floor(this.turnStatus.targetDeg % 360);
      // 計算中獎角度
      const nowDeg = 360 - this.turnStatus.currentDeg;
      // 顯示獎品資料
      this.giftDegs.forEach((giftDeg) => {
        if (nowDeg >= giftDeg.from && nowDeg <= giftDeg.to) {
          // this.resultList.push(giftDeg.name);
          this.currentResult = giftDeg.name;
          // setTimeout(() => {
          //   this.currentResult = "";
          // }, 3500);
        }
      });
      this.getAward = true;
    },
    /** 建立轉盤 */
    buideTurnTable() {
      // CSS值設定
      document.documentElement.style.setProperty(
        "--turnTableSize",
        `${this.config.baseSize + 20}px`
      );
      document.documentElement.style.setProperty(
        "--buttonSize",
        `${this.config.baseSize / 3.5}px`
      );
      document.documentElement.style.setProperty(
        "--buttonFontSize",
        `${this.config.baseSize / 10}px`
      );
      document.documentElement.style.setProperty(
        "--arrowHeight",
        `${this.config.baseSize / 7}px`
      );
      document.documentElement.style.setProperty(
        "--arrowWidth",
        `${this.config.baseSize / 5}px`
      );
      document.documentElement.style.setProperty(
        "--buttonColor",
        `${this.config.buttonColor}`
      );
      document.documentElement.style.setProperty(
        "--runTime",
        `${this.config.runTime}s`
      );
      document.documentElement.style.setProperty("--animitionState", "paused");
      // 清空轉出結果
      // this.resultList = [];
      // 繪製轉盤
      this.drawCanvas();
    },
    /** 更新轉盤角度資訊 */
    updateturnStatus() {
      document.documentElement.style.setProperty(
        "--targetDeg",
        `${this.turnStatus.targetDeg}deg`
      );
      document.documentElement.style.setProperty(
        "--currentDeg",
        `${this.turnStatus.currentDeg}deg`
      );
      document.documentElement.style.setProperty(
        "--rollBackDeg",
        `${this.turnStatus.rollBackDeg}`
      );
    },
  },
  beforeMount() {
    // 檢查手機模式
    this.isMobile = this.checkMobile();
    // 區塊新增的基礎預設值設定
    this.setDefaultGift();
    // 若沒有儲存在LocalStorage中的資料就用預設值
    this.dataList = this.getDataListFromLocalStorage() || [];
    this.dataName = this.dataList[0]
      ? this.dataList[0].dataName
      : this.dataName;
    this.config = this.dataList[0]
      ? this.dataList[0].config
      : this.getDefaultConfig();
    this.gifts = this.dataList[0]
      ? this.dataList[0].gifts
      : this.getDefaultGfits();
  },
  mounted() {
    // 建立轉盤
    this.buideTurnTable();
    // 偵測空白鍵，使空白鍵可觸發轉動及停止
    document.addEventListener("keypress", (e) => {
      if (e.keyCode === 32) this.animitionProc();
    });
    if (window.localStorage.getItem("user") == "07190827") {
      this.correctUser = true;
    } else {
      this.correctUser = false;
    }
    console.log(this.correctUser);
  },
};
</script>

<style lang="scss">
//圖形樣式變數
$turnTableSize: var(--turnTableSize);
$buttonSize: var(--buttonSize);
$buttonColor: var(--buttonColor);
$buttonFontSize: var(--buttonFontSize);
$arrowWidth: var(--arrowWidth);
$arrowHeight: var(--arrowHeight);
//轉動執行用變數
$runTime: var(--runTime);
$targetDeg: var(--targetDeg);
$currentDeg: var(--currentDeg);
$rollBackDeg: var(--rollBackDeg);
$animitionState: var(--animitionState);
@mixin positionCenter($args: null) {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) $args;
}
.alert {
  font-size: 20px;
  &--show {
    z-index: 1;
    opacity: 0.7;
    transition: opacity 0.5s linear;
  }
}
.buttonArea {
  position: fixed;
  display: inline-block;
  right: 1vh;
  bottom: 0;
}
.turnTable {
  @include positionCenter();
  width: $turnTableSize;
  height: $turnTableSize;
  border-radius: 50%;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
  user-select: none;
  &__body {
    @include positionCenter();
    font-size: 0px;
  }
  &__canvas {
    transform: rotate($targetDeg);
  }
  &__canvas--autoTrun {
    animation: AutoTrun $runTime forwards cubic-bezier(0.1, 0, 0, $rollBackDeg);
  }
  &__canvas--manualTrun {
    animation: ManualTrun $runTime infinite linear forwards;
    animation-play-state: $animitionState;
  }
  &__button {
    @include positionCenter();
    padding: 10px;
    border-radius: 50%;
    background-color: #fff;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.5);
    color: #fff;
    cursor: pointer;
  }
  &__button__content {
    width: $buttonSize;
    height: $buttonSize;
    border-radius: 50%;
    background-color: $buttonColor;
  }
  &__button__text {
    @include positionCenter();
    color: #fff;
    font-weight: 900;
    font-size: $buttonFontSize;
  }
  &__arrow {
    @include positionCenter(rotate(270deg));
    left: 100%;
    border: $arrowHeight solid transparent;
    border-top: $arrowWidth solid $buttonColor;
  }
}
@keyframes AutoTrun {
  from {
    transform: rotate($currentDeg);
  }
  to {
    transform: rotate($targetDeg);
  }
}
@keyframes ManualTrun {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(7200deg);
  }
}
</style>