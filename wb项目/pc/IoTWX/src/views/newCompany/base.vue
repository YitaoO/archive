<template>
<div class="first">
  <el-row>
    <el-col :span="24" class="tempcol2">
      <div class="search">
        <el-input @keyup.enter.native="handleSearch()" placeholder="请输入..." v-model="searchCondition.key">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch()"></el-button>
        </el-input>
        <el-button @click="handleAdd" icon="el-icon-setting">添加单位</el-button>
        <el-dropdown @command="handleCommand">
          <el-button type="primary">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="highsearch">高级搜索</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-col>
  </el-row>
  <el-row v-if="isHiddenSearch" class="tempcol3">
    <el-form :model="searchCondition" label-width="90px">
      <el-row style="margin-bottom:10px;">
        <el-col :span="12">
          <el-form-item label="用户名字">
            <el-input v-model="searchCondition.userName" /></el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系电话">
            <el-input v-model="searchCondition.telephone" /></el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="公司名称">
            <el-input v-model="searchCondition.compName" /></el-form-item>
        </el-col>
        <el-col :span="12" style="text-align: right;">
          <el-button type="success" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-button type="success" icon="el-icon-refresh" @click="handleReset">重置</el-button>
          <el-button type="success" icon="el-icon-close" @click="handleClose">关闭</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-row>
  <el-row class="history" style="margin-top:10px;">
    <el-table :data="list" height="calc(100% - 60px)">
      <el-table-column type="index" label="序号" :index="indexMethod" width="100"></el-table-column>
      <el-table-column prop="compName" label="单位名称" min-width="100"></el-table-column>
      <el-table-column prop="userName" label="系统管理员" min-width="120"></el-table-column>
      <el-table-column prop="telephone" label="联系电话" min-width="120"></el-table-column>
      <el-table-column prop="location" label="位置" min-width="120"></el-table-column>
      <el-table-column label="操作" align="center" min-width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="handleUpdate(scope.row, true)" class="handleButton">编辑</el-button>
            <el-button type="text" @click="handleUpdate(scope.row, false)" class="handleButton">查看</el-button>
            <el-button type="text" @click="handleDelete(scope.row)" class="">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <pagination :child-option="pageOption"></pagination>
  </el-row>
  <dialogform :dialog.sync="showornot" :temp="temp" :isAdd="isAdd" :title="title" :isReadonly="isReadonly"></dialogform>
</div>
</template>

<script>
import dialogform from "./addForm";
import commonmixins from "@/views/Setting/commonmixins";
import pagination from "@/components/Pagination/pagination";
export default {
  name: "personManagement",
  mixins: [commonmixins],
  components: {
    dialogform,
    pagination
  },
  data() {
    return {
      searchCondition: {
        userName: "",
        compName: "",
        telephone: "",
        key: ""
      },
      pageOption: {
        page: 1,
        limit: 10,
        total: 0
      },
      //按钮权限
      btnPromise:
        this.$store.state.promise.update == undefined
          ? false
          : this.$store.state.promise.update
    };
  },
  watch: {
    isHiddenSearch: function(val) {
      var items = document.querySelectorAll(".first .history");
      if (!val) {
        items[0].style.height = "calc(100% - 81px)";
      } else {
        items[0].style.height = "calc(100% - 192px)";
      }
    }
  },
  destroyed() {
    this.$bus.$off("paginationChange");
  },
  mounted() {
    this.getList();
    // 监听分页组件
    this.$bus.$on("paginationChange", page => {
      this.pageOption.page = page;
      this.getList();
    });
  },
  methods: {
    getList() {
      var loading = this.$utils.loading(
        document.getElementsByClassName("first")[1] ||
          document.getElementsByClassName("first")[0]
      );
      this.searchCondition.page = this.pageOption.page;
      this.searchCondition.limit = this.pageOption.limit;
      this.$customAxios
        .get("company/selectByMap", {
          params: this.searchCondition
        })
        .then(resq => {
          this.list = resq.data;
          this.pageOption.total = resq.total;
          loading.close();
        })
        .catch(error => {
          loading.close();
        });
    },
    handleAdd() {
      this.isAdd = true;
      this.isReadonly = false;
      this.title = "添加单位";
      this.$customAxios
        .get("users/getNextKey")
        .then(resq => {
          this.temp = {
            compId: this.$utils.getNum(),
            compName: "",
            roleName: "系统管理员",
            userId: resq,
            userName: "",
            telephone: "",
            passwordInput: "",
            state: 1,
            addDate: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            isDel: 0,
            addUserId: this.$cookies.getJSON("userInfo").UserID,
            addUserName: this.$cookies.getJSON("userInfo").name
          };
          this.showornot.show = true;
        })
        .catch(error => {});
    },
    handleUpdate(row, isUpdate) {
      this.isAdd = false;
      this.title = `${!!isUpdate ? "编辑" : "查看"}单位信息`;
      this.$customAxios
        .get("company/getById", {
          params: {
            compId: row.compId
          }
        })
        .then(resq => {
          resq.passwordInput = resq.password;
          this.temp = resq;
          this.isReadonly = !!isUpdate ? false : true;
          this.showornot.show = true;
        })
        .catch(error => {});
    },
    handleDelete(row) {
      this.$confirm("确定删除该记录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("qqq");
          this.$customAxios
            .post("company/delete", {
              compId: row.compId,
              userId: row.userId,
              isDel: 1,
              delDate: this.$moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
              delUserId: this.$cookies.getJSON("userInfo").UserID,
              delUserName: this.$cookies.getJSON("userInfo").name
            })
            .then(result => {
              if (result === 1) {
                this.getList();
              }
            })
            .catch(error => {});
        })
        .catch(() => {});
    },
    handleReset() {
      this.searchCondition.userName = "";
      this.searchCondition.telephone = "";
      this.searchCondition.compName = "";
      this.getList();
    }
  }
};
</script>

<style lang="scss">
</style>
