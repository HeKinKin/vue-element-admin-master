<template>
  <div style="width: 1230px" class="crm">
    <div
      style="overflow: hidden; margin-top: 25px;margin-left: 10px">

      <div style="padding-top: 8px">
        <div style="margin-left: 10px">
          <el-form :inline="true" class="demo-form-inline">

            <el-form-item label="券模板名称">
              <el-input placeholder="请输入名称" size="mini" style="width: 120px"
                        v-model.trim="checkCouponTemplateName"></el-input>
            </el-form-item>

            <el-form-item label="券模板类型">
              <el-select v-model="couponValue" style="width: 120px" clearable placeholder="请选择" size="mini">
                <el-option
                  v-for="item in options"
                  :label="item.dictionaryValue"
                  :value="item.templateType"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="适用门店">-->
              <!--<el-select v-model="sizeForm.inputStores" style="width: 120px" clearable size="mini" placeholder="适用门店"-->
                         <!--@change="changeStores">-->
                <!--<el-option-->
                  <!--v-for="item in storesInSelect"-->
                  <!--:key="item.id"-->
                  <!--:label="item.name"-->
                  <!--:value="item.id"-->
                <!--&gt;</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="选择门店" v-if="sizeForm.allStores">-->
              <!--<el-select v-model="sizeForm.allStoresValue" style="width: 120px" clearable size="mini"-->
                         <!--placeholder="选择门店">-->
                <!--<el-option-->
                  <!--v-for="item in allStoresInSelect"-->
                  <!--:key="item.id"-->
                  <!--:label="item.name"-->
                  <!--:value="item.id"-->
                <!--&gt;</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item>
              <el-button type="primary" size="mini" @click="checkCouponInfo">搜索</el-button>
              <el-button type="primary" size="mini" @click="insertCouponTemplate">添加券模板</el-button>
            </el-form-item>
          </el-form>
          <div style="margin-top:10px;margin-left:10px;margin-top: 20px">
            <div style="margin-top: 20px">
            </div>


            <el-table
              :data="tableData"
              border
              style="width: 100%"
              v-loading="loading"
              size="mini">
              <el-table-column
                prop="name"
                label="券模板名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="dictionaryValue"
                label="券模板类型">
              </el-table-column>
              <el-table-column
                prop="effectiveStartDate"
                label="开始时间"
                format="yyyy-MM-dd"
              >
              </el-table-column>
              <el-table-column
                prop="effectiveEndDate"
                label="结束时间"
                format="yyyy-MM-dd"
              >
              </el-table-column>
              <!--<el-table-column-->
                <!--prop="merchantName"-->
                <!--label="适用门店">-->
              <!--</el-table-column>-->
              <el-table-column
                fixed="right"
                label="操作"
                width="300px">
                <template slot-scope="scope">
                  <el-button type="text" @click="delCouponTemplate(scope.$index)">删除</el-button>
                  <el-button type="text" size="small" @click="stopCouponTemplate(scope.$index)">停用</el-button>
                  <el-button type="text" size="small" @click="updateCouponTemplate(scope.$index)">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>

            <div style="padding-left:600px">
              <el-pagination style="text-align: right"
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page="pageNum"
                             :page-sizes="[5, 10, 15, 20]"
                             :page-size="pageSize"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="totalCount">
              </el-pagination>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>


</template>

<style scoped>
  .el-table th {
    background: #f2f2f2 !important;
    font-size: large;
  }


  .el-form-item {
    float: left;
  }
