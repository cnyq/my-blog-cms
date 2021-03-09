<template>
  <el-menu
    :default-active="handleActive($route.path)"
    class="aside-menu"
    background-color="#fff"
    text-color="#000"
    active-text-color="#fff"
    :collapse="isCollapse"
    :unique-opened="true"
    :router="true"
  >
    <template v-for="(items, index) in menuList">
      <template v-if="items.children.length > 0">
        <el-submenu :index="items.router" :key="index">
          <template slot="title">
            <i :class="items.icon"></i>
            <span slot="title">{{ items.title }}</span>
          </template>
          <el-menu-item
            v-for="(item, idx) in items.children"
            :key="idx"
            :index="item.router"
            >{{ item.title }}</el-menu-item
          >
        </el-submenu>
      </template>
      <template v-if="items.children.length === 0">
        <el-menu-item :index="items.router" :key="index">
          <i :class="items.icon"></i>
          <span slot="title">{{ items.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
<script>
import { menuList } from "@/assets/mock"
import { mapGetters } from "vuex"
export default {
  data() {
    return {
      menuList: menuList,
    }
  },
  computed: {
    ...mapGetters(["isCollapse"]),
    handleActive() {
      return (path) => {
        return path.replace("Detali", "")
      }
    },
  },
  methods: {
    iconState(path) {
      return path == "/home" ? "el-icon-s-home" : "el-icon-menu"
    },
  },
}
</script>