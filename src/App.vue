<template>
  <div id="app" class="iridium">
    <base-navigator/>
    <div class="iridium-main">
      <base-header/>
      <router-view/>
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/components/universal/BaseHeader'
import BaseNavigator from '@/components/universal/BaseNavigator'
export default {
  name: 'App',
  components: {
    BaseHeader,
    BaseNavigator
  }
}
</script>

<style>
@import './assets/css/iridium.css';
.iridium {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.iridium-main {
  flex: 1;
}
</style>
