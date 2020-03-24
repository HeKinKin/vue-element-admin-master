<template>
  <div style="width: 1230px" class="crm">

    <div
      style="background-color:#FFFFFF;box-shadow: 2px 2px 5px #888888;overflow: hidden; margin-top: 25px;margin-left: 10px">
      <div style="padding-top: 10px;background-color: #f2f2f2">
        <div>
          <el-form :inline="true" class="demo-form-inline" size="mini">
            <el-form-item style="margin-left: 20px">
              <el-button type="primary" size="mini" @click="addRule()"> + 新增规则</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-left: 10px; margin-top: 20px">
          <el-form ref="form" :model="sizeForm.sizeForm" label-width="100px" size="mini" :inline="true"
                   class="demo-form-inline">
            <el-form-item label="规则名称" style="float: left">
              <el-input v-model="sizeForm.rulesName" placeholder="规则名称" style="width: 150px"
                        onkeyup="value=value.replace(/[\s+]/g,'')"></el-input>
            </el-form-item>
            <el-form-item label="会员等级" style="float: left">
              <el-select v-model="sizeForm.memberLevel" clearable placeholder="会员等级" style="width: 150px">
                <el-option
                  v-for="item in memberLevelInSelect"
                  :label="item.levelName"
                  :value="item.levelId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="规则类型" style="float: left">
              <el-select v-model="sizeForm.rulesType" clearable placeholder="规则类型" style="width: 150px">
                <el-option
                  v-for="item in typesInSelect"
                  :label="item.dictionaryValue"
                  :value="item.dictionaryKey"
                ></el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="行为方式" style="float: left">-->
            <!--<el-select v-model="sizeForm.behavior" clearable placeholder="行为方式" style="width: 150px">-->
            <!--<el-option-->
            <!--v-for="item in behaviorInSelect"-->
            <!--:label="item.dictionaryValue"-->
            <!--:value="item.dictionaryKey"-->
            <!--&gt;</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item label="会员来源" style="float: left">
              <el-select v-model="sizeForm.memberResource" clearable placeholder="会员来源" style="width: 150px">
                <el-option
                  v-for="item in memberSourceInSelect"
                  :label="item.dictionaryValue"
                  :value="item.dictionaryKey"
                ></el-option>
              </el-select>
            </el-form-item>
            <!--<el-form-item label="消费渠道" style="float: left">-->
            <!--<el-select v-model="sizeForm.consumeChannel" clearable placeholder="支付方式" style="width: 150px">-->
            <!--<el-option-->
            <!--v-for="item in consumeChannelInSelect"-->
            <!--:label="item.dictionaryValue"-->
            <!--:value="item.dictionaryKey"-->
            <!--&gt;</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="支付方式" style="float: left">-->
            <!--<el-select v-model="sizeForm.payWay" clearable placeholder="支付方式" style="width: 150px">-->
            <!--<el-option-->
            <!--v-for="item in payWayInSelect"-->
            <!--:label="item.dictionaryValue"-->
            <!--:value="item.dictionaryKey"-->
            <!--&gt;</el-option>-->
            <!--</el-select>-->
            <!--</el-form-item>-->
            <el-form-item style="float: left; margin-left: 80px">
              <el-button type="primary" @click="selectRules">查询</el-button>
            </el-form-item>
          </el-form>
        </div>

      </div>
    </div>

    <div style="margin-top: 20px">
      <template>
        <el-table :data="tableData" stripe style="width: 1440px; margin-left: 10px" size="mini">
          <el-table-column prop="id" label="编号" width="100px"></el-table-column>
          <el-table-column prop="rulesName" label="规则名称" width="160px"></el-table-column>
          <el-table-column prop="rulesType" label="规则类型" width="130px">
            <template slot-scope="scope">
              {{scope.row.rulesType === 1801 ? '积分获取' : scope.row.rulesType === 1802 ? '积分限制'
              : scope.row.rulesType === 1803 ? '积分抵扣' : scope.row.rulesType === 1804 ? '积分清零'
              : scope.row.rulesType === 1805 ? '储值叠加' : scope.row.rulesType === 1806 ? '储值阶梯'
              : scope.row.rulesType === 1807 ? '成长值获取' : '成长值购买'}}
            </template>
          </el-table-column>
          <!--<el-table-column prop="behavior" label="行为方式" width="100px">-->
          <!--<template slot-scope="scope">-->
          <!--{{scope.row.behavior === 1201 ? '消费' : '储值'}}-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column prop="memberResource" label="会员来源" width="160px">
          </el-table-column>
          <!--<el-table-column prop="payWay" label="支付方式" width="100px">-->
          <!--<template slot-scope="scope">-->
          <!--{{scope.row.payWay === 6001 ? '银行卡' : scope.row.payWay === 6002 ? '现金'-->
          <!--: scope.row.payWay === 6003 ? '支付宝' : scope.row.payWay === 6004 ? '微信' : '储值'}}-->
          <!--</template>-->
          <!--</el-table-column>-->
          <el-table-column prop="consumeChannel" label="消费渠道" width="160px">
            <!--<template slot-scope="scope">-->
            <!--{{scope.row.consumeChannel === 5001 ? 'POS' : scope.row.consumeChannel === 5002 ? '微信' : '支付宝'}}-->
            <!--</template>-->
          </el-table-column>
          <el-table-column prop="levelId" label="会员等级" width="160px">
          </el-table-column>
          <el-table-column prop="description" label="规则内容" width="210px"></el-table-column>
          <el-table-column prop="operation" label="操作" width="150px">
            <template slot-scope="scope">
              <el-button type="text" @click="deleteRule(scope.$index)">删除</el-button>
              <el-button type="text" @click="editRule(scope.$index)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

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
      this.getCookieDetails()
      setTimeout(() => {
        this.selectRules()
        this.selectMemberResource()
        this.selectBehavior()
        this.selectPayWay()
        this.selectTypes()
        this.selectConsumeChannel()
        this.selectMemberLevel()
      }, 1111)
    },
    data() {
      return {
        levelId: [],
        levelName: [],
        consumeChannelList: [],
        consumeChannels: '',
        memberResourceList: [],
        memberResources: '',
        levelIdList: [],
        levelIdList2: [],
        levelIds: '',
        sco: '',
        currentPage: 1,
        pageSize: 5,
        total: '',
        tableData: [],
        sizeForm: {
          id: '',
          rulesName: '',
          memberLevel: '',
          rulesType: '',
          behavior: '',
          memberSource: '',
          consumeChannel: '',
          payWay: ''
        },
        memberLevelInSelect: [],
        typesInSelect: [],
        behaviorInSelect: [],
        memberSourceInSelect: [],
        consumeChannelInSelect: [],
        payWayInSelect: [],
        crmMerchantId: ''
      }
    },
    methods: {
      getCookieDetails() {
        let workThis = this;
        workThis.crmMerchantId = getCookie('merchantId')
      },
      deleteRule(index) {
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let sendInfo = this;
          sendInfo.$axios({
            method: 'post',
            url: 'http://localhost:61116/deal/rules/delRules',
            data: {
              'header': {},
              'body': {
                'rulesId': sendInfo.tableData[index].id
              }
            }
          }).then(function (res) {
            sendInfo.selectRules();
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      editRule(index) {
        let sendinfo = this;
//        this.$router.push({
//          path: 'editGrowthRule',
//          query: {
//            id: sendinfo.tableData[index].id
//          }
//        })
        sendinfo.$router.push({
          path: '/rule/editGrowthRule',
          query: {
            rulesId: sendinfo.tableData[index].id,
            ruleName: sendinfo.tableData[index].rulesName,
//            memberGrade: sendinfo.levelIdList,
//            memberResource: sendinfo.memberResourceList,
//            consumeChannel: sendinfo.consumeChannelList,
            payMoney: sendinfo.tableData[index].priceMoney,
            growthValue: sendinfo.tableData[index].priceIntegral,
            ruleDescription: sendinfo.tableData[index].description

          }
        })
      },
      addRule() {
        this.$router.push({
          path: '/rule/newGrowthRule'
        });
      },
      selectRules() {
        let sendInfo = this;
        console.log('门店为：' + sendInfo.crmMerchantId)
        sendInfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/deal/rules/selectRulesList',
          data: {
            'header': {
              'pageSize': sendInfo.pageSize,
              'pageNum': sendInfo.currentPage
            },
            'body': {
              'merchantId': sendInfo.crmMerchantId,
              'id': sendInfo.sizeForm.id,
              'rulesName': sendInfo.sizeForm.rulesName,
              'levelId': sendInfo.sizeForm.memberLevel,
              'behavior': sendInfo.sizeForm.behavior,
              'rulesType': sendInfo.sizeForm.rulesType,
              'memberResource': sendInfo.sizeForm.memberResource,
              'payWay': sendInfo.sizeForm.payWay
            }
          }
        }).then(function (res) {
          console.log('[接受到的数据：]' + JSON.stringify(res.data.body));
          sendInfo.tableData = res.data.body.list;
          // ******************************************************************
          for (var i = 0; i < sendInfo.tableData.length; i++) {
            // ***********会员** 等级 **转换*****************************************
            // 将String类型的等级id 转换成list
            sendInfo.levelIds = sendInfo.tableData[i].levelId;
            console.log('这是levelIds中的数据' + sendInfo.levelIds);
            sendInfo.levelIdList = sendInfo.levelIds.split(',');
            // 每一条数据中的等级id
            var arr = [];
            var levelIdString = '';
            for (var j = 0; j < sendInfo.levelIdList.length; j++) {
              // 将数组中数据转换成int 类型
              arr.push(parseInt(sendInfo.levelIdList[j]));
              console.log('arr中的数据为-------' + arr[j]);
              for (var m = 0; m < sendInfo.levelId.length; m++) {
                console.log('***********==========*****========****', sendInfo.levelId[m]);
                if (arr[j] === sendInfo.levelId[m]) {
                  arr[j] = sendInfo.levelName[m];
                }
              }
//              arr[j] = arr[j] === 1 ? '青铜-A组' : (arr[j] === 2 ? '白银-A组' : '黄金-A组')
              console.log('arr中的数据为****************************' + arr[j]);
              levelIdString += arr[j] + '，';
            };
            console.log('[levelIdList中的数据：]' + JSON.stringify(sendInfo.levelIdList))
            console.log('[arr中的数据：]' + JSON.stringify(arr))
            sendInfo.tableData[i].levelId = levelIdString.substring(0, levelIdString.length - 1);
            //            此处将会员等级列中的所有数据都放在一个集合中
//            for (var k = 0; k < sendInfo.levelIdList.length; k++) {
//              sendInfo.levelIdList2.push(parseInt(sendInfo.levelIdList[k]));
//            }
//            console.log('[levelIdList2中的数据2：]' + JSON.stringify(sendInfo.levelIdList2))
            // ***********会员** 来源 **转换***********************************************
            // 将string类型的会员来源 装换成 list
            sendInfo.memberResources = sendInfo.tableData[i].memberResource;
            console.log('这是memberResources中的数据' + sendInfo.memberResources);
            sendInfo.memberResourceList = sendInfo.memberResources.split(',');
            var arr1 = [];
            var memberResourceString = '';
            for (var k = 0; k < sendInfo.memberResourceList.length; k++) {
              // 将数组中数据转换成int 类型
              arr1.push(parseInt(sendInfo.memberResourceList[k]));
              arr1[k] = arr1[k] === 1001 ? '支付宝' : (arr1[k] === 1002 ? '微信' : (arr1[k] === 1003 ? 'H5' : 'POS'))
              memberResourceString += arr1[k] + '，';
            };
            console.log('[memberResourceList中的数据：]' + JSON.stringify(sendInfo.memberResourceList))
            console.log('[arr1中的数据：]' + JSON.stringify(arr1))
            sendInfo.tableData[i].memberResource = memberResourceString.substring(0, memberResourceString.length - 1);
            // ************* 消费渠道 **转console.log('[arr2中的数据：]' + JSON.stringify(arr2))换*****************************************
            // 将string类型的会员来源 装换成 list
            sendInfo.consumeChannels = sendInfo.tableData[i].consumeChannel;
            console.log('这是consumeChannels中的数据' + sendInfo.consumeChannels);
            sendInfo.consumeChannelList = sendInfo.consumeChannels.split(',');
            var arr2 = [];
            var consumeChannelString = '';
            for (var h = 0; h < sendInfo.consumeChannelList.length; h++) {
              // 将数组中数据转换成int 类型
              arr2.push(parseInt(sendInfo.consumeChannelList[h]));
              arr2[h] = arr2[h] === 5001 ? 'POS' : (arr2[h] === 5002 ? '微信' : '支付宝')
              consumeChannelString += arr2[h] + '，';
            };
            console.log('[consumeChannelList中的数据：]' + JSON.stringify(sendInfo.consumeChannelList))
            console.log('[arr2中的数据：]' + JSON.stringify(arr2))
            sendInfo.tableData[i].consumeChannel = consumeChannelString.substring(0, consumeChannelString.length - 1);
          }
          sendInfo.total = res.data.body.total;
          if (res.data.header.code === '10000') {
            sendInfo.$message({
              type: 'success',
              message: '查询成功'
            })
          } else {
            sendInfo.$message({
              type: 'warning',
              message: '加载超时！'
            })
          }
        })
      },
      selectMemberLevel() { // 查询会员等级
        let sendinfo = this;
        sendinfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/deal/rules/selectRulesLevel',
          data: {
            'body': {
              'merchantId': sendinfo.crmMerchantId
            }
          }
        }).then(function (res) {
          sendinfo.memberLevelInSelect = res.data.body;
          console.log('会员等级参数为==========================================');
          console.log('[memberLevelInSelect中的数据：]' + JSON.stringify(sendinfo.memberLevelInSelect))
          console.log(sendinfo.memberLevelInSelect.length)
          for (var i = 0; i < sendinfo.memberLevelInSelect.length; i++) {
            var id = sendinfo.memberLevelInSelect[i].levelId;
            var name = sendinfo.memberLevelInSelect[i].levelName;
            sendinfo.levelId.push(id);
            sendinfo.levelName.push(name);
            console.log(id);
            console.log(name);
          }
          console.log(sendinfo.levelId);
          console.log(sendinfo.levelName);
        })
      },
      selectTypes() {
        let sendinfo = this;
        sendinfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'prefix': 1800
            }
          }
        }).then(function (res) {
          sendinfo.typesInSelect = res.data.body;
          console.log('参数为' + sendinfo.typesInSelect.toString());
        })
      },
      selectConsumeChannel() {
        let sendinfo = this;
        sendinfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'prefix': 500
            }
          }
        }).then(function (res) {
          sendinfo.consumeChannelInSelect = res.data.body;
          console.log('参数为' + sendinfo.consumeChannelInSelect.toString());
        })
      },
      selectPayWay() {
        let sendinfo = this;
        sendinfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'prefix': 600
            }
          }
        }).then(function (res) {
          sendinfo.payWayInSelect = res.data.body;
          console.log('参数为' + sendinfo.payWayInSelect.toString());
        })
      },
      selectBehavior() {
        let sendinfo = this;
        sendinfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'prefix': 1200
            }
          }
        }).then(function (res) {
          sendinfo.behaviorInSelect = res.data.body;
          console.log('参数为' + sendinfo.behaviorInSelect.toString());
        })
      },
      selectMemberResource() {
        let sendinfo = this;
        sendinfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'prefix': 100
            }
          }
        }).then(function (res) {
          sendinfo.memberSourceInSelect = res.data.body;
          console.log('参数为' + sendinfo.memberSourceInSelect.toString());
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.selectRules();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.selectRules();
      }
    }
  }
</script>

<style>
  body {
    background-color: #F2F6FC;
  }

  .el-table td, .el-table th {
    text-align: center
  }

  /*.crm {*/
    /*position: absolute;*/
    /*left: 17%;*/
    /*top: 8%;*/
  /*}*/
  .el-table th {
    background: #f2f2f2 !important;
    /*font-size: large;*/
  }
</style>

