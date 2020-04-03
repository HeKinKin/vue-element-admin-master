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
              当月应发薪资
            </div>
            <count-to :start-val="0" :end-val="indexResult.currentMoney" :duration="2600" class="card-panel-num" />
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
              总发放薪资
            </div>
            <count-to :start-val="0" :end-val="indexResult.totalMoney" :duration="3000" class="card-panel-num" />
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
              当月奖金发放
            </div>
            <count-to :start-val="0" :end-val="indexResult.bonus" :duration="3200" class="card-panel-num" />
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
              当月补贴发放
            </div>
            <count-to :start-val="0" :end-val="indexResult.totalNeed" :duration="3200" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>

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
    </div>

    <el-form>
      <el-form-item>
        <el-button type="primary" size="mini" @click="importExcel">批量导入当月工资</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="批量导入当月工资" :visible.sync="dialogFormVisible1">
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
          width="30"
        />
        <el-table-column
          prop="staffId"
          label="工号"
          width="150"
        />
        <el-table-column
          prop="staffName"
          label="姓名"
          width="150"
        />
        <el-table-column
          prop="month"
          label="日期"
          width="150"
        />
        <el-table-column
          prop="basicMoney"
          label="基本工资"
          width="150"
        />
        <el-table-column
          prop="insurance"
          label="五险"
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
          label="奖金"
          width="150"
        />
        <el-table-column
          prop="traffic"
          label="交通补助"
          width="200"
        />
        <el-table-column
          prop="realMoney"
          label="实发工资"
          width="200"
        />
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
      }
    }
  },

  created() {
    this.selectAll(),
    this.selectIndex()
  },
  methods: {
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
      workThis.dialogFormVisible1 = true
    },
    selectAll() {
      const workThis = this
      workThis.$axios({
        method: 'post',
        url: 'api/consumer/getMoney',
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
