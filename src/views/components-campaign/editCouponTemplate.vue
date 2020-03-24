<template>
  <div class="crm" style="background-color:#FFFFFF;box-shadow: 2px 2px 5px #888888;overflow:
    hidden; margin-top: 25px;margin-left: 10px; width: 1225px">
    <div>
      <div style="padding-top: 8px;">
      </div>
      <div style="margin-left: 10px;margin-top: 15px">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="券模板名称" prop="couponName">
            <el-input v-model="ruleForm.couponName"  placeholder="请输入券模板名称" style="width: 200px"></el-input><br/>
          </el-form-item>
          <span style="margin-left: 20px;font-family: 华文楷体;color: #999999">原优惠券类型：{{templateTypeName}}</span>
          <el-form-item label="优惠券类型" prop="typeCoupon">
            <el-select v-model="ruleForm.typeCoupon" placeholder="选择类型" style="margin-top: 10px;width: 200px" @change="changeType()">
              <el-option
                v-for="item in selectCouponType"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select><br/>
          </el-form-item>
          <span style="font-size: 14px">券样:</span>
          <div class="uploadImage">
            <el-upload
              style="margin-left: 30px;margin-top: 10px"
              class="upload-demo"
              drag
              name="imagePath"
              action="https://imgchr.com/i/iZU2i4"
              on-success="handleSuccess"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-form>
      </div>
    </div>
    <!--使用规则-->
    <div style="padding-top: 12px;background-color: #f2f2f2;height: 40px ">
        <span style="float:left;padding-top:-20px;color:#C0C0C0;margin-left:1%">
               <h style="font-size: 20px;" >使用规则</h>
        </span>
    </div>
    <div>
      <el-form ref="form" :rules="rulesForm2"  :model="form" label-width="80px" style="margin: 10px">
        <el-form-item label="代金券" v-if="form.replaceCoupon">
          <span>面额 </span>
          <el-input v-model="form.amount" style="width: 180px"></el-input>
          <span>    满</span>
          <el-input v-model="form.thresholdMoney" style="width: 180px"></el-input>
          <span>可用</span>
        </el-form-item>
        <el-form-item label="折扣券:" v-if="form.replaceDiscount" label-width="100px">
          <el-input v-model="form.amount" style="width: 180px"></el-input>
          <span>折    满</span>
          <el-input v-model="form.thresholdMoney" style="width: 180px"></el-input>
          <span>可用</span>
        </el-form-item>
        <el-form-item label="选择菜品" v-if="form.replaceFoods" label-width="100px">
          <el-select
            v-model="form.foodsArray"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="请选择">
            <el-option
              v-for="item in optionFoods"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*券数量" prop="number">
          <el-input v-model="form.number" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="*是否与其他优惠券同享"  label-width="160px">
          <el-radio-group v-model="form.sharedStatus">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="*是否生成码券"  label-width="160px">
          <el-radio-group v-model="form.codeStatus">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="*有效期"  label-width="160px">
          <el-radio-group v-model="form.effectiveStatus" @change="changeActiveTime()">
            <el-radio label= 1 >固定有效期</el-radio>
            <el-radio label= 2 >相对有效期</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="*活动时间" v-if ="form.fixedTime">
          <el-col :span="11">
            <el-date-picker type="date"
                            placeholder="选择开始日期"
                            v-model="form.effectiveStartDate"
                            format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                            style="width: 60%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">选择结束日期</el-col>
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="form.effectiveEndDate" style="width: 60%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="相对有效期"  label-width="160px"  v-if ="form.unfixedTime">
          <span>自发券第</span>
          <el-input v-model="form.effectiveStartDay" placeholder="请输入内容" style="width: 100px"></el-input>
          <span>天至</span>
          <el-input v-model="form.effectiveEndDay" placeholder="请输入内容" style="width: 100px"></el-input>
          <span>天有效</span>
        </el-form-item>
        <el-form-item label="可用时段">
          <el-switch
            v-model="form.delivery"
            active-value="2"
            inactive-value="1"
            on-color="#ff4949"
            @change="replaceWeekday()"></el-switch>
        </el-form-item>
        <el-form-item label="日期" v-if="form.showWeekday">
          <el-checkbox-group v-model="form.effectiveWeekdays">
            <el-checkbox  label="3001" name="type">星期一</el-checkbox>
            <el-checkbox  label="3002" name="type">星期二</el-checkbox>
            <el-checkbox  label="3003" name="type">星期三</el-checkbox>
            <el-checkbox  label="3004" name="type">星期四</el-checkbox>
            <el-checkbox  label="3005" name="type">星期五</el-checkbox>
            <el-checkbox  label="3006" name="type">星期六</el-checkbox>
            <el-checkbox  label="3007" name="type">星期天</el-checkbox>
          </el-checkbox-group>
          <el-col class="line" :span="2">选择开始日期</el-col>
          <el-col :span="8">
            <el-time-picker type="date" placeholder="选择时间" v-model="form.effectiveStartTime" format="HH-mm-ss" value-format="HH-mm-ss" style="width: 180px;"></el-time-picker>
          </el-col>
          <el-col class="line" :span="2">选择结束日期</el-col>
          <el-col :span="8">
            <el-time-picker type="date" placeholder="选择时间" v-model="form.effectiveEndTime" format="HH-mm-ss" value-format="HH-mm-ss" style="width: 180px;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="门店限制">
          <el-switch v-model="form.limitStores"  active-value="2" inactive-value="1" @change="limitStore()"></el-switch>
        </el-form-item>
        <el-form-item label="门店名称" v-if="form.replaceStores" label-width="100px">
          <el-select
            v-model="form.storeArray"
            multiple
            collapse-tags
            style="margin-left: 20px;"
            placeholder="请选择">
            <el-option
              v-for="item in optionStores"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用说明">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item style="margin-left: 200px">
          <el-button type="primary" @click="onSubmit('ruleForm')">立即更新</el-button>
          <el-button style="width: 100px" @click="cancelJump">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
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
        couponTemplateId: '',
        templateTypeName: '',
        ruleForm: {
          typeCoupon: '',
          couponName: ''
        },
        radio: '1',
        replaceFoods: false,
        replaceDiscount: false,
        replaceCoupon: false,
        optionFoods: [],
        optionStores: [],
        rules: {
          couponName: [
            { required: true, message: '请输入券模板名称', trigger: 'blur' },
            { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
          ],
          typeCoupon: [
            { required: true, message: '请输入券模板名称', trigger: 'blur' }
          ]
        },
        rulesForm2: {
          number: [
            { required: true, message: '请输入券数量', trigger: 'blur' }
          ]
        },
        selectCouponType: [
          {
            id: 2202,
            name: '代金券'
          }, {
            id: 2201,
            name: '折扣券'
          }, {
            id: 2203,
            name: '菜品券'
          }
        ],
        form: {
          name: '',
          amount: '',
          number: '',
          thresholdMoney: '',
          codeStatus: '1',
          effectiveStatus: '1',
          sharedStatus: '1',
          effectiveStartDate: '',
          effectiveEndDate: '',
          effectiveStartDay: '',
          effectiveEndDay: '',
          effectiveWeekdays: [],
          effectiveStartTime: '',
          effectiveEndTime: '',
          delivery: '0',
          unfixedTime: false,
          fixedTime: true,
          showWeekday: false,
          limitStores: false,
          replaceStores: false,
          type: [],
          storeArray: [],
          foodsArray: [],
          resource: 1,
          desc: ''
        }
      }
    },
    created: function () {
      this.selectInfo();
    },
    methods: {
      selectInfo() {
        let workSelectInfo = this;
        workSelectInfo.ruleForm.couponName = workSelectInfo.$route.query.couponName;
        workSelectInfo.templateTypeName = workSelectInfo.$route.query.name;
        workSelectInfo.couponTemplateId = workSelectInfo.$route.query.id;
      },
      cancelJump() {
        this.$router.push({
          path: '/couponTemplate'
        })
      },
      limitStore() {
        console.log(1)
        if (this.form.limitStores === '2') {
          let sendInfo = this
          this.$axios({
            method: 'post',
            url: 'http://localhost:61116/deal/merchant/queryStores',
            data: {
              'header': {},
              'body': {}
            }
          }).then(function (res) {
            console.log('naaodadasa' + res.data.body.list)
            sendInfo.optionStores = res.data.body;
          })
          this.form.replaceStores = true;
        } else {
          this.form.replaceStores = false;
        }
      },
      replaceWeekday() {
        console.log(1)
        if (this.form.delivery === '2') {
          this.form.showWeekday = true;
        } else {
          this.form.showWeekday = false;
        }
      },
      changeActiveTime() {
        console.log(this.typeCoupon)
        if (this.form.effectiveStatus === '2') {
          this.form.unfixedTime = true;
        } else {
          this.form.unfixedTime = false;
        }
        if (this.form.effectiveStatus === '1') {
          this.form.fixedTime = true;
        } else {
          this.form.fixedTime = false;
        }
      },
      changeType() {
        console.log(this.ruleForm.typeCoupon)
        if (this.ruleForm.typeCoupon === 2203) {
          let sendInfo = this
          this.$axios({
            method: 'post',
            url: 'http://localhost:61116/goods/selectFood',
            data: {
              'header': {},
              'body': {}
            }
          }).then(function (res) {
            console.log('naaodadasa' + res.data.body.list)
            sendInfo.optionFoods = res.data.body;
          })
          this.form.replaceFoods = true;
        } else {
          this.form.replaceFoods = false;
        }
        if (this.ruleForm.typeCoupon === 2202) {
          this.form.replaceCoupon = true;
        } else {
          this.form.replaceCoupon = false;
        }
        if (this.ruleForm.typeCoupon === 2201) {
          this.form.replaceDiscount = true;
        } else {
          this.form.replaceDiscount = false;
        }
      },
      onSubmit() {
        let sendInfo = this;
        let reg = /^[0-9|10](\.\d{2})$/    //  折扣校验
        let reg2 = /^[0-9|10]*$/          //   数字校验
        let reg3 = /^\+?[1-9][0-9]*$/   //    整数校验
        if (sendInfo.ruleForm.couponName.length > 30 || sendInfo.ruleForm.couponName.match(' ')) {
          alert('名称格式错误，不可存入空格');
          return false;
        }
        if (sendInfo.ruleForm.couponName === '' || sendInfo.ruleForm.typeCoupon === '' ||
          sendInfo.form.number === '') {
          alert('标有*号的为必填项');
          return false;
        }
        if (sendInfo.ruleForm.typeCoupon !== 2203 && (sendInfo.form.amount === '' || sendInfo.form.thresholdMoney === '')) {
          alert('请输入正确的优惠金额信息');
          return false;
        }
        if (sendInfo.form.effectiveStatus === '1' &&
          (sendInfo.form.effectiveStartDate === '' && sendInfo.form.effectiveEndDate === '')) {
          alert('请输入正确的日期');
          return false;
        }
        if (sendInfo.form.effectiveStatus === '2' &&
          (sendInfo.form.effectiveStartDay === '' && sendInfo.form.effectiveEndDay === '')) {
          alert('请输入正确的天数');
          return false;
        }
        if (!reg.test(sendInfo.form.amount) && sendInfo.ruleForm.typeCoupon === 2201) {
          alert('请输入正确的折扣范围 0-10之间,保留两位小数');
          return false;
        }
        if (!reg3.test(sendInfo.form.amount) && sendInfo.ruleForm.typeCoupon === 2202) {
          alert('请输入正确的代金券面额');
          return false;
        }
        if (!reg2.test(sendInfo.form.thresholdMoney)) {
          alert('请输入正确的门槛金额');
          return false;
        }
        if (!reg3.test(sendInfo.form.number)) {
          alert('请输入正确的券数量');
          return false;
        }
        alert('有idme' + sendInfo.couponTemplateId)
        sendInfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/template/updateCouponTemplate',
          data: {
            'header': {},
            'body': {
              'id': sendInfo.couponTemplateId,
              'number': sendInfo.form.number,
              'templateType': sendInfo.ruleForm.typeCoupon,
              'codeStatus': sendInfo.form.codeStatus,
              'sharedStatus': sendInfo.form.sharedStatus,
              'periodStatus': sendInfo.form.delivery,
              'effectiveStatus': sendInfo.form.effectiveStatus,
              'scope': sendInfo.form.limitStores,
              'thresholdMoney': sendInfo.form.thresholdMoney,
              'amount': sendInfo.form.amount,
              'name': sendInfo.ruleForm.couponName,
              // 'imagePath': sendInfo.imagePath
              'description': sendInfo.form.desc,
              // 'createTime': sendInfo.form.createTime,
              'effectiveStartDate': sendInfo.form.effectiveStartDate,
              'effectiveEndDate': sendInfo.form.effectiveEndDate,
              'effectiveStartDay': sendInfo.form.effectiveStartDay,
              'effectiveEndDay': sendInfo.form.effectiveEndDay,
              'effectiveWeekdays': sendInfo.form.effectiveWeekdays,
              'effectiveStartTime': sendInfo.form.effectiveStartTime,
              'effectiveEndTime': sendInfo.form.effectiveEndTime,
              'foodsArray': sendInfo.form.foodsArray,
              'storeArray': sendInfo.form.storeArray
            }
          }
        }).then(function (res) {
          console.log('接受到的数据是' + res)
          sendInfo.$message.success('更新成功');
          sendInfo.$router.push('/couponTemplate');
        })
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

</style>
