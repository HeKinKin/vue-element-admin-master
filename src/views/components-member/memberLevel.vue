<template>
  <div style="width: 1230px" class="crm">
    <div
      style=" margin-top: 25px;margin-left: 10px">
      <div style="padding-top: 8px">
        <div style="margin-left: 10px">


          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="等级名称:">
              <el-input placeholder="请输入等级名称" size="mini" v-model.trim="checkGradeName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="checkGradeData">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="mini" @click="openGetLevel">新增会员等级</el-button>
            </el-form-item>
          </el-form>
          <!--<img width="100%" :src="'/file/' + ImageUrl">-->
        </div>
      </div>
    </div>
    <div style="margin-top:10px;margin-left:10px;margin-top: 20px">
      <div style="margin-top: 20px">
      </div>
      <div style="width: 950px">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          size="mini"
          v-loading="loading"
        >
          <el-table-column
            fixed
            prop="name"
            label="等级名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="rules"
            label="升级规则"
            width="200">
          </el-table-column>
          <el-table-column
            prop="description"
            label="升级描述"
            width="200">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="updateGradeInfo(scope.$index)">编辑</el-button>
              <el-button type="text" size="small" @click="deleteGradeInfo(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="padding-left:600px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes=[5,10,20,40]
          :page-size="pageSize"
          :total="totalCount"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="新增等级" :visible.sync="dialogFromVisible" @close="closeInsertClean">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="等级名称：" prop="insertGradeName">
          <el-input v-model.trim="form.insertGradeName" placeholder="请输入等级名称" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="等级图片：" prop="imagePath">
          <div style="width: 200px">
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
            <!--<el-button @click="uploadImage">上传</el-button>-->
            <!--<img width="100%" :src="'data:image/*;base64,' + pathOfImage"/>-->
          </div>
        </el-form-item>
        <el-form-item label="成长值界限：" prop="insertGrowthValue">
          <el-input v-model.trim="form.insertGrowthValue" placeholder="请输入成长值界限" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="升级规则：" prop="insertTextareaRule">
          <el-input type="textarea" :rows="2" placeholder="请输入规则内容" v-model.trim="form.insertTextareaRule"></el-input>
        </el-form-item>
        <el-form-item label="选择权益：" prop="selectValue">
          <el-checkbox-group v-model="form.selectValue">
            <el-checkbox v-for="item in items" :label="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!--<el-form-item label="是否享有会员价：">-->
        <!--<el-radio-group v-model="form.radio1">-->
        <!--<el-radio label="1">是</el-radio>-->
        <!--<el-radio label="2">否</el-radio>-->
        <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <el-form-item label="该等级享有" prop="discount">
          <el-input v-model="form.discount" placeholder="请输入折扣" style="width: 200px"></el-input>
          折
        </el-form-item>
        <el-form-item label="等级描述：" prop="insertTextareaDescription">
          <el-input type="textarea" placeholder="请输入等级描述" :rows="2"
                    v-model.trim="form.insertTextareaDescription"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendGradeInfo">保存</el-button>
          <el-button type="primary" @click="cancelInsert">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="编辑等级" :visible.sync="dialogFrom1Visible" @close="closeUpdateClean">
      <el-form :model="form1" :rules="rules1" ref="form1">
        <el-form-item label="等级名称：" prop="updateGradeName">
          <el-input v-model.trim="form1.updateGradeName" placeholder="请输入等级名称" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="已选择的等级图片：">
          <img width="120px" height="100px" :src="'data:image/*;base64,' + url">
          <div style="width: 200px">
            <el-upload
              class="upload-demo"
              ref="updateUpload"
              drag
              action="http://localhost:61116/level/image"
              multiple
              :auto-upload="true"
              list-type="picture"
              :on-error="updateUploadError"
              :on-success="updateUploadSuccess"
              :before-upload="updateBeforeUpload"
              :limit="1"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <!--<img :src="'data:image/*;base64,' + updateImagePath">-->
          </div>
        </el-form-item>
        <el-form-item label="成长值界限：" prop="updateGrowthValue">
          <el-input v-model.trim="form1.updateGrowthValue" placeholder="请输入成长值界限" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="升级规则：" prop="updateTextareaRule">
          <el-input type="textarea" :rows="2" placeholder="请输入规则内容" v-model.trim="form1.updateTextareaRule"></el-input>
        </el-form-item>
        <el-form-item label="选择权益：" prop="updateSelectValue">
          <el-checkbox-group v-model="form1.updateSelectValue">
            <el-checkbox v-for="item in getItems" :label="item.id" :checked="item.checkOk" :key="item.id">
              {{item.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!--<el-form-item label="是否享有会员价：">-->
        <!--<el-radio-group v-model="form1.radio1">-->
        <!--<el-radio label="1">是</el-radio>-->
        <!--<el-radio label="2">否</el-radio>-->
        <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <el-form-item label="该等级享有" prop="updateDiscount">
          <el-input v-model="form1.updateDiscount" placeholder="请输入折扣" style="width: 200px"></el-input>
          折
        </el-form-item>
        <el-form-item label="等级描述：" prop="updateTextareaDescription">
          <el-input type="textarea" placeholder="请输入等级描述" :rows="2"
                    v-model.trim="form1.updateTextareaDescription"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="sendUpdateGradeInfo">保存</el-button>
          <el-button type="primary" @click="cancelUpdate">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped>
  .el-table th {
    background: #f2f2f2 !important;
    font-size: large;
  }

  .crm {
    position: absolute;
    left: 2%;
    top: 2%;
  }
</style>

<script>
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
  export default{
    data () {
      return {
        merchantId: '',
        imageUrl: '',
        pathOfImage: '',
        updateImagePath: '',
        updateImageUrl: '',
        imagePath: '',
        url: '',
        checkedItems: [],
        checkOk: false,
        getItems: [], // 编辑等级时从后端查询到的软性权益
        options: [], // 编辑等级时从后端查询到的等级对应的权益
        message: '',
        items: [],  // 新增等级时从后端查询到的权益
        pageNum: 1,
        pageSize: 5,
        totalCount: 1,
        loading: true,
        uid: '', // table表格里面行数据的id
        checkGradeName: '',
        form: {
          insertGradeName: '',
          insertGrowthValue: '',
          discount: 10,
          insertTextareaRule: '',
          insertTextareaDescription: '',
          selectValue: [],
          radio1: 2
        },
        form1: {
          updateGradeName: '',
          updateGrowthValue: '',
          updateDiscount: '',
          updateTextareaRule: '',
          updateTextareaDescription: '',
          updateSelectValue: [],
          radio1: 2
        },
        dialogFromVisible: false,
        dialogFrom1Visible: false,
        tableData: [],
        total: 1,
        rules: {
          insertGradeName: [
            {required: true, message: '请输入等级名称', trigger: 'blur'}
          ],
          insertGrowthValue: [
            {required: true, message: '请输入成长值界限', trigger: 'blur'}
          ]
        },
        rules1: {
          updateGradeName: [
            {required: true, message: '请输入等级名称', trigger: 'blur'}
          ],
          updateGrowthValue: [
            {required: true, message: '请输入成长值界限', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      updateBeforeUpload(file) {
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
      updateUploadError: function (res, file) {
        console.log('图片失败');
      },
      updateUploadSuccess: function (res, file) {
        this.updateImagePath = res.substring(0, res.lastIndexOf('E'));
        this.updateImageUrl = res.substring(res.lastIndexOf('E'));
      },
      closeInsertClean() {
        this.$refs.form.resetFields();
        this.$refs.upload.clearFiles();
      },
      closeUpdateClean() {
        this.$refs.form1.resetFields();
        this.$refs.updateUpload.clearFiles();
      },
      updateGetSoftPrivilege() {
        let workUpdateGetSoftPrivilege = this;
        workUpdateGetSoftPrivilege.$axios({
          method: 'post',
          url: 'http://localhost:61116/level/getSoftPrivilege',
          data: {
            'header': {},
            'body': {
              'id': workUpdateGetSoftPrivilege.uid
            }
          }
        }).then(function (res) {
          console.log('后端软性权益：' + res.data.body);
          workUpdateGetSoftPrivilege.options = res.data.body;
          for (var i = 0; i < workUpdateGetSoftPrivilege.options.length; i++) {
            workUpdateGetSoftPrivilege.form1.updateSelectValue.push(workUpdateGetSoftPrivilege.options[i].id);
          }
        })
      },
      openGetLevel() {
        let workInsertLevel = this;
        workInsertLevel.dialogFromVisible = true;
        workInsertLevel.$axios({
          method: 'post',
          url: 'http://localhost:61116/level/getPrivilege',
          data: {
            'header': {},
            'body': {
              'merchantId': workInsertLevel.merchantId
            }
          }
        }).then(function (res) {
          console.log(res.data.body);
          workInsertLevel.items = res.data.body;
        })
      },
      sendGradeInfo() { // 保存新增等级内容到数据库
        let workSendGradeInfo = this;
        if (workSendGradeInfo.form.insertGradeName === '') {
          workSendGradeInfo.$message.warning('会员等级名称不能为空');
          return false;
        }
        if (workSendGradeInfo.imageUrl === '') {
          workSendGradeInfo.imageUrl = 'D:\\train-six\\pictures\\card.jpg';
        }
        if (workSendGradeInfo.form.insertGradeName.length > 32) {
          workSendGradeInfo.$message.warning('会员名称过长');
          return false;
        }
        const reg = /^[0-9]+.?[0-9]*$/;
        const reg1 = /^[0-9]*$/;
        if (workSendGradeInfo.form.insertGrowthValue === '') {
          workSendGradeInfo.$message.warning('请输入成长值界限');
          return false;
        }
        if (!reg1.test(workSendGradeInfo.form.insertGrowthValue) || workSendGradeInfo.form.insertGrowthValue.length > 8) {
          workSendGradeInfo.$message.warning('成长值不是数字或长度超过8位');
          return false;
        }
        if (workSendGradeInfo.form.insertTextareaRule.length > 256) {
          workSendGradeInfo.$message.warning('规则输入过长');
          return false;
        }
        if (!reg.test(workSendGradeInfo.form.discount) || workSendGradeInfo.form.discount > 10) {
          workSendGradeInfo.$message.warning('请输入正确的折扣');
          return false;
        }
        if (workSendGradeInfo.form.insertTextareaDescription.length > 256) {
          workSendGradeInfo.$message.warning('描述输入过长');
          return false;
        }
        workSendGradeInfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/level/insertInfo', // 新增等级api的路径
          data: {
            'header': {},
            'body': {
              'merchantId': workSendGradeInfo.merchantId,
              'name': workSendGradeInfo.form.insertGradeName,   // 将等级名传到后端
              'rules': workSendGradeInfo.form.insertTextareaRule,  // 将升级规则传到后端
              'soft': workSendGradeInfo.form.selectValue, // 将选择的id传到后端
              'discount': workSendGradeInfo.form.discount, // 将折扣传到后端
              'imagePath': workSendGradeInfo.imageUrl, // 将图片路径传到后端
              'growthValueLimit': workSendGradeInfo.form.insertGrowthValue, // 将成长值界限传到后端
              'description': workSendGradeInfo.form.insertTextareaDescription  // 将等级描述传到后端
            }
          }
        }).then(function (res) { // 拿到后端新增操作完返回的vo数据
          if (res.data.header.code === '500') {
            workSendGradeInfo.$message.warning('已经存在该等级');
          } else if (res.data.header.code === '600') {
            workSendGradeInfo.$message.warning('该成长值界限已经存在');
          } else if (res.data.header.code === '700') {
            workSendGradeInfo.$message.warning('连接超时')
          } else {
            workSendGradeInfo.tableData = res.data.body;
            workSendGradeInfo.dialogFromVisible = false;
            workSendGradeInfo.$message.success('保存成功');
//            workSendGradeInfo.dialogFormVisible = false;
            workSendGradeInfo.checkGradeData();
            workSendGradeInfo.$refs.form.resetFields();
            workSendGradeInfo.$refs.upload.clearFiles();
          }
        })
      },
      cancelInsert: function () {
        let workCancelInsert = this;
        workCancelInsert.dialogFromVisible = false;
        workCancelInsert.$refs.form.resetFields();
        workCancelInsert.$refs.upload.clearFiles();
      },
      cancelUpdate: function () {
        let workCancelUpdate = this;
        workCancelUpdate.dialogFrom1Visible = false;
        workCancelUpdate.$refs.form1.resetFields();
        workCancelUpdate.$refs.updateUpload.clearFiles();
      },
      deleteGradeInfo(index) {
        let workDeleteGradeInfo = this;
        workDeleteGradeInfo.$confirm('确定删除等级吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          workDeleteGradeInfo.$axios({
            method: 'post',
            url: 'http://localhost:61116/level/deleteLevelInfo', // 后端删除等级路径
            data: {
              'header': {},
              'body': {
                'id': workDeleteGradeInfo.tableData[index].id
              }
            }
          }).then(function (res) {
            if (res.data.header.code === '10000') {
              workDeleteGradeInfo.checkGradeData();
              workDeleteGradeInfo.$message({
                type: 'success',
                message: '删除成功'
              })
            } else if (res.data.header.code === '700') {
              workDeleteGradeInfo.$message.warning('连接超时');
            }
          }).catch(() => {
            workDeleteGradeInfo.$message({
              type: 'info',
              message: '取消删除'
            })
          })
        })
      },
      updateGradeInfo(index) {  // 编辑会员等级的那一条数据
        let workUpdateGradeInfo = this;
        workUpdateGradeInfo.dialogFrom1Visible = true;
        workUpdateGradeInfo.uid = workUpdateGradeInfo.tableData[index].id; // 拿到表中数据行id
        workUpdateGradeInfo.form1.updateGradeName = workUpdateGradeInfo.tableData[index].name;
        workUpdateGradeInfo.url = workUpdateGradeInfo.tableData[index].imagePath;
        workUpdateGradeInfo.form1.updateGrowthValue = workUpdateGradeInfo.tableData[index].growthValueLimit;
        workUpdateGradeInfo.form1.updateDiscount = workUpdateGradeInfo.tableData[index].discount;
        workUpdateGradeInfo.form1.updateTextareaRule = workUpdateGradeInfo.tableData[index].rules;
        workUpdateGradeInfo.form1.updateTextareaDescription = workUpdateGradeInfo.tableData[index].description;
        workUpdateGradeInfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/level/getPrivilege',
          data: {
            'header': {},
            'body': {
              'merchantId': workUpdateGradeInfo.merchantId
            }
          }
        }).then(function (res) {
          console.log('下面是获取的软性权益');
          console.log(res.data.body);
          workUpdateGradeInfo.getItems = res.data.body;
          workUpdateGradeInfo.updateGetSoftPrivilege();
        })
      },
      sendUpdateGradeInfo () {
        let workSendUpdateGradeInfo = this;
        if (workSendUpdateGradeInfo.form1.updateGradeName === '') {
          workSendUpdateGradeInfo.$message.warning('会员等级名称不能为空');
          return false;
        }
        if (workSendUpdateGradeInfo.form1.updateGradeName.length > 32) {
          workSendUpdateGradeInfo.$message.warning('会员名称过长');
          return false;
        }
        const reg = /^[0-9]+.?[0-9]*$/;
        const reg1 = /^[0-9]*$/;
        if (!reg1.test(workSendUpdateGradeInfo.form1.updateGrowthValue) || workSendUpdateGradeInfo.form1.updateGrowthValue.length > 8) {
          workSendUpdateGradeInfo.$message.warning('成长值界限不是数字或长度超过8位');
          return false;
        }
        if (workSendUpdateGradeInfo.form1.updateTextareaRule.length > 256) {
          workSendUpdateGradeInfo.$message.warning('规则输入过长');
          return false;
        }
        if (!reg.test(workSendUpdateGradeInfo.form1.updateDiscount) || workSendUpdateGradeInfo.form1.updateDiscount > 10) {
          workSendUpdateGradeInfo.$message.warning('请输入正确的折扣');
          return false;
        }
        if (workSendUpdateGradeInfo.form1.updateTextareaDescription.length > 256) {
          workSendUpdateGradeInfo.$message.warning('描述输入过长');
          return false;
        }
        workSendUpdateGradeInfo.$axios({
          method: 'post',
          url: 'http://localhost:61116/level/updateLevelInfo',
          data: {
            'header': {},
            'body': {
              'id': workSendUpdateGradeInfo.uid, // 将表中的行id传到后端
              'name': workSendUpdateGradeInfo.form1.updateGradeName,   // 更新等级名传到后端
              'imagePath': workSendUpdateGradeInfo.updateImageUrl,  // 更新图片路径到后端
              'growthValueLimit': workSendUpdateGradeInfo.form1.updateGrowthValue, // 将更新的成长值传到后端
              'soft': workSendUpdateGradeInfo.form1.updateSelectValue, // 将更新的权益传递到后端
              'discount': workSendUpdateGradeInfo.form1.updateDiscount, // 将更新的折扣传递到后端
              'rules': workSendUpdateGradeInfo.form1.updateTextareaRule,  // 更新规则传到后端
              'description': workSendUpdateGradeInfo.form1.updateTextareaDescription  // 更新描述文本框数据传到后端
            }
          }
        }).then(function (res) {
//          alert(res.data.header.code);
          if (res.data.header.code === '10000') {
            workSendUpdateGradeInfo.$message.success('修改成功');
            workSendUpdateGradeInfo.dialogFrom1Visible = false;
            workSendUpdateGradeInfo.$refs.updateUpload.clearFiles();
            workSendUpdateGradeInfo.checkGradeData();
          } else if (res.data.header.code === '500') {
            workSendUpdateGradeInfo.$message.warning('该等级已存在');
          } else if (res.data.header.code === '600') {
            workSendUpdateGradeInfo.$message.warning('该成长值已存在');
          } else if (res.data.header.code === '700') {
            workSendUpdateGradeInfo.$message.warning('连接超时');
          }
        })
      },
      checkGradeData() {
        let workCheckGradeData = this;
        if (workCheckGradeData.checkGradeName != null && workCheckGradeData.checkGradeName.length > 32) {
          workCheckGradeData.$message.warning('您输入的等级名称长度过长');
          return false;
        }
        workCheckGradeData.$axios({
          method: 'post',
          url: 'http://localhost:61116/level/select',
          data: {
            'header': {
              'pageNum': workCheckGradeData.pageNum,
              'pageSize': workCheckGradeData.pageSize
            },
            'body': {
              'name': workCheckGradeData.checkGradeName, // 将查询等级名称传到后端
              'merchantId': workCheckGradeData.merchantId
            }
          }
        }).then(function (res) {
          workCheckGradeData.loading = true;
          setTimeout(() => {
            workCheckGradeData.loading = false;
          }, 500)
          if (res.data.header.code === '10000') {
            workCheckGradeData.tableData = res.data.body.list;
            workCheckGradeData.totalCount = res.data.body.total;
            console.log('这是查询到的等级数据');
            console.log(workCheckGradeData.tableData);
          } else if (res.data.header.code === '700') {
            workCheckGradeData.$message.warning('连接超时');
          } else if (res.data.header.code === '800') {
            workCheckGradeData.$message.warning('分页错误');
          } else {
            workCheckGradeData.tableData = res.data.body; // 如果没有查到结果也要讲数据插入，只是此时的数据为空(防止查询不到数据时，列表中数据不变)
          }
        }).catch(error => {
          if (error.response.status === 404) {
//            workCheckGradeData.$router.push({
//              path: '/couponTemplate'
//            })
            console.log('凉凉');
          }
        })
      },
      handleCurrentChange(val) {
        this.pageNum = val;
        this.checkGradeData();
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.checkGradeData();
      },
      jumpTo1 () {
        this.$router.push({
          path: '/couponTemplate'
        })
      },
      jumpTo2 () {
        this.$router.push({
          path: '/campaign'
        })
      },
      getCookieDetails() {
        let workThis = this;
        workThis.merchantId = getCookie('merchantId');
        console.log('这是cookie中merchantId');
        console.log('这是cookie中merchantId' + workThis.merchantId);
      }
    },
    created() {
      this.getCookieDetails();
      setTimeout(() => {
        this.checkGradeData();
        this.loading = false;
      }, 1111)
    }
  }
</script>
