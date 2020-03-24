<template>
  <div  style="width: 1230px" class="crm">

    <div style="background-color:#FFFFFF;box-shadow: 2px 2px 5px #888888;overflow: hidden; margin-top: 25px;margin-left: 10px">

      <div style="padding-top: 20px;background-color: #f2f2f2">
        <div style="margin-left: 10px">

          <el-form ref="form" :model="sizeForm.sizeForm" label-width="100px" size="mini"  :inline="true"  class="demo-form-inline">

            <el-form-item label="券名称" style="float: left">
              <el-input v-model.trim="sizeForm.inputName" placeholder="优惠券名称" style="width: 115px"
                        onkeyup="value=value.replace(/[\s+]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="批次ID" style="float: left">
              <el-input v-model.trim="sizeForm.inputBatchId" placeholder="批次ID" style="width: 115px"
                        onkeyup="value=value.replace(/[\s+]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="模板ID" style="float: left">
              <el-input v-model.trim="sizeForm.inputTemplateId" placeholder="券模板ID" style="width: 115px"
                        onkeyup="value=value.replace(/[\s+]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="活动ID" style="float: left">
              <el-input v-model.trim="sizeForm.inputCampaignId" placeholder="活动ID" style="width: 115px"
                        onkeyup="value=value.replace(/[\s+]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="活动名称" style="float: left">
              <el-input v-model.trim="sizeForm.inputCampaignName" placeholder="活动名称" style="width: 115px"
                        onkeyup="value=value.replace(/[\s+]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="券类型" style="float: left">
              <el-select v-model="sizeForm.inputType" placeholder="券类型" style="width: 115px">
                <el-option
                  v-for="item in typesInSelect"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="券状态" style="float: left">
              <el-select v-model="sizeForm.inputStatus" placeholder="券状态" style="width: 115px">
                <el-option
                  v-for="item in statusInSelect"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="会员手机号" style="float: left">
              <el-input v-model.trim="sizeForm.inputMobile" placeholder="会员手机号" style="width: 115px"
                        onkeyup="value=value.replace(/[\s+]/g,'')"></el-input>
            </el-form-item>

          </el-form>
          <div style="padding-left: 20px">
            <el-form ref="form" :model="sizeForm.sizeForm" label-width="100px" size="mini"  :inline="true"  class="demo-form-inline">

              <el-form-item label="适用门店" style="float: left">
                <el-select v-model="sizeForm.inputScope" placeholder="适用门店" style="width: 115px" @change="changeStore">
                  <el-option
                    v-for="item in scopesInSelect"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="所有门店" style="float: left" v-if="sizeForm.allStores">
                <el-select v-model="sizeForm.inputStores" placeholder="适用门店" style="width: 115px">
                  <el-option
                    v-for="item in allStoresInSelect"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>

                </el-select>
              </el-form-item>
              <el-form-item style="float: right">
                <el-button type="primary" @click="selectCoupon" float="right">查询</el-button>
              </el-form-item>

            </el-form>
          </div>


        </div>
      </div>
    </div>

    <div style="margin-top: 20px">
      <template>
        <el-table :data="tableData" stripe style="width: 1440px; margin-left: 10px;" size="mini">
          <el-table-column prop="id" label="编号" width="50px"></el-table-column>
          <el-table-column prop="couponName" label="优惠券名称" width="100px"></el-table-column>
          <el-table-column prop="mobile" label="会员手机号" width="105px"></el-table-column>
          <el-table-column prop="batchId" label="批次ID" width="75px"></el-table-column>
          <el-table-column prop="couponTemplateId" label="模板ID" width="75px"></el-table-column>
          <el-table-column prop="campaignId" label="活动ID" width="75px"></el-table-column>
          <el-table-column prop="campaignName" label="活动名称" width="100px"></el-table-column>
          <el-table-column prop="templateType" label="券类型" width="90px">
            <template slot-scope="scope">
              {{scope.row.templateType === 2201 ? '折扣券' : scope.row.templateType === 2202 ? '代金券': '菜品券'}}
            </template>
          </el-table-column>
          <el-table-column prop="couponStatus" label="券状态" width="90px">
            <template slot-scope="scope">
              {{scope.row.couponStatus === 1 ? '未使用' : scope.row.couponStatus === 2 ? '已使用': '已作废'}}
            </template>
          </el-table-column>
          <el-table-column prop="effectiveStartDate" label="可用开始日期" width="110px"></el-table-column>
          <el-table-column prop="effectiveEndDate" label="可用结束日期" width="110px"></el-table-column>
          <el-table-column prop="effectiveStartTime" label="可用开始时间" width="110px"></el-table-column>
          <el-table-column prop="effectiveEndTime" label="可用结束时间" width="110px"></el-table-column>
          <el-table-column prop="scope" label="适用门店" width="90px">
            <template slot-scope="scope">
              {{scope.row.scope === 1 ? '所有门店' : '部分门店'}}
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作" width="150px">
            <template slot-scope="scope">
              <el-button type="text" @click="details(scope.$index)">查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <div>

        <el-dialog title="查看优惠券" :visible.sync="dialogFormVisible">
          <span style="font-weight: bold;">基本信息：</span><br><br>
          <span>优惠券名称：{{ inName }}</span><br>
          <span>优惠券类型：{{ inType }}</span><br>
          <span>批次ID：{{ inBatchId }}</span><br>
          <span>券模板ID：{{ inTemplateId }}</span><br>
          <span>活动名称：{{ inCampaignName }}</span><br><br>
          <span style="font-weight: bold;">使用说明：</span><br><br>
          <span>有效日期：{{ inStartDay }} — {{ inEndDay }}</span><br>
          <span>可用时段：{{ inStartTime }} — {{ inEndTime }}</span><br>
          <span>适用门店：{{ inStores }} </span><br>
          <span v-for="item in StoreList"> {{ item.merchantName }} </span><br>
          <span>其他说明：{{ inDescription }}</span><br>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>

      <div class="block" align="center">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<style>
  .el-table td, .el-table th {
    text-align: center
  }
  /*.crm {*/
    /*position: absolute;*/
    /*left: 17%;*/
    /*top: 8%;*/
  /*}*/
  .el-table th{
    background:#f2f2f2 !important;
    /*font-size: large;*/
  }