</style>

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
  export default{
    data () {
      return {
//        message: 'primary',
        loading: true,
        pageNum: 1,
        pageSize: 10,
        totalCount: 1,
        total: 1,
        tid: '',
        tableData: [],
        checkCouponTemplateName: null,
        couponValue: '',
        merchantValue: '',
        options: [{
          dictionaryValue: '',
          templateType: ''
        }, {
          dictionaryValue: '',
          templateType: ''
        }, {
          dictionaryValue: '',
          templateType: ''
        }],
        allStoresInSelect: [
          {
            id: '',
            name: ''
          }
        ],
        storesInSelect: [
          {
            id: 1,
            name: '不限'
          }, {
            id: 2,
            name: '有限'
          }
        ],
        sizeForm: {
          allStoresValue: '',
          inputStores: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          allStores: false
        },
        campaignDataStatus: [],
        crmMerchantId: ''
      }
    },
    methods: {
      selectCoupon() {
        let workSelectCoupon = this;
//        alert('进入查询券模板方法');
        workSelectCoupon.$axios({
          method: 'post',
          url: 'http://localhost:61116/coupon/getCouponInfo',
          data: {
            'header': {},
            'body': {
              'merchantId': workSelectCoupon.crmMerchantId
            }
          }
        }).then(function (res) {
          workSelectCoupon.options = res.data.body;
          console.log(res.data.body);
        })
      },
      changeStores() {
        if (this.sizeForm.inputStores === 2) {
          let sendInfo = this;
          sendInfo.$axios({
            method: 'post',
            url: 'http://localhost:61116/deal/merchant/queryStores',
            data: {
              'header': {},
              'body': {
                'parentId': 1
              }
            }
          }).then(function (res) {
            sendInfo.allStoresInSelect = res.data.body;
          })

          this.sizeForm.allStores = true;
        } else {
          this.sizeForm.allStores = false;
        }
      },
      insertCouponTemplate () { // 新增券模板
        this.$router.push({
          path: '/campaign/insertCouponTemplate' // 新增券模板的路径
        })
      },
      checkCouponInfo () { // 搜索券模板信息
        let workcheckCouponInfo = this;
        if (workcheckCouponInfo.checkCouponTemplateName !== null && workcheckCouponInfo.checkCouponTemplateName.length > 32) {
          workcheckCouponInfo.$message.warning('您输入的券模板名称过长');
          return false;
        }
        workcheckCouponInfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/coupon/getCouponTemplateInfo',
          data: {
            'header': {
              'pageNum': workcheckCouponInfo.pageNum,
              'pageSize': workcheckCouponInfo.pageSize
            },
            'body': {
              'name': workcheckCouponInfo.checkCouponTemplateName,
              'dictionaryKey': workcheckCouponInfo.couponValue,
              'merchantId': workcheckCouponInfo.crmMerchantId
            }
          }
        }).then(function (res) {
          workcheckCouponInfo.loading = true;
          setTimeout(() => {
            workcheckCouponInfo.loading = false;
          }, 500);
          if (res.data.header.code === '10000') {
            workcheckCouponInfo.tableData = res.data.body.list;
            workcheckCouponInfo.totalCount = res.data.body.total;
            workcheckCouponInfo.$message.success('搜索成功');
            console.log(res.data.body.list);
          } else {
            workcheckCouponInfo.$message.warning('输入有误，查询失败');
            workcheckCouponInfo.tableData = res.data.body;
            workcheckCouponInfo.totalCount = res.data.body;
          }
        })
      },
      delCouponTemplate (index) { // 删除券模板
        let workDelCouponTemplate = this;
        workDelCouponTemplate.tid = workDelCouponTemplate.tableData[index].couponTemplateId;
//        workDelCouponTemplate.checkCouponInfo();
        workDelCouponTemplate.$confirm('确定删除吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          workDelCouponTemplate.$axios({ // 将id传回去查看券模板的使用状态
            method: 'post',
            url: 'http://localhost:61116/ipos/campaign/selectCampaign', // 查询券模板使用状态路径
            data: {
              'header': {},
              'body': {
                'couponId': workDelCouponTemplate.tid
              }
            }
          }).then(function (res) {
            workDelCouponTemplate.campaignDataStatus = res.data.body;
            if (workDelCouponTemplate.campaignDataStatus.list.length !== 0) { // 通过code码判断券模板的状态是否正在被使用
              workDelCouponTemplate.$message.warning('该模板正在被使用，不能删除');
            } else {
              workDelCouponTemplate.$axios({
                method: 'post',
                url: 'http://localhost:61116/template/deleteCouponTemplate', // 删除券模板路径
                data: {
                  'header': {},
                  'body': {
                    'id': workDelCouponTemplate.tid
                  }
                }
              }).then(function (res) {
                if (res.data.header.code === '10000') { // 通过code码判断是否删除成功
                  workDelCouponTemplate.$message.success('删除成功');
                  workDelCouponTemplate.checkCouponInfo();
                } else {
                  workDelCouponTemplate.$message.success('删除失败');
                }
              })
            }
          }).catch(() => {
            workDelCouponTemplate.$message({
              type: 'info',
              message: '取消删除'
            })
          })
        })
      },
      getCookieDetails() {
        let workThis = this;
        workThis.crmMerchantId = getCookie('merchantId')
      },
      stopCouponTemplate(index) { // 停用券模板
        let workStopCouponTemplate = this;
        workStopCouponTemplate.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/campaign/selectCampaign', // 查询券模板对应的营销活动
          data: {
            'header': {},
            'body': {
              'id': workStopCouponTemplate.tableData[index].couponTemplateId
            }
          }
        }).then(function (res) {
          workStopCouponTemplate.campaignDataStatus = res.data.body;
          if (workStopCouponTemplate.campaignDataStatus.length !== 0) {
            workStopCouponTemplate.$confirm('该券模板正在被使用，确定停用吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              workStopCouponTemplate.$axios({
                method: 'post',
                url: 'http://localhost:61116/template/deleteCouponTemplate',
                data: {
                  'header': {},
                  'body': {
                    'id': workStopCouponTemplate.tableData[index].couponTemplateId
                  }
                }
              }).then(function (res) {
                if (res.data.header.code === '10000') {
                  workStopCouponTemplate.$message.success('停用成功');
                } else {
                  workStopCouponTemplate.$message.warning('停用失败');
                }
              })
            }).catch(() => {
              workStopCouponTemplate.$message({
                type: 'info',
                message: '取消停用'
              })
            })
          }
        })
      },
      updateCouponTemplate(index) { // 编辑券模板
        let workUpdateCouponTemplate = this;
        this.$router.push({
          path: '/campaign/editCouponTemplate', // 编辑券模板的路径
          query: {
            couponName: workUpdateCouponTemplate.tableData[index].name,
            name: workUpdateCouponTemplate.tableData[index].dictionaryValue,
            id: workUpdateCouponTemplate.tableData[index].couponTemplateId
          }
        });
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.checkCouponInfo();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.checkCouponInfo();
      }
    },
    created() {
      this.getCookieDetails();
      setTimeout(() => {
        this.selectCoupon();
        this.checkCouponInfo();
      }, 1111)
    }
  }
</script>
