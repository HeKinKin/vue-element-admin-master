<template>
  <div>
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <svg-icon icon-class="peoples" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              当月迟到
            </div>
            <count-to :start-val="0" :end-val="indexResult.lateDayNum" :duration="2600" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-icon-wrapper icon-message">
            <svg-icon icon-class="message" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              当月早退
            </div>
            <count-to :start-val="0" :end-val="indexResult.lateEarlyDayNum" :duration="3000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <svg-icon icon-class="money" class-name="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              当月请假
            </div>
            <count-to :start-val="0" :end-val="indexResult.leaveDayNum" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="批量导入当月考勤信息" :visible.sync="dialogFormVisible1">
      <el-upload
        class="upload-demo"
        drag
        :action="importFileUrl"
        :auto-upload="true"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :multiple="true"
        :limit="1"
        :before-upload="beforeAvatarUpload"
        accept=".xlsx,.xls"
      >
        <i class="el-icon-upload" />
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div slot="tip" class="el-upload__tip">只能上传xlsx或xls文件</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="insertfalse1">返回</el-button>
      </div>
    </el-dialog>

    <div style="">
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

          <span style="margin-left: 50px">
            <el-form-item>
              <el-button type="primary" size="mini" @click="selectAll">查询</el-button>
            </el-form-item>
          </span>
        </el-form>
      </div>
      <el-dialog title="修改合同" :visible.sync="bianji">
        <el-form ref="form" :model="form" size="mini">
          <el-form-item label="正常天数">
            <el-input
              v-model="contract.finishDay"
              clearable
            />
          </el-form-item>
          <el-form-item label="迟到天数">
            <el-input
              v-model="contract.lateDay"
              clearable
            />
          </el-form-item>
          <el-form-item label="早退天数">
            <el-input
              v-model="contract.lateEarlyDay"
              clearable
            />
          </el-form-item>
          <el-form-item label="请假天数">
            <el-input
              v-model="contract.leaveDay"
              clearable
            />
          </el-form-item>

        </el-form>

        <div>
          <el-button @click="bianji = false">取 消</el-button>
          <el-button type="primary" @click="updateContract()">确 定</el-button>
        </div>
      </el-dialog>

    </div>

    <el-form>
      <el-form-item>
        <el-button type="primary" size="mini" @click="downloadExcel">考勤模板下载</el-button>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item>
        <el-button type="primary" size="mini" @click="importExcel">批量导入当月考勤信息</el-button>
      </el-form-item>
    </el-form>
    <div style="margin-top:10px;margin-left:10px;margin-top: 22px">
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
          prop="oId"
          label="主键"
          width="250"
        />
        <el-table-column
          prop="staffId"
          label="工号"
          width="200"
        />
        <el-table-column
          prop="staffName"
          label="姓名"
          width="200"
        />
        <el-table-column
          prop="monthMessage"
          label="月份"
          width="200"
        />
        <el-table-column
          prop="finishDay"
          label="正常天数"
          width="200"
        />
        <el-table-column
          prop="lateDay"
          label="迟到天数"
          width="200"
        />
        <el-table-column
          prop="lateEarlyDay"
          label="早退天数"
          width="200"
        />

        <el-table-column
          prop="leaveDay"
          label="请假天数"
          width="200"
        />
        <el-table-column
          label="操作"
          width="200"
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
import CountTo from 'vue-count-to'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import vuerouter from 'vue-router'
Vue.use(vuerouter)
Vue.prototype.$axios = axios
Vue.use(ElementUI)

export default {

  components: {
    CountTo
  },
  data() {
    return {
      contract: {
        finishDay: 0,
        lateDay: 0,
        lateEarlyDay: 0,
        leaveDay: 0,
        oId: ''
      },
      importFileUrl: 'api/consumer/uploadCheckWork',
      tableData: [{
        status: ''
      }],
      totalCount: '',
      pageNum: 1,
      pageSize: 10,
      totalNum: 100,
      todayNum: 0,
      totalLeave: 20,
      dialogFormVisible1: false,
      staffName: '',
      staffNumber: null,
      bianji: false,
      indexResult: {
        'lateDayNum': 0,
        'lateEarlyDayNum': 0,
        'leaveDayNum': 0
      }
    }
  },

  created() {
    this.selectAll(),
    this.selectIndex()
  },
  methods: {
    downloadExcel() {
      const workThis = this
      workThis.$axios({
        method: 'GET',
        url: 'api/consumer/downloadCheckWorkForExcel',
        data: {
        },
        responseType: 'blob'
      }).then((res) => {
        console.log(res)
        const link = document.createElement('a')
        const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        let num = ''
        for (let i = 0; i < 10; i++) {
          num += Math.ceil(Math.random() * 10)
        }
        link.setAttribute('download', 'AttendanceTemplate' + '.xlsx')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }).catch(error => {
        this.$Notice.error({
          title: '错误',
          desc: '网络连接错误'
        })
        console.log(error)
      })
    },
    selectIndex() {
      const workThis = this
      workThis.$axios({
        method: 'post',
        url: 'api/consumer/getCheckWorkNum',
        data: {
        }
      }).then(function(res) {
        workThis.indexResult = res.data.data
      })
    },
    updateContract() {
      const workThis = this
      workThis.$axios({
        method: 'post',
        url: 'api/consumer/updateCheckWork',
        data: {
          'finishDay': Number(workThis.contract.finishDay),
          'lateDay': Number(workThis.contract.lateDay),
          'lateEarlyDay': Number(workThis.contract.lateEarlyDay),
          'leaveDay': Number(workThis.contract.leaveDay),
          'oId': workThis.contract.oId
        }
      }).then(function(res) {
        workThis.bianji = false
        workThis.selectAll(),
        workThis.this.selectIndex(),
        workThis.$message({
          type: 'success',
          message: '更新成功！！'
        })
      })
    },
    update(index) {
      const workThis = this
      workThis.bianji = true
      workThis.contract.finishDay = workThis.tableData[index].finishDay
      workThis.contract.lateDay = workThis.tableData[index].lateDay
      workThis.contract.lateEarlyDay = workThis.tableData[index].lateEarlyDay
      workThis.contract.leaveDay = workThis.tableData[index].leaveDay
      workThis.contract.oId = workThis.tableData[index].oId
    },
    insertfalse1() {
      const workThis = this
      workThis.dialogFormVisible1 = false
    },
    importExcel() {
      const workThis = this
      workThis.dialogFormVisible1 = true
    },
    selectAll() {
      const workThis = this
      workThis.$axios({
        method: 'post',
        url: 'api/consumer/getCheckWork',
        data: {
          'pageNumber': workThis.pageNum,
          'pageSize': workThis.pageSize,
          'Id': workThis.staffId,
          'name': workThis.staffName
        }
      }).then(function(res) {
        workThis.tableData = res.data.data.list
        workThis.totalCount = res.data.data.total
      })
    },
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-table th {
    background: #f2f2f2 !important;
    font-size: large;
  }
  .panel-group {
    margin-top: 18px;
    .card-panel-col{
      margin-bottom: 32px;
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shopping {
          background: #34bfa3
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shopping {
        color: #34bfa3
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
</style>
