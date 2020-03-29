<template>
  <body>
  <div class="Manager_style">
    <span class="title_name">员工档案详情添加</span>
    <form action="">
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
          <td><input type="text" v-model="formMess.staffId"/></td>
          <td>姓名</td>
          <td><input type="text" v-model="formMess.staffName"/></td>
          <td>民族</td>
          <td><input type="text" v-model="formMess.nationality"/></td>
        </tr>
        <tr>
          <td>生日</td>
          <td><input type="date" v-model="formMess.staffBirthday"/></td>
          <td>性别</td>
          <td>
            男<input type="radio" checked="checked" v-model="formMess.staffSex" value="男"/>
            女<input type="radio" v-model="formMess.staffSex" value="女"/>
          </td>
          <td>政治面貌</td>
          <td>
            <select v-model="formMess.politicalStatus">
              <option value="党员">党员</option>
              <option value="预备党员">预备党员</option>
              <option value="团员">团员</option>
              <option value="群众">群众</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>学历</td>
          <td>
            <select v-model="formMess.staffEducation">
              <option value="本科">博士后</option>
              <option value="本科">博士</option>
              <option value="本科">硕士</option>
              <option value="本科">本科</option>
              <option value="大专">大专</option>
              <option value="高中">高中</option>
              <option value="初中及以下">初中及以下</option>
            </select>
          </td>
          <td>邮箱</td>
          <td><input type="email" v-model="formMess.staffEmail"/></td>
          <td>电话</td>
          <td><input type="text" v-model="formMess.staffTel"/></td>
        </tr>
        <tr>
          <td>部门</td>
          <td>
            <select v-model="formMess.departmentOId" >
              <option v-for="(item,index) in organizationList"  :value="item.oId">{{ item.name }}</option>
            </select>
          </td>
          <td>职位</td>
          <td>
            <select v-model="formMess.positionOId" >
              <option v-for="(item,index) in positionList"  :value="item.oId">{{ item.name }}</option>
            </select>
          </td>
          <td>入职时间</td>
          <td><input type="date" v-model="formMess.entryTime"/></td>
          <td >毕业院校</td>
          <td colspan="2"><input type="text" v-model="formMess.graduatedSchool"/></td>
        </tr>
        <tr>
          <td>住址</td>
          <td colspan="17"><input type="text" v-model="formMess.staffAddress"/></td>
        </tr>
        </tbody>
      </table>
      <button style="float: right; margin-right: 80px; width: 80px;" @click="onSubmit()">添加</button>
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
        formMess:{
          staffId: "",
          staffName: "",
          nationality:"",
          staffBirthday:"",
          staffSex:"",
          politicalStatus:"",
          staffEducation:"",
          staffEmail:"",
          staffTel:"",
          positionOId:"",
          departmentOId:"",
          entryTime:"",
          graduatedSchool:"",
          staffAddress:""},
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
      this.getPositions();
      this.getOrganization();
    },

    methods: {

      onSubmit() {
        /* json格式提交： */
        // let formData = JSON.stringify(this.formMess);

        /* formData格式提交： */
        let workThis = this;
        let formData = new FormData();
        for(var key in this.formMess){
          formData.append(key,this.formMess[key]);
        }

        axios({
          method:"post",
          url:"/api/consumer/addStaff",
          headers: {
            "Content-Type": "multipart/form-data"
          },
          withCredentials:true,
          async:false,
          data:formData
        }).then(function (res) {
          console.log("有响应了！！！！！");
          workThis.responseCode = res.data.code;
          console.log("code是"+workThis.responseCode);
          workThis.responseMess = res.data.message;
          if (workThis.responseCode === 200) {
            console.log("准备跳转！！");
            workThis.$router.push({
              path: '/staff/staff_index'
            });
          }
        });
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

<style>
  @import "../../styles/style.css";
  @import "../../styles/ace-ie.min.css";
  @import "../../styles/bootstrap.min.css";
  @import "../../styles/font-awesome.min.css";

</style>

