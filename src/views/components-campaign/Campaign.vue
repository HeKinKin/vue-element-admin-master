<template >
  <div   style="width: 1230px" class="crm">

    <div style="background-color:#FFFFFF;box-shadow: 2px 2px 5px #888888;overflow: hidden; margin-top: 25px;margin-left: 10px">

      <div style="padding-top: 8px;background-color: #f2f2f2">
        <div style="margin-left: 10px">


          <el-form :inline="true"  class="demo-form-inline">
            <el-form-item label="活动名称" size="mini">
              <el-input placeholder="请输入名称" style="width: 150px;" v-model="checkCampaignName" onkeyup="value=value.replace(/[\s+]/g,'')" ></el-input>
            </el-form-item>
            <el-form-item label="活动类型"  size="mini">
              <el-select v-model="campaignType" clearable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :label="item.dictionaryValue"
                  :value="item.dictionaryKey">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动状态"  size="mini">
              <el-select v-model="campaignStatus" clearable placeholder="请选择">
                <el-option
                  v-for="todo in todos"
                  :label="todo.dictionaryValue"
                  :value="todo.dictionaryKey">
                </el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="适用门店" size="mini" label-width="86px">
              <el-select v-model="sizeForm.inputScope" clearable placeholder="适用门店" style="width: 115px" @change="changeStore()">
                <el-option
                  v-for="item in scopesInSelect"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="部分门店" size="mini" v-if="sizeForm.allStores">
              <el-select v-model="sizeForm.inputMerchant" multiple placeholder="请选择门店" >
                <el-option
                  v-for="item in todo1s"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>

            <!--<el-form-item label="适用门店"  size="mini">-->
              <!--<el-select v-model="campaignScope" clearable placeholder="请选择">-->
                <!--<el-option-->
                  <!--v-for="todo1 in todo1s"-->
                  <!--:label="todo1.name"-->
                  <!--:value="todo1.id">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
            <el-button style="margin-left: 20px" type="primary" @click="selectAll"  size="mini">搜索</el-button>
              <!--<el-form-item>-->
                <el-button type="primary" @click="searchInsert" size="mini">新增开卡礼活动</el-button>
            <el-button type="primary" @click="searchInsert1" size="mini">新增升级礼活动</el-button>
              <!--</el-form-item>-->
            <el-button type="primary" @click="deleteAll" size="mini">批量删除</el-button>




            <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
              <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
              <span slot="footer" class="dialog-footer">
                    <el-button @click="delVisible = false">取 消</el-button>
                    <el-button type="primary" @click="deleteAll1" >确 定</el-button>
              </span>
            </el-dialog>

          </el-form>
        </div>
      </div>
    </div>
    <div style="margin-top:10px;margin-left:10px;margin-top: 20px">
      <div style="margin-top: 20px">
      </div>


      <el-dialog title="门店信息" :visible.sync="lookmerchant">
        <span style="font-weight: bold;">适用门店：</span><br><br>
        适用门店：<span v-for="item in lookall">{{ item.merchantName+"." }}</span><br/><br/>
        <div slot="footer" >
          <el-button @click="lookmerchant = false">取 消</el-button>
        </div>
      </el-dialog>


      <el-table
        :data="tableData"
        border
        style="width: 100%"
        size="mini"
        @selection-change="handleSelectionChange"
        v-loading="loading">
        <el-table-column
          type="selection"
          width="35">
        </el-table-column>
        <el-table-column
          fixed
          sortable
          prop="campaignId"
          label="活动ID"
          width="90">
        </el-table-column>
        <el-table-column
          fixed
          prop="campaignName"
          label="活动名称"
          width="140">
        </el-table-column>
        <el-table-column
          prop="campaignType"
          label="活动类型"
          width="120">
          <template slot-scope="scope">
            {{scope.row.campaignType === 1401 ? '新人礼' : scope.row.campaignType === 1402 ? '升级礼': scope.row.campaignType === 1406 ? '青铜升黄金' : scope.row.campaignType === 1407 ? '黄金升白银': '无'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="campaignStartTime"
          label="开始时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="campaignEndTime"
          label="结束时间"
          width="160">
        </el-table-column>
        <el-table-column
          label="门店范围"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="searchMerchant(scope.$index)">{{scopeCampaign}}</el-button>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="scope"-->
          <!--label="门店范围"-->
          <!--width="120">-->
          <!--<template slot-scope="scope">-->
            <!--{{scope.row.scope === 1 ? '所有门店' : scope.row.scope === 2 ? '部分门店': '无'}}-->
          <!--</template>-->
        <!--</el-table-column>-->
        <el-table-column
          prop="campaignStatus"
          label="活动状态"
          width="120">
          <template slot-scope="scope">
            {{scope.row.campaignStatus === 1303 ? '进行中' : scope.row.campaignStatus === 1302 ? '未开始': '已结束'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="campaignCreateTime"
          label="创建时间"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="searchMore(scope.$index)">编辑</el-button>
            <el-button type="text" size="small" @click="details(scope.$index)">查看</el-button>
            <el-button type="text" size="small" @click="stopCampaignInfo(scope.$index)">终止</el-button>
            <el-button type="text" size="small" @click="deleteCampaignInfo(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding-left:600px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes=[5,10,15,20]
          :page-size="pageSize"
          :total="totalCount"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
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
        delVisible: false,
        multipleSelection: [], // 批量删除选择的集合
        delArr: [], // p存放批量删除的Id
        campaignMerchantId: '', // 从cookie中获取的商户id
        scopesInSelect: [
          {
            id: 1,
            name: '不限'
          }, {
            id: 2,
            name: '有限'
          }
        ],
        sizeForm: {
          inputMerchant: [], // 前台读取的传到后台的门店数组
          inputScope: '',
          allStores: false
        },
        couponTemplateName: '',
        couponTemplateType11: [],
        AllrulesType: [],
        lookall: [],
        dialogFormVisible: false,
        lookmerchant: false,
        loading: true,
        tableData: [],
        pageNum: 1,
        pageSize: 10,
        checkCampaignName: '',
        campaignType: '',
        campaignStatus: '',
        campaignScope: '',
        options: [],
        todos: [],
        todo1s: [],
        scopeCampaign: ''
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      deleteAll() {
        let workThis = this;
        console.log('批量删除的id是：' + workThis.multipleSelection);
        if (workThis.multipleSelection.length === 0) {
          workThis.$message({
            type: 'warning',
            message: '请至少勾选一个活动!'
          });
          return false;
        }
        workThis.delVisible = true;
      },
      deleteAll1() {
        let workThis = this;
        const dellength = workThis.multipleSelection.length;
        for (let i = 0; i < dellength; i++) {
          workThis.delArr.push(workThis.multipleSelection[i].campaignId)
        }
        console.log('批量拿到的id是：' + workThis.delArr);
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/campaign/updateStatus', // 终止营销活动api路径
          data: {
            'body': {
              campaignList: workThis.delArr
            }
          }
        }).then(function (res) {
          workThis.delVisible = false;
          workThis.selectAll();
          workThis.$message.success('删除成功');
        })
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
      searchMerchant(index) {
        let workThis = this;
        workThis.lookmerchant = true;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/campaign/selectMerchantName',
          data: {
            'body': {
              'campaignId': workThis.tableData[index].campaignId
            }
          }
        }).then(function (res) {
          workThis.lookall = res.data.body;
        })
      },
      details(index) {
        let workThis = this;
        this.$router.push({
          path: '/campaign/campaignDetails',
          query: {
            id: workThis.tableData[index].campaignId,
            type: workThis.tableData[index].campaignType,
            startTime: workThis.tableData[index].campaignStartTime,
            endTime: workThis.tableData[index].campaignEndTime,
            campaignType: workThis.tableData[index].campaignType,
            rulesCount: workThis.tableData[index].rulesCount,
            rulesParticipation: workThis.tableData[index].rulesParticipation,
            rulesType: workThis.tableData[index].rulesType,
            couponId: workThis.tableData[index].couponId,
            couponTemplateName: workThis.tableData[index].couponTemplateName,
            couponTemplateType: workThis.tableData[index].couponTemplateType
            // imagePath: workThis.tableData[index].imagePath
          }
        });
      },
      selectAll() {
        let workThis = this;
        console.log('传入门店表的商户id:' + workThis.sizeForm.inputMerchant);
        console.log('从cookie中获取的商户id:' + workThis.campaignMerchantId);
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/campaign/get1',
          data: {
            'header': {
              'pageSize': workThis.pageSize,
              'pageNum': workThis.pageNum
            },
            'body': {
              'campaignName': workThis.checkCampaignName,
              'campaignType': workThis.campaignType,
              'campaignStatus': workThis.campaignStatus,
              'merchantList': workThis.sizeForm.inputMerchant,
              'campaignMerchantId': workThis.campaignMerchantId,
              'scope': workThis.sizeForm.inputScope
            }
          }
        }).then(function (res) {
          workThis.loading = true;
          setTimeout(() => {
            workThis.loading = false;
          }, 1000);
          workThis.tableData = res.data.body.list;
          workThis.sizeForm.inputMerchant = [];
          workThis.sizeForm.inputScope = '';
          if (workThis.tableData.length !== 0) {
            if (workThis.tableData[0].scope === 1) {
              workThis.scopeCampaign = '所有门店'
            };
            if (workThis.tableData[0].scope === 2) {
              workThis.scopeCampaign = '适用门店'
            };
          };
          workThis.totalCount = res.data.body.total;
        }).catch(error => {
          console.log('0000000000000000000000000000' + error);
          if (error === null || error === '') {
            return;
          }
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
      searchMore(index) {
        let workThis = this;
        console.log('跳转的活动类型为' + workThis.tableData[index].campaignType)
        if (workThis.tableData[index].campaignType === 1402) {
          this.$router.push({
            path: '/campaign/editUpgrade',
            query: {
              id: workThis.tableData[index].campaignId,
              type: workThis.tableData[index].campaignType,
              startTime: workThis.tableData[index].campaignStartTime,
              endTime: workThis.tableData[index].campaignEndTime,
              campaignType: workThis.tableData[index].campaignType,
              rulesCount: workThis.tableData[index].rulesCount,
              rulesParticipation: workThis.tableData[index].rulesParticipation,
              rulesType: workThis.tableData[index].rulesType,
              couponId: workThis.tableData[index].couponId,
              couponTemplateName: workThis.tableData[index].couponTemplateName,
              couponTemplateType: workThis.tableData[index].couponTemplateType,
              image: workThis.tableData[index].imagePath,
              scope: workThis.tableData[index].scope,
              campaignStatus: workThis.tableData[index].campaignStatus
            }
          })
        } else {
          this.$router.push({
            path: '/campaign/onlyCampaignList',
            query: {
              id: workThis.tableData[index].campaignId,
              type: workThis.tableData[index].campaignType,
              startTime: workThis.tableData[index].campaignStartTime,
              endTime: workThis.tableData[index].campaignEndTime,
              campaignType: workThis.tableData[index].campaignType,
              rulesCount: workThis.tableData[index].rulesCount,
              rulesParticipation: workThis.tableData[index].rulesParticipation,
              rulesType: workThis.tableData[index].rulesType,
              couponId: workThis.tableData[index].couponId,
              couponTemplateName: workThis.tableData[index].couponTemplateName,
              couponTemplateType: workThis.tableData[index].couponTemplateType,
              image: workThis.tableData[index].imagePath,
              scope: workThis.tableData[index].scope
            }
          });
        }
      },
      stopCampaignInfo(index) {
        let workStopCampaiginInfo = this;
        workStopCampaiginInfo.$confirm('确定终止活动吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          workStopCampaiginInfo.$axios({
            method: 'post',
            url: 'http://localhost:61116/campaign/updateStatus', // 终止营销活动api路径
            data: {
              'body': {
                'id': workStopCampaiginInfo.tableData[index].campaignId
              }
            }
          }).then(function (res) {
            workStopCampaiginInfo.selectAll();
            workStopCampaiginInfo.$message.success('终止成功');
          })
        }).catch(() => {
          workStopCampaiginInfo.$message({
            type: 'info',
            message: '取消终止'
          })
        })
      },
      deleteCampaignInfo(index) {
        let workDeleteCampaignInfo = this;
        workDeleteCampaignInfo.$confirm('确定删除活动吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          workDeleteCampaignInfo.$axios({
            method: 'post',
            url: 'http://localhost:61116/campaign/deleteCampaign', // 删除营销活动api路径
            data: {
              'body': {
                'id': workDeleteCampaignInfo.tableData[index].campaignId
              }
            }
          }).then(function (res) {
            workDeleteCampaignInfo.$message.success('删除成功');
            workDeleteCampaignInfo.selectAll();
          })
        }).catch(() => {
          workDeleteCampaignInfo.$message({
            type: 'info',
            message: '取消删除'
          })
        })
      },
      searchInsert() {
        this.$router.push({
          path: '/campaign/addCampaign'
        });
      },
      searchInsert1() {
        this.$router.push({
          path: '/campaign/addUpgradeCampaign'
        });
      },
      handleSizeChange(val) {
        let workThis = this;
        workThis.pageSize = val;
        workThis.selectAll();
      },
      handleCurrentChange(val) {
        let workThis = this;
        workThis.pageNum = val;
        workThis.selectAll();
      },
      handleClick(row) {
        console.log(row);
      },
      searchCampaignType() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'prefix': 1400
            }
          }
        }).then(function (res) {
          workThis.options = res.data.body;
        })
      },
      searchCampaignTai() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'prefix': 1300
            }
          }
        }).then(function (res) {
          workThis.todos = res.data.body;
        })
      },
      changeMerchant() {
        let workThis = this;
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/member/queryMerchant',
          data: {
            'body': {
              'parentId': workThis.campaignMerchantId
            }
          }
        }).then(function (res) {
          workThis.todo1s = res.data.body;
        })
      },
      getCookieDetails() {
        let workThis = this;
        workThis.campaignMerchantId = getCookie('merchantId')
      }
    },
    created() {
      this.getCookieDetails();
      setTimeout(() => {
        this.selectAll();
        this.searchCampaignType();
        this.searchCampaignTai();
        this.changeMerchant();
      }, 1111)
    }
  };
</script>


<style scoped>
  /*.crm {*/
    /*position: absolute;*/
    /*left: 17%;*/
    /*top: 10%;*/
  /*}*/

</style>
