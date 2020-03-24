<template>
  <div style="width: 1230px" class="crm">
        <el-form :inline="true" class="demo-form-inline" size="mini">
          <el-form-item style="margin-top: 25px; margin-left: 40px">
            <el-button type="primary" size="mini" @click="newPrivilege"> + 新建权益</el-button>
          </el-form-item>
        </el-form>
    <div style="margin-top:10px;margin-left:10px;margin-top: 20px">
      <div style="margin-top: 20px"></div>
      <template>
        <el-table :data="tableData" style="margin-left: 10px; width: 1200px" align="center" size="mini">
          <el-table-column prop="id" label="权益编号" width="200px" align="center">
            <template scope="sco">{{sco.row.id}}</template>
          </el-table-column>
          <el-table-column
            prop="imgPath"
            label="权益图片"
            sortable
            width="250px">
            <template slot-scope="scope">
              <img width="50px" height="50px" :src="'data:image/*;base64,' + scope.row.imagePath">
            </template>
          </el-table-column>
          <el-table-column prop="name" label="权益名称" width="200px" align="center">
            <template scope="sco">{{sco.row.name}}</template>
          </el-table-column>
          <el-table-column prop="description" label="权益描述" width="300px" align="center">
            <template scope="sco">{{sco.row.description}}</template>
          </el-table-column>

          <el-table-column prop="operation" label="操作" width="250px" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="update(scope.$index)">编辑</el-button>
              <el-button type="text" @click="deletePrivilege(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block" align="center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPage">
          </el-pagination>
        </div>
      </template>

    </div>

    <div>
      <el-dialog title="请输入权益信息" :visible.sync="dialogFormVisible" @close="closeInsert">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="权益名称：" prop="name">
            <el-input v-model.trim="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="权益描述：" prop="description">
            <el-input v-model.trim="form.description" auto-complete="off" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="权益图标：" prop="imagePath">
            <el-upload
              class="upload-demo"
              ref="upload"
              drag
              action="http://localhost:61116/level/image"
              multiple
              :auto-upload="true"
              list-type="picture"
              :before-upload="beforeUpload"
              :on-error="uploadError"
              :on-success="uploadSuccess"
              :limit="1"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelInsert">取 消</el-button>
          <el-button type="primary" @click="insertPrivilege">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="开始编辑权益信息" :visible.sync="dialogFormVisible1" @close="closeUpdate">
        <el-form :model="form1" :rules="rules" ref="form">

          <el-form-item label="权益名称：" prop="name">
            <el-input v-model="form1.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="权益描述：" prop="description">
            <el-input v-model="form1.description"type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="权益图标：" prop="imagePath">
            <img width="120px" height="100px" :src="'data:image/*;base64,' + imagePath">
          </el-form-item>
          <el-upload
            class="upload-demo"
            ref="upload"
            drag
            action="/level/image"
            multiple
            :auto-upload="true"
            list-type="picture"
            :before-upload="updateBeforeUpload"
            :on-error="updateUploadError"
            :on-success="updateUploadSuccess"
            :limit="1"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelUpdate">取 消</el-button>
          <el-button type="primary" @click="updatePrivilege">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<style>
  .box-card {
    width: 250px;
    height: 250px;
  }

  .el-table-column {
    align: "center";
  }

  /*.crm {*/
    /*position: absolute;*/
    /*left: 17%;*/
    /*top: 8%;*/
  /*}*/

  .el-table th {
    background: #f2f2f2 !important;
  }
