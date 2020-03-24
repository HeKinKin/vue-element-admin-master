<template>
  <div style="width: 1230px" class="crm">
    <div style="background-color:#FFFFFF;box-shadow: 2px 2px 5px #888888;overflow: hidden; margin-top: 25px;margin-left: 10px">

      <div style="padding-top: 8px;background-color: #f2f2f2">
        <div style="margin-left: 10px">

          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="手机号">
              <el-input
                v-model.trim="getPhone"
                placeholder="请输入手机号"
                clearable
                onkeyup="value=value.replace(/[\s+]/g,'')"
                size="mini"
              />
            </el-form-item>
            <el-form-item label="会员等级">
              <el-select v-model="sizeForm.inputLevel" clearable placeholder="请输入等级" size="mini">
                <el-option
                  v-for="item in allLevelSelect"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="会员来源">
              <el-select
                v-model="sizeForm.inputStores"
                placeholder="请选择"
                clearable
                size="mini"
                @change="changeStores()"
              >
                <el-option
                  v-for="item in allStoresInSelect"
                  :label="item.dictionaryValue"
                  :value="item.dictionaryKey"></el-option>
                <el-option style="width: auto" :disabled="true" :value="null">
                  <span>无</span>
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="门店" size="mini">
              <el-select v-model="sizeForm.inputMerchant" clearable placeholder="请选择店" @change="changeMerchant()">
                <el-option
                  v-for="item in allMerchantSelect"
                  :label="item.name"
                  :value="item.name"
                />
                <el-option style="width: auto" :disabled="true" :value="null">
                  <span>无</span>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="开卡日期" size="mini">
              <el-date-picker
                v-model="value3"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
              />
            </el-form-item>
            <span style="margin-left: 250px">
              <el-form-item>
                <el-button type="primary" size="mini" @click="selectAll">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="deletinsert">新增</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" size="mini" @click="importExcel">批量导入</el-button>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" type="success" @click="exportExcel">导出</el-button>
              </el-form-item>

              <el-dialog title="批量导入会员" :visible.sync="dialogFormVisible1">
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
                  <!--<el-button type="primary" @click="insert">确 定</el-button>-->
                </div>
              </el-dialog>

              <el-dialog title="新增会员" :visible.sync="dialogFormVisible">
                <el-form ref="form" :model="form" :rules="rules" size="medium">
                  <el-form-item label="会员名称:" prop="insertName">
                    <el-input
                      v-model="form.insertName"
                      clearable
                      onkeyup="value=value.replace(/[\s+]/g,'')"
                    />
                  </el-form-item><br><br>
                  <el-form-item label="手机号:" prop="insertPhone">
                    <el-input
                      v-model="form.insertPhone"
                      clearable
                      onkeyup="value=value.replace(/[\s+]/g,'')"
                    />
                  </el-form-item><br><br>
                  <el-form-item label="生日日期:" size="medium">
                    <el-date-picker
                      v-model="value1"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      type="date"
                      placeholder="选择日期"
                    />
                  </el-form-item ><br><br>
                   <el-form-item label="性别:" size="medium">
                  <el-radio v-model="radio" label="1">男</el-radio>
                  <el-radio v-model="radio" label="2">女</el-radio>
                      </el-form-item >
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="insertfalse">取 消</el-button>
                  <el-button type="primary" @click="insert">确 定</el-button>
                </div>
              </el-dialog>

              <el-dialog title="编辑会员" :visible.sync="bianji">
                <el-form
                  ref="form"
                  :model="form"
                  :rules="rules"
                >
                  <el-form-item label="会员名称" prop="memberName">
                    <el-input
                      v-model="form.memberName"
                      auto-complete="off"
                      onkeyup="value=value.replace(/[\s+]/g,'')"
                    />
                  </el-form-item>
                  <el-form-item label="会员手机号" prop="mobile">
                    <el-input v-model="form.mobile" auto-complete="off" :disabled="true" />
                  </el-form-item>
                  <br><br>
                  <el-form-item label="会员卡号" prop="cardNo">
                    <el-input v-model="form.cardNo" auto-complete="off" :disabled="true" />
                  </el-form-item>
                  <el-form-item label="会员等级" prop="levelName">
                    <el-input v-model="form.levelName" auto-complete="off" :disabled="true" />
                  </el-form-item>
                  <br><br>
                  <el-form-item label="所属门店" prop="merchantName">
                    <el-input v-model="form.merchantName" auto-complete="off" :disabled="true" />
                  </el-form-item>
                  <el-form-item label="开卡时间" prop="createTime">
                    <el-input v-model="form.createTime" auto-complete="off" :disabled="true" />
                  </el-form-item>
                  <br><br>
                  <el-form-item label="成长值" prop="growthValue">
                    <el-input v-model="form.growthValue" auto-complete="off" :disabled="true" />
                  </el-form-item>
                  <el-form-item label="积分余额" prop="integralBalance">
                    <el-input v-model="form.integralBalance" auto-complete="off" :disabled="true" />
                  </el-form-item>
                  <br><br>
                  <el-form-item label="储值" prop="balance">
                    <el-input v-model="form.balance" auto-complete="off" :disabled="true" />
                  </el-form-item>
                  <el-form-item label="会员生日" prop="memberBirthday">
                    <el-input v-model="form.birthday" auto-complete="off" disabled="true" />
                  </el-form-item>
                  <br><br>
                </el-form>
                <div>
                  <el-button @click="bianji = false">取 消</el-button>
                  <el-button type="primary" @click="update1()">确 定</el-button>
                </div>
              </el-dialog>
            </span>
          </el-form>
        </div>
      </div>
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
          width="35"
        />
        <el-table-column
          fixed
          prop="memberId"
          label="ID"
          width="70"
        />
        <el-table-column
          prop="cardNo"
          label="会员卡号"
          width="100"
        />
        <el-table-column
          prop="memberName"
          label="姓名"
          width="80"
        />
        <el-table-column
          prop="mobile"
          label="手机号"
          width="120"
        />
        <el-table-column
          prop="levelName"
          label="会员等级"
          width="80"
        />
        <el-table-column
          prop="merchantName"
          label="门店"
          width="100"
        />
        <el-table-column
          prop="growthValue"
          label="成长值"
          width="80"
        />
        <el-table-column
          prop="integralBalance"
          label="积分"
          width="80"
        />
        <el-table-column
          prop="balance"
          label="储值"
          width="80"
        />
        <el-table-column
          prop="createTime"
          label="开卡时间"
          width="180"
        />
        <el-table-column
          prop="status"
          label="状态"
          width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.status === 1 ? '正常' : scope.row.status === 2 ? '冻结': '废除' }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="searchMore(scope.$index)">查看</el-button>
            <el-button type="text" size="small" @click="update(scope.$index)">编辑</el-button>
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
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vuerouter from 'vue-router'
Vue.use(vuerouter)
Vue.use(ElementUI)

