<template>
  <body>
  <div class="Manager_style">
    <span class="title_name">员工档案详情添加</span>
    <form v-model="formMess">
      <table class="table table-striped table-bordered table-hover">
        <thead>
        <tr>
          <td colspan="8">员工档案添加</td>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td colspan="2" rowspan="3"><input type="file" name="staffImg" /></td>
          <td>员工号</td>
          <td><input type="text" v-model="formMess.staffNumber"/></td>
          <td>姓名</td>
          <td><input type="text" v-model="formMess.staffName"/></td>
          <td>民族</td>
          <td><input type="text" v-model="formMess.nationality"/></td>
        </tr>
        <tr>
          <td>生日</td>
          <td><input type="text" v-model="formMess.birthday"/></td>
          <td>性别</td>
          <td>
            {{formMess.sex}}
          </td>
          <td>政治面貌</td>
          <td>
            <input type="text" v-model="formMess.education"/>
<!--            {{formMess.education}}-->
          </td>
        </tr>
        <tr>
          <td>学历</td>
          <td>
            <input type="text" v-model="formMess.education"/>
          </td>
          <td>邮箱</td>
          <td><input type="email" v-model="formMess.email"/></td>
          <td>电话</td>
          <td><input type="text" v-model="formMess.staffTel"/></td>
        </tr>
        <tr>
          <td>部门</td>
          <td>
            <input type="text" v-model="formMess.organizationName"/>
          </td>
          <td>职位</td>
          <td>
            <input type="text" v-model="formMess.positionName"/>
          </td>
          <td>入职时间</td>

          <td><input type="text" v-model="formMess.entryTime"/></td>

          <td >毕业院校</td>
          <td colspan="2"><input type="text" v-model="formMess.graduatedSchool"/></td>
        </tr>
        <tr>
          <td>住址</td>
          <td colspan="17"><input type="text" v-model="formMess.staffAddress"/></td>
        </tr>
        </tbody>
      </table>
    </form>
  </div>

  </body>
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
        formMess: {
          oId:"",
          staffId:"",
          staffNumber:"",
          staffName:"",
          staffTel:"",
          email:"",
          status:"",
          organizationOId:"",
          positionOId:"",

          positionId:"",
          education:"",
          graduatedSchool:"",
          staffAddress:"",
          sex:"",
          birthday:"",
          entryTime:"",
          nationality:"",
          positionName:"",
          organizationName: ""
        },
        positionList:[{
          oId: '',
          name: ''
        }
        ],
        organizationList:[{
          oId: '',
          name: ''
        }]


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
            'pageNumber': 1,
            'pageSize' : 1,
            'oId': 'c45d4bc145404b3babb90bb5c19005c3'

          }
        }).then(function(res) {
          console.log("asdasd"+res.data.data.list[0])
          workThis.formMess = res.data.data.list[0]
        })
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



