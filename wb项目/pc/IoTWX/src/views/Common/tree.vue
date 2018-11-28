<!-- 树形结构 -->
<template>
  <div class="common-tree">
    <el-tree ref="commontree" 
      :data="treeData" 
      :props="defaultProps" 
      @node-click="handleNodeClick" 
      :node-key="nodeKey" 
      highlight-current 
      :render-content="type===2?renderContent:null" 
      default-expand-all>
    </el-tree>
  </div>
</template>

<script>
/**
 * type注释  1:设备模块;2角色模块;3:区域树;4:巡检
 */
export default {
  props: {
    type: {
      type: Number
    },
  },
  data() {
    return {
      filterText: '',
      treeData: [], //数据列表
      defaultProps: {
        children: '',
        label: ''
      },
      roleId: null,
      nodeKey: {
        1: 'areaId',
        2: 'roleId',
        3: 'areaId',
        4: 'crKid'
      }[this.type], // 必须在这里声明该值，不然setExpandedKeys()时老是提示key无值，从而不能正确expand
    };
  },
  watch: {
    type: 'typeChange'
  },
  destroyed() {
    this.$bus.$off('getTreeData2');
  },
  mounted() {
    this.initTree()
  },
  methods: {
    // 初始化
    initTree() {
      switch (Number(this.type)) {
        case 1:
          this.defaultProps.children = 'listAreaUser';
          this.defaultProps.label = 'areaName';
          // 是为了每次进入设备时，load的时候，对应的也要load树。因为设备管理使用了keep-alive。
          this.$bus.$on('getTreeData', () => {
            this.getOptionData();
          })
          break;
        case 2:
          this.defaultProps.children = 'listRole';
          this.defaultProps.label = 'name';
          // 新增角色后，刷新角色树
          this.$bus.$on('getTreeData2', () => {
            this.getOptionData();
          })
          break;
        case 3:
          this.defaultProps.children = 'listAreaUser';
          this.defaultProps.label = 'areaName';
          break;
        case 4:
          this.defaultProps.label = 'name';
          break;
        default:
      }
      this.getOptionData()
    },
    // 监听type变化
    typeChange() {
      this.initTree()
    },
    renderContent(createElement, {
      node,
      data,
      store
    }) {
      if (data.type === 1) { // 角色
        return ( <span style = "vertical-align: middle;display:inline-block;" > <i class = "icon-left icon icon-setting-person" > </i><span style="font-size: 14px;">{data.name}</span></span>);
      }else { // 分组
        return ( <span style = "vertical-align: middle;display:inline-block;" > <i class = "icon-left icon icon-setting-group" > </i><span style="font-size: 14px;">{data.name}</span></span>);
      }
    },
    // 参数配置
    getOptionData() {
      let that = this
      let url = ''
      let params = {}

      switch (that.type) {
        case 1:
          url = 'area/getAllAreaTree'
          params.userId = that.$cookies.getJSON('userInfo').UserID
          break;
        case 2:
          url = 'role/selectRoleTree'
          params.compId = that.$cookies.getJSON('userInfo').compId
          break;
        case 3:
          url = 'area/getAreaTree'
          params.userId = that.$cookies.getJSON('userInfo').UserID
          break;
        case 4:
          url = 'checkRoute/getCheckRoutes'
          break;
        default:
      }
      that.getData(url, params).then(function(datas) {
        switch (that.type) {
          case 3:
            that.$bus.$emit('getFirstArea', (datas.length == 0) ? null : {
              areaId: datas[0].areaId,
              areaName: datas[0].areaName
            });
            break;
          case 4:
            that.$bus.$emit('getCheckRoutesFirst', (datas.length == 0) ? null : datas[0].crKid);
            break;
          default:
        }
      })
    },
    // 获取数据
    getData(url, params) {
      let that = this
      return new Promise(function(resolve, reject) {
        that.$customAxios.get(url, {
          params: params
        }).then(resq => {
          if (url !== 'module/selectModuleTree') {
            that.treeData = resq;
          }
          resolve(resq)
        }).catch(error => {
          reject()
        });
      })
    },
    // 获取节点点击
    handleNodeClick(data) {
      let that = this
      switch (that.type) {
        case 1:
          that.$bus.$emit('getAreaId', data.areaId === '-1' ? null : data.areaId);
          break;
        case 2:
          // 点击的节点是角色时，才加载模块数据
          if (data.type !== 0) {
            that.roleId = data.roleId;
            let loading = this.$utils.loading(document.getElementsByClassName('rolePermission')[0]);
            that.getData('module/selectModuleTree', {
              roleId: that.roleId,
              isAdmin: this.$cookies.getJSON('userInfo').isAdmin
            }).then(function(datas) {
              // 点击角色后，把这个数组拆分了emit给type=3、4、5、6
              that.$bus.$emit('getTreeData3', datas.slice(0, 1), that.roleId);
              that.$bus.$emit('getTreeData4', datas.slice(1, 2), that.roleId);
              that.$bus.$emit('getTreeData5', datas.slice(2, 3), that.roleId);
              that.$bus.$emit('getTreeData6', datas.slice(3, 4), that.roleId);
              loading.close()
            }).catch(function() {
              loading.close()
            })
          } else {
            that.$bus.$emit('getTreeData3', []);
            that.$bus.$emit('getTreeData4', []);
            that.$bus.$emit('getTreeData5', []);
            that.$bus.$emit('getTreeData6', []);
          }
          // 点击节点时，告诉角色模块，我已经选中了一条数据，可进行删改
          this.$bus.$emit('addRole', data);
          break;
        case 3:
          that.$bus.$emit('getFirstArea', {
            areaId: data.areaId,
            areaName: data.areaName
          });
          break;
        case 4:
          that.$bus.$emit('getCheckRoutesFirst', data.crKid);
          break;
        default:
      }
    }
  }
}
</script>

<style lang="scss">
@mixin iconCss($person: 'setting-person', $group: 'setting-group') {
    width: 15px;
    height: 15px;
    margin-right: 4px;
    &.icon-setting-person {
        @include showGlobalImage($person);
    }
    &.icon-setting-group {
        @include showGlobalImage($group);
    }
}

.common-tree {
    height: 100%;
    background: #fff;
    border: 1px solid rgb(220, 223, 225);

    display: flex; // 实现树的滚动条
    flex-direction: column;
    .el-tree {
        overflow: auto;
    }

    .icon-left {
        @include iconCss();
    }
    .is-current {
        .icon-left {
            @include iconCss('setting-person-active', 'setting-group-active');
        }
        .el-tree-node__children {
            // 当父节点选中时，子节点不能继承父亲的高亮节点
            .icon-left {
                @include iconCss();
            }
        }
    }

}
.tree-search {
    border-bottom: solid 1px #dcdfe1;
    .el-input__inner {
        height: 60px;
        border: none !important;
    }
}
/* ------------------------------------------------------------
   树形
------------------------------------------------------------ */

.el-tree-node {
    .el-tree-node__content {
        .el-tree-node__expand-icon {
            width: 10px;
            height: 10px;
            content: url("../../assets/tree-add.png");
        }
        .expanded {
            content: url("../../assets/tree-sub.png");
            transform: rotate(0deg);
        }
        .is-leaf {
            width: 10px;
            height: 10px;
            content: none !important;
        }
    }

    .el-tree-node__content {
        height: 50px;
        padding-left: 22px;
    }

    .is-current {
        .is-focusable {
            .el-tree-node__content {
                background: #e7f8f4;
            }
        }
    }
}

.el-tree-node:focus > .el-tree-node__content {
    background-color: #e7f8f4;
}
</style>
