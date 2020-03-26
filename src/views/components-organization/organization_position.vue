<template>
  <div style="width: 1230px" class="crm">

    <div style="margin-top:10px;margin-left:10px;margin-top: 20px">
      <div style="margin-top: 20px" />
      <el-table
        v-loading="loading"
        :data="tableData"
        border
        style="width: 50%"
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
          label="职位ID"
          width="200"
        />
        <el-table-column
          fixed
          prop="name"
          label="职位名称"
          width="100"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="140"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="update(scope.$index)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteMember(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="padding-left:35px">
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
  import Vue from 'vue'
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-chalk/index.css'
  import vuerouter from 'vue-router'
  Vue.use(vuerouter)
  Vue.use(ElementUI)

  import axios from 'axios'
  Vue.prototype.$axios = axios

  export default {
    data() {
      return {
        totalCount: '',
        pageNum: 1,
        pageSize: 10,
        tableData:[]
      }
    },
    created() {
      this.selectAll()
    },
    methods: {
      selectAll() {
        const workThis = this
        workThis.$axios({
          method: 'post',
          url: 'api/consumer/getPosition',
          data: {
            'pageNumber': workThis.pageNum,
            'pageSize' : workThis.pageSize,
          }
        }).then(function(res) {
          workThis.tableData = res.data.data.list
          workThis.totalCount = res.data.data.total
        })
      },
      deleteMember(index) {
        const workThis = this
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          workThis.$axios({
            method: 'post',
            url: 'api/consumer/deletePosition',
            data: {
                'oId': workThis.tableData[index].oId
            }
          }).then(function(res) {
            workThis.selectAll()
            workThis.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        }).catch(() => {
          workThis.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
