<template>
  <div class="detail">
    <div class="container" v-show="!show">
      <scroller
        class="list-scroller"
        :on-refresh="refresh"
        ref="myScroller"
        :noDataText="' '"
        :refreshText="'下拉加载'"
      >
        <div class="Progress" v-show="status != 'CANCELED'">
          <div class="lineblock">
            <div class="line"></div>
            <div class="line Dottedline"></div>
            <div class="line Dottedline"></div>
          </div>
          <div class="cirblock">
            <div class="cir"></div>
            <div class="cir">
              <div class="qipao" v-show="status == 'PENDING' && time != 0">
                <div class="tag">
                  <span></span>
                  <div style="float: left">
                    <img src="../../assets/timer.png" />
                  </div>
                  <datatime :datatimes="time" @countDowmEnd="updata"></datatime>
                </div>
              </div>
            </div>
            <div class="cir">
              <div class="qipao qipao2" v-show="status == 'PAYED' && time != 0">
                <div class="tag">
                  <span></span>
                  <div style="float: left">
                    <img src="../../assets/timer.png" />
                  </div>
                  <datatime :datatimes="time" @countDowmEnd="updata"></datatime>
                </div>
              </div>
            </div>
            <div class="cir">
              <div
                class="Checkmark"
                v-show="status == 'FINISHED' || status == 'SOLVED'"
              >
                <img src="../../assets/succeed.png" />
                <!-- <img src="../../assets/cancel.png"/> -->
              </div>
            </div>
          </div>
          <div class="textblock">
            <div class="text1">{{ this.list1 }}</div>
            <div class="text1">{{ this.list2 }}</div>
            <div class="text1">{{ this.list3 }}</div>
            <div class="text1">{{ this.list4 }}</div>
          </div>
          <div class="currency">{{ this.Promptcontent }}</div>
        </div>

        <div class="cancel" v-show="status == 'CANCELED'">
          {{ this.canceltext }}
        </div>

        <div class="Cornermarker">
          <div class="amount">
            <div class="amountnumber">
              <div class="left">
                <p class="amountname">
                  {{ $t("Total fiat amount") }} {{ this.unit1 }}
                </p>
                <p
                  id="jine"
                  :data-clipboard-text="this.total_price1"
                  class="amountrmb"
                >
                  {{ this.total_price1
                  }}<img @click="doCopy('#jine')" src="../../assets/copy.png" />
                </p>
              </div>
              <div class="rightline"></div>
              <div class="right">
                <p class="amountname2">
                  <span class="Price">{{ $t("Price") }}</span
                  ><span class="money">{{ this.price1 }} {{ this.unit2 }}</span>
                </p>
                <p class="amountname2 numberamount">
                  <span class="Price number">{{ $t("Size") }}</span
                  ><span class="money">{{ this.amount1 }} {{ this.unit }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-show="show_Receivables == true">
          <div
            class="Payer"
            v-show="
              (side == 'SELL' && status == 'FINISHED') ||
              (side == 'SELL' && status == 'DISPUTED') ||
              (side == 'SELL' && status == 'SOLVED')
            "
          >
            <div class="Paymentarea">
              <div>
                <img :src="this.Paymentgroup.icon" /><span
                  >{{ $t(this.Paymentgroup.name) }}({{
                    this.Paymentgroup.hided_account
                  }})</span
                >
              </div>
            </div>
          </div>
        </div>

        <div v-show="show_Receivables == true">
          <div
            class="Payer"
            v-show="
              (side == 'SELL' && status == 'PENDING') ||
              (side == 'BUY' && status == 'PAYED') ||
              (side == 'BUY' && status == 'FINISHED') ||
              (side == 'BUY' && status == 'DISPUTED') ||
              (side == 'BUY' && status == 'SOLVED')
            "
          >
            <div class="Payerblock Payerblock0">
              <div class="PaymentChart">
                <i
                  ><img :src="this.Paymentgroup.icon" />{{
                    $t(this.bankname1)
                  }}</i
                >
                <i
                  class="yanse"
                  v-show="
                    Switchingpayment == true &&
                    side == 'SELL' &&
                    status == 'PENDING'
                  "
                  @click="selectLegalCurrency()"
                  ><img class="qiehuanpic" src="../../assets/qiehuan.png" />{{
                    $t("switch")
                  }}</i
                >
              </div>
            </div>
            <div class="Payerblock" v-show="yinhanka == false">
              <div>
                <i class="one">{{ $t("Name:") }}</i>
                <i class="two">{{ this.Paymentgroup.account_name }}</i>
              </div>
              <div>
                <i class="one">{{ $t("Account:") }}</i>
                <i
                  id="zhanghao"
                  :data-clipboard-text="this.Paymentgroup.account"
                  class="two two3"
                  >{{ this.Paymentgroup.account
                  }}<img
                    @click="doCopy('#zhanghao')"
                    src="../../assets/copy.png"
                /></i>
              </div>
              <div v-show="paypal == true">
                <i class="one">{{ $t("Receive code:") }}</i>
                <i class="two two2" @click="tiaozhuan">{{ $t("Check") }}</i>
              </div>
            </div>

            <div class="Payerblock Payerblock2" v-show="yinhanka == true">
              <div>
                <i class="one">{{ $t("Name:") }}</i>
                <i
                  id="name"
                  :data-clipboard-text="this.Paymentgroup.account_name"
                  class="two"
                  >{{ this.Paymentgroup.account_name
                  }}<img @click="doCopy('#name')" src="../../assets/copy.png"
                /></i>
              </div>
              <div>
                <i class="one">{{ $t("Card ID:") }}</i>
                <i
                  id="kahao"
                  :data-clipboard-text="this.Paymentgroup.account"
                  class="two"
                  >{{ this.Paymentgroup.account
                  }}<img @click="doCopy('#kahao')" src="../../assets/copy.png"
                /></i>
              </div>
              <div>
                <i class="one">{{ $t("Bank:") }}</i>
                <i
                  id="zhaohang"
                  :data-clipboard-text="this.Paymentgroup.location"
                  class="two"
                  >{{ this.Paymentgroup.location
                  }}<img
                    @click="doCopy('#zhaohang')"
                    src="../../assets/copy.png"
                /></i>
              </div>
              <div v-show="Subbranch == true">
                <i class="one one1">{{ $t("Bank branch:") }}</i>
                <i
                  id="chongwen"
                  :data-clipboard-text="this.Paymentgroup.sub_location"
                  class="two"
                  >{{ this.Paymentgroup.sub_location
                  }}<img
                    @click="doCopy('#chongwen')"
                    src="../../assets/copy.png"
                /></i>
              </div>
            </div>
          </div>
        </div>

        <div class="Payer Payer2" v-show="side == 'SELL' && status == 'PAYED'">
          <div class="height">
            <div class="numberstate">
              <div class="number">
                <p class="jiacu">{{ $t("Confirm fiat receipt") }}</p>
                <p class="paytext">{{ $t("Avoid false evidence") }}</p>
                <div class="zhifubao" v-show="show_Receivables == true">
                  <img :src="this.Paymentgroup.icon" />
                  {{ $t(this.Paymentgroup.name) }}({{
                    this.Paymentgroup.hided_account
                  }})
                </div>
              </div>
              <div class="shuzi">1</div>
            </div>
            <div class="numberstate numberstate2">
              <div class="number">
                <p class="jiacu">{{ $t("Release the tokens2") }}</p>
                <p class="paytext">
                  {{ $t("Receipt confirmed,please select") }}
                </p>
              </div>
              <div class="shuzi">2</div>
            </div>
          </div>
        </div>
        <div class="Orders">
          <div class="Ordersblock">
            <div id="dingdan" :data-clipboard-text="this.grouparray.uuid">
              <span>{{ $t("Order ID") }}：</span
              ><span class="kongge">{{ this.grouparray.uuid }}</span
              ><img @click="doCopy('#dingdan')" src="../../assets/copy.png" />
            </div>
            <div>
              <span>{{ $t("Creation time") }}：</span
              ><span class="kongge">{{ this.datatimes }}</span>
            </div>
          </div>
        </div>

        <Phone
          :dataname="nickname"
          :datanickname="realname"
          :dataicon="icon"
          :datauuid="uuide"
          :dataiphone="iphone"
          :databixin="bixintargetid"
          :renzheng="attestation"
          :guanxi="relation"
          :baopei="compensate"
          :Merchant_level="Merchant_level"
        ></Phone>

        <div class="Leavingmessage">
          <div class="liuyan" v-show="note1 == true && status == 'PENDING'">
            <div class="headliuyan">{{ $t("Annotation") }}</div>
            <div class="textliuyan">
              {{ this.note }}
            </div>
          </div>
        </div>
        <service :Orderid="grouparray.uuid"></service>
        <!-- <div style="text-align:center;font-size:0px;margin-top:50px;">
        <img src="@/assets/logo@3x.png" alt="" style="width:82px;height:24px;" v-if="$i18n.locale=='zh'">
        <img src="@/assets/logo-english@3x.png" alt="" style="width:82px;height:24px;" v-else>
        <p style="font-size:10px;color:#d0d0d0;">{{$t("Safe and easy-to-use blockchain wallet")}}</p>
      </div> -->
        <div class="kong"></div>
      </scroller>

      <div class="bottom" v-show="side == 'BUY' && status == 'PENDING'">
        <div class="kuangdu" @click="cancel">{{ $t("Cancel order") }}</div>
        <div class="kuandu fukuan" @click="Topay">{{ $t("Pay") }}</div>
      </div>

      <div class="bottom" v-show="side == 'BUY' && status == 'PAYED'">
        <div
          v-show="Noar == 'guan'"
          class="kuangdu gray"
          @click="zhongcaianniu"
        >
          {{ $t("Initiate arbitration") }}
        </div>
        <div v-show="Noar == 'kai'" class="kuangdu" @click="arbitration">
          {{ $t("Initiate arbitration") }}
        </div>
        <div
          v-show="Noar1 == 'guan1'"
          class="kuandu gray1"
          @click="tixingfangbi"
        >
          {{ $t("Remind merchant") }}
        </div>
        <div v-show="Noar1 == 'kai'" class="kuandu" @click="Coinmaking">
          {{ $t("Remind merchant") }}
        </div>
      </div>

      <div
        class="bottom"
        v-show="status == 'DISPUTED' && Initiator == true && Initiator1 == true"
        @click="quxiaozhongcai"
      >
        {{ $t("Cancel arbitration") }}
      </div>

      <div
        class="bottom bottomcolor"
        v-show="side == 'SELL' && status == 'PENDING'"
      >
        {{ $t("Receipt confirmed, release the tokens") }}
      </div>

      <div class="bottom" v-show="side == 'SELL' && status == 'PAYED'">
        <div
          v-show="Noar == 'guan'"
          class="kuangdu gray"
          @click="zhongcaianniu"
        >
          {{ $t("Initiate arbitration") }}
        </div>
        <div v-show="Noar == 'kai'" class="kuangdu" @click="arbitration">
          {{ $t("Initiate arbitration") }}
        </div>
        <div class="kuandu fukuan" @click="Paymentpassword">
          {{ $t("Receipt confirmed, release the tokens") }}
        </div>
      </div>

      <mask2
        v-if="Cancellation"
        :oftimes="frequency"
        :Hourtime="Minutetimes"
        @clickHidebox="clickHidebox"
        @clickHidebox1="clickHidebox1"
      ></mask2>

      <mask3
        v-if="Applyfor"
        :Upper="Upperlimit"
        @clickHidebox2="clickHidebox2"
        @clickHidebox3="clickHidebox3"
      ></mask3>

      <shade v-if="emption" @clickHide="clickHide"></shade>

      <examine
        v-if="lookover"
        :lookup1="lookup"
        @clonebox1="clonebox1"
      ></examine>

      <release
        v-if="Coin_release"
        @conceal="conceal"
        @clearing="clearing"
      ></release>

      <legalcurrency
        class="Definitely"
        v-if="LegalCurrencyBoxB"
        @clickHideLegalBox="clickBoxHidexLegal"
        @selectLegalCurrencyOne="clickCurrencyOneLegal"
        :legal="legals"
        :returnlagel="legal_currency"
      >
      </legalcurrency>
    </div>

    <vue-element-loading
      :active="show"
      spinner="bar-fade-scale"
      color="#4063D5"
    />
    <div v-show="Checkin == true" class="xiaoyanzhong">
      {{ $t("xiaoyanzhong") }}
    </div>
  </div>
</template>
<script>
// ===========引入公共组件=================
// 人工客服
import service from "@/components/Orders/service";
// 提供复制粘贴功能的插件
import Clipboard from "clipboard";
// laoding组件
import VueElementLoading from "vue-element-loading";
// 引入时间戳工具
import moment from "moment";
// ===========引入内部组件===============
// 联系人卡片
import Phone from "@/components/Orders/phone";
// alert'订单以生成'
import shade from "@/components/Orders/shade";
// 确认弹窗‘确定取消订单’
import mask2 from "@/components/Orders/mask2";
// 确认弹窗‘申请仲裁’
import mask3 from "@/components/Orders/mask3";
// 确认弹窗‘确定放币给对方’
import release from "@/components/Orders/release";
// 时间倒计时组件
import datatime from "@/components/Orders/datatime";
// ================接口请求=============
import httpUtils from "@/utils/net/httpUtils";
import requestApi from "@/page/Circulation/api/index.js";
// ================BAXAPI==============
import BXJSSDKAPI from "@/bxapi/api";
// ==============图片分享==============
import shareInfo from "@/config/share_info";
// ======未知===========
import examine from "@/components/Orders/examine";
import legalcurrency from "@/components/legalcurrency/legalcurrency1";

// ==================埋点========================
import TrackAPI from "@/utils/track";
export default {
  name: "Circulation",
  data() {
    return {
      // =============交互的参数=============
      // 订单编号
      uuide: "",
      // =============接口请求==============
      // 用户的id
      createdid: "",
      // 订单详情信息
      grouparray: [],
      // 创建时间
      datatimes: "",
      // 订单编号
      uuid: "",
      // 取消订单的人的ID
      canceleduserid: "",
      // 商家等级
      Merchant_level: "",
      // 币种
      unit: "",
      // 价格-法币的种类
      unit2: "",
      // 总金额-法币的种类
      unit1: "",
      amount: "", //数量
      // 交易的数量
      amount1: "",
      price: "", //总量
      // 交易的价格
      price1: "",
      total_price: "",
      total_price1: "",
      canceltext: "",
      // currency: "", //币
      // OrderID: '',
      note: "",
      note1: "",
      name: "",
      nickname: "",
      CreateTime: "",
      Paymenttime: "",
      currenttime: "",
      Deadline: "",
      icon: "",
      realname: "",
      side: "", // 购买
      status: "", //
      legals: [
        "招商银行 (632**3920)",
        "支付宝 (180**3945)",
        "支付宝 (zhd**163.com)",
      ],
      Paymentgroup: [],
      // 显示发币遮罩层
      LegalCurrencyBoxB: false,
      list1: "",
      list2: "",
      list3: "",
      list4: "",
      Promptcontent: "",
      datatime: "",
      newdata: "",
      time: "",
      day: "",
      hours: "",
      Minute: "",
      Second: "",
      ArbitrationID: "",
      show: false,
      Winner: "",
      legal_price_digits: "",
      currency_amount_digits: "",
      total_price_digits: "",
      orderuuid: "",
      vendorName: "",
      Initiator: false,
      Initiator1: true,
      Switchingpayment: false,
      yinhanka: false,
      datadata: "",
      iphone: "",
      bixintargetid: "",
      attestation: "",
      relation: "",
      compensate: "",
      Subbranch: false,
      Cancellation: false,
      Applyfor: false,
      emption: false,
      frequency: "",
      Minutetimes: "",
      Noar: "guan",
      Noar1: "guan1",
      Upperlimit: "",
      promiseTime: "",
      promiseTime1: "",
      oldUrl: "",
      Coin_release: false,
      sendrealname: "",
      buyrealname: "",
      legal_currency: "",
      bankname: "",
      bankname1: "",
      lookover: false,
      lookup: "",
      one_Newtimes: "",
      paypal: true,
      show_Receivables: true,
      sendname: "",
      sendnickname: "",
      Checkin: false,
      Receivables: "",
      // 法币人商家等级
      sender_Merchant_level: "",
      // 收币人商家等级
      receiver_Merchant_level: "",
      offLineTrading: false, //线下交易
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // 通过 `vm` 访问组件实例,将值传入oldUrl
      vm.oldUrl = from.path;
      if (vm.oldUrl === "/payment") {
        window.need_back_three_step = true;
      }
      vm.name = from.name;
    });
  },
  created() {
    this.createdid1();
    this.setNativeNavigationItems();
  },
  mounted() {
    this.$nextTick(() => {
      this.fanhuishangye();
      BXJSSDKAPI.observerNativeCall("back", (result) => {
        if (
          this.oldUrl == "/orderDetail" ||
          this.oldUrl == "/orderList" ||
          this.oldUrl == "/"
        ) {
          this.$router.back(-1);
        }
        if (this.oldUrl == "/payment") {
          console.log("获取到的支付状态", this.status);
          // PENDING PAYED
          if (this.status === "PAYED") {
            this.$router.go(-3);
          } else {
            this.$router.go(-1);
          }
          window.need_back_three_step = false;
        }
        if (this.oldUrl == "/ErrorPage") {
          if (window.need_back_three_step) {
            this.$router.back(-3);
            window.need_back_three_step = false;
          } else {
            this.$router.back(-1);
          }
        }
      });
    });
    this.arbitrate1();
    this.show = true;
  },
  methods: {
    // ==============接口请求=================
    // 获取用户ID
    createdid1() {
      let body = {
        query: ` {
          mapp_otc_user_info{
            user_base_info{
              id
            } 
          }
        }`,
      };
      httpUtils.request("post", "/graphql", {}, {}, body, (code, data) => {
        if (data != "" || data != null) {
          let get_user_id = data.data.mapp_otc_user_info.user_base_info.id;
          this.createdid = get_user_id;
          this.OrderList();
        }
      });
    },
    // 账单详情
    OrderList() {
      this.uuide = this.$route.query.uuide;
      requestApi.getOrderDetail({ uuide: this.uuide }, (data) => {
        console.log("拿到的订单详情信息======>", data);
        this.show = false;
        // 吐司
        if (data.errors != undefined) {
          if (data.errors[0].code) {
            this.$toast(data.errors[0].message);
          } else {
            this.$toast(
              this.$t("A server error occurred. Please try again later")
            );
          }
          return;
        }
        let datasheet = data.data.mapp_otc_order_info;
        this.offLineTrading = true;
        // 获取到与订单相关者的信息，对比进入页面的用户信息，非订单相关，跳到首页
        if (
          datasheet.sender_info.user_base_info.id != this.createdid &&
          datasheet.receiver_info.user_base_info.id != this.createdid
        ) {
          this.$router.push({
            path: "/",
          });
          return;
        }
        this.grouparray = datasheet;
        // 转化时间戳
        this.datatimes = this.zhuanhuan(this.grouparray.created_at);
        this.uuid = datasheet.uuid;
        // 超时取消人的ID
        this.canceleduserid = datasheet.canceled_user_id;
        // 获取商家的等级，该方向以用户为视角
        this.Merchant_level =
          datasheet[
            datasheet.side === "SELL" ? "receiver_info" : "sender_info"
          ].user_accredit_info.merchant_level;
        // 切换支付方式处理
        if (datasheet.receive_legal_money_accounts.length > 1) {
          this.Switchingpayment = true;
        }
        // 详情页进来后显示的页面或从下单页进来
        this.legals = datasheet.receive_legal_money_accounts;
        if (datasheet.marked_receive_legal_money_account.length != 0) {
          this.Receivables =
            datasheet.marked_receive_legal_money_account[0].account_name;
          console.log(this.Receivables, "shoukuangfangshi");
        }
        console.log(this.legals, "这是什么");
        if (
          this.legals != undefined &&
          this.legals != "" &&
          this.legals != null
        ) {
          if (this.legals[0] != undefined) {
            this.Paymentgroup = this.legals[0];
            // 处理银行卡逻辑
            this.bankname1 = this.Paymentgroup.name;
            if (this.Paymentgroup.name == "paypal") {
              this.paypal = false;
            } else {
              this.paypal = true;
            }
            if (this.Paymentgroup.name == "bankcard") {
              this.bankname1 = "bankcard";
              if (this.Paymentgroup.location.length > 7) {
                this.Paymentgroup.name =
                  this.Paymentgroup.location.substring(0, 7) + "......";
              }
            }

            if (
              this.Paymentgroup.sub_location != undefined ||
              this.Paymentgroup.sub_location != ""
            ) {
              this.Subbranch = true;
            }
            if (this.Paymentgroup.sub_location == "") {
              this.Subbranch = false;
            }
            console.log(this.legals + "kong");
            if (this.legals[0].location != "") {
              this.yinhanka = true;
            } else {
              this.yinhanka = false;
            }
          }
        }
        // 总金额处理
        let amount = datasheet.total_price.amount;
        let temp = Number(amount);
        this.total_price = temp;
        // 价格处理
        let price = datasheet.price.amount;
        let jiage = Number(price);
        this.price = jiage;
        // 数量处理
        let currency_amount = datasheet.currency_amount.amount;
        let shuliang = Number(currency_amount);
        this.amount = shuliang;
        // 币种类型处理
        let unit = datasheet.currency_amount.unit;
        let unit1 = datasheet.total_price.unit;
        let unit2 = datasheet.price.unit;
        this.unit = unit;
        this.unit1 = unit1;
        this.unit2 = unit2;
        // 调取币种函数
        this.getOtcDdigitsInfo();
        // 留言处理
        let note = datasheet.note;
        // 名称处理
        if (datasheet.sender_info != null) {
          this.sendname = datasheet.sender_info.user_base_info.name;
        }
        let buyname = datasheet.receiver_info.user_base_info.name;
        // 昵称处理
        if (datasheet.sender_info != null) {
          this.sendnickname = datasheet.sender_info.user_base_info.nickname;
        }
        let buynickname = datasheet.receiver_info.user_base_info.nickname;
        // 真实名称
        if (datasheet.sender_info != null) {
          this.sendrealname = datasheet.sender_info.user_base_info.realname;
        }
        this.buyrealname = datasheet.receiver_info.user_base_info.realname;
        // 头像处理
        let sendicon = datasheet.sender_info.user_base_info.icon;
        let buyicon = datasheet.receiver_info.user_base_info.icon;
        // 电话
        let sendiphone = datasheet.sender_info.user_base_info.phone;
        let buyiphone = datasheet.receiver_info.user_base_info.phone;
        // bixin_target_id
        let sendtargetid = datasheet.sender_info.user_base_info.bixin_target_id;
        let buytargetid =
          datasheet.receiver_info.user_base_info.bixin_target_id;
        // 认证商家
        let sendaccredited =
          datasheet.sender_info.user_accredit_info.is_accredited;
        let buyaccredited =
          datasheet.receiver_info.user_accredit_info.is_accredited;

        //包赔
        let sendiscompensated =
          datasheet.sender_info.user_accredit_info.is_compensated;
        // let buyiscompensated = datasheet.sender_info.user_accredit_info.is_compensated;
        let buyiscompensated =
          datasheet.receiver_info.user_accredit_info.is_compensated;
        // console.log("拿到的包配上架得到的",datasheet.sender_info.user_accredit_info,"")
        // 状态处理
        let status = datasheet.status;
        this.status = status;
        this.setNativeNavigationItems();
        this.pageHeaderNewShare();
        // 支付方式
        if (status != "PENDING") {
          console.log(
            datasheet.marked_receive_legal_money_account.length,
            "空数组长"
          );
          if (
            datasheet.marked_receive_legal_money_account.length === 0 ||
            datasheet.marked_receive_legal_money_account == "" ||
            datasheet.marked_receive_legal_money_account == "[]" ||
            datasheet.marked_receive_legal_money_account == null ||
            datasheet.marked_receive_legal_money_account == undefined
          ) {
            this.show_Receivables = false;
          }
        }
        if (status != "PENDING" && status != "SOLVED") {
          this.legals = datasheet.marked_receive_legal_money_account;
          console.log(this.legals, "支付数组");
          if (
            this.legals[0] != undefined &&
            this.legals[0] != "" &&
            this.legals[0] != null
          ) {
            this.Paymentgroup = this.legals[0];
            // 处理银行卡逻辑
            this.bankname1 = this.Paymentgroup.name;
            if (this.Paymentgroup.name == "paypal") {
              this.paypal = false;
            } else {
              this.paypal = true;
            }
            if (this.Paymentgroup.name == "bankcard") {
              this.Paymentgroup.name = this.Paymentgroup.location;
              this.bankname1 = "bankcard";
              if (this.Paymentgroup.location.length > 7) {
                this.Paymentgroup.name =
                  this.Paymentgroup.location.substring(0, 7) + "......";
              }
            }
            if (
              this.Paymentgroup.sub_location != undefined ||
              this.Paymentgroup.sub_location != ""
            ) {
              this.Subbranch = true;
            }
            if (this.Paymentgroup.sub_location == "") {
              this.Subbranch = false;
            }
            if (this.legals[0].location != "") {
              this.yinhanka = true;
            } else {
              this.yinhanka = false;
            }
          }
        }
        // 买卖方判断
        let createuserid = datasheet.create_order_user_id;
        // 时间处理
        let created = datasheet.created_at;
        this.CreateTime = created;

        let Paymenttime = datasheet.auto_cancel_time_point;
        this.Paymenttime = Paymenttime;

        let Deadline = datasheet.auto_send_coin_time_point;
        this.Deadline = Deadline;
        // 现在的时间
        let currenttime = new Date().getTime() / 1000;
        this.currenttime = Math.round(currenttime) + 1;
        console.log(this.currenttime, "当前时间");
        console.log(typeof this.currenttime, "类型");
        // 仲裁
        let ArbitrationID = datasheet.apply_arbitrate_user_id;
        this.ArbitrationID = ArbitrationID;
        //赢家
        let Winner = datasheet.arbitrate_winner_id;
        this.Winner = Winner;
        //留言处理
        if (note != "" && note != undefined) {
          this.note1 = true;
          this.note = note;
        }
        // 仲裁延时处理
        let payedat = datasheet.payed_at;
        if (payedat != "") {
          let delayed = parseInt(payedat) + 15 * 60;
          if (this.currenttime > payedat && delayed > this.currenttime) {
            // let Surplus = delayed - this.currenttime;
            clearInterval(this.promiseTime);
            let that = this;
            that.promiseTime = setInterval(function () {
              let timestamp = new Date().getTime() / 1000;
              let newtimes = Math.round(timestamp);
              let Surplus = delayed - newtimes;
              if (Surplus <= 0) {
                clearInterval(that.promiseTime);
                that.Noar = "kai";
                that.Noar1 = "kai";
              }
            }, 1000);
          }
          if (delayed <= this.currenttime) {
            this.Noar = "kai";
            this.Noar1 = "kai";
          }
        }

        // 用户买卖方向
        if (createuserid == this.createdid) {
          this.side = datasheet.side;
          // 下单购买-购买货币
          if (datasheet.side == "BUY") {
            console.log(this.side);
            console.log("自己购买");
            this.side = "BUY"; // 主动购买a, (a和c是一组)
            this.status = status;
            this.Buyer(); // 我买
            this.zhongcai();
            // 买方信息
            this.name = this.sendname;
            if (this.sendnickname != "" && this.sendnickname != undefined) {
              this.nickname = this.sendnickname;
            } else {
              this.nickname = this.sendname;
            }
            this.icon = sendicon;
            this.iphone = sendiphone;
            this.bixintargetid = sendtargetid;
            this.attestation = sendaccredited;
            this.relation = "gua";
            this.compensate = sendiscompensated;
          } else {
            // 下单出售-出售货币
            console.log("自己出售");
            this.side = "SELL"; // 主动出售b, （b和d是一组）
            this.status = status;
            this.seller(); //我卖
            this.zhongcai1();
            // 卖方信息
            this.name = buyname;
            if (buynickname != "" && buynickname != undefined) {
              this.nickname = buynickname;
            } else {
              this.nickname = buyname;
            }
            this.icon = buyicon;
            this.iphone = buyiphone;
            this.bixintargetid = buytargetid;
            this.attestation = buyaccredited;
            this.relation = "gua";
            this.compensate = buyiscompensated;
          }
        } else {
          // 对方下单-出售货币
          if (datasheet.side == "BUY") {
            this.side = "SELL"; // 被动出售c
            this.status = status;
            this.seller1(); // 对方卖
            this.zhongcai2();
            // 卖方信息
            this.name = buyname;
            if (buynickname != "" && buynickname != undefined) {
              this.nickname = buynickname;
            } else {
              this.nickname = buyname;
            }
            this.icon = buyicon;
            this.iphone = buyiphone;
            this.bixintargetid = buytargetid;
            this.attestation = buyaccredited;
            this.relation = "xia";
            this.compensate = buyiscompensated;
          } else {
            // 对方下单-购买货币
            this.side = "BUY"; // 被动购买d,
            this.status = status;
            this.Buyer1(); // 对方买
            this.zhongcai3();
            // 买方信息
            this.name = this.sendname;
            if (this.sendnickname != "" && this.sendnickname != undefined) {
              this.nickname = this.sendnickname;
            } else {
              this.nickname = this.sendname;
            }
            this.icon = sendicon;
            this.iphone = sendiphone;
            this.bixintargetid = sendtargetid;
            this.attestation = sendaccredited;
            this.relation = "xia";
            this.compensate = sendiscompensated;
          }
        }

        // 埋点
        this.BuriedPoint(data.data.mapp_otc_order_info);
      });
    },
    // 初次进入判断仲裁次数
    arbitrate1() {
      this.uuide = this.$route.query.uuide;
      let body = {
        query: ` {
          mapp_otc_user_action_info(
            order_uuid: "${this.uuide}"
          ){
            apply_arbitrate_count
          }
        }`,
      };
      httpUtils.request("post", "/graphql", {}, {}, body, (code, data) => {
        if (data.errors != undefined) {
          this.$toast.center(data.errors[0].message, { duration: 2000 });
        }
        if (data.data.mapp_otc_user_action_info.apply_arbitrate_count >= 4) {
          this.Initiator1 = false;
        }
      });
    },
    // ===============页面刷新相关==============
    // 下拉刷新
    refresh() {
      setTimeout(() => {
        this.createdid1();
        this.arbitrate1();
        this.$refs.myScroller.finishPullToRefresh(true);
      }, 1500);
    },
    // 点击查看收款码的跳转
    tiaozhuan() {
      this.lookover = true;
      this.lookup = this.Paymentgroup.payee_qrcode_url;
    },
    clonebox1() {
      this.lookover = false;
    },

    arbitrate() {
      this.uuide = this.$route.query.uuide;
      let body = {
        query: ` {
          mapp_otc_user_action_info(
                order_uuid: "${this.uuide}"
              ){
              rule_1_cancel_count
              rule_2_cancel_count
              rule_3_cancel_count
              tip_release_currency_count
              apply_arbitrate_count
          }
        }`,
      };
      httpUtils.request("post", "/graphql", {}, {}, body, (code, data) => {
        if (data.errors != undefined) {
          this.$toast.center(data.errors[0].message, { duration: 2000 });
        }
        console.log(
          data.data.mapp_otc_user_action_info.apply_arbitrate_count,
          "次数"
        );
        if (data.data.mapp_otc_user_action_info.apply_arbitrate_count >= 3) {
          this.Initiator1 = false;
        }
        console.log(data.data.mapp_otc_user_action_info.apply_arbitrate_count);
        if (data.data.mapp_otc_user_action_info.apply_arbitrate_count == 3) {
          this.Upperlimit = 0;
        } else {
          this.Upperlimit = 2;
        }
      });
    },
    // 发起仲裁
    arbitration() {
      this.Applyfor = true;
      this.arbitrate();
    },
    // 点击仲裁
    zhongcaianniu() {
      this.$toast.center(this.$t("Not clickable"), { duration: 2000 });
    },
    tixingfangbi() {
      this.$toast.center(this.$t("Not clickable"), { duration: 2000 });
    },

    clickHide() {
      this.emption = false;
    },
    clickHidebox2() {
      this.Applyfor = false;
    },
    clickHidebox3() {
      this.uuide = this.$route.query.uuide;
      let body = {
        query: `mutation {
          mapp_otc_apply_arbitrate(
              uuid: "${this.uuide}"
          ){
              ok
          }
        }`,
      };
      httpUtils.request("post", "/graphql", {}, {}, body, (code, data) => {
        if (data.errors != undefined) {
          this.$toast.center(data.errors[0].message, { duration: 2000 });
        }
        let that = this;
        // 确认放币
        setTimeout(() => {
          this.Applyfor = false;
          that.OrderList();
        }, 1000);
      });
    },
    // 取消仲裁的按钮
    quxiaozhongcai() {
      this.uuide = this.$route.query.uuide;
      let body = {
        query: `mutation {
          mapp_otc_cancel_arbitrate(
            uuid: "${this.uuide}"
          ){
            ok
          }
        }`,
      };
      httpUtils.request("post", "/graphql", {}, {}, body, (code, data) => {
        if (data.errors != undefined) {
          this.$toast.center(data.errors[0].message, { duration: 2000 });
        }

        let that = this;
        // 确认放币
        setTimeout(() => {
          that.OrderList();
        }, 1000);
      });
    },

    // 发币提醒
    Coinmaking() {
      this.uuide = this.$route.query.uuide;
      let that = this;
      let body = {
        query: `mutation {
          mapp_otc_tip_release_currency(
            uuid: "${that.uuide}"
          ){
            ok
            data
          }
        }`,
      };
      httpUtils.request("post", "/graphql", {}, {}, body, (code, data) => {
        if (data.errors != undefined) {
          this.$toast.center(data.errors[0].message, { duration: 2000 });
        }
        if (data.data.mapp_otc_tip_release_currency.ok == "true") {
          let message = data.data.mapp_otc_tip_release_currency.data;
          let message1 = JSON.parse(message);
          if (message1.code == 30109) {
            this.$toast.center(
              this.$t("You have reminded the seller to release tokens."),
              { duration: 2000 }
            );
          }
        }
      });
    },

    // 取消订单的按钮
    cancel() {
      let FiveMinutesthis = parseInt(this.CreateTime) + 300;
      let Fifteenminutes = parseInt(this.CreateTime) + 900;
      this.uuide = this.$route.query.uuide;
      let body = {
        query: ` {
          mapp_otc_user_action_info(
                order_uuid: "${this.uuide}"
              ){
              rule_1_cancel_count
              rule_2_cancel_count
              rule_3_cancel_count
              tip_release_currency_count
              apply_arbitrate_count
          }
        }`,
      };
      httpUtils.request("post", "/graphql", {}, {}, body, (code, data) => {
        if (data.errors != undefined) {
          this.$toast.center(data.errors[0].message, { duration: 2000 });
        }
        let Clicks = data.data.mapp_otc_user_action_info.rule_1_cancel_count;
        let rulecount2 =
          data.data.mapp_otc_user_action_info.rule_2_cancel_count;
        let body = {
          query: ` {
            mapp_otc_ban_rule{
                rule_1_times
                rule_2_times
            }
          }`,
        };
        httpUtils.request("post", "/graphql", {}, {}, body, (code, data) => {
          if (data.errors != undefined) {
            this.$toast.center(data.errors[0].message, { duration: 2000 });
          }
          let currenttime = new Date().getTime() / 1000;
          if (currenttime < FiveMinutesthis) {
            this.frequency = parseInt(
              data.data.mapp_otc_ban_rule.rule_1_times - Clicks + 1
            );
            this.Minutetimes = "5";
          }
          if (currenttime < Fifteenminutes && currenttime >= FiveMinutesthis) {
            this.frequency = parseInt(
              data.data.mapp_otc_ban_rule.rule_2_times - rulecount2 + 1
            );
            this.Minutetimes = "15";
          }
        });
      });
      this.Cancellation = true;
    },

    clickHidebox() {
      this.Cancellation = false;
    },
    clickHidebox1() {
      this.show = true;
      this.uuide = this.$route.query.uuide;
      let body = {
        query: `mutation{
          mapp_otc_cancel_order(
            uuid: "${this.uuide}"
          ) {
            ok
          }
        }`,
      };
      httpUtils.request("post", "/graphql", {}, {}, body, (code, data) => {
        if (data.errors != undefined) {
          this.$toast.center(data.errors[0].message, { duration: 2000 });
        }
        if (data.data != undefined) {
          this.show = false;
          this.Cancellation = false;
          let that = this;
          setTimeout(() => {
            this.show = false;
            that.OrderList();
          }, 1500);
          // 订单结束的埋点-取消
          this.orderFinishBuriedPoint(false);
        }
      });
    },

    conceal() {
      this.Coin_release = false;
    },
    // 支付密码原生弹窗
    clearing() {
      this.Coin_release = false;
      this.uuide = this.$route.query.uuide;
      let body = {
        query: `mutation{
          mapp_otc_pre_release_currency(
            uuid: "${this.uuide}"
          ){
            vendor_name
            order_uuid
          }
        }`,
      };
      httpUtils.request("post", "/graphql", {}, {}, body, (code, data) => {
        if (data.errors != undefined) {
          this.$toast.center(data.errors[0].message, { duration: 2000 });
        }
        if (
          data.data.mapp_otc_pre_release_currency != undefined ||
          data.data.mapp_otc_pre_release_currency != "" ||
          data.data.mapp_otc_pre_release_currency != null
        ) {
          this.orderuuid = data.data.mapp_otc_pre_release_currency.order_uuid;
          this.vendorName = data.data.mapp_otc_pre_release_currency.vendor_name;
          // 调取支付方法
          let params = {
            seqId: this.orderuuid,
            vendorName: this.vendorName,
            title: this.$t("Enter payment password"),
            msg: this.$t("Confirm release"),
            amount: this.amount.toString(),
            unit: this.unit,
            icon: "",
          };
          BXJSSDKAPI.nativeAuth("password", params, (code, data) => {
            if (data.errors != undefined) {
              this.$toast.center(data.errors[0].message, { duration: 2000 });
            }
            this.uuide = this.orderuuid;
            if (data == true) {
              let that = this;
              // 确认放币
              that.show = true;
              that.Checkin = true;
              let one_Newtimes = parseInt(new Date().getTime() / 1000) + 15;
              that.one_Newtimes = one_Newtimes;
              clearInterval(that.promiseTime1);
              that.promiseTime1 = setInterval(function () {
                let body = {
                  query: ` {
                    mapp_otc_release_currency_verify_payment_password_status(
                      order_uuid: "${that.uuide}"
                    ) {
                      ok
                    }
                  }`,
                };
                httpUtils.request(
                  "post",
                  "/graphql",
                  {},
                  {},
                  body,
                  (code, data) => {
                    if (data.errors != undefined) {
                      that.$toast.center(data.errors[0].message, {
                        duration: 2000,
                      });
                    }
                    console.log(
                      data.data
                        .mapp_otc_release_currency_verify_payment_password_status
                        .ok
                    );
                    if (
                      data.data
                        .mapp_otc_release_currency_verify_payment_password_status ==
                        "" ||
                      data.data
                        .mapp_otc_release_currency_verify_payment_password_status
                        .ok == false
                    ) {
                      let twotime = parseInt(new Date().getTime() / 1000);
                      console.log(that.one_Newtimes);
                      if (twotime > that.one_Newtimes) {
                        clearInterval(that.promiseTime1);
                        this.$router.push({
                          path: "/ErrorPage",
                          query: {},
                        });
                        that.Checkin = false;
                        that.show = false;
                      }
                    }
                    if (
                      data.data
                        .mapp_otc_release_currency_verify_payment_password_status
                        .ok == true
                    ) {
                      clearInterval(that.promiseTime1);
                      let body = {
                        query: `mutation {
                        mapp_otc_release_currency(
                          uuid: "${that.uuide}"
                        ) {
                          ok
                        }
                      }`,
                      };
                      httpUtils.request(
                        "post",
                        "/graphql",
                        {},
                        {},
                        body,
                        (code, data) => {
                          if (data.errors != undefined) {
                            that.$toast.center(data.errors[0].message, {
                              duration: 2000,
                            });
                            that.show = false;
                            that.Checkin = false;
                          }
                          that.show = false;
                          that.Checkin = false;
                          if (
                            data.data.mapp_otc_release_currency == null ||
                            data.data.mapp_otc_release_currency.ok == "true"
                          ) {
                            that.show = true;
                            that.OrderList();
                            // 订单结束的埋点-已到账
                            that.orderFinishBuriedPoint(true);
                          }
                        }
                      );
                    }
                  }
                );
              }, 1000);
            }
          });
        }
      });
    },
    // 支付密码原生弹窗
    Paymentpassword() {
      this.Coin_release = true;
    },
    // 获取币精度
    getOtcDdigitsInfo() {
      let body = {
        query: `{
              mapp_otc_digits_info(
                currency: "${this.unit}"
                ){
                  currency{
                  name
                  fullname
                  icon
                  }
                  legal_price_digits
                  currency_amount_digits
                  total_price_digits
              }
          }`,
      };
      httpUtils.request("post", "/graphql", {}, {}, body, (code, data) => {
        console.log("精度信息" + JSON.stringify(data));
        this.legal_price_digits =
          data.data.mapp_otc_digits_info.legal_price_digits;
        this.currency_amount_digits =
          data.data.mapp_otc_digits_info.currency_amount_digits;
        this.total_price_digits =
          data.data.mapp_otc_digits_info.total_price_digits;
        this.total_price1 = parseFloat(
          this.total_price.toFixed(this.total_price_digits)
        );
        this.price1 = parseFloat(this.price.toFixed(this.legal_price_digits));
        this.amount1 = parseFloat(
          this.amount.toFixed(this.currency_amount_digits)
        );
      });
    },
    // 时间戳转换
    zhuanhuan(sjtime) {
      let ConversionValue = moment
        .unix(Number(sjtime))
        .format("YYYY-MM-DD HH:mm:ss");
      return ConversionValue;
    },
    // 解决的线样式
    jiejueyangshi() {
      let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
      let Dottedline1 = document.querySelectorAll(".Dottedline")[1];
      Dottedline0.style = "border-bottom: 2px solid #fff";
      Dottedline1.style = "border-bottom: 2px solid #fff";
    },

    jiejue() {
      // 下单购买 a购买自己
      if (this.Winner == this.createdid) {
        if (this.status == "SOLVED") {
          // this.realname = this.sendrealname;
          this.realname = this.Receivables;
          this.list1 = this.$t("Place order");
          this.list2 = this.$t("Payment Complete");
          this.list3 = this.$t("You initiate an arbitration");
          this.list4 = this.$t("Order completed"); // 买方赢
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t(
            "The arbitration settled and you are the winner."
          );
        }
      } else {
        if (this.status == "SOLVED") {
          // this.realname = this.sendrealname;
          this.realname = this.Receivables;
          this.list1 = this.$t("Place order");
          this.list2 = this.$t("Payment Complete");
          this.list3 = this.$t("You initiate an arbitration");
          this.list4 = this.$t("Order Canceled1"); // 买方输
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t("The arbitration settled and you lose.");
        }
      }
    },

    jiejue1() {
      // 下单购买  a购买自己
      if (this.Winner == this.createdid) {
        if (this.status == "SOLVED") {
          // this.realname = this.sendrealname;
          this.realname = this.Receivables;
          this.list1 = this.$t("Place order");
          this.list2 = this.$t("Payment Complete");
          this.list3 = this.$t("Merchant initiates an arbitration");
          this.list4 = this.$t("Order completed"); // 买方赢
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t(
            "The arbitration settled and you are the winner."
          );
        }
      } else {
        if (this.status == "SOLVED") {
          // this.realname = this.sendrealname;
          this.realname = this.Receivables;
          this.list1 = this.$t("Place order");
          this.list2 = this.$t("Payment Complete");
          this.list3 = this.$t("Merchant initiates an arbitration");
          this.list4 = this.$t("Order Canceled1"); // 买方输
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t("The arbitration settled and you lose.");
        }
      }
    },

    jiejue2() {
      // 对方下单购买 c出售不是自己
      if (this.Winner == this.createdid) {
        if (this.status == "SOLVED") {
          this.realname = this.buyrealname;
          // this.realname = this.Receivables;
          this.list1 = this.$t("Order placed");
          this.list2 = this.$t("Payment Complete1");
          this.list3 = this.$t("You initiate an arbitration");
          this.list4 = this.$t("Order Canceled1"); // 卖方赢
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t("you are the winner.");
        }
      } else {
        if (this.status == "SOLVED") {
          this.realname = this.buyrealname;
          // this.realname = this.Receivables;
          this.list1 = this.$t("Order placed");
          this.list2 = this.$t("Payment Complete1");
          this.list3 = this.$t("You initiate an arbitration");
          this.list4 = this.$t("Order completed"); // 卖方输
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t("you lose.");
        }
      }
    },

    jiejue3() {
      // 对方下单购买 c出售不是自己
      if (this.Winner == this.createdid) {
        if (this.status == "SOLVED") {
          this.realname = this.buyrealname;
          // this.realname = this.Receivables;
          this.list1 = this.$t("Order placed");
          this.list2 = this.$t("Payment Complete1");
          this.list3 = this.$t("Merchant initiates an arbitration");
          this.list4 = this.$t("Order Canceled1"); // 卖方赢
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t("you are the winner.");
        }
      } else {
        if (this.status == "SOLVED") {
          this.realname = this.buyrealname;
          // this.realname = this.Receivables;
          this.list1 = this.$t("Order placed");
          this.list2 = this.$t("Payment Complete1");
          this.list3 = this.$t("Merchant initiates an arbitration");
          this.list4 = this.$t("Order completed"); // 卖方输
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t("you lose.");
        }
      }
    },
    jiejue4() {
      // 下单出售 b出售 自己
      if (this.Winner == this.createdid) {
        if (this.status == "SOLVED") {
          this.realname = this.buyrealname;
          // this.realname = this.Receivables;
          this.list1 = this.$t("Selling Order");
          this.list2 = this.$t("Payment Complete1");
          this.list3 = this.$t("You initiate an arbitration");
          this.list4 = this.$t("Order Canceled1"); // 卖家赢
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t("you are the winner.");
        }
      } else {
        if (this.status == "SOLVED") {
          this.realname = this.buyrealname;
          // this.realname = this.Receivables;
          this.list1 = this.$t("Selling Order");
          this.list2 = this.$t("Payment Complete1");
          this.list3 = this.$t("You initiate an arbitration");
          this.list4 = this.$t("Order completed"); //卖家输
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t("you lose.");
        }
      }
    },
    jiejue5() {
      // 下单出售 b出售自己
      if (this.Winner == this.createdid) {
        if (this.status == "SOLVED") {
          this.realname = this.buyrealname;
          // this.realname = this.Receivables;
          this.list1 = this.$t("Selling Order");
          this.list2 = this.$t("Payment Complete1");
          this.list3 = this.$t("Merchant initiates an arbitration");
          this.list4 = this.$t("Order Canceled1"); // 卖家赢
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t("you are the winner.");
        }
      } else {
        if (this.status == "SOLVED") {
          this.realname = this.buyrealname;
          // this.realname = this.Receivables;
          this.list1 = this.$t("Selling Order");
          this.list2 = this.$t("Payment Complete1");
          this.list3 = this.$t("Merchant initiates an arbitration");
          this.list4 = this.$t("Order completed"); // 卖家输
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t("you lose.");
        }
      }
    },
    jiejue6() {
      // 对方下单出售 d购买 不是自己
      if (this.Winner == this.createdid) {
        if (this.status == "SOLVED") {
          // this.realname = this.sendrealname;
          this.realname = this.Receivables;
          this.list1 = this.$t("Order placed");
          this.list2 = this.$t("Payment Complete");
          this.list3 = this.$t("You initiate an arbitration");
          this.list4 = this.$t("Order completed"); // 买家赢
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t(
            "The arbitration settled and you are the winner."
          );
        }
      } else {
        if (this.status == "SOLVED") {
          // this.realname = this.sendrealname;
          this.realname = this.Receivables;
          this.list1 = this.$t("Order placed");
          this.list2 = this.$t("Payment Complete");
          this.list3 = this.$t("You initiate an arbitration");
          this.list4 = this.$t("Order Canceled1"); // 买家输
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t("The arbitration settled and you lose.");
        }
      }
    },
    jiejue7() {
      // 对方下单出售 d购买 不是自己
      if (this.Winner == this.createdid) {
        if (this.status == "SOLVED") {
          // this.realname = this.sendrealname;
          this.realname = this.Receivables;
          this.list1 = this.$t("Order placed");
          this.list2 = this.$t("Payment Complete");
          this.list3 = this.$t("Merchant initiates an arbitration");
          this.list4 = this.$t("Order completed"); // 买家赢
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t(
            "The arbitration settled and you are the winner."
          );
        }
      } else {
        if (this.status == "SOLVED") {
          // this.realname = this.sendrealname;
          this.realname = this.Receivables;
          this.list1 = this.$t("Order placed");
          this.list2 = this.$t("Payment Complete");
          this.list3 = this.$t("Merchant initiates an arbitration");
          this.list4 = this.$t("Order Canceled1"); // 买家输
          let class4 = document.querySelectorAll(".text1")[3];
          let class2 = document.querySelectorAll(".text1")[1];
          let class3 = document.querySelectorAll(".text1")[2];
          this.jiejueyangshi();
          class2.style.marginLeft = "-8px";
          class4.style.marginLeft = "-8px";
          class4.style.color = "#fff";
          class3.style.color = "#fff";
          class4.style.fontWeight = "bold";
          this.Promptcontent = this.$t("The arbitration settled and you lose.");
        }
      }
    },

    zhongcai() {
      // 下单购买 a购买自己
      if (this.ArbitrationID == this.createdid) {
        this.Initiator = true;
        if (this.status == "DISPUTED") {
          // this.realname = this.sendrealname;
          this.realname = this.Receivables;
          this.list1 = this.$t("Place order");
          this.list2 = this.$t("Payment Complete");
          this.list3 = this.$t("You initiate an arbitration");
          this.list4 = this.$t("Arbitration Settled");
          let class3 = document.querySelectorAll(".text1")[2];
          let class2 = document.querySelectorAll(".text1")[1];
          let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
          Dottedline0.style = "border-bottom: 2px solid #fff";
          class3.style.fontSize = 14 + "px";
          class3.style.fontWeight = "bold";
          class3.style.color = "#fff";
          class2.style.marginLeft = "20px";
          class3.style.marginLeft = "20px";
          class3.style.marginTop = "-4px";
          this.Promptcontent = this.$t(
            "In arbitration, please wait for the help desk to contact you. This order will be suspended until it reaches a settlement."
          );
        }
        this.jiejue();
      } else {
        this.Initiator = false;
        if (this.status == "DISPUTED") {
          // this.realname = this.sendrealname;
          this.realname = this.Receivables;
          this.list1 = this.$t("Place order");
          this.list2 = this.$t("Payment Complete");
          this.list3 = this.$t("Merchant initiates an arbitration");
          this.list4 = this.$t("Arbitration Settled");
          let class3 = document.querySelectorAll(".text1")[2];
          let class2 = document.querySelectorAll(".text1")[1];
          let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
          Dottedline0.style = "border-bottom: 2px solid #fff";
          class3.style.fontSize = 14 + "px";
          class3.style.fontWeight = "bold";
          class3.style.color = "#fff";
          class2.style.marginLeft = "20px";
          class3.style.marginLeft = "20px";
          class3.style.marginTop = "-4px";
          this.Promptcontent = this.$t(
            "In arbitration, please wait for the help desk to contact you. This order will be suspended until it reaches a settlement."
          );
        }
        this.jiejue1();
      }
    },
    zhongcai2() {
      // 对方下单购买 c出售 不是自己
      if (this.ArbitrationID == this.createdid) {
        this.Initiator = true;
        if (this.status == "DISPUTED") {
          this.realname = this.buyrealname;
          // this.realname = this.Receivables;
          this.list1 = this.$t("Order placed");
          this.list2 = this.$t("Payment Complete1");
          this.list3 = this.$t("You initiate an arbitration");
          this.list4 = this.$t("Arbitration Settled");
          let class3 = document.querySelectorAll(".text1")[2];
          let class2 = document.querySelectorAll(".text1")[1];
          let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
          Dottedline0.style = "border-bottom: 2px solid #fff";
          class3.style.fontSize = 14 + "px";
          class3.style.fontWeight = "bold";
          class3.style.color = "#fff";
          class2.style.marginLeft = "20px";
          class3.style.marginLeft = "20px";
          class3.style.marginTop = "-4px";
          this.Promptcontent = this.$t(
            "In arbitration, please wait for the help desk to contact you. This order will be suspended until it reaches a settlement."
          );
        }
        this.jiejue2();
      } else {
        this.Initiator = false;
        if (this.status == "DISPUTED") {
          this.realname = this.buyrealname;
          // this.realname = this.Receivables;
          this.list1 = this.$t("Order placed");
          this.list2 = this.$t("Payment Complete1");
          this.list3 = this.$t("Merchant initiates an arbitration");
          this.list4 = this.$t("Arbitration Settled");
          let class3 = document.querySelectorAll(".text1")[2];
          let class2 = document.querySelectorAll(".text1")[1];
          let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
          Dottedline0.style = "border-bottom: 2px solid #fff";
          class3.style.fontSize = 14 + "px";
          class3.style.fontWeight = "bold";
          class3.style.color = "#fff";
          class2.style.marginLeft = "20px";
          class3.style.marginLeft = "20px";
          class3.style.marginTop = "-4px";
          this.Promptcontent = this.$t(
            "In arbitration, please wait for the help desk to contact you. This order will be suspended until it reaches a settlement."
          );
        }
        this.jiejue3();
      }
    },

    zhongcai1() {
      // 下单出售 b出售 自己
      if (this.ArbitrationID == this.createdid) {
        this.Initiator = true;
        if (this.status == "DISPUTED") {
          this.realname = this.buyrealname;
          // this.realname = this.Receivables;
          this.list1 = this.$t("Selling Order");
          this.list2 = this.$t("Payment Complete1");
          this.list3 = this.$t("You initiate an arbitration");
          this.list4 = this.$t("Arbitration Settled");
          let class3 = document.querySelectorAll(".text1")[2];
          let class2 = document.querySelectorAll(".text1")[1];
          let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
          Dottedline0.style = "border-bottom: 2px solid #fff";
          class3.style.fontSize = 14 + "px";
          class3.style.fontWeight = "bold";
          class3.style.color = "#fff";
          class2.style.marginLeft = "20px";
          class3.style.marginLeft = "20px";
          class3.style.marginTop = "-4px";
          this.Promptcontent = this.$t(
            "In arbitration, please wait for the help desk to contact you. This order will be suspended until it reaches a settlement."
          );
        }
        this.jiejue4();
      } else {
        this.Initiator = false;
        if (this.status == "DISPUTED") {
          this.realname = this.buyrealname;
          // this.realname = this.Receivables; // 收款方式姓名
          this.list1 = this.$t("Selling Order");
          this.list2 = this.$t("Payment Complete1");
          this.list3 = this.$t("Merchant initiates an arbitration");
          this.list4 = this.$t("Arbitration Settled");
          let class3 = document.querySelectorAll(".text1")[2];
          let class2 = document.querySelectorAll(".text1")[1];
          let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
          Dottedline0.style = "border-bottom: 2px solid #fff";
          class3.style.fontSize = 14 + "px";
          class3.style.fontWeight = "bold";
          class3.style.color = "#fff";
          class2.style.marginLeft = "20px";
          class3.style.marginLeft = "20px";
          class3.style.marginTop = "-4px";
          this.Promptcontent = this.$t(
            "In arbitration, please wait for the help desk to contact you. This order will be suspended until it reaches a settlement."
          );
        }
        this.jiejue5();
      }
    },
    zhongcai3() {
      // 对方下单出售 d购买 不是自己
      if (this.ArbitrationID == this.createdid) {
        this.Initiator = true;
        if (this.status == "DISPUTED") {
          // this.realname = this.sendrealname;
          this.realname = this.Receivables;
          this.list1 = this.$t("Order placed");
          this.list2 = this.$t("Payment Complete");
          this.list3 = this.$t("You initiate an arbitration");
          this.list4 = this.$t("Arbitration Settled");
          let class3 = document.querySelectorAll(".text1")[2];
          let class2 = document.querySelectorAll(".text1")[1];
          let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
          Dottedline0.style = "border-bottom: 2px solid #fff";
          class3.style.fontSize = 14 + "px";
          class3.style.fontWeight = "bold";
          class3.style.color = "#fff";
          class2.style.marginLeft = "20px";
          class3.style.marginLeft = "20px";
          class3.style.marginTop = "-4px";
          this.Promptcontent = this.$t(
            "In arbitration, please wait for the help desk to contact you. This order will be suspended until it reaches a settlement."
          );
        }
        // 你发起的仲裁
        this.jiejue6();
      } else {
        this.Initiator = false;
        if (this.status == "DISPUTED") {
          // this.realname = this.sendrealname;
          this.realname = this.Receivables;
          this.list1 = this.$t("Order placed");
          this.list2 = this.$t("Payment Complete");
          this.list3 = this.$t("Merchant initiates an arbitration");
          this.list4 = this.$t("Arbitration Settled");
          let class3 = document.querySelectorAll(".text1")[2];
          let class2 = document.querySelectorAll(".text1")[1];
          let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
          Dottedline0.style = "border-bottom: 2px solid #fff";
          class3.style.fontSize = 14 + "px";
          class3.style.fontWeight = "bold";
          class3.style.color = "#fff";
          class2.style.marginLeft = "20px";
          class3.style.marginLeft = "20px";
          class3.style.marginTop = "-4px";
          this.Promptcontent = this.$t(
            "In arbitration, please wait for the help desk to contact you. This order will be suspended until it reaches a settlement."
          );
        }
        // 对方发起仲裁
        this.jiejue7();
      }
    },

    showback() {
      // BXJSSDKAPI.setNativeNavigationItems1(
      //   {steps:-1},
      //   (code, data) => {}
      // );
    },
    Buyer() {
      //我自己是买方
      if (this.status == "PENDING") {
        //待付款的状态
        this.showback();
        let Difference = this.currenttime - this.CreateTime;
        if (Difference < 5) {
          this.emption = true;
        }
        console.log(this.CreateTime, "创建时间");
        if (this.currenttime < this.Paymenttime) {
          // let times2 = this.Paymenttime - this.currenttime ;
          // let times = times2+4
          this.time = this.Paymenttime;
        }
        this.list1 = this.$t("Place order");
        this.list2 = this.offLineTrading
          ? this.$t("前往交易")
          : this.$t("Pending payment");
        this.list3 = this.$t("Release the tokens1");
        this.list4 = this.$t("Order completed");
        let class2 = document.querySelectorAll(".text1")[1];
        class2.style.fontSize = 14 + "px";
        this.Promptcontent = this.offLineTrading
          ? this.$t("对方币已被系统锁定，请及时前往付款，超时将自动取消")
          : this.$t("The tokens are reserved.");
      }
      if (this.status == "PAYED") {
        // this.realname = this.sendrealname;
        this.realname = this.Receivables;
        if (this.currenttime < this.Deadline) {
          console.log(this.status + "状态");
          this.time = this.Deadline;
        }
        this.list1 = this.$t("Place order");
        this.list2 = this.$t("Payment Complete");
        this.list3 = this.$t("Release the tokens1");
        this.list4 = this.$t("Order completed");
        let class3 = document.querySelectorAll(".text1")[2];
        let class2 = document.querySelectorAll(".text1")[1];
        let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
        Dottedline0.style = "border-bottom: 2px solid #fff";
        class3.style.fontSize = 14 + "px";
        class3.style.color = "#fff";
        class2.style.marginLeft = "13px";
        class3.style.marginLeft = "15px";
        this.Promptcontent = this.$t("your account automatically if timeout.");
      }
      if (this.status == "FINISHED") {
        // this.realname = this.sendrealname;
        this.realname = this.Receivables;
        this.list1 = this.$t("Place order");
        this.list2 = this.$t("Payment Complete");
        this.list3 = this.$t("Tokens released1");
        this.list4 = this.$t("Order completed");
        let class4 = document.querySelectorAll(".text1")[3];
        let class2 = document.querySelectorAll(".text1")[1];
        let class3 = document.querySelectorAll(".text1")[2];
        let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
        let Dottedline1 = document.querySelectorAll(".Dottedline")[1];
        Dottedline0.style = "border-bottom: 2px solid #fff";
        Dottedline1.style = "border-bottom: 2px solid #fff";
        class2.style.marginLeft = "-8px";
        class4.style.marginLeft = "-8px";
        class4.style.color = "#fff";
        class3.style.color = "#fff";
        class4.style.fontWeight = "bold";
        this.Promptcontent = this.$t("Tokens released. Order completed.");
      }
      if (this.status == "CANCELED") {
        this.canceltext = this.$t("Canceled");
        if (this.canceleduserid == null || this.canceleduserid == "") {
          this.canceltext = this.$t("Canceled: timeout");
        }
      }
    },
    seller1() {
      //卖方
      if (this.status == "PENDING") {
        this.showback();
        if (this.currenttime < this.Paymenttime) {
          this.time = this.Paymenttime;
        }
        this.list1 = this.$t("Order placed");
        this.list2 = this.$t("Pending payment1");
        this.list3 = this.$t("Release the tokens");
        this.list4 = this.$t("Order completed");
        let class2 = document.querySelectorAll(".text1")[1];
        class2.style.fontSize = 14 + "px";
        class2.style.fontWeight = "bold";
        class2.style.marginLeft = "-11px";
        class2.style.marginTop = "-4px";
        if (this.$i18n.locale !== "zh") {
          class2.style.width = "75px";
        }
        this.Promptcontent = this.$t("Order will be canceled if timeout");
      }
      if (this.status == "PAYED") {
        this.realname = this.buyrealname;
        // this.realname = this.Receivables;
        if (this.currenttime < this.Deadline) {
          this.time = this.Deadline;
        }
        this.list1 = this.$t("Order placed");
        this.list2 = this.$t("Payment Complete1");
        this.list3 = this.$t("Release the tokens");
        this.list4 = this.$t("Order completed");
        let class3 = document.querySelectorAll(".text1")[2];
        let class2 = document.querySelectorAll(".text1")[1];
        let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
        Dottedline0.style = "border-bottom: 2px solid #fff";
        class3.style.fontSize = 14 + "px";
        class3.style.color = "#fff";
        class3.style.marginLeft = "6px";
        this.Promptcontent = this.$t("Please confirm.");
      }
      if (this.status == "FINISHED") {
        this.realname = this.buyrealname;
        // this.realname = this.Receivables;
        this.list1 = this.$t("Order placed");
        this.list2 = this.$t("Payment Complete1");
        this.list3 = this.$t("Tokens released");
        this.list4 = this.$t("Order completed");
        let class4 = document.querySelectorAll(".text1")[3];
        let class2 = document.querySelectorAll(".text1")[1];
        let class3 = document.querySelectorAll(".text1")[2];
        let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
        let Dottedline1 = document.querySelectorAll(".Dottedline")[1];
        Dottedline0.style = "border-bottom: 2px solid #fff";
        Dottedline1.style = "border-bottom: 2px solid #fff";
        class2.style.marginLeft = "-8px";
        class4.style.marginLeft = "-8px";
        class4.style.color = "#fff";
        class3.style.color = "#fff";
        class4.style.fontWeight = "bold";
        this.Promptcontent = this.$t(
          "You have released the tokens. Order complete."
        );
      }
      if (this.status == "CANCELED") {
        this.canceltext = this.$t("Merchant canceled");
        if (this.canceleduserid == null || this.canceleduserid == "") {
          this.canceltext = this.$t("Canceled: timeout");
        }
      }
    },

    seller() {
      //卖方
      if (this.status == "PENDING") {
        this.showback();
        if (this.currenttime < this.Paymenttime) {
          this.time = this.Paymenttime;
        }
        this.list1 = this.$t("Selling Order");
        this.list2 = this.$t("Pending payment1");
        this.list3 = this.$t("Release the tokens");
        this.list4 = this.$t("Order completed");
        let class2 = document.querySelectorAll(".text1")[1];
        class2.style.fontSize = 14 + "px";
        class2.style.fontWeight = "bold";
        class2.style.marginLeft = "-11px";
        class2.style.marginTop = "-4px";
        if (this.$i18n.locale !== "zh") {
          class2.style.width = "75px";
        }
        this.Promptcontent = this.$t("Order will be canceled if timeout");
      }
      if (this.status == "PAYED") {
        this.realname = this.buyrealname;
        // this.realname = this.Receivables;
        if (this.currenttime < this.Deadline) {
          this.time = this.Deadline;
        }
        this.list1 = this.$t("Selling Order");
        this.list2 = this.$t("Payment Complete1");
        this.list3 = this.$t("Release the tokens");
        this.list4 = this.$t("Order completed");
        let class3 = document.querySelectorAll(".text1")[2];
        let class2 = document.querySelectorAll(".text1")[1];
        let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
        Dottedline0.style = "border-bottom: 2px solid #fff";
        class3.style.fontSize = 14 + "px";
        class3.style.color = "#fff";
        class3.style.marginLeft = "6px";
        class2.style.fontSize = 11 + "px";
        class2.style.marginTop = "0px";
        this.Promptcontent = this.$t("Please confirm.");
      }
      if (this.status == "FINISHED") {
        this.realname = this.buyrealname;
        // this.realname = this.Receivables;
        this.list1 = this.$t("Selling Order");
        this.list2 = this.$t("Payment Complete1");
        this.list3 = this.$t("Tokens released");
        this.list4 = this.$t("Order completed");
        let class4 = document.querySelectorAll(".text1")[3];
        let class2 = document.querySelectorAll(".text1")[1];
        let class3 = document.querySelectorAll(".text1")[2];
        let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
        let Dottedline1 = document.querySelectorAll(".Dottedline")[1];
        Dottedline0.style = "border-bottom: 2px solid #fff";
        Dottedline1.style = "border-bottom: 2px solid #fff";
        class2.style.marginLeft = "-8px";
        class4.style.marginLeft = "-8px";
        class4.style.color = "#fff";
        class3.style.color = "#fff";
        class4.style.fontWeight = "bold";
        this.Promptcontent = this.$t(
          "You have released the tokens. Order complete."
        );
      }
      if (this.status == "CANCELED") {
        this.canceltext = this.$t("Merchant canceled");
        if (this.canceleduserid == null || this.canceleduserid == "") {
          this.canceltext = this.$t("Order Canceled: timeout");
        }
      }
    },
    Buyer1() {
      //买方
      if (this.status == "PENDING") {
        this.showback();
        if (this.currenttime < this.Paymenttime) {
          this.time = this.Paymenttime;
        }
        this.list1 = this.$t("Order placed");
        this.list2 = this.$t("Pending payment");
        this.list3 = this.$t("Release the tokens1");
        this.list4 = this.$t("Order completed");
        let class2 = document.querySelectorAll(".text1")[1];
        class2.style.fontSize = 15 + "px";
        this.Promptcontent = this.$t("The tokens are reserved.");
      }
      if (this.status == "PAYED") {
        // this.realname = this.sendrealname;
        this.realname = this.Receivables;
        if (this.currenttime < this.Deadline) {
          // let times2 = this.Deadline - this.currenttime;
          // let times = times2 + 4
          this.time = this.Deadline;
        }
        this.list1 = this.$t("Order placed");
        this.list2 = this.$t("Payment Complete");
        this.list3 = this.$t("Release the tokens1");
        this.list4 = this.$t("Order completed");
        let class3 = document.querySelectorAll(".text1")[2];
        let class2 = document.querySelectorAll(".text1")[1];
        let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
        Dottedline0.style = "border-bottom: 2px solid #fff";
        class3.style.fontSize = 14 + "px";
        class3.style.color = "#fff";
        class2.style.marginLeft = "13px";
        class3.style.marginLeft = "15px";
        this.Promptcontent = this.$t("your account automatically if timeout.");
      }
      if (this.status == "FINISHED") {
        // this.realname = this.sendrealname;
        this.realname = this.Receivables;
        this.list1 = this.$t("Order placed");
        this.list2 = this.$t("Payment Complete");
        this.list3 = this.$t("Tokens released1");
        this.list4 = this.$t("Order completed");
        let class4 = document.querySelectorAll(".text1")[3];
        let class2 = document.querySelectorAll(".text1")[1];
        let class3 = document.querySelectorAll(".text1")[2];
        let Dottedline0 = document.querySelectorAll(".Dottedline")[0];
        let Dottedline1 = document.querySelectorAll(".Dottedline")[1];
        Dottedline0.style = "border-bottom: 2px solid #fff";
        Dottedline1.style = "border-bottom: 2px solid #fff";
        class2.style.marginLeft = "-8px";
        class4.style.marginLeft = "-8px";
        class4.style.color = "#fff";
        class3.style.color = "#fff";
        class4.style.fontWeight = "bold";
        this.Promptcontent = this.$t("Tokens released. Order completed.");
      }
      if (this.status == "CANCELED") {
        this.canceltext = this.$t("Canceled");
        if (this.canceleduserid == null || this.canceleduserid == "") {
          this.canceltext = this.$t("Canceled: timeout");
        }
      }
    },

    // 倒计时完成重新调取
    updata() {
      this.$toast.center(this.$t("Payment timeout, order canceled."), {
        duration: 2000,
      });
      this.OrderList();
    },
    // 切换法币
    selectLegalCurrency() {
      if (this.legal_currency == "") {
        this.legal_currency = this.legals[0].id;
      }
      this.LegalCurrencyBoxB = true;
    },
    clickBoxHidexLegal() {
      this.LegalCurrencyBoxB = false;
    },
    // 点击支付页面传过来的index
    clickCurrencyOneLegal(data) {
      this.LegalCurrencyBoxB = false;
      this.legal_currency = this.legals[data].id;
      console.log(this.legal_currency, "参数");

      setTimeout(() => {
        if (this.legals[data].location != "") {
          this.yinhanka = true;
        } else {
          this.yinhanka = false;
        }
        this.Paymentgroup = this.legals[data];
        if (this.Paymentgroup.name == "paypal") {
          this.paypal = false;
        } else {
          this.paypal = true;
        }
        if (this.Paymentgroup.location.length > 7) {
          this.Paymentgroup.name =
            this.Paymentgroup.location.substring(0, 7) + "......";
          if (
            this.Paymentgroup.name ==
            this.Paymentgroup.location.substring(0, 7) + "......"
          ) {
            this.bankname1 = "bankcard";
          } else {
            this.bankname1 = this.Paymentgroup.name;
          }
        } else {
          // this.Paymentgroup.name = this.Paymentgroup.location;
          if (this.Paymentgroup.name == this.Paymentgroup.location) {
            this.bankname1 = "bankcard";
          } else {
            this.bankname1 = this.Paymentgroup.name;
          }
        }

        if (
          this.Paymentgroup.sub_location != undefined ||
          this.Paymentgroup.sub_location != ""
        ) {
          this.Subbranch = true;
        }
        if (this.Paymentgroup.sub_location == "") {
          this.Subbranch = false;
        }
      }, 500);
    },
    Topay() {
      this.$router.push({
        path: "/payment",
        query: {
          uuide: this.uuid,
          offLine: this.offLineTrading,
        },
      });
    },
    doCopy(elementId) {
      let clipboard = new Clipboard(elementId);
      let that = this;
      clipboard.on("success", (e) => {
        // 释放内存
        that.$toast.center(this.$t("Copy Success"));
        clipboard.destroy();
      });
      clipboard.on("error", (e) => {
        // 不支持复制
        // 释放内存
        clipboard.destroy();
      });
    },
    // ============================BXAPI=============================
    // 设置标题栏
    setNativeNavigationItems() {
      console.log("this.status", this.status);

      this.shareInfo = JSON.parse(JSON.stringify(shareInfo.share_obj));
      // 进入详情页
      let fragment = "/Circulation?uuide=" + this.$route.query.uuide;

      let newRouteData = {
        fragment: fragment,
        params: {},
      };
      BXJSSDKAPI.BIXINGetSharelink(newRouteData, (code, data) => {
        window.copy_text = data.link;
        if (this.$i18n.locale === "zh") {
          this.shareInfo.message_content.content.image_url =
            "https://prod.243096.com/otc/group-3%403x.png";
        } else {
          this.shareInfo.message_content.content.image_url =
            "https://prod.243096.com/otc/group-3en%403x.png";
        }
        if (this.status === "PENDING") {
          // 待付款
          this.shareInfo.message_content.content.desc = this.$t("share7");
          if (window.copy_text != undefined) {
            this.shareInfo.copy_text =
              this.$t("share12") + "\n " + window.copy_text;
          }
        }
        if (this.status === "PAYED") {
          // 待发币
          this.shareInfo.message_content.content.desc = this.$t("share8");
          if (window.copy_text != undefined) {
            this.shareInfo.copy_text =
              this.$t("share13") + "\n " + window.copy_text;
          }
        }
        if (this.status === "DISPUTED") {
          // 在仲裁中
          this.shareInfo.message_content.content.desc = this.$t("share11");
          if (window.copy_text != undefined) {
            this.shareInfo.copy_text =
              this.$t("share15") + "\n " + window.copy_text;
          }
        }
        if (this.status === "CANCELED") {
          // 已取消
          this.shareInfo.message_content.content.desc = this.$t("share10");
          if (window.copy_text != undefined) {
            this.shareInfo.copy_text =
              this.$t("share14") + "\n " + window.copy_text;
          }
        }
        if (this.status === "FINISHED") {
          // 已完成
          this.shareInfo.message_content.content.desc = this.$t("share9");
          if (window.copy_text != undefined) {
            this.shareInfo.copy_text =
              this.$t("share16") + "\n " + window.copy_text;
          }
        }
        this.shareInfo.message_content.href =
          "mapp://141856089468568172/#/Circulation?uuide=" +
          this.$route.query.uuide;
        this.fanhuishangye();
      });
    },
    // 页面头部新分享
    pageHeaderNewShare() {
      console.log("当前订单的状态CANCELED", this.status);
      if (window.nativeNewShare) {
        let mapp_desc = this.$t("share7");
        let outside_text = this.$t("share12");
        if (this.status === "PAYED") {
          // 待发币
          mapp_desc = this.$t("share8");
          outside_text = this.$t("share13");
        }
        if (this.status === "DISPUTED") {
          // 在仲裁中
          mapp_desc = this.$t("share11");
          outside_text = this.$t("share15");
        }
        if (this.status === "CANCELED" || this.status === "SOLVED") {
          // 已取消
          mapp_desc = this.$t("share10");
          outside_text = this.$t("share14");
        }
        if (this.status === "FINISHED") {
          // 已完成
          mapp_desc = this.$t("share9");
          outside_text = this.$t("share16");
        }
        let share_data = {
          desc: mapp_desc,
          href: this.$route.fullPath.substr(1),
          text: outside_text,
          link: this.$route.fullPath.substr(1),
        };
        window.nativeNewShare(share_data);
      }
    },
    // 设置页面标题
    fanhuishangye() {
      BXJSSDKAPI.setNativeNavigationItems(
        {
          title: this.$t("Order Detail"),
          show_home: true,
          color: "#4f5669",
          style: "dark",
          show_back: true,
          share_obj: this.shareInfo,
          js_hold_back: true,
        },
        (code, data) => {}
      );
    },
    // =================埋点===========================
    BuriedPoint(get_etail_object) {
      console.log("拿到的对象111111111", get_etail_object);
      if (get_etail_object.status === "PAYED") {
        let get_point_info = get_etail_object;
        let point_params = {
          offer_id: get_point_info.otc_ad_id,
          order_id: get_point_info.uuid,
          coin_type: get_point_info.currency_amount.unit,
          coin_amount: get_point_info.currency_amount.amount,
          currency_amount: get_point_info.total_price.amount,
          coin_price: get_point_info.price.amount,
          payment: get_point_info.marked_receive_legal_money_account[0].name,
          order_type: "",
        };
        TrackAPI.track("otc_order_paid", point_params, null);
      }
    },
    // 订单结束埋点
    orderFinishBuriedPoint(is_success) {
      let get_point_info = this.grouparray;
      let point_params = {
        status: is_success ? "success" : "cancel",
        exchange_type: is_success ? "SELL" : "BUY",
        offer_id: get_point_info.otc_ad_id,
        order_id: get_point_info.uuid,
        coin_type: get_point_info.currency_amount.unit,
        coin_amount: get_point_info.currency_amount.amount,
        currency_amount: get_point_info.total_price.amount,
        coin_price: get_point_info.price.amount,
        payment: is_success
          ? get_point_info.marked_receive_legal_money_account[0].name
          : this.getPayListName(get_point_info.receive_legal_money_accounts),
      };
      TrackAPI.track("otc_order_finish", point_params, null);
    },
    // 提取支付方式列表中的name
    getPayListName(pay_list) {
      let pay_name_List = pay_list.map(function (item) {
        return item.name;
      });
      return pay_name_List;
    },
  },
  components: {
    Phone,
    service,
    legalcurrency,
    datatime,
    VueElementLoading,
    mask2,
    mask3,
    shade,
    release,
    examine,
  },
};
</script>

