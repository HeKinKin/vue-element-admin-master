<template>
  <div style="width: 1230px" class="crm">
    <div
      style="background-color:#FFFFFF;box-shadow: 2px 2px 5px #888888;overflow: hidden; margin-top: 25px;margin-left: 10px">
      <div style="padding-top: 8px;background-color: #f2f2f2">
        <div style="margin-left: 10px">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="时间：">
              <div class="block">
                <el-date-picker
                  v-model="dateValue"
                  type="daterange"
                  align="right"
                  size="mini"
                  style="width: 300px"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="手机号：" prop="mobile">
              <el-input placeholder="请输入手机号" size="mini" v-model.trim="mobile"></el-input>
            </el-form-item>
            <el-form-item label="交易金额：" prop="money">
              <el-input placeholder="请输入交易金额" size="mini" v-model.trim="amount"></el-input>
            </el-form-item>
            <el-form-item label="交易渠道：" size="mini">
              <el-select v-model="tradingChannel" placeholder="请选择">
                <el-option v-for="item in options" :label="item.tradingType"
                           :value="item.tradingTypeId"></el-option>
                <el-option :value="null">
                  <span style="width: auto">无</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交易类型：" size="mini">
              <el-select v-model="tradingType">
                <el-option v-for="item in items" :label="item.tradingChannel"
                           :value="item.tradingChannelId"></el-option>
                <el-option :value="null">
                  <span style="width: auto">无</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开卡门店：" size="mini">
              <el-select v-model="openStore">
                <el-option v-for="open in opens" :label="open.cardStore" :value="open.cardStoreId"></el-option>
                <el-option :value="null">
                  <span style="width: auto">无</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交易门店：" size="mini">
              <el-select v-model="consumeStore">
                <el-option v-for="consume in consumes" :label="consume.cardStore"
                           :value="consume.cardStoreId"></el-option>
                <el-option :value="null">
                  <span style="width: auto">无</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" size="mini" @click="checkFlowWater">查询</el-button>
          </el-form>
          <el-table :data="tableData" border style="width: 100%" size="mini" v-loading="loading">
            <el-table-column label="流水号" prop="id"></el-table-column>
            <el-table-column label="交易类型" prop="tradingTypeId">
              <!--<template slot-scope="scope">-->
              <!--{{scope.row.tradingTypeId == 1501 ? '消费' : (scope.row.tradingTypeId == 1502 ? '消费退款' : (scope.row.tradingTypeId == 1503 ? '赠送积分' : (scope.row.tradingTypeId == 1504 ? '扣除积分' : (scope.row.tradingTypeId == 1505 ? '购买成长值' : (scope.row.tradingTypeId == 1506 ? '储值充值' : (scope.row.tradingTypeId == 1507 ? '储值扣除' : '成长值获取'))))))}}-->
              <!--</template>-->
            </el-table-column>
            <el-table-column label="交易渠道" prop="tradingChannelId">
              <!--<template slot-scope="scope">-->
              <!--{{scope.row.tradingChannelId == 8001 ? '支付宝' : (scope.row.tradingChannelId == 8002 ? '现金' : '微信')}}-->
              <!--</template>-->
            </el-table-column>
            <el-table-column label="手机号" prop="mobile"></el-table-column>
            <el-table-column label="交易金额" prop="amount"></el-table-column>
            <el-table-column label="成长值" prop="growthValue"></el-table-column>
            <el-table-column label="开卡门店" prop="cardStoreId">
              <!--<template slot-scope="scope">-->
              <!--{{scope.row.cardStoreId == 2 ? '新安店' : (scope.row.cardStoreId == 3 ? '茂业店' : (scope.row.cardStoreId == 4 ? '东南大学店' : (scope.row.cardStoreId == 5 ? '火车站店' : '无')))}}-->
              <!--</template>-->
            </el-table-column>
            <el-table-column label="交易门店" prop="tradingStoreId">
              <!--<template slot-scope="scope">-->
              <!--{{scope.row.tradingStoreId == 2 ? '新安店' : (scope.row.tradingStoreId == 3 ? '茂业店' : (scope.row.tradingStoreId == 4 ? '东南大学店' : (scope.row.tradingStoreId == 5 ? '火车站店' : '无')))}}-->
              <!--</template>-->
            </el-table-column>
            <el-table-column label="交易时间" prop="tradingTime" format="yyyy-MM-dd"></el-table-column>
            <el-table-column label="操作" prop="action">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="checkDetail(scope.$index)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="padding-left:600px">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes=[5,10,20,40]
              :page-size="pageSize"
              :total="totalCount"
              layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
          </div>
          <el-dialog :visible.sync="dialogFromVisible" width="60%">
            <el-table :data="childrenTableData" border style="width: 100%" size="mini" v-loading="loading">
              <el-table-column label="流水号" prop="id"></el-table-column>
              <el-table-column label="交易类型" prop="tradingTypeId">
                <!--<template slot-scope="scope">-->
                <!--{{scope.row.tradingTypeId == 1501 ? '消费' : (scope.row.tradingTypeId == 1502 ? '消费退款' : (scope.row.tradingTypeId == 1503 ? '赠送积分' : (scope.row.tradingTypeId == 1504 ? '扣除积分' : (scope.row.tradingTypeId == 1505 ? '购买成长值' : (scope.row.tradingTypeId == 1506 ? '储值充值' : (scope.row.tradingTypeId == 1507 ? '储值扣除' : '成长值获取'))))))}}-->
                <!--</template>-->
              </el-table-column>
              <el-table-column label="交易渠道" prop="tradingChannelId">
                <!--<template slot-scope="scope">-->
                <!--{{scope.row.tradingChannelId == 8001 ? '支付宝' : (scope.row.tradingChannelId == 8002 ? '现金' : '微信')}}-->
                <!--</template>-->
              </el-table-column>
              <el-table-column label="手机号" prop="mobile"></el-table-column>
              <el-table-column label="交易金额" prop="amount"></el-table-column>
              <el-table-column label="成长值" prop="growthValue"></el-table-column>
              <el-table-column label="开卡门店" prop="cardStoreId">
                <!--<template slot-scope="scope">-->
                <!--{{scope.row.cardStoreId == 2 ? '新安店' : (scope.row.cardStoreId == 3 ? '茂业店' : (scope.row.cardStoreId == 4 ? '东南大学店' : (scope.row.cardStoreId == 5 ? '火车站店' : '无')))}}-->
                <!--</template>-->
              </el-table-column>
              <el-table-column label="交易门店" prop="tradingStoreId">
                <!--<template slot-scope="scope">-->
                <!--{{scope.row.tradingStoreId == 2 ? '新安店' : (scope.row.tradingStoreId == 3 ? '茂业店' : (scope.row.tradingStoreId == 4 ? '东南大学店' : (scope.row.tradingStoreId == 5 ? '火车站店' : '无')))}}-->
                <!--</template>-->
              </el-table-column>
              <el-table-column label="交易时间" prop="tradingTime" format="yyyy-MM-dd"></el-table-column>
            </el-table>
          </el-dialog>
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

  /*.crm {*/
    /*position: absolute;*/
    /*left: 17%;*/
    /*top: 8%;*/
  /*}*/
