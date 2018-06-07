<template>
  <div class="iridium-demo-list">
    <demo-headings/>
    <demo-buttons/>
    <demo-badges/>
    <demo-forms/>
    <demo-tables/>
  </div>
</template>

<script>
import DemoHeadings from './DemoHeadings'
import DemoButtons from './DemoButtons'
import DemoBadges from './DemoBadges'
import DemoForms from './DemoForms'
import DemoTables from './DemoTables'
export default {
  name: 'DemoList',
  components: {
    DemoHeadings,
    DemoButtons,
    DemoBadges,
    DemoForms,
    DemoTables
  }
}
</script>

<style>
body {
  background: white;
}
.iridium-header,
.iridium-navigator {
  display: none;
}
.iridium-main {
  height: auto;
  overflow-y: scroll;
}
.block {
  width: 480px;
  margin: 20px auto;
  font-size: 14px;
}
</style>
