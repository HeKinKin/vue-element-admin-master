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
        data: JSON.parse(JSON.stringify(data))
      }
    },

    created() {
      this.getOrganization();
    },

    methods: {
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
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
