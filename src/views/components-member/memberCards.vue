<template>
  <div style="width: 1230px" class="crm">
    <div style ="background-color:#FFFFFF;box-shadow: 2px 2px 5px #888888;overflow:
    hidden; margin-top: 25px;margin-left: 10px">
      <el-container>
        <div style="padding-top: 8px;background-color: #f2f2f2">
          <div style="margin-left: 10px">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label=卡号>
                <el-input v-model.trim="formInline.cardNo" placeholder="请输入卡号"size="mini"></el-input>
              </el-form-item>
              <el-form-item label=选择等级>
                <el-select v-model="value" placeholder="请选择等级" size="mini">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                  <el-option label="全部" value="">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择范围">
                <el-select v-model="formInline.typeRange" size="mini" placeholder="选择范围" @change="rangeSelect()">
                  <el-option label="储值范围" value=1></el-option>
                  <el-option label="成长值范围" value=2></el-option>
                  <el-option label="无范围" value=3></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-input v-model="formInline.rangeMin" :disabled="formInline.edit" placeholder="请输入值"
                          style="width: 90px" size="mini"></el-input>
                <span style="font-size: 14px;margin-right: 5px">  到  </span>
                <el-input v-model="formInline.rangeMax" :disabled="formInline.edit" placeholder="请输入值"
                          style="width: 90px" size="mini"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button  size="mini" type="primary" @click="onSubmit" style="width: 144px">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div>
            <el-table
              :data="tableData"
              border
              size="mini"
              v-loading="loading"
              style="width: 100%;text-align: center">
              <el-table-column
                prop="cardNo"
                label="卡号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="memberId"
                label="会员编号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="levelName"
                label="等级">
              </el-table-column>
              <el-table-column
                prop="balance"
                label="余额">
              </el-table-column>
              <el-table-column
                prop="growthValue"
                label="成长值">
              </el-table-column>
              <el-table-column
                prop="storeName"
                label="门店">
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="开卡时间">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button size="mini" width="50" @click="showAll(scope.$index)">详情</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-dialog title="详细信息" :visible.sync="dialogVisible" v-model="showMessageAll">
              <span>编号：{{showMessageAll.updateId}}</span><br>
              <span>余额：{{showMessageAll.updateName}}</span><br>
              <span>成长值：{{showMessageAll.updateAddress}}</span><br>
              <el-table
                :data="tableData1"
                style="width: 100%">
                <el-table-column
                  prop="couponName"
                  label="优惠券"
                  width="180">
                </el-table-column>
              </el-table>
            </el-dialog>
          </div>
          <div class="block" style="text-align: right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-container>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Vue from 'vue';

  Vue.prototype.$axios = axios;
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
        merchantId: '', // cookie中的商户id
        showMessageAll: [{
          updateId: '',
          updateName: '',
          updateAddress: ''
        }],
        tableData1: [{
          couponName: ''
        }],
        dialogVisible: false,
        pageSize: 15,
        loading: true,
        pageNum: 1,
        totalCount: '',
        formInline: {
          edit: true,
          cardNo: '',
          typeRange: '',
          rangeMin: '',
          rangeMax: ''
        },
        tableData: [{
          cardNo: '',
          memberId: '',
          levelName: '',
          balance: '',
          integralBalance: '',
          growthValue: '',
          storeName: '',
          createTime: '',
          address: ''
        }],
        options: [
          {
            label: '',
            key: ''
          }
        ],
        value: ''
      }
    },
    created() {
      this.getCookieDetails()
      setTimeout(() => {
        this.selectLevel();
        this.onSubmit();
      }, 1111)
    },
    methods: {
      getCookieDetails() {
        const workThis = this
        workThis.merchantId = getCookie('merchantId')
      },
      selectLevel() {
        let workThis = this
        let sendInfo = this
        this.$axios({
          method: 'post',
          url: 'http://localhost:61116/level/select',
          data: {
            'header': {},
            'body': {

            }
          }
        }).then(function (res) {
          console.log('naaodadasa' + res.data.body.list)
          sendInfo.options = res.data.body.list;
        })
      },
      rangeSelect() {
        console.log('拿到值' + this.formInline.typeRange)
        console.log('拿到值' + this.formInline.edit)
        if (this.formInline.typeRange === '2' || this.formInline.typeRange === '1') {
          this.formInline.edit = false;
        } else {
          this.formInline.edit = true;
          this.formInline.rangeMax = ''
          this.formInline.rangeMin = ''
        }
      },
      showAll(index) {
        let sendInfo = this;
        // 请求获取优惠券信息
        sendInfo.dialogVisible = true;
        sendInfo.showMessageAll.updateId = sendInfo.tableData[index].cardNo;
        sendInfo.showMessageAll.updateAddress = sendInfo.tableData[index].balance;
        sendInfo.showMessageAll.updateName = sendInfo.tableData[index].growthValue;
        sendInfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/crmCoupon/selectCouponList',
          data: {
            'header': {},
            'body': {
              'cardNo': sendInfo.tableData[index].cardNo
            }
          }
        }).then(function (res) {
          sendInfo.tableData1 = res.data.body.list;
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.onSubmit();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNum = val;
        this.onSubmit();
      },
      onSubmit() {
        console.log('拿到id' + this.value)
        console.log('submit!');
        let selectCard = this;
        if (selectCard.formInline.rangeMin > selectCard.formInline.rangeMax) {
          alert('范围输入错误，左侧值要大于右侧值');
          return false;
        }
        if ((selectCard.formInline.typeRange === '1' || selectCard.formInline.typeRange === '2') && (selectCard.formInline.rangeMax === '' || selectCard.formInline.rangeMin === '')) {
          alert('范围不可为空')
          return false;
        }
        if (selectCard.formInline.cardNo.length > 11) {
          alert('请输入正确的卡号');
          return false;
        }
        selectCard.$axios({
          method: 'post',
          url: 'http://localhost:61116/card/selectCard',
          data: {
            'header': {
              'pageNum': selectCard.pageNum,
              'pageSize': selectCard.pageSize
            },
            'body': {
              'cardNo': selectCard.formInline.cardNo,
              'levelId': selectCard.value,
              'typeRange': selectCard.formInline.typeRange,
              'rangeMin': selectCard.formInline.rangeMin,
              'rangeMax': selectCard.formInline.rangeMax,
              'merchantId': selectCard.merchantId
            }
          }
        }).then(function (res) {
          selectCard.loading = true;
          setTimeout(() => {
            selectCard.loading = false;
          }, 500);
          console.log(res.data.body);
          selectCard.tableData = res.data.body.list;
          selectCard.totalCount = res.data.body.total;
          console.log('总条数')
        })
        this.$message('查询成功');
      },
      selAll(index) {
        console.log('这是查看详情');
      }
    }
  }
</script>

<style scoped>
  /*.crm {*/
    /*position: absolute;*/
    /*left: 17%;*/
    /*top: 10%;*/
  /*}*/
  .el-table th{
    background:#f2f2f2 !important;
    font-size: large;
  }
  .el-header {
    margin-top: 5px;
    font-family: 楷体;
    font-size: 36px;
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    line-height: 60px;
    border-radius: 10px;
    padding-bottom: 5px;
  }
</style>
