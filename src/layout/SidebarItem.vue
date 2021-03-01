<template>
  <div v-if="!item.hidden">
    <template v-if="!item.hidden && item.children">
      <!-- 单个元素 -->
      <el-menu-item
        v-if="item.children.length == 1"
        :index="item.children[0].path"
        :key="item.name"
      >
        <i
          :style="{ color: theme.textColor }"
          v-if="item.children[0].meta.icon"
          :class="item.children[0].meta.icon"
        ></i>
        <span slot="title">{{ item.children[0].meta.title }}</span>
      </el-menu-item>
      <!-- 多个子元素 -->
      <el-submenu v-else :index="item.children[0].path" :key="item.name">
        <template slot="title">
          <i v-if="item.meta.icon" :class="item.meta.icon"></i>
          <span v-if="item.meta && item.meta.title" slot="title">
            {{ item.meta.title }}
          </span>
        </template>
        <template v-for="child in item.children">
          <sidebar-item
            :key="child.path"
            :is-nest="true"
            :item="child"
            class="nest-menu"
          />
        </template>
      </el-submenu>
    </template>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data () {
    this.onlyOneChild = null
    return {}
  },
  computed: {
    ...mapState({
      theme: state => state.theme,
    }),
  },
  methods: {
    hasOneShowingChild (children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    },
  }
}
</script>