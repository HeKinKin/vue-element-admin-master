<template>
  <div class="crm" style="width: 1230px">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="会员基本信息" name="first">
        <el-table
          :data="tableData5"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                  <span>{{ props.row.memberName }}</span>
                </el-form-item>
                <el-form-item label="卡号">
                  <span>{{ props.row.cardNo }}</span>
                </el-form-item>
                <el-form-item label="所属店铺">
                  <span>{{ props.row.merchantName }}</span>
                </el-form-item>
                <el-form-item label="会员等级">
                  <span>{{ props.row.levelName }}</span>
                </el-form-item>
                <el-form-item label="所属门店">
                  <span>{{ props.row.merchantName }}</span>
                </el-form-item>
                <el-form-item label="成长值">
                  <span>{{ props.row.growthValue }}</span>
                </el-form-item>
                <el-form-item label="积分">
                  <span>{{ props.row.integralBalance }}</span>
                </el-form-item>
                <el-form-item label="储值">
                  <span>{{ props.row.balance }}</span>
                </el-form-item>
                <el-form-item label="开卡时间">
                  <span>{{ props.row.createTime }}</span>
                </el-form-item>
                <el-form-item label="状态">
                  <span>{{ props.row.status }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="会员 ID"
            prop="memberId">
          </el-table-column>
          <el-table-column
            label="会员名称"
            prop="memberName">
          </el-table-column>
          <el-table-column
            label="手机号"
            prop="mobile">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="会员卡资产信息" name="second">
        <el-table
          :data="tableData5"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品名称">
                  <span>{{ props.row.memberName }}</span>
                </el-form-item>
                <el-form-item label="卡号">
                  <span>{{ props.row.cardNo }}</span>
                </el-form-item>
                <el-form-item label="所属店铺">
                  <span>{{ props.row.merchantName }}</span>
                </el-form-item>
                <el-form-item label="会员等级">
                  <span>{{ props.row.levelName }}</span>
                </el-form-item>
                <el-form-item label="所属门店">
                  <span>{{ props.row.merchantName }}</span>
                </el-form-item>
                <el-form-item label="成长值">
                  <span>{{ props.row.growthValue }}</span>
                </el-form-item>
                <el-form-item label="积分">
                  <span>{{ props.row.integralBalance }}</span>
                </el-form-item>
                <el-form-item label="储值">
                  <span>{{ props.row.balance }}</span>
                </el-form-item>
                <el-form-item label="开卡时间">
                  <span>{{ props.row.createTime }}</span>
                </el-form-item>
                <el-form-item label="状态">
                  <span>{{ props.row.status }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="会员 ID"
            prop="memberId">
          </el-table-column>
          <el-table-column
            label="会员名称"
            prop="memberName">
          </el-table-column>
          <el-table-column
            label="手机号"
            prop="mobile">
          </el-table-column>
        </el-table>




          <!--<div style="height: 50px; background-color: #EBEEF5">-->
            <!--<span style="margin-left: 20px; font-size: 20px; font-family: Extra large">优惠券列表</span>-->
          <!--</div>-->


        <div style="background-color:#f2f2f2;box-shadow: 2px 2px 5px #888888;overflow: hidden; margin-top: 25px;margin-left: 10px">

          <div style="padding-top: 8px;background-color: #f2f2f2">

            <div style="margin-left: 10px">

            <el-form ref="form" :model="sizeForm.sizeForm" label-width="100px" size="mini">
                <el-form-item label="优惠券名称" class="myInput">
                  <el-input v-model.trim="sizeForm.inputName" placeholder="请输入优惠券名称" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="券批次ID" class="myInput">
                  <el-input v-model.trim="sizeForm.inputBatchId" placeholder="请输入批次ID" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="券模板ID" class="myInput">
                  <el-input v-model.trim="sizeForm.inputTemplateId" placeholder="请输入券模板ID" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="活动ID" class="myInput">
                  <el-input v-model.trim="sizeForm.inputCampaignId" placeholder="请输入活动ID" size="mini"></el-input>
                </el-form-item>
            </el-form>

              <el-form ref="form" :model="sizeForm" label-width="100px" size="mini">
                <el-form-item label="活动名称" class="myInput">
                  <el-input v-model.trim="sizeForm.inputCampaignName" placeholder="请输入活动名称" size="mini"></el-input>
                </el-form-item>

                <el-form-item label="券类型" class="myInput" >
                  <el-select v-model="sizeForm.inputType" placeholder="请选择券类型" size="mini">
                    <el-option
                      v-for="item in typesInSelect"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="券状态" class="myInput">
                  <el-select v-model="sizeForm.inputStatus" placeholder="请选择券状态"  size="mini">
                    <el-option
                      v-for="item in statusInSelect"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="适用门店" class="myInput">
                  <el-select v-model="sizeForm.inputScope" placeholder="适用门店" @change="changeStore"  size="mini">
                    <el-option
                      v-for="item in scopesInSelect"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="所有门店" v-if="sizeForm.allStores" class="myInput" size="mini">
                  <el-select v-model="sizeForm.inputStores" placeholder="适用门店">
                    <el-option
                      v-for="item in allStoresInSelect"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>

              </el-form>




              <span style="float: right">
                <el-button type="primary" @click="selectCoupon" float="right" size="mini">查询</el-button>
              </span>

            </div>
            </div>
          </div>



          <div  style="margin-top:10px;margin-left:10px;margin-top: 20px;margin-left: -10px">
            <div style="margin-top: 20px">
            </div>

              <el-table :data="tableData" stripe border style="width: 1445px; margin-left: 20px;">
                <el-table-column prop="id" label="编号" width="50px"></el-table-column>
                <el-table-column prop="couponName" label="优惠券名称" width="100px"></el-table-column>
                <el-table-column prop="mobile" label="会员手机号" width="105px"></el-table-column>
                <el-table-column prop="batchId" label="批次ID" width="65px"></el-table-column>
                <el-table-column prop="couponTemplateId" label="模板ID" width="65px"></el-table-column>
                <el-table-column prop="campaignId" label="活动ID" width="65px"></el-table-column>
                <el-table-column prop="campaignName" label="活动名称" width="100px"></el-table-column>
                <el-table-column prop="templateType" label="券类型" width="100px">
                  <template slot-scope="scope">
                    {{scope.row.templateType === 2201 ? '折扣券' : scope.row.templateType === 2202 ? '代金券': '菜品券'}}
                  </template>
                </el-table-column>
                <el-table-column prop="couponStatus" label="券状态" width="100px">
                  <template slot-scope="scope">
                    {{scope.row.couponStatus === 1 ? '未使用' : scope.row.couponStatus === 2 ? '已使用': '已作废'}}
                  </template>
                </el-table-column>
                <el-table-column prop="effectiveStartDate" label="可用开始日期" width="110px"></el-table-column>
                <el-table-column prop="effectiveEndDate" label="可用结束日期" width="110px"></el-table-column>
                <el-table-column prop="effectiveStartTime" label="可用开始时间" width="110px"></el-table-column>
                <el-table-column prop="effectiveEndTime" label="可用结束时间" width="110px"></el-table-column>
                <el-table-column prop="scope" label="适用门店" width="100px">
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

                <span v-for="item in StoreList">{{ item.merchantName }} </span><br>
                <span>其他说明：{{ inDescription }}</span><br>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                </div>
              </el-dialog>


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

      </el-tab-pane>

      <el-tab-pane label="交易记录" name="third">交易记录</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import Vue from 'vue';
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  import 'vue-beauty/package/style/vue-beauty.min.css';
  import axios from 'axios';
  // 引入公用部分结束
  Vue.prototype.$axios = axios;
  Vue.use(ElementUI);

  export default {
    data() {
      return {
        activeName: 'first',
        tableData5: [],
        id: '',
        allStores: '',
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
        pageSize: 5,
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
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      selectAll() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/member/query',
          data: {
            'header': {
            },
            'body': {
              'memberId': workThis.$route.query.id
            }
          }
        }).then(function (res) {
          workThis.loading = true;
          setTimeout(() => {
            workThis.loading = false;
          }, 1000);
          workThis.tableData5 = res.data.body.list;
        })
      },
      changeStore() {
        console.log(1)
        if (this.sizeForm.inputScope === 2) {
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
              'couponName': sendInfo.sizeForm.inputName,
              'batchId': sendInfo.sizeForm.inputBatchId,
              'couponTemplateId': sendInfo.sizeForm.inputTemplateId,
              'campaignId': sendInfo.sizeForm.inputCampaignId,
              'campaignName': sendInfo.sizeForm.inputCampaignName,
              'templateType': sendInfo.sizeForm.inputType,
              'couponStatus': sendInfo.sizeForm.inputStatus,
              'merchantId': sendInfo.sizeForm.inputStores,
              // 'mobile': sendInfo.sizeForm.inputMobile,
              'mobile': sendInfo.$route.query.mobile,
              'scope': sendInfo.sizeForm.inputScope
            }
          }
        }).then(function (res) {
          console.log('[接受到的数据：]' + JSON.stringify(res.data.body));
          sendInfo.tableData = res.data.body.list;
          sendInfo.total = res.data.body.total;
        })
      },
      details(index) {
        let sendInfo = this;
        sendInfo.dialogFormVisible = true;
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
            sendInfo.StoreList = res.data.body;
          })
        }
        if (sendInfo.tableData[index].scope === 1) {
          sendInfo.inStores = '所有门店可用'
        }
      },
//      details2 () {
//        let sendInfo = this;
//        sendInfo.dialogFormVisible = false;
//        sendInfo.inName = '';
//        sendInfo.inBatchId = '';
//        sendInfo.inTemplateId = '';
//        sendInfo.inCampaignName = '';
//        sendInfo.inStartDay = '';
//        sendInfo.inEndDay = '';
//        sendInfo.inStartTime = '';
//        sendInfo.inEndTime = '';
//        sendInfo.inDescription = '';
//        sendInfo.inType = '';
//        sendInfo.inStores = '';
//      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.selectCoupon();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.selectCoupon();
      }
    },
    created() {
      this.selectAll();
      this.selectCoupon();
    }
  };
</script>


<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  /*.crm {*/
    /*position: absolute;*/
    /*left: 17%;*/
    /*top: 10%;*/
  /*}*/
  .myInput{
    float: left;
  }
</style>
