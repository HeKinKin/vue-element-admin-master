<template>
  <div style="width: 1230px" class="crm">

    <div style="background-color:#FFFFFF;box-shadow: 2px 2px 5px #888888;overflow: hidden; margin-top: 25px;margin-left: 10px">

      <div style="padding-top: 8px;background-color: #f2f2f2">
        <div style="margin-left: 10px">


          <el-form :inline="true" >
            <el-form-item label="活动名称" size="mini">
              <span>{{campaignName}}</span>
            </el-form-item>
            <el-form-item label="注券总数：" size="mini">
              <span>{{number}}</span>
            </el-form-item>
            <el-form-item label="批次ID：" size="mini">
              <span>{{batchId}}</span>
            </el-form-item>
            <el-form-item label="会员手机号：" size="mini">
              <span>{{mobile}}</span>
            </el-form-item>
          </el-form>

          <el-form :inline="true" >
            <el-form-item label="发券类型：" size="mini">
              <span v-for="item in dictionarysValue">{{item+'、'}}</span>
            </el-form-item>
          </el-form>

          <el-form :inline="true" >
            <el-form-item label="适用门店：" size="mini">
              <span v-for="item in lookall">{{ item.merchantName + '、' }}</span>
            </el-form-item>
          </el-form>


          <el-form :inline="true" >
            <el-form-item label="可用开始日期" size="mini">
              <span>{{effectiveStartDate}}</span>
            </el-form-item>
            <el-form-item label="可用结束日期：" size="mini">
              <span>{{effectiveEndDate}}</span>
            </el-form-item>
            <el-form-item label="可用开始时间：" size="mini">
              <span>{{effectiveStartTime}}</span>
            </el-form-item>
            <el-form-item label="可用结束时间：" size="mini">
              <span>{{effectiveEndTime}}</span>
            </el-form-item>
          </el-form>

        </div>
      </div>
    </div>



    <div style="margin-top:10px;margin-left:10px;margin-top: 20px">
      <div style="margin-top: 20px">
      </div>
      <div style="margin-left: 140px;margin-top: 30px;float: left">
        <h5 style="padding-left: 60px;padding-bottom: 20px">折扣券占比</h5>
        <el-progress type="circle" :percentage=typeNum width="200"></el-progress>
      </div>

      <div style="margin-left: 130px;margin-top: 30px;float:left">
        <h5 style="padding-left: 45px;padding-bottom: 20px">代金券占比</h5>
        <el-progress type="circle" :percentage=typeNum1 width="200"></el-progress>
      </div>

      <div style="margin-left: 130px;margin-top: 30px;float:left">
        <h5 style="padding-left: 60px;padding-bottom: 20px">满减券占比</h5>
        <el-progress type="circle" :percentage="typeNum2" width="200"></el-progress>
      </div>

      <div style="margin-left: 140px;margin-top: 30px;padding-top:70px;float: left;width: 200px">
        <h5 style="padding-left: 45px;padding-bottom: 20px">折扣券使用状态占比</h5>
        <div>
          <el-progress :text-inside="true" :stroke-width="18" :percentage=couponTypeStatus></el-progress>
        </div>
        <div style="padding-top: 12px">
           <el-progress :text-inside="true" :stroke-width="18" :percentage=couponTypeStatus1 color="rgba(142, 113, 199, 0.7)"></el-progress>
        </div>
       <div style="padding-top: 12px">
         <el-progress :text-inside="true" :stroke-width="18" :percentage=couponTypeStatus2 status="success"></el-progress>
       </div>
      </div>


      <div style="margin-left: 130px;margin-top: 30px;padding-top:70px;float:left;width: 220px">
        <h5 style="padding-left: 45px;padding-bottom: 20px">代金券使用状态占比</h5>
        <div>
          <el-progress :text-inside="true" :stroke-width="18" :percentage=couponTypeStatus3></el-progress>
        </div>
        <div style="padding-top: 12px">
          <el-progress :text-inside="true" :stroke-width="18" :percentage=couponTypeStatus4 color="rgba(142, 113, 199, 0.7)"></el-progress>
        </div>
        <div style="padding-top: 12px">
          <el-progress :text-inside="true" :stroke-width="18" :percentage=couponTypeStatus5 status="success"></el-progress>
        </div>
      </div>

      <div style="margin-left: 130px;margin-top: 30px;padding-top:70px;float:left;width: 220px">
        <h5 style="padding-left: 55px;padding-bottom: 20px">满减券使用状态占比</h5>
        <div>
          <el-progress :text-inside="true" :stroke-width="18" :percentage=couponTypeStatus6></el-progress>
        </div>
        <div style="padding-top: 12px">
          <el-progress :text-inside="true" :stroke-width="18" :percentage=couponTypeStatus7 color="rgba(142, 113, 199, 0.7)"></el-progress>
        </div>
        <div style="padding-top: 12px">
          <el-progress :text-inside="true" :stroke-width="18" :percentage=couponTypeStatus8 status="success"></el-progress>
        </div>
      </div>

      <div style="margin-left: 130px;margin-top: 30px;padding-top:70px;float:left;width: 120px">
        <div>
          <div style="float: left;color: #6f7180">
            未使用：
          </div>
          <div style="float: left;width: 50px;height:20px;background-color: #3e9ffd">
          </div>
        </div>

        <div style="padding-top: 30px">
          <div style="float: left;color: #6f7180">
            已使用：
          </div>
          <div style="float: left;width: 50px;height:20px;background-color: #aa96d5">
          </div>
        </div>

        <div style="padding-top: 30px">
          <div style="float: left;color: #6f7180">
            已过期：
          </div>
          <div style="float: left;width: 50px;height:20px;background-color: #69c137">
          </div>
        </div>

      </div>


    </div>

    <div>

    </div>
  </div>
