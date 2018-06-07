<template>
  <div class="iridium-dropdown">
    <i :class=""></i>
    <span>{{ title }}</span>
    <ul>
      <li v-for="(item, index) in datalist" :key="index" @click="to(item)">{{ item.text }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CommonDropdown',
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '下拉菜单'
    },
    datalist: {
      type: Array,
      default () {
        return [
          {}
        ]
      }
    }
  },
  methods: {
    to (item) {
      item.href && this.$router.push({
        name: item.href
      })
    }
  }
}
</script>
