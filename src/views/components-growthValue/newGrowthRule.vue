<template>
  <div style="width: 1230px; margin-top: 10px" class="crm">
    <div style="padding-top: 20px; background-color: #F2F6FC">
      <el-form ref="form" :model="form" label-width="120px" size="mini">
        <h2 style="margin-left: 40px; margin-bottom: 20px">成长值购买规则</h2>

        <el-form-item label="规则名称：">
          <el-input v-model="form.rulesName" style="width: 200px"></el-input>
        </el-form-item>

        <el-form-item label="规则类型：">
          <el-input
            style="width: 200px"
            placeholder="成长值购买规则"
            v-model="form.rulesType"
            :disabled="true">
          </el-input>
        </el-form-item>

        <!--<el-form-item label="等级限制：">-->
        <!--<el-switch v-model="form.levelLimit" @change="changeLimit()"></el-switch>-->
        <!--</el-form-item>-->

        <el-form-item label="会员等级：">
          <el-checkbox-group v-model="form.memberLevel">
            <el-checkbox
              v-for="item in memberLevelInSelect"
              :label="item.levelId"
            >{{item.levelName}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="会员来源：">
          <el-checkbox-group v-model="form.memberResource">
            <el-checkbox
              v-for="item in memberResourceInSelect"
              :label="item.dictionaryKey"
            >{{item.dictionaryValue}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="消费渠道：">
          <el-checkbox-group v-model="form.consumeChannel">
            <el-checkbox
              v-for="item in consumeChannelInSelect"
              :label="item.dictionaryKey"
            >{{item.dictionaryValue}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="规则内容：">
          <!--<div>-->
          每支付
          <el-input v-model="form.inputMoney" placeholder="100" style="width: 80px"/>
          元，得
          <el-input v-model="form.inputGrowth" placeholder="1000" style="width: 80px"/>
          成长值
          <!--</div>-->
        </el-form-item>
        <!--****************************加号添加成长值购买*********************************-->
        <!--<el-form-item-->
        <!--style="width: 500px"-->
        <!--v-for="(domain, index) in form.domains"-->
        <!--:label="''"-->
        <!--:key="domain.key"-->
        <!--:prop="'domains.' + index + '.value'"-->
        <!--&gt;-->
        <!--<div>-->
        <!--每支付-->
        <!--<el-input v-model="form.inputMoney" placeholder="200" style="width: 80px"/>  元，得-->
        <!--<el-input v-model="form.inputGrowth" placeholder="2200" style="width: 80px"/>  成长值-->
        <!--<el-button type="primary" @click.prevent="removeDomain(domain)">删除</el-button>-->
        <!--</div>-->
        <!--</el-form-item>-->

        <!--<el-form-item style="margin-left: 320px">-->
        <!--<el-button type="primary" @click="addDomain"> + </el-button>-->
        <!--</el-form-item>-->

        <!--<el-form-item-->
        <!--v-for="(domain, index) in form.domains"-->
        <!--:label="'每支付' + index"-->
        <!--:key="domain.key"-->
        <!--:prop="'domains.' + index + '.value'">-->
        <!--<el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>-->
        <!--</el-form-item>-->

        <el-form-item label="规则描述：">
          <el-input v-model.trim="form.description" auto-complete="off" type="textarea"
                    style="width: 400px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="newRules">保存</el-button>
          <!--<el-button @click="resetForm()">重置</el-button>-->
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>


<script>
  import Vue from 'vue';
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  import 'vue-beauty/package/style/vue-beauty.min.css';
  import axios from 'axios';
  // 引入公用部分结束
  Vue.prototype.$axios = axios;
  Vue.use(ElementUI);

  // 全局 设置cookie
  export function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires;
  }

  // 全局 读取cookie
  export function getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(name) !== -1) return c.substring(name.length, c.length);
    }
    return '';
  }
  export default {
    created: function () {
      this.getCookieDetails();
      setTimeout(() => {
        this.selectMemberResource()
        this.selectBehavior()
        this.selectPayWay()
        this.selectTypes()
        this.selectConsumeChannel()
        this.selectMemberLevel()
        this.selectRules()
      }, 1111)
    },
    data() {
      return {
        growth: [],
        money: [],
        rules: [],
        consumeChannelInSelect: [],
        behaviorInSelect: [],
        payWayInSelect: [],
        memberResourceInSelect: [],
        memberLevelInSelect: [],
        form: {
          domains: [{
            value: ''
          }],
          memberGrand: [],
          memberResource: [],
          consumeChannel: [],
          payWay: [],
          behavior: [],
          memberLevel: [],
          inputMoney: '',
          inputGrowth: '',
          description: '',
          rulesName: '',
          rulesType: '',
          level: false,
          levelLimit: false,
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          crmMerchantId: ''
        }
      }
    },
    methods: {
      newRules() { // 新增规则
        let sendinfo = this;
        if (sendinfo.form.rulesName === '' || sendinfo.form.rulesName === null) {
          sendinfo.$message.warning('请填入规则名称');
          return false;
        }
        if (sendinfo.form.rulesName.length > 16) {
          sendinfo.$message.warning('规则名称不能超过16个字符');
          return false;
        }
        if (sendinfo.form.memberLevel.length === 0) {
          sendinfo.$message.warning('请选择会员等级');
          return false;
        }
        if (sendinfo.form.memberResource.length === 0) {
          sendinfo.$message.warning('请选择会员来源');
          return false;
        }
        if (sendinfo.form.consumeChannel.length === 0) {
          sendinfo.$message.warning('请选择消费渠道');
          return false;
        }
        if ((sendinfo.form.inputMoney === null || sendinfo.form.inputMoney === '') || (sendinfo.form.inputGrowth === null || sendinfo.form.inputGrowth === '')) {
          sendinfo.$message.warning('请输入规则内容');
          return false;
        }
        const reg = /^\d+$/;
        const reg1 = /^[0-9]+\.?[0-9]+?$/
        if (!reg.test(sendinfo.form.inputMoney) || !reg1.test(sendinfo.form.inputMoney)) {
          sendinfo.$message.warning('钱数只能为正数');
          return false;
        }
        if (!reg.test(sendinfo.form.inputGrowth)) {
          sendinfo.$message.warning('成长值只能为正整数');
          return false;
        }
        console.log('参数为==================================' + sendinfo.form.memberLevel);
        sendinfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/deal/rules/addRules',
          data: {
            'body': {
              'merchantId': sendinfo.crmMerchantId,
              'rulesName': sendinfo.form.rulesName,
              'rulesType': '1808',
              'levelIdList': sendinfo.form.memberLevel,
              'memberResourceList': sendinfo.form.memberResource,
              'consumeChannelList': sendinfo.form.consumeChannel,
              'description': sendinfo.form.description,
              'priceMoney': sendinfo.form.inputMoney,
              'priceIntegral': sendinfo.form.inputGrowth
            }
          }
        }).then(function (res) {
          if (res.data.header.code === '1800') {
            sendinfo.$message.warning('该规则名称已存在！新增失败');
          } else if (res.data.header.code === '1808') {
            sendinfo.$message.warning('该商品内容已存在！新增失败');
          } else {
            sendinfo.$message.success('新增成功！');
//            跳转到列表页
            sendinfo.$router.push({
              path: '/rule/growthRule'
            })
//            清空表单
            sendinfo.$refs.form.resetFields();
          }
        })
      },
