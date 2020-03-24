<template>
  <div class="crm" style="background-color:#FFFFFF;box-shadow: 2px 2px 5px #888888;overflow: hidden; margin-top: 25px;margin-left: 10px; width: 1225px">
    <div >
      <div style="padding-top: 8px;background-color: #f2f2f2;">
      </div>
      <div style="margin-left: 10px;">
        <el-form :inline="true" :rules="rules"  >
          <el-form-item label="活动名称:" prop="getCampaignName">
            <el-input v-model="campaignName" auto-complete="off"  :disabled="true" size="mini"></el-input>
          </el-form-item>
          <br/>
          <el-form-item label="活动类型:" style="color: #808080">
            {{ campaignType }}
          </el-form-item>
          <br/>
          <el-form-item label="活动图片:">
            <img width="70px" height="50px" :src="'data:image/*;base64,' + realPath">
          </el-form-item>
          <br/>
          <!--<el-form-item label="活动图片:">-->
            <!--<el-upload-->
              <!--class="upload-demo"-->
              <!--drag-->
              <!--action="https://jsonplaceholder.typicode.com/posts/"-->
              <!--multiple-->
            <!--&gt;-->
              <!--<i class="el-icon-upload"></i>-->
              <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
              <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
            <!--</el-upload>-->
          <!--</el-form-item>-->
          <!--<br/>-->
          <el-form-item label="固定有效期:" >
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择开始日期"
                              v-model="form.startDate"
                              format="yyyy-MM-dd "
                              value-format="yyyy-MM-dd HH:mm:ss"
                              :picker-options="pickerBeginDateBefore"
              ></el-date-picker>
            </el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择结束日期"
                              v-model="form.endDate"
                              format="yyyy-MM-dd "
                              value-format="yyyy-MM-dd HH:mm:ss"
                              :picker-options="pickerBeginDateAfter"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <br/>
          <el-form-item label="适用门店:" size="mini" style="color: #808080">
            <span v-for="item in lookall">{{ item.merchantName }}</span>
            <!--<i class="el-icon-edit-outline"  @click="dialogFormVisible = true"></i>-->
          </el-form-item>



          <el-form-item  size="mini" label-width="86px"  v-if="dialogFormVisible">
            <el-select v-model="sizeForm.inputScope" placeholder="适用门店" style="width: 115px" @change="changeStore()">
              <el-option
                v-for="item in scopesInSelect"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="部分门店" size="mini" v-if="sizeForm.allStores">
            <el-select v-model="sizeForm.inputMerchant"  multiple placeholder="请选择门店" >
              <el-option
                v-for="item in allMerchantSelect"
                :label="item.name"
                :value="item.id"
              ></el-option>
              <el-option style="width: auto" :disabled="true" :value="null">
                <span>无</span>
              </el-option>
            </el-select>
          </el-form-item>


        </el-form>
      </div>
    </div>
    <div style="background-color: #f2f2f2;height: 35px ">

    </div>
    <div style="margin-left: 10px">

      <div style="margin-bottom: 20px;">
        <el-button
          size="small"
          @click="addTab(editableTabsValue2)"
        >
          增加规则
        </el-button>
      </div>
      <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
        <el-tab-pane
          v-for="(item, index) in editableTabs2"
          :key="item.name"
          :label="item.rulesName"
          :name="item.name"
        >
          <el-form :inline="true"  class="demo-form-inline" >
            <el-form-item label="选择来源">
              <el-select v-model="item.rulesType" disabled size="mini" placeholder="请选择来源类型" clearable @change="changeType()">
                <el-option
                  v-for="items in allRulesType"
                  :label="items.dictionaryValue"
                  :value="items.dictionaryKey"
                ></el-option>
                <el-option style="width: auto" :disabled="true" :value="null">
                  <span>无</span>
                </el-option>
              </el-select>
            </el-form-item>
            <br/>
            <el-form-item label="优惠券类型">
              <el-select v-model="sizeForm.inputCouponType" disabled size="mini" placeholder="请编辑" clearable @change="changeCouponType()">
                <el-option
                  v-for="item in allCouponsType"
                  :label="item.dictionaryValue"
                  :value="item.dictionaryKey"
                ></el-option>
                <el-option style="width: auto" :disabled="true" :value="null">
                  <span>无</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优惠券" >
              <el-select v-model="item.couponId" disabled size="mini" placeholder="请选择券名称" clearable >
                <el-option
                  v-for="items in allCouponName"
                  :label="items.couponTemplateName"
                  :value="items.couponId"
                ></el-option>
                <el-option style="width: auto" :disabled="true" :value="null">
                  <span>无</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label="限制券数量" >
              <el-input
                placeholder="请输入券数量"
                v-model="item.rulesCount"
                :disabled="true"
                size="mini"
                clearable>
              </el-input>
            </el-form-item><br/>
            <el-form-item  label="每人限参与次数" >
              <el-input
                placeholder="请输入限制次数"
                v-model="item.rulesParticipation"
                :disabled="true"
                size="mini"
                clearable>
              </el-input>
            </el-form-item><br/>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>


    <div style="margin-left: 10px">
      <!--<el-button size="mini" @click="updateCampaign">保存</el-button>-->
      <el-button type="primary" size="mini" @click="close">返回</el-button>
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
  export default {
    data() {
      return {
        scopesInSelect: [
          {
            id: 1,
            name: '不限'
          }, {
            id: 2,
            name: '有限'
          }
        ],
        editableTabsValue2: '1',
        editableTabs2: [{
          title: '规则 1',
          name: '1',
          content: 'Tab 1 content',
          rulesType: '',
          inputCouponType: '', // 前台读取的传到后台查询的优惠券类型
          inputCouponId: '',  // 前台读取的传到后台的优惠券的id
          rulesCount: '',
          couponId: '',  // 优惠券的数量
          rulesParticipation: ''  // 限制次数
        }],
        tabIndex: 1,
        campaign: [],
        rules: {
          getCampaignName: [
            { required: true, message: '请输入名字', trigger: 'blur' },
            { min: 1, max: 20, message: '长度为1-20个中文汉字', trigger: 'blur' }
          ]
        },
        realPath: '',
        campaignName: '',
        dialogFormVisible: false,
        list: [],
        lookall: [],
        rulesCount: '',
        rulesParticipation: '',
        couponTemplateName: '',
        couponTemplateId: '',
        AllrulesType: [],
        AllCouponTemplateType: [],
        couponTemplateType11: [],
        disableRulesType: false,
        disableCouponType: false,
        options2: [{
          value: '1401',
          label: '开卡礼'
        }, {
          value: '选项2',
          label: '新人礼',
          disabled: true
        }],
        campaignType: '',
        form: {
          activeTime: '',
          fixedTime: false, // 控制固定有效期 的显示
          startDate: '',
          endDate: '',
          unfixedTime: false, // 控制相对有效期的显示
          startDay: '',
          endDay: '',
          coupon: '',
          lookCoupon: false,  // 控制优惠券类型的显示
          lookCouponName: false
        },
        sizeForm: {
          inputMerchant: [], // 前台读取的传到后台的门店数组
          inputType: '',
          inputCouponType: '', // 前台读取的传到后台查询的优惠券类型
          inputCouponId: '',  // 前台读取的传到后台的优惠券的id
          allStores: false,
          inputScope: '',
          all: []
        },
        allMerchantSelect: [], // 后台读取的门店的数组
        allRulesType: [],  // 后台读取的规则表中的类型数组
        allCouponsType: [],    // 字典表中读取的优惠券类型的key值
        allCouponName: [],
        count: '',  // 优惠券的数量
        participation: '',  // 限制次数
        pickerBeginDateBefore: {
          disabledDate: (time) => {
            let beginDateVal = this.form.startDate;
            if (beginDateVal) {
              return time.getTime() > beginDateVal;
            }
          }
        },
        pickerBeginDateAfter: {
          disabledDate: (time) => {
            let beginDateVal = this.form.endDate;
            if (beginDateVal) {
              return time.getTime() < beginDateVal;
            }
          }
        },
        i: '0'
      }
    },
    methods: {
      changeStore() {
        console.log(1)
        if (this.sizeForm.inputScope === 2) {
          let workThis = this;
          workThis.$axios({
            method: 'post',
            url: 'http://localhost:61116/ipos/member/queryMerchant',
            data: {
              'body': {
                'parentId': 1
              }
            }
          }).then(function (res) {
            workThis.allMerchantSelect = res.data.body;
          })
          this.sizeForm.allStores = true
        } else {
          this.sizeForm.allStores = false
        }
      },
      addTab(editableTabsValue2) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs2.push({
          rulesName: '规则' + newTabName,
          name: newTabName,
          content: '这是规则' + newTabName + '的内容'
        });
        this.editableTabsValue2 = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs2;
        let activeName = this.editableTabsValue2;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      },
      updateCampaign() {
        let workThis = this;
        if (workThis.sizeForm.inputScope === '') {
          workThis.sizeForm.inputMerchant = workThis.sizeForm.all;
        }
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/campaign/update',
          data: {
            'header': {},
            'body': {
              'campaignId': workThis.$route.query.id,
              'campaignName': workThis.campaignName,
              // 'campaignType': workThis.inputvalue2,
              // 'imagePath': 'http://www.bai.com',
              'scope': workThis.sizeForm.inputScope,
              'startTime': workThis.form.startDate,
              'endTime': workThis.form.endDate,
              'merchantList': workThis.sizeForm.inputMerchant,
              'crmCampaignRulesBos': workThis.editableTabs2
            }
          }
        }).then(function (res) {
          console.log(res);
          console.log(res.data.body);
          workThis.sizeForm.inputMerchant = '';
          workThis.sizeForm.inputType = '';
          workThis.count = '';
          workThis.rulesParticipation = '';
          workThis.inputCouponId = '';
          workThis.$message({
            type: 'success',
            message: '编辑成功!'
          });
          workThis.$router.push({
            path: '/Campaign'
          });
        })
      },
      selectAll() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/campaign/selectCampaign',
          data: {
            'body': {
              'campaignId': workThis.$route.query.id
            }
          }
        }).then(function (res) {
          workThis.campaign = res.data.body;
          console.log(workThis.campaign);
          workThis.campaignName = workThis.campaign[0].campaignName;
          workThis.realPath = workThis.campaign[0].imagePath;
          console.log(workThis.campaign);
          workThis.editableTabs2 = workThis.campaign[0].rulesVos;
          console.log(workThis.tabIndex + '=============================');
          workThis.tabIndex = workThis.campaign[0].rulesVos.length;
        })
      },
      lookAllMercahnt() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/member/queryMerchant',
          data: {
            'body': {
              'parentId': 1
            }
          }
        }).then(function (res) {
          workThis.allMerchantSelect = res.data.body;
        })
      },
      lookAllRulesType() {
        let workThis = this;
        workThis.rulesCount = workThis.$route.query.rulesCount;
        workThis.rulesParticipation = workThis.$route.query.rulesParticipation;
        workThis.couponTemplateName = workThis.$route.query.couponTemplateName;
        workThis.couponTemplateId = workThis.$route.query.couponId;
      },
      lookAllRulesType1() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'key': workThis.$route.query.rulesType
            }
          }
        }).then(function (res) {
          workThis.AllrulesType = res.data.body;
        })
      },
      lookAllCouponTemplateType() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'key': workThis.$route.query.couponTemplateType
            }
          }
        }).then(function (res) {
          workThis.couponTemplateType11 = res.data.body;
        })
      },
      lookTime() {
        let workThis = this;
        workThis.form.startDate = workThis.$route.query.startTime;
        workThis.form.endDate = workThis.$route.query.endTime;
        workThis.campaignType = workThis.$route.query.campaignType
      },
      insertfalse() {
        let workThis = this;
        workThis.dialogFormVisible = false;
      },
      changeActiveTime() {
        if (this.form.activeTime === '2') {
          this.form.unfixedTime = true;
        } else {
          this.form.unfixedTime = false;
        }
        if (this.form.activeTime === '1') {
          this.form.fixedTime = true;
        } else {
          this.form.fixedTime = false;
        }
        if (this.form.coupon === '1') {
          this.form.lookCoupon = true;
        } else {
          this.form.lookCoupon = false;
        }
      },
      changeMerchant() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/campaign/selectMerchantName',
          data: {
            'body': {
              'campaignId': workThis.$route.query.id
            }
          }
        }).then(function (res) {
          workThis.lookall = res.data.body;
          for (let k = 0; k < workThis.lookall.length; k++) {
            workThis.sizeForm.all.push(workThis.lookall[k].merchantId)
          }
        })
      },
      changeType() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'prefix': 1700
            }
          }
        }).then(function (res) {
          workThis.allRulesType = res.data.body;
        })
      },
      changeCouponType() {
        let workThis = this;
        if (workThis.sizeForm.inputCouponType === 2201) {
          workThis.$axios({
            method: 'post',
            url: 'http://localhost:61116/ipos/campaign/getCouponName',
            data: {
              'body': {
                'couponType': 2201
              }
            }
          }).then(function (res) {
            workThis.allCouponName = res.data.body;
            workThis.form.lookCouponName = true;
          })
        }
        if (workThis.sizeForm.inputCouponType === 2202) {
          workThis.$axios({
            method: 'post',
            url: 'http://localhost:61116/ipos/campaign/getCouponName',
            data: {
              'body': {
                'couponType': 2202
              }
            }
          }).then(function (res) {
            workThis.allCouponName = res.data.body;
            workThis.form.lookCouponName = true;
          })
        }
        if (workThis.sizeForm.inputCouponType === 2203) {
          workThis.$axios({
            method: 'post',
            url: 'http://localhost:61116/ipos/campaign/getCouponName',
            data: {
              'body': {
                'couponType': 2203
              }
            }
          }).then(function (res) {
            workThis.allCouponName = res.data.body;
            workThis.form.lookCouponName = true;
          })
        }
      },
      changeCouponType1() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'prefix': 2200
            }
          }
        }).then(function (res) {
          workThis.allCouponsType = res.data.body;
        })
      },
      changeCouponName() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/campaign/getCouponName',
          data: {
            'body': {
            }
          }
        }).then(function (res) {
          workThis.allCouponName = res.data.body;
        })
      },
      close() {
        this.$router.push('/Campaign');
      }
    },
    created() {
      this.changeCouponName();
      this.selectAll();
      this.lookTime();
      this.changeMerchant()
      this.lookAllMercahnt();
      this.lookAllRulesType();
      this.lookAllRulesType1();
      this.lookAllCouponTemplateType();
      this.changeCouponType1();
      this.changeType();
    }
  };
</script>


<style scoped>
  /*.crm {*/
    /*position: absolute;*/
    /*left: 17%;*/
    /*top: 8%;*/
  /*}*/


</style>