</template>


<script>
  import Vue from 'vue';
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  import axios from 'axios';
  import vuerouter from 'vue-router';

  Vue.use(vuerouter)
  Vue.prototype.$axios = axios;
  Vue.use(ElementUI);
  // 全局 设置cookie
  export function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires;
  }

  // 全局 读取cookie
  export function getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
    }
    return '';
  }

  export default {
    data() {
      return {
        campaignName: '',
        campaignId: '',
        number: '',
        batchId: '',
        mobile: '',
        effectiveStartDate: '',
        effectiveEndDate: '',
        effectiveStartTime: '',
        effectiveEndTime: '',
        allCouponType: [],
        realCouponType: [],
        dictionarysValue: [],
        typeNum: '',
        couponTypeStatus: '',
        couponTypeStatus1: '',
        couponTypeStatus2: '',
        couponTypeStatus3: '',
        couponTypeStatus4: '',
        couponTypeStatus5: '',
        couponTypeStatus6: '',
        couponTypeStatus7: '',
        couponTypeStatus8: '',
        couponTypeNumber: '',
        couponTypeNumber2: '',
        couponTypeNumber3: '',
        typeNum1: '',
        typeNum2: '',
        lookall: [],
        crmMerchantId: ''
      }
    },
    methods: {
      selectAllCoupon() {
        let workThis = this;
        workThis.campaignName = workThis.$route.query.campaignName;
        workThis.campaignId = workThis.$route.query.campaignId;
        workThis.number = workThis.$route.query.number;
        workThis.batchId = workThis.$route.query.batchId;
        workThis.mobile = workThis.$route.query.mobile;
        workThis.effectiveStartDate = workThis.$route.query.effectiveStartDate;
        workThis.effectiveEndDate = workThis.$route.query.effectiveEndDate;
        workThis.effectiveStartTime = workThis.$route.query.effectiveStartTime;
        workThis.effectiveEndTime = workThis.$route.query.effectiveEndTime;
      },
      selectCouponType() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/getType',
          data: {
            'body': {
              'campaignId': workThis.campaignId
            }
          }
        }).then(function (res) {
          workThis.allCouponType = res.data.body;
          for (let k = 0; k < workThis.allCouponType.length; k++) {
            workThis.realCouponType.push(workThis.allCouponType[k].templateType)
          }
        }).catch(error => {
          if (error && error.response) {
            switch (error.response.status) {
              case 401:
                this.$message({
                  type: 'warning',
                  message: '登陆超时,请重新登录！'
                });
                this.$router.push({
                  path: '/'
                });
                break;
              case 400:
                workThis.$message({
                  type: 'warning',
                  message: '请求错误'
                });
                break;
              case 403:
                workThis.$message({
                  type: 'warning',
                  message: '访问出错'
                });
                break;
              case 404:
                workThis.$message({
                  type: 'warning',
                  message: '请求出错'
                });
                break;
              case 408:
                workThis.$message({
                  type: 'warning',
                  message: '请求超时'
                });
                break;
              case 500:
                workThis.$message({
                  type: 'warning',
                  message: '后端服务器未启动'
                });
                break;
              case 501:
                workThis.$message({
                  type: 'warning',
                  message: '服务未实现'
                });
                break;
              case 502:
                workThis.$message({
                  type: 'warning',
                  message: '网络错误'
                });
                break;
              case 503:
                workThis.$message({
                  type: 'warning',
                  message: '服务不可用'
                });
                break;
              case 504:
                workThis.$message({
                  type: 'warning',
                  message: '网络超时'
                });
                break;
              case 505:
                workThis.$message({
                  type: 'warning',
                  message: 'HTTP不支持'
                });
                break;
              default:
                workThis.$message({
                  type: 'warning',
                  message: '连接出错'
                });
            }
          } else {
            workThis.$message({
              type: 'warning',
              message: '连接不上服务器'
            });
          }
        });
      },
      getCookieDetails() {
        let workThis = this;
        workThis.crmMerchantId = getCookie('merchantId')
      },
      selectValue() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/getCouponValue',
          data: {
            'body': {
              'couponTypeList': workThis.realCouponType
            }
          }
        }).then(function (res) {
          workThis.dictionarysValue = res.data.body;
        })
      },
      selectCouponType1() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/getPercent',
          data: {
            'body': {
              'campaignId': workThis.campaignId,
              'templateType': 2201,
              'couponAllNum': workThis.number,
              'merchantsId': workThis.crmMerchantId
            }
          }
        }).then(function (res) {
          workThis.typeNum = res.data.body.couponPercent;
          workThis.couponTypeNumber = res.data.body.number;
          console.log(workThis.couponTypeNumber + '-------------------------------------------------');
        })
      },
      selectCouponType2() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/getPercent',
          data: {
            'body': {
              'campaignId': workThis.campaignId,
              'templateType': 2202,
              'couponAllNum': workThis.number,
              'merchantsId': workThis.crmMerchantId
            }
          }
        }).then(function (res) {
          workThis.typeNum1 = res.data.body.couponPercent;
          workThis.couponTypeNumber2 = res.data.body.number;
        })
      },
      selectCouponType3() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/getPercent',
          data: {
            'body': {
              'campaignId': workThis.campaignId,
              'templateType': 2203,
              'couponAllNum': workThis.number,
              'merchantsId': workThis.crmMerchantId
            }
          }
        }).then(function (res) {
          workThis.typeNum2 = res.data.body.couponPercent;
          workThis.couponTypeNumber3 = res.data.body.number;
        })
      },
      selectCouponStatus1() {
        let workThis = this;
        console.log(workThis.couponTypeNumber + '==========================================');
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/getPercent',
          data: {
            'body': {
              'campaignId': workThis.campaignId,
              'templateType': 2201,
              'couponAllNum': workThis.couponTypeNumber,
              'couponStatus': 1,
              'merchantsId': workThis.crmMerchantId
            }
          }
        }).then(function (res) {
          workThis.couponTypeStatus = res.data.body.couponPercent;
        })
      },
      selectCouponStatus2() {
        let workThis = this;
        console.log(workThis.couponTypeNumber + '==========================================');
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/getPercent',
          data: {
            'body': {
              'campaignId': workThis.campaignId,
              'templateType': 2201,
              'couponAllNum': workThis.couponTypeNumber,
              'couponStatus': 2,
              'merchantsId': workThis.crmMerchantId
            }
          }
        }).then(function (res) {
          workThis.couponTypeStatus1 = res.data.body.couponPercent;
        })
      },
      selectCouponStatus3() {
        let workThis = this;
        console.log(workThis.couponTypeNumber + '==========================================');
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/getPercent',
          data: {
            'body': {
              'campaignId': workThis.campaignId,
              'templateType': 2201,
              'couponAllNum': workThis.couponTypeNumber,
              'couponStatus': 3,
              'merchantsId': workThis.crmMerchantId
            }
          }
        }).then(function (res) {
          workThis.couponTypeStatus2 = res.data.body.couponPercent;
        })
      },
      selectCouponStatus4() {
        let workThis = this;
        console.log(workThis.couponTypeNumber + '==========================================');
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/getPercent',
          data: {
            'body': {
              'campaignId': workThis.campaignId,
              'templateType': 2202,
              'couponAllNum': workThis.couponTypeNumber2,
              'couponStatus': 1,
              'merchantsId': workThis.crmMerchantId
            }
          }
        }).then(function (res) {
          workThis.couponTypeStatus3 = res.data.body.couponPercent;
        })
      },
      selectCouponStatus5() {
        let workThis = this;
        console.log(workThis.couponTypeNumber + '==========================================');
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/getPercent',
          data: {
            'body': {
              'campaignId': workThis.campaignId,
              'templateType': 2202,
              'couponAllNum': workThis.couponTypeNumber2,
              'couponStatus': 2,
              'merchantsId': workThis.crmMerchantId
            }
          }
        }).then(function (res) {
          workThis.couponTypeStatus4 = res.data.body.couponPercent;
        })
      },
      selectCouponStatus6() {
        let workThis = this;
        console.log(workThis.couponTypeNumber + '==========================================');
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/getPercent',
          data: {
            'body': {
              'campaignId': workThis.campaignId,
              'templateType': 2202,
              'couponAllNum': workThis.couponTypeNumber2,
              'couponStatus': 3,
              'merchantsId': workThis.crmMerchantId
            }
          }
        }).then(function (res) {
          workThis.couponTypeStatus5 = res.data.body.couponPercent;
        })
      },
      selectCouponStatus7() {
        let workThis = this;
        console.log(workThis.couponTypeNumber + '==========================================');
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/getPercent',
          data: {
            'body': {
              'campaignId': workThis.campaignId,
              'templateType': 2203,
              'couponAllNum': workThis.couponTypeNumber3,
              'couponStatus': 1,
              'merchantsId': workThis.crmMerchantId
            }
          }
        }).then(function (res) {
          workThis.couponTypeStatus6 = res.data.body.couponPercent;
        })
      },
      selectCouponStatus8() {
        let workThis = this;
        console.log(workThis.couponTypeNumber + '==========================================');
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/getPercent',
          data: {
            'body': {
              'campaignId': workThis.campaignId,
              'templateType': 2203,
              'couponAllNum': workThis.couponTypeNumber3,
              'couponStatus': 2,
              'merchantsId': workThis.crmMerchantId
            }
          }
        }).then(function (res) {
          workThis.couponTypeStatus7 = res.data.body.couponPercent;
        })
      },
      selectCouponStatus9() {
        let workThis = this;
        console.log(workThis.couponTypeNumber + '==========================================');
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/getPercent',
          data: {
            'body': {
              'campaignId': workThis.campaignId,
              'templateType': 2203,
              'couponAllNum': workThis.couponTypeNumber3,
              'couponStatus': 3,
              'merchantsId': workThis.crmMerchantId
            }
          }
        }).then(function (res) {
          workThis.couponTypeStatus8 = res.data.body.couponPercent;
        })
      },
      changeMerchant() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/campaign/selectMerchantName',
          data: {
            'body': {
              'campaignId': workThis.$route.query.campaignId
            }
          }
        }).then(function (res) {
          workThis.lookall = res.data.body;
        })
      }
    },
    created() {
      this.getCookieDetails();
      setTimeout(() => {
        this.selectAllCoupon();
        this.selectCouponType1();
        this.selectCouponType2();
        this.selectCouponType3();
        this.changeMerchant();
      }, 1111)
      setTimeout(() => {
        this.selectCouponType();
      }, 2222)
      setTimeout(() => {
        this.selectValue();
      }, 3333)
      setTimeout(() => {
        this.selectCouponStatus1();
        this.selectCouponStatus2();
        this.selectCouponStatus3();
        this.selectCouponStatus4();
        this.selectCouponStatus5();
        this.selectCouponStatus6();
        this.selectCouponStatus7();
        this.selectCouponStatus8();
        this.selectCouponStatus9();
      }, 4444)
    }
  };
</script>


<style scoped>
  .el-table th {
    background: #f2f2f2 !important;
    font-size: large;
  }

  /*.crm {*/
    /*position: absolute;*/
    /*left: 17%;*/
    /*top: 10%;*/
  /*}*/

</style>
