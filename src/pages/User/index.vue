<template>
  <div>
    <PageHeader title="用户列表" />
    <div style="background: #fff">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="管理端" name="0">
          <UserAdmin />
        </el-tab-pane>
        <el-tab-pane label="App端" name="1">
          <UserApp />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/Page/pageHeader";
import UserAdmin from './user_admin'
import UserApp from './user_app'
import { getUserList } from '@/api/user'
export default {
  data () {
    return {
      activeName: '0',
    };
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    }
  },
  components: {
    PageHeader,
    UserAdmin,
    UserApp
  }
};
</script>

<style lang="scss" scoped>
</style>