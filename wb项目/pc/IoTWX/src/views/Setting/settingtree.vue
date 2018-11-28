<!-- 树形结构 -->
<template>
  <div class="common-tree" v-show="showTree" style="border: 1px solid rgb(220, 223, 225);margin-left:10px;margin-bottom:10px;">
    <el-tree :ref="moduletree" 
      :data="treeData" 
      :props="defaultProps" 
      :node-key="nodeKey" 
      highlight-current 
      default-expand-all
      :expand-on-click-node="false"
      show-checkbox
      @check="checkNode">
      <!-- 该span暂时仅给角色权限那里使用，已做了过滤处理。其他模块可忽略 -->
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-if="data.buttonList!=null && data.buttonList.length>0">
          <el-checkbox v-model="item.checked" v-for="(item, index) in data.buttonList" 
            @change="() => changeBox(data, item)" :key="index">{{item.name}}</el-checkbox>
        </span>
        <span v-if="data.parent===0">
          <el-switch v-model="data.checked" active-color="#13ce66" inactive-color="#ff4949" 
            @change="changeSwitch(data)"></el-switch>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData: [], //数据列表
      defaultProps: {
        children: 'moduleList',
        label: 'name'
      },
      nodeKey: 'modId',
      roleId: null,
      showTree: false,
      ref: null
    };
  },
  destroyed() {
    this.$bus.$off('getTreeData3');
    this.$bus.$off('getTreeData4');
    this.$bus.$off('getTreeData5');
    this.$bus.$off('getTreeData6');
  },
  mounted() {
    this.$nextTick(() => {
      switch (this.type) {
        case 3:
          this.ref = this.$refs.moduletree3
          break;
        case 4:
          this.ref = this.$refs.moduletree4
          break;
        case 5:
          this.ref = this.$refs.moduletree5
          break;
        default:
          this.ref = this.$refs.moduletree6
      }
    })
    // type注释:  权限模块   3 首页 4 日常管理 5 统计报表 6 设置
    this.$bus.$on('getTreeData' + this.type, (arr, roleId) => {
      if(!this.$utils.isNull(roleId)) this.roleId = roleId
      else this.roleId = null
      if(arr.length>0) {
        this.showTree = true
        this.createTreeList(arr[0]) // 调整树结构
        this.treeData = arr; 
        this.$nextTick(() => {
          this.ref.setCheckedNodes(this.createCheckNodes(this.treeData[0], [])); // 得到有效的checknode
        })
        this.$store.commit('setTreeDate' + this.type, this.createDate(this.treeData, [])); // 把所有checknode赋给全局变量
      }else{
        this.treeData = arr; 
        this.showTree = false
        this.$store.commit('setTreeDate' + this.type, []);
      }
    })
  },
  methods: {
    // 调整模块树的数据结构：把权限 moduleList 剪切到 buttonList，为了满足树的展示
    createTreeList(arr){
      var list = arr.moduleList
      if(list.length>0){
        for(var i=0;i<list.length;i++){
          if(list[i].modType === 3){
            arr.buttonList = list.concat();
            arr.moduleList = [];
            break;
          }else{
            this.createTreeList(list[i])
          }
        }
      }
    },
    /* 修改时，只 setCheckedNodes 那些有效的node。何为有效，就是只有当子节点全部勾中时，父节点才能勾中
    * 所以在这里只展示两种情况的node：没有 moduleList 和 buttonList；有 buttonList
    */
    createCheckNodes(arr, checkedNodes){
      if(arr.checked){
        var moduleList = arr.moduleList
        var buttonList = arr.buttonList
        var moduleListIsnull = this.$utils.isNull(moduleList) || moduleList.length === 0;
        var buttonListIsnull = this.$utils.isNull(buttonList) || buttonList.length === 0;
        if((moduleListIsnull && buttonListIsnull) || (moduleListIsnull && !buttonListIsnull)){
          checkedNodes.push(arr);
        }
        // 再遍历 moduleList
        if(!this.$utils.isNull(moduleList) && moduleList.length>0){
          for(var i=0; i<moduleList.length; i++){
            this.createCheckNodes(moduleList[i], checkedNodes)
          }
        }
      }
      return checkedNodes
    },
    onSubmit(){
      var arr3 = this.$store.state.treeDate3
      var arr4 = this.$store.state.treeDate4
      var arr5 = this.$store.state.treeDate5
      var arr6 = this.$store.state.treeDate6
      var arr = arr3.concat(arr4, arr5, arr6);
      if(!this.$utils.isNull(arr) && arr.length>0){
        var loading = this.$utils.loading(document.getElementsByClassName('rolePermission')[0]);
        this.$customAxios.post('roleModule/addList', {
          rmList: arr
        })
        .then(resq => {
          loading.close()
          this.$notify.success({
            title: "提示",
            message: `修改权限成功`
          });
        })
        .catch(error => loading.close());
      }else{
        var loading = this.$utils.loading(document.getElementsByClassName('rolePermission')[0]);
        arr = [{modId: null, roleId: this.roleId}]
        this.$customAxios.post('roleModule/addList', arr)
        .then(resq => {
          loading.close()
          this.$notify.error({
            title: "提示",
            message: `修改权限成功`
          });
        })
        .catch(error => loading.close())
      }
    },
    // 点击树的多选框时触发
    checkNode(data, CheckedNodes, isTree){
      if(isTree === undefined){ // 点击树的多选框；为true时是点击权限按钮
        // 如果该节点不在getCheckedNodes里，把该节点一下的所有buttonList 的check置为false
        var flag = false;
        for(var i=0; i<CheckedNodes.checkedKeys.length; i++){
          if(data.modId === CheckedNodes.checkedKeys[i]){
            flag = true
            break;
          }
        }
        if(!flag) data.checked = false
        else data.checked = true
        this.setButtonListFalse(data, data.checked);
      }
      var arr = []
      // 半选中的。
      var halfCheckNodes = this.ref.getHalfCheckedNodes()
      arr = this.getAllCheckedNodes(halfCheckNodes, arr);
      // 选中的。
      var checkNodes = this.ref.getCheckedNodes();
      arr = this.getAllCheckedNodes(checkNodes, arr);
      this.$store.commit('setTreeDate' + this.type, arr);
      // 如果两个list为空，把第一级节点的checked置为关
      if(this.treeData.length>0) {
        this.treeData[0].checked = arr.length === 0?false:true;
      }
      this.onSubmit();
    },
    // 把某节点一下的所有buttonList 的check置为false
    setButtonListFalse(data, isCheck){
      if(!isCheck && !this.$utils.isNull(data.buttonList) && data.buttonList.length>0){
        for(var j=0; j<data.buttonList.length; j++){
          data.buttonList[j].checked = isCheck
        }
      }
      data.checked = isCheck
      // 再遍历 moduleList
      if(!this.$utils.isNull(data.moduleList) && data.moduleList.length>0){
        for(var i=0; i<data.moduleList.length; i++){
          this.setButtonListFalse(data.moduleList[i], isCheck)
        }
      }
    },
    // 把自己和 buttonList.checked=true 的数据 push进数组
    getAllCheckedNodes(checkNodes, arr){
      for(var i=0; i<checkNodes.length; i++){
        arr.push({modId: checkNodes[i].modId, roleId: this.roleId});
        var buttonList = checkNodes[i].buttonList
        if(!this.$utils.isNull(buttonList) && buttonList.length>0){
          for(var j=0; j<buttonList.length; j++){
            if(buttonList[j].checked){
              arr.push({modId: buttonList[j].modId, roleId: this.roleId});
            }
          }
        }
      }
      return arr;
    },
    // 点击权限按钮的多选框
    changeBox(data, item) {
      if(item.checked){ // 勾选时，对应的模块要勾上；去掉勾时，不操作
        this.ref.setChecked(data, true)
        if(item.jsPath === 'update'){
          // 遍历data，找到 list， set checked = true
          if(!this.$utils.isNull(data.buttonList) && data.buttonList.length>0){
            for(var j=0; j<data.buttonList.length; j++){
              if(data.buttonList[j].jsPath === 'list'){
                data.buttonList[j].checked = item.checked
              }
            }
          }
        }
      }else{
        if(item.jsPath === 'list'){
          // 遍历data，找到 update, set checked = false
          if(!this.$utils.isNull(data.buttonList) && data.buttonList.length>0){
            for(var j=0; j<data.buttonList.length; j++){
              if(data.buttonList[j].jsPath === 'update'){
                data.buttonList[j].checked = item.checked
              }
            }
          }
        }
      }
      this.checkNode(data, item, true);
    },
    changeSwitch(data){
      this.checkAll(data, data.checked); 
      var arr = [];
      if(data.checked){ // 打开时，选中所有
        this.ref.setCheckedNodes([this.treeData[0]]);
        arr = this.createDate(this.treeData, []); // 组装成形如：[{modId :100, roleId :1}]
      }else{ // 关闭时，去掉所有
        this.ref.setCheckedNodes([]);
      }
      this.$store.commit('setTreeDate' + this.type, arr);
      this.onSubmit();
    },
    // 如果开关打开，子节点的 checked 全部改为 true ，否则反之
    checkAll(item, value){
      // 如果该 item 有 buttomlist ，则全部设为 value
      if(!this.$utils.isNull(item.buttonList) && item.buttonList.length>0){
        for(var j=0; j<item.buttonList.length; j++){
          item.buttonList[j].checked = value;
        }
      }
      // 自己本身的 checked 要改成关闭/打开
      item.checked = value;
      // 如果该 item 有 moduleList ，则遍历该 moduleList 里面的所有 buttomlist，全部设为 value
      if(!this.$utils.isNull(item.moduleList) && item.moduleList.length>0){
        var ml = item.moduleList;
        for(var i=0; i<ml.length; i++){
          this.checkAll(ml[i], value);
        }
      }
    },
    // 得到所有 checked=true 的数组
    createDate(data, arr){
      if(!this.$utils.isNull(data) && data.length>0){
        for(var i=0; i<data.length; i++){
          if(data[i].checked){
            // 把自己 push 进去
            arr.push({modId: data[i].modId, roleId: this.roleId});
            if(!this.$utils.isNull(data[i].buttonList) && data[i].buttonList.length>0){
              for(var j=0; j<data[i].buttonList.length; j++){
                if(data[i].buttonList[j].checked){
                  // 把 buttonList push 进去
                  arr.push({modId: data[i].buttonList[j].modId, roleId: this.roleId});
                }
              }
            }
            // 再遍历 moduleList ，判断里面的对象和 buttonList，以此类推
            this.createDate(data[i].moduleList, arr)
          }
        }
      }
      return arr
    }
  },
  props: {
    type: {
      type: Number
    },
    moduletree: {
      type: String
    }
  }
}
</script>

<style lang="scss">
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
