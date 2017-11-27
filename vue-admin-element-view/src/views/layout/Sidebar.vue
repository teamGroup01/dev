<template>
  <el-menu :default-active="$router.path" unique-opened class="el-menu-demo" mode="vertical" :collapse="collapse">
   <sidebar-item :routes="permission_routers"></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  data() {
    return {
      collapse: false
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'addRouters'
    ])
  },
  methods: {
    handleSelect() {
    }
  },
  components: {
    SidebarItem
  }
}
</script>

<style>

</style>