</style>

<script>
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
        merchantId: '',
        dialogFromVisible: false,
        childrenTableData: [],
        pageNum: 1,
        pageSize: 5,
        totalCount: 1,
        loading: false,
        tableData: [],
        consumeStore: '',
        consumes: [],
        openStore: '',
        opens: [],
        tradingType: '',
        items: [],
        tradingChannel: '',
        options: [],
        amount: '',
        mobile: '',
        dateValue: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(end.getTime() - 7 * 24 * 3600 * 1000);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(end.getTime() - 30 * 24 * 3600 * 1000);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(end.getTime() - 3 * 30 * 24 * 3600 * 1000);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    methods: {
      getTradingCardStore: function () {
        let workGetTradingCardStore = this;
        workGetTradingCardStore.$axios({
          method: 'post',
          url: '/flow/water/cardStore',
          data: {
            'header': {},
            'body': {}
          }
        }).then(function (res) {
          console.log('这是开卡门店');
          console.log(res.data.body);
          workGetTradingCardStore.opens = res.data.body;
          workGetTradingCardStore.consumes = res.data.body;
        })
      },
      getTradingChannel: function () {
        let workGetTradingChannel = this;
        workGetTradingChannel.$axios({
          method: 'post',
          url: '/flow/water/channel',
          data: {
            'header': {},
            'body': {}
          }
        }).then(function (res) {
          console.log('这是类型');
          console.log(res.data.body);
          workGetTradingChannel.items = res.data.body;
        })
      },
      getTradingType: function () {
        let workGetTradingType = this;
        workGetTradingType.$axios({
          method: 'post',
          url: '/flow/water/type',
          data: {
            'header': {},
            'body': {}
          }
        }).then(function (res) {
          console.log('这是渠道');
          console.log(res.data.body);
          workGetTradingType.options = res.data.body;
        })
      },
      checkFlowWater: function () {
        let workCheckFlowWater = this;
        console.log('查询交易流水的时间');
        console.log(workCheckFlowWater.dateValue[0]);
        console.log(workCheckFlowWater.dateValue[1]);
        var mobileRegexp = /^1[0-9]{10}$/;
        if (workCheckFlowWater.mobile !== '' && !mobileRegexp.test(workCheckFlowWater.mobile)) {
          workCheckFlowWater.$message.warning('请输入正确的手机号码');
          return false;
        }
        var amountRegexp = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        if ((workCheckFlowWater.amount !== '' && !amountRegexp.test(workCheckFlowWater.amount)) || (workCheckFlowWater.amount !== '' && workCheckFlowWater.amount <= 0)) {
          workCheckFlowWater.$message.warning('交易金额必须大于0且最多保留2位小数');
          return false;
        }
        console.log('这是金额')
        console.log(workCheckFlowWater.amount);
        workCheckFlowWater.$axios({
          method: 'post',
          url: '/flow/water/data',
          data: {
            'header': {
              'pageNum': workCheckFlowWater.pageNum,
              'pageSize': workCheckFlowWater.pageSize
            },
            'body': {
              'merchantId': workCheckFlowWater.merchantId,
              'startTime': workCheckFlowWater.dateValue[0],
              'endTime': workCheckFlowWater.dateValue[1],
              'mobile': workCheckFlowWater.mobile,
              'amount': workCheckFlowWater.amount,
              'tradingChannelId': workCheckFlowWater.tradingChannel,
              'tradingTypeId': workCheckFlowWater.tradingType,
              'cardStoreId': workCheckFlowWater.openStore,
              'tradingStoreId': workCheckFlowWater.consumeStore
            }
          }
        }).then(function (res) {
          workCheckFlowWater.loading = true;
          setTimeout(() => {
            workCheckFlowWater.loading = false;
          }, 500);
          if (res.data.header.code === '10000') {
            workCheckFlowWater.tableData = res.data.body.list;
            for (var i = 0; i < workCheckFlowWater.tableData.length; i++) { // 对交易流水中的的数据进行循环
              for (var j = 0; j < workCheckFlowWater.items.length; j++) { // 对查询的交易类型进行循环
                if (workCheckFlowWater.tableData[i].tradingTypeId === workCheckFlowWater.items[j].tradingChannelId) { // 如果流水类型id和交易类型id相等
                  workCheckFlowWater.tableData[i].tradingTypeId = workCheckFlowWater.items[j].tradingChannel; // 将交易类型名称赋值给流水类型id
                }
              }
            }
            for (var ii = 0; ii < workCheckFlowWater.tableData.length; ii++) { // 对交易流水中的的数据进行循环
              for (var jj = 0; jj < workCheckFlowWater.options.length; jj++) { // 对查询的交易渠道进行循环
                console.log('进入循环' + workCheckFlowWater.tableData[ii].tradingChannelId);
                console.log('这是交易渠道' + workCheckFlowWater.options[jj].tradingTypeId);
                if (workCheckFlowWater.tableData[ii].tradingChannelId === workCheckFlowWater.options[jj].tradingTypeId) { // 如果流水渠道id和交易渠道id相等
                  workCheckFlowWater.tableData[ii].tradingChannelId = workCheckFlowWater.options[jj].tradingType; // 将交易渠道名称赋值给流水渠道id
                }
              }
            }
            for (var a = 0; a < workCheckFlowWater.tableData.length; a++) { // 对交易流水中的的数据进行循环
              for (var b = 0; b < workCheckFlowWater.options.length; b++) { // 对查询的卡属门店进行循环
                if (workCheckFlowWater.tableData[a].cardStoreId === workCheckFlowWater.opens[b].cardStoreId) { // 如果卡属门店id和查询的卡属门店id相等
                  workCheckFlowWater.tableData[a].cardStoreId = workCheckFlowWater.opens[b].cardStore; // 将卡属门店名称赋值给卡属门店id
                }
              }
            }
            for (var c = 0; c < workCheckFlowWater.tableData.length; c++) { // 对交易流水中的的数据进行循环
              for (var d = 0; d < workCheckFlowWater.options.length; d++) { // 对查询的交易渠道进行循环
                if (workCheckFlowWater.tableData[c].tradingStoreId === workCheckFlowWater.opens[d].cardStoreId) { // 如果流水渠道id和交易渠道id相等
                  workCheckFlowWater.tableData[c].tradingStoreId = workCheckFlowWater.opens[d].cardStore; // 将交易渠道名称赋值给流水渠道id
                }
              }
            }
            workCheckFlowWater.totalCount = res.data.body.total;
            console.log('交易流水');
            console.log(res.data.body);
          } else {
            workCheckFlowWater.$message.warning('查询失败');
          }
        })
      },
      checkDetail: function (index) {
        let workCheckDetail = this;
        workCheckDetail.dialogFromVisible = true;
        workCheckDetail.$axios({
          method: 'post',
          url: '/flow/water/children',
          data: {
            'header': {},
            'body': {
              'masterId': workCheckDetail.tableData[index].id
            }
          }
        }).then(function (res) {
          workCheckDetail.loading = true;
          setTimeout(() => {
            workCheckDetail.loading = false;
          }, 500);
          if (res.data.header.code === '10000') {
            workCheckDetail.childrenTableData = res.data.body;
            for (var i = 0; i < workCheckDetail.childrenTableData.length; i++) { // 对交易流水中的的数据进行循环
              for (var j = 0; j < workCheckDetail.items.length; j++) { // 对查询的交易类型进行循环
                if (workCheckDetail.childrenTableData[i].tradingTypeId === workCheckDetail.items[j].tradingChannelId) { // 如果流水类型id和交易类型id相等
                  workCheckDetail.childrenTableData[i].tradingTypeId = workCheckDetail.items[j].tradingChannel; // 将交易类型名称赋值给流水类型id
                }
              }
            }
            for (var ii = 0; ii < workCheckDetail.childrenTableData.length; ii++) { // 对交易流水中的的数据进行循环
              for (var jj = 0; jj < workCheckDetail.options.length; jj++) { // 对查询的交易渠道进行循环
                if (workCheckDetail.childrenTableData[ii].tradingChannelId === workCheckDetail.options[jj].tradingTypeId) { // 如果流水渠道id和交易渠道id相等
                  workCheckDetail.childrenTableData[ii].tradingChannelId = workCheckDetail.options[jj].tradingType; // 将交易渠道名称赋值给流水渠道id
                }
              }
            }
            for (var a = 0; a < workCheckDetail.childrenTableData.length; a++) { // 对交易流水中的的数据进行循环
              for (var b = 0; b < workCheckDetail.options.length; b++) { // 对查询的卡属门店进行循环
                if (workCheckDetail.childrenTableData[a].cardStoreId === workCheckDetail.opens[b].cardStoreId) { // 如果卡属门店id和查询的卡属门店id相等
                  workCheckDetail.childrenTableData[a].cardStoreId = workCheckDetail.opens[b].cardStore; // 将卡属门店名称赋值给卡属门店id
                }
              }
            }
            for (var c = 0; c < workCheckDetail.childrenTableData.length; c++) { // 对交易流水中的的数据进行循环
              for (var d = 0; d < workCheckDetail.options.length; d++) { // 对查询的交易渠道进行循环
                if (workCheckDetail.childrenTableData[c].tradingStoreId === workCheckDetail.opens[d].cardStoreId) { // 如果流水渠道id和交易渠道id相等
                  workCheckDetail.childrenTableData[c].tradingStoreId = workCheckDetail.opens[d].cardStore; // 将交易渠道名称赋值给流水渠道id
                }
              }
            }
            console.log('查询的子流水');
            console.log(res.data.body);
          } else {
            workCheckDetail.$message.warning('查询子流水失败');
          }
        })
      },
      handleSizeChange: function (val) {
        this.pageSize = val;
        this.checkFlowWater();
      },
      handleCurrentChange: function (val) {
        this.pageNum = val;
        this.checkFlowWater();
      },
      getCookieDetails() {
        let workThis = this;
        workThis.merchantId = getCookie('merchantId')
      }
    },
    created: function () {
      this.getCookieDetails();
      setTimeout(() => {
        this.getTradingChannel();
        this.getTradingType();
        this.getTradingCardStore();
        this.checkFlowWater();
      }, 1111)
    }
  }
</script>
