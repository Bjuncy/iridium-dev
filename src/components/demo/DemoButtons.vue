<template>
  <div class="iridium-demo-buttons">
    <div class="block">
      <h3>常规按钮</h3>
      <button class="iridium-btn iridium-btn--default">按钮</button>
      <button class="iridium-btn iridium-btn--primary">按钮</button>
      <button class="iridium-btn iridium-btn--success">按钮</button>
      <button class="iridium-btn iridium-btn--info">按钮</button>
      <button class="iridium-btn iridium-btn--warning">按钮</button>
      <button class="iridium-btn iridium-btn--danger">按钮</button>
      <button class="iridium-btn iridium-btn--white">按钮</button>
      <button class="iridium-btn iridium-btn--link">按钮</button>
    </div>
    <div class="block">
      <h3>常规按钮禁用</h3>
      <button class="iridium-btn iridium-btn--default" disabled="disabled">按钮</button>
      <button class="iridium-btn iridium-btn--primary" disabled="disabled">按钮</button>
      <button class="iridium-btn iridium-btn--success" disabled="disabled">按钮</button>
      <button class="iridium-btn iridium-btn--info" disabled="disabled">按钮</button>
      <button class="iridium-btn iridium-btn--warning" disabled="disabled">按钮</button>
      <button class="iridium-btn iridium-btn--danger disabled">按钮</button>
      <button class="iridium-btn iridium-btn--white disabled">按钮</button>
      <button class="iridium-btn iridium-btn--link disabled">按钮</button>
    </div>
    <div class="block">
      <h3>按钮尺寸</h3>
      <button class="iridium-btn iridium-btn--default iridium-btn--larger">按钮</button>
      <button class="iridium-btn iridium-btn--default">按钮</button>
      <button class="iridium-btn iridium-btn--default iridium-btn--smaller">按钮</button>
      <button class="iridium-btn iridium-btn--default iridium-btn--smallest">按钮</button>
      <button class="iridium-btn iridium-btn--primary iridium-btn--full">按钮</button>
      <button class="iridium-btn-outline iridium-btn-outline--primary iridium-btn-outline--full">按钮</button>
    </div>
    <div class="block">
      <h3>线框按钮</h3>
      <button class="iridium-btn-outline iridium-btn-outline--default">按钮</button>
      <button class="iridium-btn-outline iridium-btn-outline--primary">按钮</button>
      <button class="iridium-btn-outline iridium-btn-outline--success">按钮</button>
      <button class="iridium-btn-outline iridium-btn-outline--info">按钮</button>
      <button class="iridium-btn-outline iridium-btn-outline--warning">按钮</button>
      <button class="iridium-btn-outline iridium-btn-outline--danger">按钮</button>
    </div>
    <div class="block">
      <h3>线框按钮禁用</h3>
      <button class="iridium-btn-outline iridium-btn-outline--default" disabled="disabled">按钮</button>
      <button class="iridium-btn-outline iridium-btn-outline--primary disabled">按钮</button>
      <button class="iridium-btn-outline iridium-btn-outline--success disabled">按钮</button>
      <button class="iridium-btn-outline iridium-btn-outline--info disabled">按钮</button>
      <button class="iridium-btn-outline iridium-btn-outline--warning disabled">按钮</button>
      <button class="iridium-btn-outline iridium-btn-outline--danger disabled">按钮</button>
    </div>
    <div class="block">
      <h3>按钮组</h3>
      <div class="iridium-btn-group">
        <button class="iridium-btn-outline iridium-btn-outline--default iridium-btn-group--first">最前</button>
        <button class="iridium-btn-outline iridium-btn-outline--default iridium-btn-group--mid active">中间</button>
        <button class="iridium-btn-outline iridium-btn-outline--default iridium-btn-group--mid">中间</button>
        <button class="iridium-btn-outline iridium-btn-outline--default iridium-btn-group--mid">中间</button>
        <button class="iridium-btn-outline iridium-btn-outline--default iridium-btn-group--mid">中间</button>
        <button class="iridium-btn-outline iridium-btn-outline--default iridium-btn-group--last">最后</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoButtons'
}
</script>
