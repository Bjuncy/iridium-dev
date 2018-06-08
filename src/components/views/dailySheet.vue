<template>
  <div class="iridium-daily-sheet">
    <h5 class="iridium-daily-sheet-title">结算日报表</h5>
    <section class="iridium-daily-sheet-main flex">
      <div class="iridium-daily-sheet-date">
        <div class="iridium-form-item">
          <label for="input" class="iridium-form-label">工作时段：</label>
          <input id="input" class="iridium-form-input" />
          <span class="iridium-daily-sheet-calendar"><i class="fa fa-calendar"></i></span>
        </div>
        
      </div>
    </section>
  </div>
</template>

<script>

export default {
  name: 'dailySheet'
}
</script>
<style scoped>
  @import '../../assets/css/_variables.css';
  @component daily-sheet{
    margin: var(--paddingLargest);
    border-top: 4px solid var(--whiteColorLight);
    background: var(--white);

    @descendent title {
      padding: var(--paddingBase);
      color: var(--fontColorNormal);
      border-bottom: 1px solid var(--whiteColorLight);
      font-size: var(--fontBase);
    }

    @descendent main {
      padding: var(--paddingBase);
    }
    @descendent date {
      display: flex;
      margin-bottom:10px;
    }
    @descendent calendar {
      display: inline-block;
      border:1px solid var(--borderColor);
      padding: var(--paddingBase);
      height: var(--headingLevel1);
    }
    
    
  }
</style>