</style>

<script>
  import Vue from 'vue';
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  import 'vue-beauty/package/style/vue-beauty.min.css';
  import axios from 'axios';
  // 引入公用部分结束
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
    created: function () {
      this.getCookieDetails();
      setTimeout(() => {
        this.selectCoupon()
      }, 1111)
    },
    data() {
      return {
        crmMerchantId: '',
        inName: '',
        inType: '',
        inBatchId: '',
        inTemplateId: '',
        inCampaignName: '',
        inEndDay: '',
        inStartTime: '',
        inEndTime: '',
        inStores: '',
        inStartDay: '',
        allStores: '',
        StoreList: [],
        inDescription: '',
        tableData: [],
        allStoresInSelect: [],
        scopesInSelect: [
          {
            id: 1,
            name: '不限'
          }, {
            id: 2,
            name: '有限'
          }
        ],
        statusInSelect: [
          {
            id: 1,
            name: '未使用'
          }, {
            id: 2,
            name: '已使用'
          }, {
            id: 3,
            name: '已作废'
          }
        ],
        typesInSelect: [
          {
            id: 2201,
            name: '折扣券'
          }, {
            id: 2202,
            name: '代金券'
          }, {
            id: 2203,
            name: '菜品券'
          }
        ],
        sco: '',
        currentPage: 1,
        pageSize: 10,
        total: '',
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        sizeForm: {
          inputStores: '',
          inputName: '',
          inputBatchId: '',
          inputTemplateId: '',
          inputCampaignId: '',
          inputCampaignName: '',
          inputType: '',
          inputStatus: '',
          inputScope: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          allStores: false,
          StoreList: [],
          inStores: ''
        }
      }
    },
    methods: {
      getCookieDetails() {
        let workThis = this;
        workThis.crmMerchantId = getCookie('merchantId')
      },
      details(index) {
        let sendInfo = this;
        sendInfo.inName = sendInfo.tableData[index].couponName;
        sendInfo.inBatchId = sendInfo.tableData[index].batchId;
        sendInfo.inTemplateId = sendInfo.tableData[index].couponTemplateId;
        sendInfo.inCampaignName = sendInfo.tableData[index].campaignName;
        sendInfo.inStartDay = sendInfo.tableData[index].effectiveStartDate;
        sendInfo.inEndDay = sendInfo.tableData[index].effectiveEndDate;
        sendInfo.inStartTime = sendInfo.tableData[index].effectiveStartTime;
        sendInfo.inEndTime = sendInfo.tableData[index].effectiveEndTime;
        sendInfo.inDescription = sendInfo.tableData[index].description;
        if (sendInfo.tableData[index].templateType === 2201) {
          sendInfo.inType = '折扣券'
        } else if (sendInfo.tableData[index].templateType === 2202) {
          sendInfo.inType = '代金券'
        } else {
          sendInfo.inType = '菜品券'
        }
        if (sendInfo.tableData[index].scope === 2) {
          sendInfo.inStores = '部分门店可用';
          sendInfo.$axios({
            method: 'post',
            url: 'http://localhost:61116/member/crmCoupon/selectCouponStores',
            data: {
              'body': {
                'couponId': sendInfo.tableData[index].id
              }
            }
          }).then(function (res) {
            console.log('[接受到的数据：]' + JSON.stringify(res.data.body));
            console.log(res)
            sendInfo.StoreList = res.data.body;
            sendInfo.dialogFormVisible = true;
          })
        }
        if (sendInfo.tableData[index].scope === 1) {
          sendInfo.inStores = '所有门店可用'
          sendInfo.StoreList = [];
          sendInfo.dialogFormVisible = true;
        }
      },
      changeStore() {
        console.log(1)
        if (this.sizeForm.inputScope === 1) {
          let sendInfo = this;
          sendInfo.sizeForm.inputStores = ''
        }
        if (this.sizeForm.inputScope === 2) {
          let sendInfo = this;
          sendInfo.$axios({
            method: 'post',
            url: 'http://localhost:61116/deal/merchant/queryStores',
            data: {
              'header': {},
              'body': {
                'parentId': sendInfo.crmMerchantId
              }
            }
          }).then(function (res) {
            console.log('[接受到的数据：]' + JSON.stringify(res.data.body));
            sendInfo.allStoresInSelect = res.data.body;
          })
          this.sizeForm.allStores = true
        } else {
          this.sizeForm.allStores = false
        }
      },
      selectCoupon() {
        let sendInfo = this;
        sendInfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/selectCouponList',
          data: {
            'header': {
              'pageSize': sendInfo.pageSize,
              'pageNum': sendInfo.currentPage
            },
            'body': {
              'merchantId': sendInfo.crmMerchantId,
              'couponName': sendInfo.sizeForm.inputName,
              'batchId': sendInfo.sizeForm.inputBatchId,
              'couponTemplateId': sendInfo.sizeForm.inputTemplateId,
              'campaignId': sendInfo.sizeForm.inputCampaignId,
              'campaignName': sendInfo.sizeForm.inputCampaignName,
              'templateType': sendInfo.sizeForm.inputType,
              'couponStatus': sendInfo.sizeForm.inputStatus,
              'storeId': sendInfo.sizeForm.inputStores,
              'mobile': sendInfo.sizeForm.inputMobile,
              'scope': sendInfo.sizeForm.inputScope
            }
          }
        }).then(function (res) {
          console.log('[接受到的数据：]' + JSON.stringify(res.data.body));
          sendInfo.tableData = res.data.body.list;
          sendInfo.total = res.data.body.total;
//          sendInfo.sizeForm.inputStores = '';
          if (res.data.header.code === '10000') {
            sendInfo.$message({
              type: 'success',
              message: '查询成功!',
              inputStores: ''
            });
          } else {
            sendInfo.$message({
              type: 'warning',
              message: '加载超时!'
            });
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.selectCoupon();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.selectCoupon();
      }
    }
  }
</script>