//      resetForm() {
//        let sendInfo = this;
//        this.$refs[formName].resetFields();
//        sendInfo.$refs.form.resetFields();
//      },
// 加号新增规则
//      removeDomain(item) {
//        var index = this.form.domains.indexOf(item)
//        if (index !== -1) {
//          this.form.domains.splice(index, 1)
//        }
//      },
//      addDomain() {
//        this.form.domains.push({
//          value: '',
//          key: Date.now()
//        });
//      },
      selectRules () {
        let sendinfo = this;
        sendinfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/deal/rules/selectRulesList',
          data: {
            'body': {
              'merchantId': sendinfo.crmMerchantId
            }
          }
        }).then(function (res) {
          sendinfo.rules = res.data.body.list;
          console.log('[********rules中的数据：]' + JSON.stringify(sendinfo.rules))
          console.log('[rules的长度：]' + sendinfo.rules.length)
          for (var i = 0; i < sendinfo.rules.length; i++) {
            sendinfo.money.push(sendinfo.rules[i].priceMoney)
            sendinfo.growth.push(sendinfo.rules[i].priceIntegral)
          }
          console.log('[*************money中的数据：]' + JSON.stringify(sendinfo.money))
          console.log('[*************growth中的数据：]' + JSON.stringify(sendinfo.growth))
          console.log('****************会员等级参数为====================');
          console.log('[money中的数据：]' + sendinfo.money)
        })
      },
      selectMemberLevel() { // 查询会员等级
        let sendinfo = this;
        sendinfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/deal/rules/selectRulesLevel',
          data: {
            'body': {
              'merchantId': sendinfo.crmMerchantId
            }
          }
        }).then(function (res) {
          sendinfo.memberLevelInSelect = res.data.body;
          console.log('会员等级参数为====================');
          console.log('[memberLevelInSelect中的数据：]' + JSON.stringify(sendinfo.memberLevelInSelect))
        })
      },
      selectConsumeChannel() { // 查询会员来源
        let sendinfo = this;
        sendinfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'prefix': 500
            }
          }
        }).then(function (res) {
          sendinfo.consumeChannelInSelect = res.data.body;
          console.log('参数为' + sendinfo.consumeChannelInSelect.toString());
        })
      },
      selectTypes() { // 查询规则类型
        let sendinfo = this;
        sendinfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'prefix': 1800
            }
          }
        }).then(function (res) {
          sendinfo.typesInSelect = res.data.body;
          console.log('参数为' + sendinfo.typesInSelect.toString());
        })
      },
      selectPayWay() { // 查询支付方式
        let sendinfo = this;
        sendinfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'prefix': 600
            }
          }
        }).then(function (res) {
          sendinfo.payWayInSelect = res.data.body;
          console.log('参数为' + sendinfo.payWayInSelect.toString());
        })
      },
      selectBehavior() { // 查询会员行为
        let sendinfo = this;
        sendinfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'prefix': 1200
            }
          }
        }).then(function (res) {
          sendinfo.behaviorInSelect = res.data.body;
          console.log('参数为' + sendinfo.behaviorInSelect.toString());
        })
      },
      selectMemberResource() { // 查询会员来源
        let sendinfo = this;
        sendinfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/ipos/dictionary/select',
          data: {
            'body': {
              'prefix': 100
            }
          }
        }).then(function (res) {
          sendinfo.memberResourceInSelect = res.data.body;
          console.log('参数为' + sendinfo.memberResourceInSelect.toString());
        })
      },
      getCookieDetails() {
        let workThis = this;
        workThis.crmMerchantId = getCookie('merchantId')
      },
//      changeLimit() {
//        let sendInfo = this;
//        if (sendInfo.form.levelLimit === true) {
//          sendInfo.form.level = true;
//        } else {
//          sendInfo.form.level = false;
//        }
//      },
      cancel() { // 取消
        this.$router.push({
          path: 'growthRule'
        })
      }
    }
  }
</script>

<style>
  body {
    background-color: #F2F6FC;
  }

  /*.crm {*/
    /*position: absolute;*/
    /*left: 17%;*/
    /*top: 8%;*/
  /*}*/

  /*body {*/
  /*background-color: #ff0000;*/
  /*}*/
</style>
