<template>
  <div class="crm"  style="width: 1230px">
    <div style="padding-left: 10px;padding-top: 14px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/homeshow' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/Campaign' }">营销管理</el-breadcrumb-item>
        <el-breadcrumb-item>编辑营销活动</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="background-color:#FFFFFF;box-shadow: 2px 2px 5px #888888;overflow: hidden; margin-top: 15px;margin-left: 10px; width: 1225px">
      <div >
        <div style="margin-left: 10px;">
          <el-form :inline="true" :rules="rules"  >
            <el-form-item label="活动名称:" prop="getCampaignName">
              <el-input v-model="campaignName" auto-complete="off" size="mini"></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="活动类型:"  size="mini">
              <el-select v-model="campaignType"  placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :label="item.dictionaryValue"
                  :value="item.dictionaryKey">
                </el-option>
              </el-select>
            </el-form-item>
            <br/>
            <el-form-item label="活动图片:">
              <img width="70px" height="50px" :src="'data:image/*;base64,' + realPath">
            </el-form-item>
            <br/>
            <el-form-item label="修改图片:" label-width="86px">
              <el-upload
                class="upload-demo"
                ref="upload"
                drag
                :action="importFileUrl"
                :on-success="uploadSuccess"
                :before-upload="updateBeforeUpload"
                :multiple="true"
                :limit="1"
                :auto-upload="true"
                list-type="picture"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <br/>
            <el-form-item label="固定有效期:" size="mini" >
              <el-col :span="11">
                <el-date-picker type="date"
                                placeholder="选择开始日期"
                                v-model="form.startDate"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptions0"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item size="mini" >
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择结束日期"
                                v-model="form.endDate"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :picker-options="pickerOptions1"
                ></el-date-picker>
              </el-col>
            </el-form-item>
            <br/>
            <el-form-item label="适用门店:" size="mini" style="color: #808080">
              <span v-for="item in lookall">{{ item.merchantName }}</span>
              <i class="el-icon-edit-outline"  @click="dialogFormVisible = true"></i>
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
            增加规则(点击下方按钮)
          </el-button>
        </div>
        <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab">
          <el-tab-pane
            v-for="(item, index) in editableTabs2"
            :key="item.name"
            :label="item.title"
            :name="item.name"
          >
            <el-form :inline="true"  class="demo-form-inline" >
              <el-form-item label="选择来源">
                <el-select v-model="item.rulesType"  size="mini" placeholder="请选择来源类型" clearable @change="changeType()">
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
              <el-form-item label="升级到">
                <el-select v-model="item.levelUpCode" style="width: 150px" size="mini" placeholder="请选择升级类型" clearable>
                  <el-option
                    v-for="items in level"
                    :label="items.levelName"
                    :value="items.growthValueLimit"
                  ></el-option>
                  <el-option style="width: auto" :disabled="true" :value="null">
                    <span>无</span>
                  </el-option>
                </el-select>
              </el-form-item>
              <br/>
              <el-form-item label="优惠券类型">
                <el-select v-model="sizeForm.inputCouponType"  size="mini" placeholder="请编辑" clearable @change="changeCouponType()">
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
                <el-select v-model="item.couponId"  size="mini" placeholder="请选择券名称" clearable @change="getNum()">
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
              <!--<el-form-item  label="券数量" >-->
              <!--<el-input-->
              <!--v-model="item.rulesCount.toString()"-->
              <!--:disabled="true"-->
              <!--size="mini"-->
              <!--clearable>-->
              <!--</el-input>-->
              <!--</el-form-item>-->
              <el-form-item  label="设置发券数量" >
                <el-input-number v-model="item.rulesCount" :min="1" :max="couponTemplateNum" label="描述文字" size="mini"></el-input-number>
                <span style="color: #6f7180">MAX:</span>
                <el-input
                  style="width: 60px"
                  placeholder="券数量"
                  v-model="couponTemplateNum"
                  size="mini"
                  :disabled="true">
                </el-input>
              </el-form-item><br/>
              <el-form-item  label="每人限参与次数" >
                <el-input-number v-model="item.rulesParticipation" :min="1" :max="1" label="描述文字" size="mini"></el-input-number>
              </el-form-item><br/>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>


      <div style="margin-left: 10px">
        <el-button size="mini" @click="updateCampaign">保存</el-button>
        <el-button type="primary" size="mini" @click="close">取消</el-button>
      </div>
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
        imageUrl: '', // 后端传来的图片的路径
        importFileUrl: '/level/image',
        pickerOptions0: {
          disabledDate: (time) => {
            let endDateVal = this.form.endDate;
            if (endDateVal) {
              return time.getTime() > new Date(endDateVal).getTime() - 1 * 24 * 60 * 60 * 1000 || time.getTime() < Date.now() - 1 * 24 * 60 * 60 * 1000;
            } else {
              return time.getTime() < Date.now() - 1 * 24 * 60 * 60 * 1000;
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            let beginDateVal = this.form.startDate;
            if (beginDateVal) {
              return (
                time.getTime() < new Date(beginDateVal).getTime() + 1 * 24 * 60 * 60 * 1000
              );
            } else {
              return time.getTime() < Date.now() - 1 * 24 * 60 * 60 * 1000;
            }
          }
        },
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
        realPath: '',
        editableTabs2: [{
          title: '规则 1',
          name: '1',
          content: 'Tab 1 content',
          rulesType: '',
          inputCouponType: '', // 前台读取的传到后台查询的优惠券类型
          inputCouponId: '',  // 前台读取的传到后台的优惠券的id
          rulesCount: 0,
          campaignMerchantId: '',
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
        couponTemplateNum: '',
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
        campaignType: '1401',
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
        i: '0',
        options: [], // 活动类型
        image: '',
        responseCode: '',
        responseMess: '',
        crmMerchantId: '',
        campaignScope: '',
        campaignStatus: 0
      }
    },
    methods: {
      uploadSuccess(response, file, fileList) {
        console.log('这是后端的路径');
        console.log(response);
        this.pathOfImage = response.substring(0, response.lastIndexOf('E'));
        this.imageUrl = response.substring(response.lastIndexOf('E'));
        console.log('这是图片路径');
        console.log(this.pathOfImage);
        console.log(this.imageUrl);
        console.log(response);
        console.log(file);
        console.log(fileList);
        console.log('上传成功');
      },
      updateBeforeUpload(file) {
        const isJPG = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'jpg';
        const isPNG = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'png';
        const isGIF = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'gif';
        const is2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG && !isGIF) {
          this.$message.warning('只能上传jpg，png和gif格式的文件')
          console.log('只能上传jpg，png和gif格式的文件');
          return false;
        }
        if (!is2M) {
          this.$message.warning('上传图片不能超过2M');
          console.log('上传图片不能超过2M');
          return false;
        }
      },
      changeStore() {
        console.log(1)
        if (this.sizeForm.inputScope === 2) {
          let workThis = this;
          workThis.$axios({
            method: 'post',
            url: 'http://localhost:61116/ipos/member/queryMerchant',
            data: {
              'body': {
                'parentId': workThis.crmMerchantId
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
      addTab(targetName) {
        // let newTabName = ++this.tabIndex + '';
        let newTabName1 = ++this.tabIndex;
        this.editableTabs2.push({
          title: '规则' + newTabName1,
          name: newTabName1,
          content: '这是规则' + newTabName1 + '的内容'
        });
        this.editableTabsValue2 = newTabName1;
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
        this.tabIndex = --this.tabIndex;
        this.editableTabsValue2 = activeName;
        this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
      },
      updateCampaign() {
        let workThis = this;
        if (workThis.sizeForm.inputScope === '') {
          workThis.sizeForm.inputScope = workThis.campaignScope;
          console.log('scope为：' + workThis.campaignScope);
          workThis.sizeForm.inputMerchant = workThis.sizeForm.all;
        }
        if (workThis.sizeForm.inputScope === 1) {
          workThis.sizeForm.inputMerchant = workThis.sizeForm.all;
        }
        for (let i = 0; i < workThis.editableTabs2.length; i++) {
          workThis.editableTabs2[i].campaignMerchantId = getCookie('merchantId')
        }
        console.log('状态为' + workThis.campaignStatus)
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/campaign/update',
          data: {
            'header': {},
            'body': {
              'campaignId': workThis.$route.query.id,
              'campaignType': workThis.campaignType,
              'campaignName': workThis.campaignName,
              'campaignStatus': workThis.campaignStatus,
              'imagePath': workThis.imageUrl,
              'scope': workThis.sizeForm.inputScope,
              'startTime': workThis.form.startDate,
              'endTime': workThis.form.endDate,
              'merchantList': workThis.sizeForm.inputMerchant,
              'crmCampaignRulesBos': workThis.editableTabs2,
              'merchantsId': workThis.crmMerchantId
            }
          }
        }).then(function (res) {
          console.log(res);
          console.log(res.data.body);
          workThis.responseCode = res.data.header.code;
          workThis.responseMess = res.data.header.message;
          if (workThis.responseCode === '10000') {
            workThis.sizeForm.inputMerchant = '';
            workThis.sizeForm.inputType = '';
            workThis.count = '';
            workThis.rulesParticipation = '';
            workThis.inputCouponId = '';
            workThis.$message({
              type: 'success',
              message: workThis.responseMess
            });
            workThis.$router.push({
              path: '/campaign/campaignHome'
            });
          }
          if (workThis.responseCode === '11110') {
            workThis.$message({
              type: 'warning',
              message: workThis.responseMess
            });
          }
        })
      },
      getNum() {
        let workThis = this;
        console.log(workThis.editableTabs2 + '--------------------------');
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/campaign/get',
          data: {
            'body': {
              'crmCampaignRulesBos': workThis.editableTabs2
            }
          }
        }).then(function (res) {
          workThis.all = res.data.body;
          workThis.couponTemplateNum = workThis.all.couponTemplateNum;
        })
      },
      // getImage() {
      //   let workThis = this;
      //   workThis.$axios({
      //     method: 'post',
      //     url: '/ipos/campaign/getImage',
      //     data: {
      //       'body': {
      //         'campaignId': workThis.$route.query.id,
      //         'campaignMerchantId': workThis.crmMerchantId
      //       }
      //     }
      //   }).then(function (res) {
      //     workThis.realPath = res.data.body;
      //   })
      // },
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
          workThis.imageUrl = workThis.campaign[0].nativeImagePath;
          console.log(workThis.campaign);
          workThis.editableTabs2 = workThis.campaign[0].rulesVos;
          workThis.tabIndex = workThis.editableTabs2.length;
          console.log(++workThis.editableTabsValue2 + '=============================');
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
        workThis.campaignType = workThis.$route.query.campaignType;
        workThis.campaignStatus = workThis.$route.query.campaignStatus;
        workThis.campaignScope = workThis.$route.query.scope;
      },
      searchCampaignType() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'key': workThis.campaignType
            }
          }
        }).then(function (res) {
          workThis.options = res.data.body;
        })
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
                'couponType': 2201,
                'merchantsId': workThis.crmMerchantId
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
                'couponType': 2202,
                'merchantsId': workThis.crmMerchantId
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
                'couponType': 2203,
                'merchantsId': workThis.crmMerchantId
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
      },
      getCookieDetails() {
        let workThis = this;
        workThis.editableTabs2[0].campaignMerchantId = getCookie('merchantId')
        workThis.crmMerchantId = getCookie('merchantId')
      }
    },
    created() {
      this.getCookieDetails();
      setTimeout(() => {
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
        this.searchCampaignType();
      }, 1111)
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
