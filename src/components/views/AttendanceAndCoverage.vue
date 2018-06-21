<template>
  <div class="iridium-attendance-and-coverage">
    <h5 class="iridium-attendance-and-coverage-title">员工出勤率与覆盖率统计</h5>
    <section class="iridium-attendance-and-coverage-main">
      <div class="iridium-attendance-and-coverage-label">
          <div class="iridium-attendance-and-coverage-label-name">时间：</div>
          <div class="iridium-attendance-and-coverage-item">
            <DatePicker type="date" :value="dateTime" :editable="editable"  @on-change="handleChange"></DatePicker>
          </div>
          <div class="iridium-attendance-and-coverage-label-name">移动标签名称：</div>
            <div class="iridium-form-item iridium-attendance-and-coverage-item">
              <input class="iridium-form-input" v-model="movingLabel"/>
            </div>
          <div class="iridium-attendance-and-coverage-label-name">项目名称：</div>
          <div class="iridium-attendance-and-coverage-item">
            <select class="iridium-select" v-model="project">
              <option class="iridium-select-option" :key="val.projectId" :value="val.name" v-for="val in projectOptions">{{ val.name }}</option>
            </select>
          </div>
          <div class="iridium-attendance-and-coverage-btn-box">
            <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-attendance-and-coverage-btn">查询</button>
          </div>
        </div>
      <div class="iridium-attendance-and-coverage-tabel">
          <table class="iridium-table iridium-table--center">
            <thead>
              <tr class="iridium-table-row">
                <th class="iridium-table-title">序号</th>
                <th class="iridium-table-title">移动标签ID</th>
                <th class="iridium-table-title">移动标签名称</th>
                <th class="iridium-table-title">出勤率</th>
                <th class="iridium-table-title">覆盖率</th>
                <th class="iridium-table-title">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr class="iridium-table-row" :key="index" v-for="(item,index) in list">
                <td class="iridium-table-item" :key="key" v-for="(val,key) in item">{{val}}</td>
              </tr>
              <tr v-if="!list.length">
                <td  class="iridium-attendance-and-coverage-empty" colspan="22">没有数据</td>
              </tr>
            </tbody>
          </table>
      </div>
      <div class="iridium-attendance-and-coverage-pages flex">
          <div class="flex-1 left">
            <p v-if="!totalNum">显示0项</p>
            <p else>显示{{(currentPage-1)*10+1}}到{{currentPage*10}}条，共{{totalNum}}条</p>
          </div>
          <div class="flex-1">
            <ul class="flex right">
              <li @click="handlePages(1)">
                <a href="javascript:void(0);"
                  class="iridium-attendance-and-coverage-pages-item iridium-attendance-and-coverage-leftborder iridium-attendance-and-coverage-lradius"
                  :class="{aDisable: !pages, aCurrent: currentPage == 1}">首页</a>
              </li>
              <li @click="handlePages(currentPage-1)">
                <a href="javascript:void(0);"
                  class="iridium-attendance-and-coverage-pages-item"
                  :class="{aDisable: pages && pages === 1 || pages && currentPage === 1 || !pages}">上一页</a>
              </li>
              <li @click="handlePages(n)" :key="index" v-for="(n, index) in pages">
                <a href="javascript:void(0);"
                  class="iridium-attendance-and-coverage-pages-item"
                  :class="{ aCurrent:n == currentPage }">{{n}}</a>
              </li>
              <li @click="handlePages(currentPage+1)">
                <a href="javascript:void(0);"
                  class="iridium-attendance-and-coverage-pages-item"
                  :class="{aDisable: pages && pages === 1 || pages && currentPage === pages || !pages}">下一页</a>
              </li>
              <li @click="handlePages(pages)">
                <a href="javascript:void(0);"
                  class="iridium-attendance-and-coverage-pages-item iridium-attendance-and-coverage-rradius"
                  :class="{aDisable: pages && pages === 1 || !pages, aCurrent: currentPage == pages}">末页</a>
              </li>
            </ul>
          </div>
      </div>
    </section>
  </div>
</template>

<script>
import { DatePicker } from 'iview'
export default {
  name: 'attendanceand-coverage',
  components: {
    'DatePicker': DatePicker
  },
  data () {
    return {
      project: '沈阳金域蓝湾（北区）',
      dateTime: '',
      movingLabel: '',
      editable: false,
      projectOptions: [
      ],
      list: [
        {
          'workerLabel': '01',
          'labelStation': '车位、车库保洁岗规则',
          'theoryHour': '144',
          'attendanceHour': '100%',
          'attendanceRate': '100%',
          'coverRate': '备注'
        }
      ],
      pages: 3,
      totalNum: 30,
      currentPage: 1
    }
  },
  methods: {
    handlePages (n) {
      if (this.pages) {
        if (n >= this.pages) {
          this.currentPage = this.pages
        } else if (n <= 1) {
          this.currentPage = 1
        } else {
          this.currentPage = n
        }
        console.log(this.currentPage)
      }
    },
    handleChange (date) {
      this.dateTime = date
    }
  },
  watch: {
    'project' (newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  }
}
</script>
<style scoped>
  @import '../../assets/css/_variables.css';
  @component attendance-and-coverage{
    margin: var(--paddingLargest);
    border-top: 4px solid var(--whiteColorLight);
    background: var(--white);
    color: var(--fontColorNormal);
    font-size: var(--fontBase);

    @descendent title {
      padding: var(--paddingHorizontal);
      border-bottom: 1px solid var(--whiteColorLight);
    }
    @descendent main {
      padding: var(--paddingHorizontal);
    }
    @descendent label {
      width: 100%;
      display: flex;
      padding-bottom: var(--fontBase);
    }
    @descendent label-name {
      line-height: 32px;
      white-space:nowrap;
    }
    @descendent item {
      width: 15%;
      padding: 0 var(--fontBase);
    }
    @descendent item-em {
      padding: 0 var(--fontBase);
      line-height:32px;
    }
    @descendent btn-box {
      padding: 0 var(--fontBase);
    }
    @descendent date {
      position:relative;
    }
    @descendent date-picker {
      box-sizing:border-box;
      position:relative;
    }
    @descendent btn {
      margin: 2px;
    }
    @descendent empty {
      border-bottom: 1px solid var(--tableItemBorderBottomColor);
      padding: var(--tableItemPadding);
      vertical-align: middle;
      text-align: left;
      background: var(--tableTitleBgColor);
    }
    @descendent pages{
      padding: var(--fontBase) 0;
      text-align:left;
    }
    @descendent pages-item{
      padding:2px 8px;
      border:1px solid var(--borderColor);
      border-left:0;
      height:20px;
      line-height:20px;
    }
    @descendent leftborder{
      border-left:1px solid var(--borderColor);
    }
    @descendent lradius{
      border-radius: var(--borderRadiusLarger) 0 0 var(--borderRadiusLarger);
    }
    @descendent rradius{
      border-radius:0 var(--borderRadiusLarger) var(--borderRadiusLarger) 0;
    }
  }
  .iridium-select{
    color: var(--fontColorNormal);
  }
  .iridium-form-item{
    margin-top:0;
  }
  .iridium-form-input{
    width:100%;
  }
  .iridium-select{
    background-size:10% auto;
  }
</style>
