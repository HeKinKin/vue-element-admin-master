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
            今日入职
          </div>
          <count-to :start-val="0" :end-val="todayNum" :duration="2600" class="card-panel-num" />
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
            在职数
          </div>
          <count-to :start-val="0" :end-val="totalNum" :duration="3000" class="card-panel-num" />
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
            离职数
          </div>
          <count-to :start-val="0" :end-val="totalLeave" :duration="3200" class="card-panel-num" />
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
            调动数
          </div>
          <count-to :start-val="0" :end-val="totalLeave" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>

  <div style="margin-top:10px;margin-left:10px;margin-top: -22px">
    <div style="margin-top: 20px" />
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 78%"
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
        width="100"
      />
      <el-table-column
        prop="staffNumber"
        label="工号"
        width="100"
      />
      <el-table-column
        prop="staffName"
        label="姓名"
        width="100"
      />
      <el-table-column
        prop="staffTel"
        label="手机号"
        width="120"
      />
      <el-table-column
        prop="organizationName"
        label="部门编号"
        width="130"
      />
      <el-table-column
        prop="positionName"
        label="职位"
        width="130"
      />
      <el-table-column
        prop="workingState"
        label="是否在职"
        width="100"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="120"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="update(scope.$index)">调部门</el-button>
          <el-button type="text" size="small" @click="deleteMember(scope.$index)">离职</el-button>
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
        totalNum: 100,
        todayNum: 0,
        totalLeave: 20
      }
    },

    created() {
      this.selectAll()
    },

    components: {
      CountTo
    },
    methods: {
      selectAll() {
        const workThis = this
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
