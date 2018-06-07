<template>
  <div class="iridium-demo-forms">
    <div class="block">
      <h3>默认表单</h3>
      <form class="iridium-form">
        <input class="iridium-form-input" />
        <input class="iridium-form-input" disabled="disabled" /><br>
        <label for="input" class="iridium-form-label">label：</label>
        <input id="input" class="iridium-form-input" />
        <textarea class="iridium-form-textarea">多行文本框</textarea>
      </form>
    </div>
    <div class="block">
      <h3>垂直表单</h3>
      <form class="iridium-form iridium-form--vertical">
        <label class="iridium-form-label">
          label：
        </label>
        <input class="iridium-form-input" />
      </form>
      <form class="iridium-form iridium-form--vertical">
        <label for="textarea3" class="iridium-form-label">
          label：
        </label>
        <textarea id="textarea3" class="iridium-form-textarea" />
      </form>
    </div>
    <div class="block">
      <h3>水平表单</h3>
      <form class="iridium-form iridium-form--horizontal">
        <label class="iridium-form-label">
          label：
        </label>
        <input class="iridium-form-input" disabled="disabled" />
      </form>
      <form class="iridium-form iridium-form--horizontal">
        <label for="textarea3" class="iridium-form-label">
          label：
        </label>
        <textarea id="textarea3" class="iridium-form-textarea disabled" />
      </form>
    </div>
    <div class="block">
      <h3>居中表单</h3>
      <form class="iridium-form center">
        <label class="iridium-form-label">
          label：
        </label>
        <input class="iridium-form-input" disabled="disabled" />
      </form>
      <form class="iridium-form iridium-form--vertical center">
        <label class="iridium-form-label">
          label：
        </label>
        <input class="iridium-form-input" disabled="disabled" />
      </form>
      <form class="iridium-form iridium-form--horizontal center">
        <label class="iridium-form-label">
          label：
        </label>
        <input class="iridium-form-input" disabled="disabled" />
      </form>
    </div>
    <div class="block">
      <h3>下拉菜单</h3>
      <select class="iridium-select">
        <option class="iridium-select-option" value="1">11</option>
        <option class="iridium-select-option" value="1">11</option>
        <option class="iridium-select-option" value="1">11</option>
      </select>
      <div class="iridium-select"></div>
      <ul class="iridium-dropdown">
        <li class="iridium-dropdown-option">111</li>
        <li class="iridium-dropdown-option">111</li>
        <li class="iridium-dropdown-option">111</li>
      </ul>
      <div class="iridium-select disabled"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemoForms'
}
</script>

<style scoped>
.iridium-form-textarea {
  height: 60px;
}
</style>