import axios from 'axios'
Vue.prototype.$axios = axios

// 全局 设置cookie
export function setCookie(cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  const expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires
}

// 全局 读取cookie
export function getCookie(cname) {
  const name = cname + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}

export default {
  data() {
    return {
      multipleSelection: [], // 批量导出选择的集合
      delArr: [], // p存放批量删除的Id
      merchantId: '', // cookie中的商户id
      importFileUrl: '/ipos/excel/upload',
      rules: {
        insertPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
        ],
        insertName: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 1, max: 3, message: '长度为1-3个中文汉字', trigger: 'blur' }
        ],
        memberName: [
          { required: true, message: '请输入名字', trigger: 'blur' },
          { min: 1, max: 3, message: '长度为1-3个中文汉字', trigger: 'blur' }
        ]
      },
      tableData: [{
        status: ''
      }],
      totalCount: '',
      pageNum: 1,
      pageSize: 10,
      getPhone: null,
      getGrowthValue: null,
      getBalance: null,
      form: {
        insertName: '',
        insertPhone: '',
        memberName: '',
        mobile: '',
        cardNo: '',
        levelName: '',
        merchantName: '',
        integralBalance: '',
        growthValue: '',
        balance: '',
        createTime: '',
        memberId: '',
        birthday: ''
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      bianji: false,
      radio: '1',
      loading: true,
      allStoresInSelect: [{
        dictionaryKey: '',
        dictionaryValue: ''
      }],
      allMerchantSelect: [],
      allLevelSelect: [],
      sizeForm: {
        inputStores: '',
        inputMerchant: '', // 要查询的门店集合
        inputLevel: ''
      },
      value3: '',
      value1: '',
      sessionId: '',
      excelResult: []
    }
  },
  created() {
    this.getCookieDetails()
    setTimeout(() => {
      this.selectAll()
      this.changeStores()
      this.changeMerchant()
      this.changeLevel()
    }, 1111)
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    downloadfile() {
      window.location.href = '/ipos/excel/export'
    },
    exportExcel() {
      const workThis = this
      console.log('批量导出的id是：' + workThis.multipleSelection)
      if (workThis.multipleSelection.length === 0) {
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/member/queryExport',
          data: {
            'body': {
              'mobile': workThis.getPhone,
              'merchantId': workThis.merchantId,
              'memberSourceId': workThis.sizeForm.inputStores,
              'merchantName': workThis.sizeForm.inputMerchant,
              'createTime': workThis.value3,
              'levelName': workThis.sizeForm.inputLevel
            }
          }
        }).then(function(res) {
          workThis.excelResult = res.data.body
          for (let k = 0; k < workThis.excelResult.length; k++) {
            workThis.delArr.push(workThis.excelResult[k].memberId)
          }
          console.log('asdasdasdasdasdas:' + workThis.delArr)
          console.log('delArr批量拿到的id是：' + workThis.delArr)
          workThis.export()
        })
      } else {
        const dellength = workThis.multipleSelection.length
        for (let i = 0; i < dellength; i++) {
          workThis.delArr.push(workThis.multipleSelection[i].memberId)
        }
        workThis.export()
      }
    },
    export() {
      const workThis = this
      console.log('delArr批量拿到的id是：' + workThis.delArr)
      workThis.$axios({
        method: 'post',
        url: 'http://localhost:61116/ipos/excel/export',
        responseType: 'blob',
        data: {
          'body': {
            memberIdList: workThis.delArr
          }
        }
      }).then(function(res) {
        const content = res
        const blob = new Blob([content.data])
        const fileName = '会员表.xls'
        console.log('res', res)
        console.log('blob', blob)
        // return;
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a')
          elink.download = fileName
          elink.style.display = 'none'
          elink.href = URL.createObjectURL(blob)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else { // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
    deletinsert() {
      const workThis = this
      workThis.dialogFormVisible = true
      workThis.form.insertName = ''
      workThis.form.insertPhone = ''
      workThis.value1 = ''
      workThis.radio = ''
    },
    importExcel() {
      const workThis = this
      workThis.dialogFormVisible1 = true
    },
    changeStores() {
      const workThis = this
      workThis.$axios({
        method: 'post',
        url: 'http://localhost:61116/ipos/dictionary/select',
        data: {
          'body': {
            'prefix': 100
          }
          // headers: {
          //   'Authorization': workThis.sessionId
          //   // 'LoginType': 'CrmLogin'
          // }
        }
      }).then(function(res) {
        workThis.allStoresInSelect = res.data.body
      }).catch(error => {
        if (error && error.response) {
          switch (error.response.status) {
            case 401:
              workThis.toLoginPage(error.response.headers.contextpath)
              break
            case 400:
              workThis.$message({
                type: 'warning',
                message: '请求错误'
              })
              break
            case 403:
              workThis.$message({
                type: 'warning',
                message: '访问出错'
              })
              break
            case 404:
              workThis.$message({
                type: 'warning',
                message: '请求出错'
              })
              break
            case 408:
              workThis.$message({
                type: 'warning',
                message: '请求超时'
              })
              break
            case 500:
              workThis.$message({
                type: 'warning',
                message: '服务器报错'
              })
              break
            case 501:
              workThis.$message({
                type: 'warning',
                message: '服务未实现'
              })
              break
            case 502:
              workThis.$message({
                type: 'warning',
                message: '网络错误'
              })
              break
            case 503:
              workThis.$message({
                type: 'warning',
                message: '服务不可用'
              })
              break
            case 504:
              workThis.$message({
                type: 'warning',
                message: '网络超时'
              })
              break
            case 505:
              workThis.$message({
                type: 'warning',
                message: 'HTTP不支持'
              })
              break
            default:
              workThis.$message({
                type: 'warning',
                message: '连接出错'
              })
          }
        } else {
          return
        }
      })
    },
    changeMerchant() {
      const workThis = this
      workThis.$axios({
        method: 'post',
        url: 'http://localhost:61116/ipos/member/queryMerchant',
        data: {
          'body': {
            'parentId': workThis.merchantId
          }
          // headers: {
          //   'MemberSessionId': workThis.sessionId
          // }
        }
      }).then(function(res) {
        workThis.allMerchantSelect = res.data.body
      }).catch(error => {
        if (error && error.response) {
          switch (error.response.status) {
            case 401:
              workThis.toLoginPage(error.response.headers.contextpath)
              break
            case 400:
              workThis.$message({
                type: 'warning',
                message: '请求错误'
              })
              break
            case 403:
              workThis.$message({
                type: 'warning',
                message: '访问出错'
              })
              break
            case 404:
              workThis.$message({
                type: 'warning',
                message: '请求出错'
              })
              break
            case 408:
              workThis.$message({
                type: 'warning',
                message: '请求超时'
              })
              break
            case 500:
              workThis.$message({
                type: 'warning',
                message: '服务器报错'
              })
              break
            case 501:
              workThis.$message({
                type: 'warning',
                message: '服务未实现'
              })
              break
            case 502:
              workThis.$message({
                type: 'warning',
                message: '网络错误'
              })
              break
            case 503:
              workThis.$message({
                type: 'warning',
                message: '服务不可用'
              })
              break
            case 504:
              workThis.$message({
                type: 'warning',
                message: '网络超时'
              })
              break
            case 505:
              workThis.$message({
                type: 'warning',
                message: 'HTTP不支持'
              })
              break
            default:
              workThis.$message({
                type: 'warning',
                message: '连接出错'
              })
          }
        } else {
          return
        }
      })
    },
    changeLevel() {
      const workThis = this
      console.log('asdsad')
      workThis.$axios({
        method: 'post',
        url: 'http://localhost:61116/level/select',
        data: {
          'body': {
            'merchantId': workThis.merchantId,
          }
          // headers: {
          //   'Authorization': workThis.sessionId
          // }
        }
      }).then(function(res) {
        workThis.allLevelSelect = res.data.body.list
      }).catch(error => {
        if (error && error.response) {
          switch (error.response.status) {
            case 401:
              workThis.toLoginPage(error.response.headers.contextpath)
              break
            case 400:
              workThis.$message({
                type: 'warning',
                message: '请求错误'
              })
              break
            case 403:
              workThis.$message({
                type: 'warning',
                message: '访问出错'
              })
              break
            case 404:
              workThis.$message({
                type: 'warning',
                message: '请求出错'
              })
              break
            case 408:
              workThis.$message({
                type: 'warning',
                message: '请求超时'
              })
              break
            case 500:
              workThis.$message({
                type: 'warning',
                message: '服务器报错'
              })
              break
            case 501:
              workThis.$message({
                type: 'warning',
                message: '服务未实现'
              })
              break
            case 502:
              workThis.$message({
                type: 'warning',
                message: '网络错误'
              })
              break
            case 503:
              workThis.$message({
                type: 'warning',
                message: '服务不可用'
              })
              break
            case 504:
              workThis.$message({
                type: 'warning',
                message: '网络超时'
              })
              break
            case 505:
              workThis.$message({
                type: 'warning',
                message: 'HTTP不支持'
              })
              break
            default:
              workThis.$message({
                type: 'warning',
                message: '连接出错'
              })
          }
        } else {
          return
        }
      })
    },
    selectAll() {
      const workThis = this
      // console.log('从cookie中获取的商户Id是：' + workThis.merchantId)
      workThis.$axios({
        method: 'post',
        url: 'http://localhost:61116/ipos/member/query',
        data: {
          'header': {
            'pageSize': workThis.pageSize,
            'pageNum': workThis.pageNum
          },
          'body': {
            'mobile': workThis.getPhone,
            'merchantId': workThis.merchantId,
            'memberSourceId': workThis.sizeForm.inputStores,
            'merchantName': workThis.sizeForm.inputMerchant,
            'createTime': workThis.value3,
            'levelName': workThis.sizeForm.inputLevel
          }
        }
      }).then(function(res) {
        workThis.loading = true
        setTimeout(() => {
          workThis.loading = false
        }, 444)
        workThis.tableData = res.data.body.list
        workThis.totalCount = res.data.body.total
      }).catch(error => {
        if (error && error.response) {
          switch (error.response.status) {
            case 401:
              this.$message({
                type: 'warning',
                message: '登陆超时,请重新登录！'
              })
              this.$router.push({
                path: '/'
              })
              break
            case 400:
              workThis.$message({
                type: 'warning',
                message: '请求错误'
              })
              break
            case 403:
              workThis.$message({
                type: 'warning',
                message: '访问出错'
              })
              break
            case 404:
              workThis.$message({
                type: 'warning',
                message: '请求出错'
              })
              break
            case 408:
              workThis.$message({
                type: 'warning',
                message: '请求超时'
              })
              break
            case 500:
              workThis.$message({
                type: 'warning',
                message: '后端服务器未启动'
              })
              break
            case 501:
              workThis.$message({
                type: 'warning',
                message: '服务未实现'
              })
              break
            case 502:
              workThis.$message({
                type: 'warning',
                message: '网络错误'
              })
              break
            case 503:
              workThis.$message({
                type: 'warning',
                message: '服务不可用'
              })
              break
            case 504:
              workThis.$message({
                type: 'warning',
                message: '网络超时'
              })
              break
            case 505:
              workThis.$message({
                type: 'warning',
                message: 'HTTP不支持'
              })
              break
            default:
              workThis.$message({
                type: 'warning',
                message: '连接出错'
              })
          }
        } else {
          return
        }
      })
    },
    toLoginPage(loginpath) {
      this.$router.path({
        path: loginpath
      })
      this.$message({
        type: 'warning',
        message: '请登录！'
      })
    },
    searchMore(index) {
      const workThis = this
      this.$router.push({
        path: '/member/onlyMemberList',
        query: {
          id: workThis.tableData[index].memberId,
          mobile: workThis.tableData[index].mobile
        }
      })
    },
    insert() {
      const workThis = this
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
      if (workThis.form.insertName === '') {
        workThis.$message({
          type: 'warning',
          message: '请输入姓名!'
        })
        return false
      } else if (workThis.form.insertPhone === '') {
        workThis.$message({
          type: 'warning',
          message: '请输入手机号!'
        })
        return false
      } else if (!reg.test(workThis.form.insertPhone)) {
        workThis.$message({
          type: 'warning',
          message: '手机号有误!'
        })
        return false
      }
      workThis.$axios({
        method: 'post',
        url: 'http://localhost:61116/ipos/member/add',
        data: {
          'header': {},
          'body': {
            'realName': workThis.form.insertName,
            'mobile': workThis.form.insertPhone,
            'birthday': workThis.value1,
            'gender': workThis.radio,
            'merchantId': workThis.merchantId
          }
        }
      }).then(function(res) {
        console.log(res)
        console.log(res.data.body)
        workThis.selectAll()
        workThis.dialogFormVisible = false
        workThis.$message({
          type: 'success',
          message: '新增成功!'
        })
      })
    },
    update(index) {
      const workThis = this
      workThis.bianji = true
      workThis.form.memberName = workThis.tableData[index].memberName
      workThis.form.mobile = workThis.tableData[index].mobile
      workThis.form.levelName = workThis.tableData[index].levelName
      workThis.form.merchantName = workThis.tableData[index].merchantName
      workThis.form.integralBalance = workThis.tableData[index].integralBalance
      workThis.form.growthValue = workThis.tableData[index].growthValue
      workThis.form.balance = workThis.tableData[index].balance
      workThis.form.createTime = workThis.tableData[index].createTime
      workThis.form.cardNo = workThis.tableData[index].cardNo
      workThis.form.memberId = workThis.tableData[index].memberId
      workThis.form.birthday = workThis.tableData[index].birthday
    },
    update1() {
      const workThis = this
      if (workThis.form.memberName === '') {
        alert('请输入姓名')
        return false
      }
      workThis.$confirm('是否确认编辑?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        workThis.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/member/update',
          data: {
            'header': {},
            'body': { // 动态绑定获取，前端输入的字段放data()里，这里获取data的字段传入后端
              'realName': workThis.form.memberName,
              'memberId': workThis.form.memberId
            }
          }
        }).then(function(res) {
          workThis.selectAll()
          workThis.bianji = false
          workThis.form.memberName = ''
          workThis.$message({
            type: 'success',
            message: '编辑成功!'
          })
        })
      }).catch(() => {
        workThis.$message({
          type: 'info',
          message: '已取消'
        })
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
          url: 'http://localhost:61116/ipos/member/de',
          data: {
            'header': {},
            'body': {
              'memberId': workThis.tableData[index].memberId,
              'status': 3,
              'deleteFlag': 0
            }
          }
        }).then(function(res) {
          console.log(res)
          console.log(res.data.body)
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
    insertfalse() {
      const workThis = this
      workThis.dialogFormVisible = false
      workThis.form.insertName = ''
      workThis.form.insertphone = ''
      workThis.form.insertAge = ''
    },
    insertfalse1() {
      const workThis = this
      workThis.dialogFormVisible1 = false
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
    getCookieDetails() {
      const workThis = this
      workThis.merchantId = getCookie('merchantId')
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
    }
  }
}
</script>

<style scoped>
  .el-table th {
    background: #f2f2f2 !important;
    font-size: large;
  }

  /*.crm {*/
    /*left: 2%;*/
    /*top: 1%;*/
  /*}*/

</style>
