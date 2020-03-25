<template>
  <div class="custom-tree-container">
    <div class="block">
      <p>组织架构图</p>
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent">
      </el-tree>

      <el-dialog title="新增部门" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" size="medium">
          <el-form-item label="部门:">
            <el-input
              v-model="form.departmentName"
              clearable
            />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="insertFalse">取 消</el-button>
          <el-button type="primary" @click="insert">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  let id = 1000;

  export default {
    data() {
      const data = [];
      return {
        data: JSON.parse(JSON.stringify(data)),
        dialogFormVisible: false,
        form: {
          departmentName: ''
        },
        data1: []

      }
    },

    created() {
      this.getOrganization();
    },

    methods: {
      append(data) {
        this.data1 = data,
        this.dialogFormVisible = true
      },

      insert(){
        const workThis = this
        const newChild = { id: id++, label: workThis.form.departmentName, children: [] };
        if (!workThis.data1.children) {
          workThis.$set(this.data1, 'children', []);
        }
        workThis.data1.children.push(newChild);
        // 请求后台
        this.$axios({
          method: 'post',
          url: 'api/consumer/insertOrganization',
          data: {
            'label': newChild.label,
            'superOId': this.data1.oId
          }
        }).then(function(res) {
          console.log("进入了")
          workThis.dialogFormVisible = false
        })
      },
      insertFalse(){
        this.dialogFormVisible = false
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

      getOrganization() {
        const workThis = this
        workThis.$axios({
          method: 'post',
          url: 'api/consumer/getOrganization',
          data: {
          }
        }).then(function(res) {
          workThis.data = res.data.data
        })
      },

      renderContent(h, { node, data, store }) {
        return (
          <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
          <el-button size="mini" type="text" on-click={ () => this.append(data) }>新增</el-button>
        <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
        </span>
        </span>);
      }
    }
  };
</script>

<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 800px;
  }
</style>
