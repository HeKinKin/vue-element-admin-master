<template>
  <div style="width: 1230px" class="crm">
    <div style="background-color:#FFFFFF;box-shadow: 2px 2px 5px #888888;overflow: hidden; margin-top: 25px;margin-left: 10px">

      <div style="padding-top: 8px;background-color: #f2f2f2">
        <div style="margin-left: 10px">

          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="手机号">
              <el-input
                v-model.trim="staffTel"
                placeholder="请输入手机号"
                clearable
                onkeyup="value=value.replace(/[\s+]/g,'')"
                size="mini"
              />
            </el-form-item>
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
          </el-form>

          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="职位">
              <el-select
                v-model="positionOId"
                placeholder="请选择"
                clearable
                size="mini"
                @change="getPositions()"
              >
                <el-option
                  v-for="item in positionList"
                  :label="item.name"
                  :value="item.oId"></el-option>
                <el-option style="width: auto" :disabled="true" :value="null">
                  <span>无</span>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="部门">
              <el-select
                v-model="organizationOId"
                placeholder="请选择"
                clearable
                size="mini"
                @change="getOrganization()"
              >
                <el-option
                  v-for="item in organizationList"
                  :label="item.name"
                  :value="item.oId"></el-option>
                <el-option style="width: auto" :disabled="true" :value="null">
                  <span>无</span>
                </el-option>
              </el-select>
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

    <el-dialog title="员工信息编辑" :visible.sync="bianji">
      <el-form
        ref="form"
        :model="form"
      >
        <el-form-item label="员工ID" prop="mobile">
          <el-input v-model="form.staffNumber" :disabled="true" />
        </el-form-item>
        <el-form-item label="会员手机号" prop="cardNo">
          <el-input v-model="form.staffTel"   />
        </el-form-item>
        <el-form-item label="会员姓名" prop="levelName">
          <el-input v-model="form.staffName"   />
        </el-form-item>
        <el-form-item label="入职时间" prop="createTime">
          <el-input v-model="form.organizationName" auto-complete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="部门" prop="growthValue">
          <el-input v-model="form.positionName" auto-complete="off" :disabled="true" />
        </el-form-item>
        <el-form-item label="在职状况" prop="integralBalance">
          <el-input v-model="form.status" auto-complete="off" :disabled="true" />
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="bianji = false">取 消</el-button>
        <el-button type="primary" @click="update1()">确 定</el-button>
      </div>
    </el-dialog>

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
          fixed
          prop="oId"
          label="OID"
          width="240"
        />
        <el-table-column
          prop="staffNumber"
          label="工号"
          width="110"
        />
        <el-table-column
          prop="staffName"
          label="姓名"
          width="110"
        />
        <el-table-column
          prop="staffTel"
          label="手机号"
          width="110"
        />
        <el-table-column
          prop="organizationName"
          label="部门编号"
          width="110"
        />
        <el-table-column
          prop="positionName"
          label="职位"
          width="110"
        />
        <el-table-column
          prop="status"
          label="是否在职"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="graduatedSchool"
          label="毕业院校"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="110"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="look(scope.$index)">查看</el-button>
            <el-button type="text" size="small" @click="update(scope.$index)">编辑</el-button>
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
        bianji: false,
        form: {
          oId: '',
          staffNumber: '',
          staffName: '',
          staffTel: '',
          organizationName: '',
          positionName: '',
          status: ''
        },
      }
    },
    created() {
        this.selectAll(),
          this.getPositions();
       this.getOrganization();
    },
    methods: {
      look(index){
        let workThis = this;
        this.$router.push({
          path: '/staff/staff_message',
          query: {
            oid: workThis.tableData[index].oId,
          }
        });

      },
      selectAll() {
        const workThis = this
        // console.log('从cookie中获取的商户Id是：' + workThis.merchantId)
        console.log('进入了查询方法')
        workThis.$axios({
          method: 'post',
          url: 'api/consumer/getStaffList',
          data: {

              'pageNumber': workThis.pageNum,
              'pageSize' : workThis.pageSize,
              'staffTel': workThis.staffTel,
            'organizationOId': workThis.organizationOId,
            'positionOId': workThis.positionOId,
            'staffName': workThis.staffName,
            'staffNumber': workThis.staffNumber,


          }
        }).then(function(res) {
          workThis.tableData = res.data.data.list
          workThis.totalCount = res.data.data.total
        })
      },
      update(index) {
        const workThis = this
        workThis.bianji = true
        workThis.form.staffId = workThis.tableData[index].staffId
        workThis.form.staffNumber = workThis.tableData[index].staffNumber
        workThis.form.staffName = workThis.tableData[index].staffName
        workThis.form.staffTel = workThis.tableData[index].staffTel
        workThis.form.organizationName = workThis.tableData[index].organizationName
        workThis.form.positionName = workThis.tableData[index].positionName
        workThis.form.workingState = workThis.tableData[index].workingState
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
      getOrganization() {
        const workThis = this
        workThis.$axios({
          method: 'post',
          url: 'api/consumer/getDepartment',
          data: {
          }
        }).then(function(res) {
          workThis.organizationList = res.data.data.list
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
