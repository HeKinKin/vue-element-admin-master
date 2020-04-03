<template>
  <div>
    <div style="margin-top: 50px">
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
          <el-form-item label="基本工资">
            <el-input
              v-model="contract.basicMoney"
              clearable
            />
          </el-form-item>
          <el-form-item label="饭补">
            <el-input
              v-model="contract.food"
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

    </div>

    <el-form>
      <el-form-item>
        <el-button type="primary" size="mini" @click="importExcel">工资模板导出</el-button>
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
          width="80"
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
          prop="realMoney"
          label="总薪资"
          width="200"
        />
        <el-table-column
          prop="basicMoney"
          label="基本工资"
          width="200"
        />
        <el-table-column
          prop="food"
          label="饭补"
          width="200"
        />
        <el-table-column
          prop="bonus"
          label="奖金"
          width="200"
        />
        <el-table-column
          prop="traffic"
          label="交通补助"
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
        food: 0,
        basicMoney: 0,
        traffic: 0,
        bonus: 0,
        oIdoId: ''
      },
      staffName: '',
      staffNumber: null,
      importFileUrl: 'api/consumer/filesUpload',
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
      indexResult: {
        'bonus': 0,
        'totalMoney': 0,
        'currentMoney': 0,
        'totalNeed': 0
      },
      formMess: {
        file: ''
      },
      bianji: false
    }
  },

  created() {
    this.selectAll(),
    this.selectIndex()
  },
  methods: {
    updateContract() {
      const workThis = this
      workThis.$axios({
        method: 'post',
        url: 'api/consumer/updateMoneySetting',
        data: {
          'basicMoney': Number(workThis.contract.basicMoney),
          'food': Number(workThis.contract.food),
          'bonus': Number(workThis.contract.bonus),
          'traffic': Number(workThis.contract.traffic),
          'oId': workThis.contract.oIdoId
        }
      }).then(function(res) {
        workThis.bianji = false
        workThis.selectAll()
        workThis.selectIndex()
        workThis.$message({
          type: 'success',
          message: '更新成功！！'
        })
      })
    },
    update(index) {
      const workThis = this
      workThis.contract.food = workThis.tableData[index].food
      workThis.contract.basicMoney = workThis.tableData[index].basicMoney
      workThis.contract.traffic = workThis.tableData[index].traffic
      workThis.contract.bonus = workThis.tableData[index].bonus
      workThis.contract.oIdoId = workThis.tableData[index].oId
      workThis.bianji = true
    },
    // 上传成功后的回调
    uploadSuccess(response, file, fileList) {
      console.log('上传文件', response.header.code)
      if (response.header.code === '11111') {
        this.$message({
          type: 'warning',
          message: response.header.message
        })
      }
      if (response.header.code === '10000') {
        this.$message({
          type: 'success',
          message: response.header.message
        })
        this.dialogFormVisible1 = false
        this.selectAll()
      }
      // this.$message({
      //   type: 'success',
      //   message: '上传成功！!'
      // });
    },
    // 上传错误
    uploadError(response, file, fileList) {
      console.log('上传失败，请重试！', response)
      this.$message({
        type: 'warning',
        message: '上传失败，请重试!'
      })
    },
    beforeAvatarUpload(file) {
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      const extension3 = file.name.split('.')[1] === 'doc'
      const extension4 = file.name.split('.')[1] === 'docx'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2 && !extension3 && !extension4) {
        console.log('上传模板只能是 xls、xlsx、doc、docx 格式!')
        this.$message({
          type: 'warning',
          message: '上传模板只能是 xls、xlsx、doc、docx 格式!!'
        })
      }
      if (!isLt2M) {
        console.log('上传模板大小不能超过 10MB!')
        this.$message({
          type: 'warning',
          message: '上传模板大小不能超过 10MB!'
        })
      }
      return extension || extension2 || extension3 || extension4 && isLt2M
    },
    insertfalse1() {
      const workThis = this
      workThis.dialogFormVisible1 = false
    },
    importExcel() {
      const workThis = this
      workThis.$axios({
        method: 'GET',
        url: 'api/consumer/downloadMoneySettingForExcel',
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
        link.setAttribute('download', 'salaryTemplate' + '.xlsx')
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
    selectAll() {
      const workThis = this
      workThis.$axios({
        method: 'post',
        url: 'api/consumer/getMoneySetting',
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
    selectIndex() {
      const workThis = this
      workThis.$axios({
        method: 'post',
        url: 'api/consumer/getMoneyIndex',
        data: {
        }
      }).then(function(res) {
        workThis.indexResult = res.data.data
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