</style>

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
        this.selectPrivilege()
      }, 1111)
    },
    data() {
      return {
        merchantId: '',
        updatePathOfImage: '',
        updateImageUrl: '',
        pathOfImage: '',
        imageUrl: '',
        path: '',
        imagePath: '',
        inputName: '',
        form: {
          name: '',
          description: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        form1: {
          id: '',
          name1: '',
          imagePath1: '',
          description1: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入权益名称', trigger: 'blur'},
            {min: 1, max: 8, message: '长度在 3-12 个字符', trigger: 'blur'}
          ]
        },
        dialogFormVisible: false,
        dialogFormVisible1: false,
        tableData: [],
        pageSize: 5,
        currentPage: 1,
        totalPage: 1
      }
    },
    methods: {
      getCookieDetails() {
        let workThis = this;
        workThis.merchantId = getCookie('merchantId')
      },
      closeUpdate: function () {
        this.$refs.upload.clearFiles();
      },
      cancelUpdate: function () {
        this.dialogFormVisible1 = false;
        this.$refs.upload.clearFiles();
      },
      updateUploadError: function (res, file) {
        console.log(res);
        this.$message.warning('上传图片失败');
      },
      updateUploadSuccess: function (res, file) {
        console.log('这是后端的路径');
        this.updatePathOfImage = res.substring(0, res.lastIndexOf('E'));
        this.updateImageUrl = res.substring(res.lastIndexOf('E'));
      },
      updateBeforeUpload(file) {
        console.log(file);
        console.log(file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length));
        const isJPG = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'jpg';
        const isPNG = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'png';
        const isGIF = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'gif';
        const is2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG && !isGIF) {
          this.$message.warning('只能上传jpg，png和gif格式的文件')
          console.log('只能上传jpg，png和gif格式的文件');
          return false;
        }
        if (!is2M) {
          this.$message.warning('上传图片不能超过2M');
          console.log('上传图片不能超过2M');
          return false;
        }
      },
      closeInsert: function () {
        this.$refs.form.resetFields();
        this.$refs.upload.clearFiles();
      },
      cancelInsert: function () {
        this.dialogFormVisible = false;
        this.$refs.form.resetFields();
        this.$refs.upload.clearFiles();
      },
      beforeUpload(file) {
        console.log(file);
        console.log(file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length));
        const isJPG = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'jpg';
        const isPNG = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'png';
        const isGIF = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length) === 'gif';
        const is2M = file.size / 1024 / 1024 < 2;
        if (!isJPG && !isPNG && !isGIF) {
          this.$message.warning('只能上传jpg，png和gif格式的文件')
          console.log('只能上传jpg，png和gif格式的文件');
          return false;
        }
        if (!is2M) {
          this.$message.warning('上传图片不能超过2M');
          console.log('上传图片不能超过2M');
          return false;
        }
      },
      uploadError(response, file, fileList) {
        console.log('图片上传失败');
        console.log(file);
        console.log(fileList);
      },
      uploadSuccess(response, file, fileList) {
        console.log('这是后端的路径');
        console.log(response);
        this.pathOfImage = response.substring(0, response.lastIndexOf('D'));
        this.imageUrl = response.substring(response.lastIndexOf('D'));
        console.log('这是图片路径');
        console.log(this.pathOfImage);
        console.log(this.imageUrl);
        console.log(response);
        console.log(file);
        console.log(fileList);
        console.log('上传成功');
      },
      updatePrivilege() {
        let sendInfo = this;
        if (sendInfo.form1.name === '' || sendInfo.form1.name.length > 8) {
          sendInfo.$message({
            type: 'warning',
            message: '权益名不能为空，长度小于8个字符'
          });
          return false;
        }
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
        if (!reg.test(sendInfo.form1.name)) {
          sendInfo.$message({
            type: 'warning',
            message: '权益名只能包含汉字，字母，或数字'
          });
          return false;
        }
        if (sendInfo.form1.description.match(' ') || sendInfo.form1.description.length > 255) {
          sendInfo.$message({
            type: 'warning',
            message: '权益描述不能输入空格，长度要在255字以内'
          });
          return false;
        }
        sendInfo.dialogFormVisible1 = false;
        sendInfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/privilege/updatePrivilege',
          data: {
            'body': {
              'id': sendInfo.form1.id,
              'name': sendInfo.form1.name,
              'imagePath': sendInfo.updateImageUrl,
              'description': sendInfo.form1.description
            }
          }
        }).then(function (res) {
          sendInfo.selectPrivilege();
          sendInfo.$refs.upload.clearFiles();
        })
      },
      update(index) {
        let sendInfo = this;
        sendInfo.dialogFormVisible1 = true;
        sendInfo.form1.id = sendInfo.tableData[index].id;
        sendInfo.form1.name = sendInfo.tableData[index].name;
        sendInfo.form1.description = sendInfo.tableData[index].description;
        sendInfo.imagePath = sendInfo.tableData[index].imagePath
      },
      insertPrivilege() {
        let sendInfo = this;
        const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
        if (sendInfo.form.name === '' || sendInfo.form.name.length > 8) {
          sendInfo.$message({
            type: 'warning',
            message: '权益名不能为空，长度小于8个字符'
          });
          return false;
        }
        if (!reg.test(sendInfo.form.name)) {
          sendInfo.$message({
            type: 'warning',
            message: '权益名只能包含汉字，字母，或数字'
          });
          return false;
        }
        if (sendInfo.form.description.match(' ') || sendInfo.form.description.length > 255) {
          sendInfo.$message({
            type: 'warning',
            message: '权益描述不能输入空格，长度要在255字以内'
          });
          return false;
        }
        this.dialogFormVisible = false;
        sendInfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/privilege/insertPrivilege',
          data: {
            'body': {
              'merchantId': sendInfo.merchantId,
              'name': sendInfo.form.name,
              'imagePath': sendInfo.imageUrl,
              'description': sendInfo.form.description
            }
          }
        }).then(function (res) {
          sendInfo.selectPrivilege();
          sendInfo.$refs.form.resetFields();
          sendInfo.$refs.upload.clearFiles();
        })
      },
      newPrivilege() {
        let sendInfo = this;
        sendInfo.dialogFormVisible = true;
      },
      deletePrivilege(index) {
        this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let sendInfo = this;
          sendInfo.$axios({
            method: 'post',
            url: 'http://localhost:61116/member/privilege/deletePrivilege',
            data: {
              'header': {},
              'body': {
                'id': sendInfo.tableData[index].id
              }
            }
          }).then(function (res) {
            sendInfo.selectPrivilege();
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      selectPrivilege() {
        let sendInfo = this;
        sendInfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/member/privilege/queryPrivileges',
          data: {
            'header': {
              'pageSize': sendInfo.pageSize,
              'pageNum': sendInfo.currentPage
            },
            'body': {
//              'name': sendInfo.inputName
              'merchantId': sendInfo.merchantId
            }
          }
        }).then(function (res) {
          console.log('[接受到的数据：]' + JSON.stringify(res.data.body));
          sendInfo.tableData = res.data.body.list;
          sendInfo.totalPage = res.data.body.total;
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.selectPrivilege();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.selectPrivilege();
      }
    }
  }
</script>