<style lang="scss" scoped>
.cscroll {
  margin: 0 !important;
}
a {
  text-decoration: none;
  color: #494949;
}
p {
  margin: 0;
}
i {
  font-style: normal;
}
.detail {
  width: 100%;
  height: 100vh;
  overflow: scroll;
  background-color: #f5f5f5;
  color: #494949;
  position: relative;
  .cancel {
    background-color: #4f5669;
    // font-family: PingFangSC;
    font-size: 16px;
    font-weight: 500;
    color: #ffffff;
    line-height: 60px;
    padding: 0px 15px 0 15px;
  }
  .Cornermarker {
    background-color: #4f5669;
  }
  .amount {
    width: 100%;
    height: 100px;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    .amountnumber {
      margin: 0px 15px 0px 15px;
      border-bottom: solid 0.5px #ebebeb;
      height: 99px;
      .rightline {
        border-right: 1px solid #ebebeb;
        height: 27px;
        float: left;
        margin-top: 37px;
      }
      .left {
        float: left;
        width: 53%;
        height: 100%;
        .amountname {
          font-size: 12px;
          font-weight: 500;
          height: 17px;
          color: #494949;
          // font-family: PingFangSC;
          margin-top: 20px;
          line-height: 17px;
          margin-bottom: 3px;
          text-align: left;
        }
        .amountrmb {
          height: 41px;
          // font-family: AvenirNext;
          font-size: 25px;
          font-weight: 600;
          color: #494949;
          margin-bottom: 20px;
          line-height: 41px;
          margin-top: 0px;
          text-align: left;
          img {
            width: 11px;
            height: 11px;
            padding: 5px;
            vertical-align: bottom;
            margin-bottom: 5px;
          }
        }
      }
      .right {
        float: right;
        width: 45%;
        height: 100%;
        .amountname2 {
          margin-top: 27px;
          padding-left: 7%;
          text-align: left;
          .Price {
            width: 29%;
            height: 17px;
            // font-family: PingFangSC;
            font-size: 12px;
            font-weight: 500;
            color: #b3b3b3;
          }
          .money {
            width: 71%;
            height: 17px;
            // font-family: PingFangSC;
            font-size: 12px;
            font-weight: 500;
            color: #494949;
            padding-left: 3%;
          }
        }
        .numberamount {
          margin-top: 5px;
          background-color: #fff;
        }
      }
    }
  }
  .Payer {
    width: 100%;
    // height: 137px;
    background-color: #fff;
    .Paymentarea {
      margin: 0px 15px 0px 15px;
      border-bottom: solid 0.5px #ebebeb;
      line-height: 50px;
      // font-family: PingFangSC;
      font-size: 15px;
      font-weight: 500;
      color: #494949;
      div {
        img {
          width: 18px;
          height: 18px;
          vertical-align: top;
          margin-top: 15px;
          margin-right: 10px;
        }
      }
    }
    .Payerblock {
      margin: 0px 15px 0px 15px;
      padding-bottom: 14px;
      // height: 106px;
      border-bottom: solid 0.5px #ebebeb;
      div {
        width: 100%;
        line-height: 30px;
        // font-family: PingFangSC;
        font-size: 13px;
        font-weight: 500;
        color: #494949;
        // float: left;
        i {
          // float: left;
          text-align: left;
        }
        .one {
          width: 25%;
          display: inline-block;
        }
        .one1 {
          float: left;
        }
        .two {
          width: 70%;
          img {
            width: 10px;
            height: 10px;
            padding-left: 5px;
            vertical-align: bottom;
            margin-bottom: 9px;
          }
        }
        .two2 {
          color: #4063d5;
        }
        .two3 {
          font-size: 11px;
        }
      }
      .PaymentChart {
        width: 100%;
        height: 21px;
        line-height: 21px;
        margin-top: 14px;
        float: left;
        // font-family: PingFangSC;
        font-size: 15px;
        font-weight: 600;
        color: #494949;
        text-align: left;
        margin-bottom: 3px;
        .yanse {
          // font-family: PingFangSC;
          font-size: 12px;
          font-weight: 500;
          color: #4063d5;
          float: right;
          img {
            width: 10px;
            height: 10px;
            vertical-align: top;
            margin-top: 6px;
            padding-right: 5px;
          }
        }
        img {
          width: 15px;
          height: 15px;
          vertical-align: top;
          margin-top: 3px;
          padding-right: 10px;
        }
        .yinhangka {
          width: 23px;
          height: 18px;
          vertical-align: top;
          margin-top: 1px;
          padding-right: 8px;
        }
      }
    }
    .Payerblock0 {
      border: 0;
      height: 30px;
    }
    .Payerblock2 {
      // height: 128px;
    }
  }
  .Payer2 {
    height: initial;
  }
  .height {
    padding: 10px 0px 20px 0px;
    margin: 0px 15px 0px 24px;
    border-bottom: solid 1px rgba(0, 0, 0, 0.08);
  }
  .numberstate {
    border-left: 0.5px dashed #a7aab4;
    position: relative;
    background-color: #fff;
    .number {
      // font-family: PingFangSC;
      font-size: 16px;
      font-weight: 500;
      color: #494949;
      .jiacu {
        font-weight: 600;
      }
      p {
        line-height: 18px;
        text-align: left;
        padding-left: 20px;
        margin: 0px;
      }
      .paytext {
        padding-top: 10px;
        // font-family: PingFangSC;
        font-size: 13px;
        color: #494949;
        opacity: 0.5;
        padding-bottom: 5px;
      }
      .paytext2 {
        padding-bottom: 10px;
      }
    }
    .zhifubao {
      width: 90%;
      height: 40px;
      background-color: #f5f5f5;
      margin-left: 6%;
      line-height: 40px;
      border-radius: 5px;
      img {
        width: 20px;
        height: 20px;
        vertical-align: top;
        margin: 10px 13px 0px 13px;
      }
    }
    .shuzi {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: #4f5669;
      z-index: 5;
      top: 0px;
      left: -10px;
      border-radius: 10px;
      // font-family: HelveticaNeue;
      font-size: 13px;
      font-weight: bold;
      color: #fff;
      line-height: 20px;
      text-align: center;
    }
    .shuzi2 {
      top: 75px;
    }
  }
  .numberstate2 {
    margin-top: 20px;
  }
  .Orders {
    width: 100%;
    height: 76px;
    background-color: #fff;
    .Ordersblock {
      padding: 14px 15px 14px 15px;
      img {
        width: 11px;
        height: 11px;
        padding: 5px;
        vertical-align: bottom;
        margin-bottom: 1px;
      }
      div {
        height: 24px;
        // font-family: PingFangSC;
        font-size: 12px;
        font-weight: 500;
        color: #494949;
        line-height: 24px;
        text-align: left;
        .kongge {
          padding-left: 0px;
        }
      }
    }
  }
  .Leavingmessage {
    width: 100%;
    background-color: #fff;
    .liuyan {
      color: #494949;
      padding: 0px 15px 0px 15px;
      text-align: left;
      .headliuyan {
        height: 34px;
        // font-family: PingFangSC;
        font-size: 12px;
        font-weight: 600;
        color: #494949;
        line-height: 34px;
      }
      .textliuyan {
        // font-family: PingFangSC;
        font-size: 12px;
        color: #494949;
        padding-bottom: 20px;
        line-height: 1.58;
      }
    }
  }
  .bottom {
    width: 100%;
    height: 48px;
    line-height: 48px;
    background-color: #4063d5;
    color: #fff;
    bottom: 0px;
    position: fixed;
    text-align: center;
    border-top: 0.5px solid #ebebeb;
    z-index: 100;
    .kuangdu {
      float: left;
      width: 50%;
      height: 100%;
      // font-family: PingFangSC;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      color: #494949;
      background-color: #fff;
    }
    .tixing {
      float: right;
      width: 50%;
      opacity: 0.7;
      height: 100%;
      color: #fff;
      background-color: #e5e5e5;
    }
    .gray {
      color: #9c9a9a;
      opacity: 0.98;
    }
    .gray1 {
      color: #ffffff;
      background-color: #8da2e3;
    }
  }
  .bottomcolor {
    background-color: #8da2e3;
    color: #fff;
  }
}
.Progress {
  width: 100%;
  height: 134px;
  background-color: #4f5669;
  position: relative;
  .lineblock {
    padding: 0px 15px 0px 15px;
    display: flex;
    .line {
      flex: 1;
      height: 3px;
      border-bottom: 2px solid #fff;
      margin-top: 48px;
    }
    .Dottedline {
      border-bottom: 1px dashed #fff;
    }
  }
  .cirblock {
    position: absolute;
    display: flex;
    justify-content: space-between;
    left: 15px;
    right: 15px;
    z-index: 5;
    top: 45px;
    .cir {
      height: 9px;
      border: 2px solid #fff;
      width: 9px;
      border-radius: 10px;
      background-color: #4f5669;
      position: relative;
      .qipao {
        width: 89px;
        height: 32px;
        position: absolute;
        top: -45px;
        left: -40px;
        .tag {
          height: 30px;
          position: relative;
          background-color: #fff;
          border-radius: 15px;
          // font-family: HelveticaNeue;
          font-size: 15px;
          font-weight: 600;
          color: #4f5669;
          padding-left: 12px;
          padding-right: 13px;
          line-height: 30px;
          img {
            width: 16px;
            height: 16px;
            vertical-align: top;
            margin-top: 6px;
            margin-right: 4px;
          }
        }
        .tag span {
          display: block;
          border-width: 6px;
          position: absolute;
          bottom: -12px;
          left: 39px;
          border-style: solid dashed dashed;
          border-color: #fff transparent transparent;
          font-size: 0;
          line-height: 0;
        }
      }
      .qipao2 {
        width: 109px;
        left: -51px;
        .tag span {
          left: 49px;
        }
      }
      .Checkmark {
        width: 20px;
        height: 20px;
        background-color: #fff;
        position: absolute;
        left: -5px;
        top: -5px;
        border-radius: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .textblock {
    display: flex;
    padding: 0px 15px 0px 15px;
    justify-content: space-between;
    margin-top: 18px;
    .text1 {
      font-size: 11px;
      color: #a7aab4;
    }
    div:nth-child(1) {
      color: #fff;
    }
    div:nth-child(2) {
      // margin-left: -11px;
      // font-size: 15px;
      // font-weight: 500;
      // margin-top: -4px;
      color: #fff;
    }
  }
  .currency {
    padding: 0px 15px 0px 15px;
    color: #fff;
    font-size: 12px;
    text-align: left;
    height: 20px;
    margin-top: 10px;
    font-weight: 500;
  }
}
.kong {
  height: 48px;
  width: 100%;
}
.xiaoyanzhong {
  position: fixed;
  z-index: 10000;
  right: 50%;
  margin-right: -80px;
  bottom: 40%;
  color: #4063d5;
  font-size: 14px;
}
</style>