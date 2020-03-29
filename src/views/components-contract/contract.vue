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

            <span style="margin-left: 250px">
              <el-form-item>
                <el-button type="primary" size="mini" @click="selectAll">查询</el-button>
              </el-form-item>
            </span>
          </el-form>
        </div>
      </div>
    </div>
    <div style="margin-left: 20px;margin-top: 10px">
      <el-form >
        <el-form-item>
          <el-button type="primary" size="mini" @click="append">新增合同</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="新增合同" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" size="mini">
          <el-form-item label="员工工号:">
            <el-input
              v-model="form.departmentName"
              clearable
            />
          </el-form-item>
          <el-form-item label="所在部门:">
            <el-input
              v-model="form.departmentName"
              clearable
            />
          </el-form-item>
          <el-form-item label="合同名称:">
            <el-input
              v-model="form.departmentName"
              clearable
            />
          </el-form-item>
          <el-form-item label="合同内容:">
            <el-input
              v-model="form.departmentName"
              clearable
            />
          </el-form-item>
          <el-form-item label="签订时间">
            <el-input
              v-model="form.departmentName"
              clearable
            />
          </el-form-item>
          <el-form-item label="到期时间">
            <el-input
              v-model="form.departmentName"
              clearable
            />
          </el-form-item>
          <el-form-item label="基本工资">
            <el-input
              v-model="form.departmentName"
              clearable
            />
          </el-form-item>
          <el-form-item label="公基金比例">
            <el-input
              v-model="form.departmentName"
              clearable
            />
          </el-form-item>
          <el-form-item label="饭补">
            <el-input
              v-model="form.departmentName"
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
          fixed
          prop="staffId"
          label="ID"
          width="150"
        />
        <el-table-column
          prop="staffNumber"
          label="工号工号"
          width="150"
        />
        <el-table-column
          prop="staffName"
          label="员工姓名"
          width="150"
        />
        <el-table-column
          prop="staffTel"
          label="合同名称"
          width="150"
        />
        <el-table-column
          prop="organizationName"
          label="合同内容"
          width="150"
        />
        <el-table-column
          prop="positionName"
          label="签订时间"
          width="150"
        />
        <el-table-column
          prop="workingState"
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
            <el-button type="text" size="small" @click="searchMore(scope.$index)">修改</el-button>
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
      }
    },
    created() {
      this.selectAll(),
        this.getPositions();
      this.getOrganization();
    },
    methods: {
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
