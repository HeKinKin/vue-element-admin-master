<template>
  <div style="width: 1230px" class="crm">
    <div style="background-color:#FFFFFF;box-shadow: 2px 2px 5px #888888;overflow: hidden; margin-top: 25px;margin-left: 10px">

      <div style="padding-top: 8px;background-color: #f2f2f2">
        <div style="margin-left: 10px">
            <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="姓名">
              <el-input
                v-model="staffName"
                placeholder="请输入姓名"
                clearable
                size="mini"
              />
            </el-form-item>
            <el-form-item label="员工工号">
              <el-input
                v-model.trim="staffNumber"
                placeholder="请输入工号"
                clearable
                size="mini"
              />
            </el-form-item>

            <span style="margin-left: 250px">
              <el-form-item>
                <el-button type="primary" size="mini" @click="selectAll">查询</el-button>
              </el-form-item>
            </span>
          </el-form>
        </div>
      </div>
    </div>

    <el-dialog title="修改合同" :visible.sync="bianji">
        <el-form ref="form" :model="form" size="mini">
          <el-form-item label="合同名称:">
            <el-input
              v-model="contract.contractName"
              clearable
            />
          </el-form-item>
          <el-form-item label="合同内容:">
            <el-input
              v-model="contract.contractContext"
              clearable
            />
          </el-form-item>
          <el-form-item label="签订时间"   prop="date1"
          >
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择开始日期"
                              v-model="contract.startTime"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              :picker-options="pickerOptions0"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="到期时间"  prop="date1"
          >
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择开始日期"
                              v-model="contract.dueTime"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              :picker-options="pickerOptions0"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="基本工资">
            <el-input
              v-model="contract.basicMoney"
              clearable
            />
          </el-form-item>
          <el-form-item label="饭补">
            <el-input
              v-model="contract.basicMoney1"
              clearable
            />
          </el-form-item>
          <el-form-item label="奖金">
            <el-input
              v-model="contract.bonus"
              clearable
            />
          </el-form-item>
          <el-form-item label="交通补助">
            <el-input
              v-model="contract.traffic"
              clearable
            />
          </el-form-item>

        </el-form>

      <div>
        <el-button @click="bianji = false">取 消</el-button>
        <el-button type="primary" @click="updateContract()">确 定</el-button>
      </div>
    </el-dialog>

    <div style="margin-left: 20px;margin-top: 10px">
      <el-form >
        <el-form-item>
          <el-button type="primary" size="mini" @click="append">新增合同</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="新增合同" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" size="mini">
          <el-form-item label="员工">
            <el-select
              v-model="contract.oId"
              placeholder="请选择"
              clearable
              size="mini"
              @change="getStaff()"
            >
              <el-option
                v-for="item in staffList"
                :label="item.staffName"
                :value="item.oId"></el-option>
              <el-option style="width: auto" :disabled="true" :value="null">
                <span>无</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合同名称:">
            <el-input
              v-model="contract.contractName"
              clearable
            />
          </el-form-item>
          <el-form-item label="合同内容:">
            <el-input
              v-model="contract.contractContext"
              clearable
            />
          </el-form-item>
          <el-form-item label="签订时间"   prop="date1"
          >
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择开始日期"
                              v-model="contract.startTime"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              :picker-options="pickerOptions0"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="到期时间"  prop="date1"
          >
            <el-col :span="11">
              <el-date-picker type="date"
                              placeholder="选择开始日期"
                              v-model="contract.dueTime"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              :picker-options="pickerOptions0"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="基本工资">
            <el-input
              v-model="contract.basicMoney"
              clearable
            />
          </el-form-item>
          <el-form-item label="饭补">
            <el-input
              v-model="contract.basicMoney1"
              clearable
            />
          </el-form-item>
          <el-form-item label="奖金">
            <el-input
              v-model="contract.bonus"
              clearable
            />
          </el-form-item>
          <el-form-item label="交通补助">
            <el-input
              v-model="contract.traffic"
              clearable
            />
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="insertFalse">取 消</el-button>
          <el-button type="primary" @click="insert">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div style="margin-top:10px;margin-left:10px;margin-top: 20px">
      <div style="margin-top: 20px" />
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 100%"
        size="mini"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="50"
        />
        <el-table-column
          prop="staffId"
          label="工号工号"
          width="150"
        />
        <el-table-column
          prop="staffName"
          label="员工姓名"
          width="150"
        />
        <el-table-column
          prop="contractName"
          label="合同名称"
          width="150"
        />
        <el-table-column
          prop="context"
          label="合同内容"
          width="150"
        />
        <el-table-column
          prop="basicMoney"
          label="基本工资"
          width="150"
        />
        <el-table-column
          prop="insurance"
          label="保险"
          width="150"
        />
        <el-table-column
          prop="accumulation"
          label="公积金"
          width="150"
        />
        <el-table-column
          prop="food"
          label="饭补"
          width="150"
        />
        <el-table-column
          prop="bonus"
          label="礼包"
          width="150"
        />
        <el-table-column
          prop="traffic"
          label="交通补贴"
          width="150"
        />
        <el-table-column
          prop="contractTime"
          label="签订时间"
          width="150"
        />
        <el-table-column
          prop="dueTime"
          label="到期时间"
          width="150"
        >
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="140"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="update(scope.$index)">修改</el-button>
            <el-button type="text" size="small" @click="deleteMember(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding-left:600px">
        <el-pagination
          :current-page="pageNum"
          :page-sizes="[5,10,15,20]"
          :page-size="pageSize"
          :total="totalCount"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
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

  export default {
    data() {
      return {
        tableData: [{
          status: ''
        }],
        totalCount: '',
        pageNum: 1,
        pageSize: 10,
        staffTel: null,
        staffName: '',
        staffNumber: null,
        organizationOId: '',
        positionOId: '',
        positionList:[{
          oId: '',
          name: ''
        }
        ],
        organizationList:[{
          oId: '',
          name: ''
        }],
        dialogFormVisible: false,
        form: {
          departmentName: '',
          departmentId: ''
        },
        contract: {
          name: '',
          foodMoney: 0,
          basicMoney1: 0,
          basicMoney: 0,
          contractName: '',
          contractContext: '',
          Id: '',
          startTime: '',
          dueTime: '',
          traffic: 0,
          bonus: 0,
          staffOId: ''
        },
        staffList:[{
          oId: '',
          staffName: ''
        }],
        bianji: false
      }
    },
    created() {
      this.getStaff();
      this.selectAll();
    },
    methods: {

      update(index) {
        const workThis = this
        workThis.bianji = true
        workThis.contract.basicMoney1 = workThis.tableData[index].food
        workThis.contract.basicMoney = workThis.tableData[index].basicMoney
        workThis.contract.contractName = workThis.tableData[index].contractName
        workThis.contract.contractContext = workThis.tableData[index].context
        workThis.contract.traffic = workThis.tableData[index].traffic
        workThis.contract.bonus = workThis.tableData[index].bonus
        workThis.contract.startTime = workThis.tableData[index].startTime
        workThis.contract.dueTime = workThis.tableData[index].dueTime
        workThis.contract.Id = workThis.tableData[index].staffId
        workThis.contract.staffOId = workThis.tableData[index].staffOId
      },

      selectAll() {
        const workThis = this
        workThis.$axios({
          method: 'post',
          url: 'api/consumer/getContract',
          data: {
            'pageNumber': workThis.pageNum,
            'pageSize' : workThis.pageSize,
            'Id': workThis.staffNumber,
            'name':workThis.staffName
          }
        }).then(function(res) {
          workThis.tableData = res.data.data.list
          workThis.totalCount = res.data.data.total
        })
      },
      updateContract() {
        const workThis = this
        workThis.$axios({
          method: 'post',
          url: 'api/consumer/updateContract',
          data: {
            'staffOId': workThis.contract.staffOId,
            'name': workThis.contract.contractName,
            'context':workThis.contract.contractContext,
            'contractTime':workThis.contract.startTime,
            'dueTime':workThis.contract.dueTime,
            'basicMoney':workThis.contract.basicMoney,
            'basicMoney1':workThis.contract.basicMoney1,
            'bonus':workThis.contract.bonus,
            'traffic':workThis.contract.traffic
          }
        }).then(function(res) {
          workThis.bianji = false;
          workThis.$message({
            type: 'success',
            message: '更新成功！！'
          });
        })
      },
      insert() {
        const workThis = this
        workThis.$axios({
          method: 'post',
          url: 'api/consumer/insertContract',
          data: {
            'staffOId':workThis.contract.oId,
            'name': workThis.contract.contractName,
            'context':workThis.contract.contractContext,
            'contractTime':workThis.contract.startTime,
            'dueTime':workThis.contract.dueTime,
            'basicMoney':workThis.contract.basicMoney,
            'basicMoney1':workThis.contract.basicMoney1,
            'bonus':workThis.contract.bonus,
            'traffic':workThis.contract.traffic
          }
        }).then(function(res) {
          workThis.bianji = false;
          workThis.$message({
            type: 'success',
            message: '新增成功！！'
          });
        })
      },
      append() {
        this.dialogFormVisible = true
      },
      insertFalse(){
        this.dialogFormVisible = false
      },

      handleSizeChange(val) {
        const workThis = this
        workThis.pageSize = val
        workThis.selectAll()
      },
      handleCurrentChange(val) {
        const workThis = this
        workThis.pageNum = val
        workThis.selectAll()
      },
      getPositions() {
        const workThis = this
        workThis.$axios({
          method: 'post',
          url: 'api/consumer/getPosition',
          data: {
          }
        }).then(function(res) {
          workThis.positionList = res.data.data.list
        })
      },
      getStaff() {
        const workThis = this
        workThis.$axios({
          method: 'post',
          url: 'api/consumer/getStaff',
          data: {
          }
        }).then(function(res) {
          workThis.staffList = res.data.data
        })
      }
    }
  }
</script>

<style scoped>
  .el-table th {
    background: #f2f2f2 !important;
    font-size: large;
  }


</style>
