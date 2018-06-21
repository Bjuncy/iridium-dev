<template>
  <div class="iridium-monthly-sheet">
    <h5 class="iridium-monthly-sheet-title">考勤月报表</h5>
    <section class="iridium-monthly-sheet-main">
        <div class="iridium-monthly-sheet-label">
          <div class="iridium-monthly-sheet-label-name">工作时段：</div>
          <div class="iridium-monthly-sheet-item">
            <DatePicker type="date" :value="startTime" :editable="editable"  @on-change="handleChange"></DatePicker>
          </div>
          <span class="iridium-monthly-sheet-item-em">到</span>
          <div class="iridium-monthly-sheet-item">
            <DatePicker type="date" :value="endTime" :editable="editable" @on-change="handleChange2"></DatePicker>
          </div>
          <div class="iridium-monthly-sheet-item">
            <select class="iridium-select" v-model="project">
              <option class="iridium-select-option" :key="val.projectId" :value="val.name" v-for="val in projectOptions">{{ val.name }}</option>
            </select>
          </div>
          <div class="iridium-monthly-sheet-btn-box">
            <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-monthly-sheet-btn">查询</button>
            <button class="iridium-btn iridium-btn--danger iridium-btn--smaller iridium-monthly-sheet-btn"><a class="aDownload" href="#" download="../../assets/images/logo-nav-hide.png">导出</a></button>
          </div>
        </div>
        <div class="iridium-monthly-sheet-tabel">
          <table class="iridium-table iridium-table--center">
            <thead>
              <tr class="iridium-table-row">
                <th rowspan="3" class="iridium-table-title">员工<br/>标签号</th>
                <th rowspan="3" class="iridium-table-title">标签<br/>岗位</th>
                <th colspan="3" rowspan="1" class="iridium-table-title">出勤情况</th>
                <th colspan="2" rowspan="1" class="iridium-table-title">覆盖情况</th>
                <th colspan="2" rowspan="1" class="iridium-table-title">抽查清理结果</th>
                <th colspan="2" rowspan="1" class="iridium-table-title">报警情况</th>
                <th colspan="2" class="iridium-table-title">补卡情况</th>
                <th colspan="3" class="iridium-table-title">工资情况</th>
                <th rowspan="3" class="iridium-table-title">备注</th>
              </tr>
              <tr class="iridium-table-row">
                <th rowspan="2" class="iridium-table-title">理论<br/>工时</th>
                <th rowspan="2" class="iridium-table-title">出勤<br/>工时</th>
                <th rowspan="2" class="iridium-table-title">出勤率<br/>（出勤工时/合同工时）</th>
                <th rowspan="2" class="iridium-table-title">覆盖率</th>
                <th rowspan="2" class="iridium-table-title">覆盖率<br/>考核工时</th>
                <th rowspan="2" class="iridium-table-title">抽查<br/>岗位数</th>
                <th rowspan="2" class="iridium-table-title">清洁结果<br/>考核工时</th>
                <th rowspan="2" class="iridium-table-title">聚岗考核<br/>工时数</th>
                <th rowspan="2" class="iridium-table-title">漏岗考核<br/>工时数</th>
                <th rowspan="2" class="iridium-table-title">补卡次数</th>
                <th rowspan="2" class="iridium-table-title">补卡<br/>工时数</th>
                <th rowspan="2" class="iridium-table-title">应得<br/>工时</th>
                <th rowspan="2" class="iridium-table-title">工时单价<br/>（元）</th>
                <th rowspan="2" class="iridium-table-title">实际工资<br/>（元）</th>
              </tr>
            </thead>
            <tbody>
              <tr class="iridium-table-row" :key="index" v-for="(item,index) in list">
                <td class="iridium-table-item" :key="key" v-for="(val,key) in item">{{val}}</td>
              </tr>
              <tr v-if="!list.length">
                <td  class="iridium-monthly-sheet-empty" colspan="22">没有数据</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="iridium-monthly-sheet-pages flex">
          <div class="flex-1 left">
            <p v-if="!totalNum">显示0项</p>
            <p else>显示{{(currentPage-1)*10+1}}到{{currentPage*10}}条，共{{totalNum}}条</p>
          </div>
          <div class="flex-1">
            <ul class="flex right">
              <li @click="handlePages(1)">
                <a href="javascript:void(0);"
                  class="iridium-monthly-sheet-pages-item iridium-monthly-sheet-leftborder iridium-monthly-sheet-lradius"
                  :class="{aDisable: !pages, aCurrent: currentPage == 1}">首页</a>
              </li>
              <li @click="handlePages(currentPage-1)">
                <a href="javascript:void(0);"
                  class="iridium-monthly-sheet-pages-item"
                  :class="{aDisable: pages && pages === 1 || pages && currentPage === 1 || !pages}">上一页</a>
              </li>
              <li @click="handlePages(n)" :key="index" v-for="(n, index) in pages">
                <a href="javascript:void(0);"
                  class="iridium-monthly-sheet-pages-item"
                  :class="{ aCurrent:n == currentPage }">{{n}}</a>
              </li>
              <li @click="handlePages(currentPage+1)">
                <a href="javascript:void(0);"
                  class="iridium-monthly-sheet-pages-item"
                  :class="{aDisable: pages && pages === 1 || pages && currentPage === pages || !pages}">下一页</a>
              </li>
              <li @click="handlePages(pages)">
                <a href="javascript:void(0);"
                  class="iridium-monthly-sheet-pages-item iridium-monthly-sheet-rradius"
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
  name: 'MonthlySheet',
  components: {
    'DatePicker': DatePicker
  },
  data () {
    return {
      project: '沈阳金域蓝湾（北区）',
      startTime: '',
      endTime: '',
      editable: false,
      projectOptions: [
        {
          'projectId': '00',
          'code': '21010011',
          'name': '沈阳金域蓝湾（北区）',
          'title': '沈阳金域蓝湾（北区）',
          'address': '沈阳市浑南新区朗日街1号',
          'price': '10.66',
          'leader': '柳丽霞',
          'phone': '15142077879',
          'supplier': '济宁亚旗物业服务有限公司'
        },
        {
          'projectId': '01',
          'code': '21010005',
          'name': '金色家园',
          'title': '金色家园',
          'address': '沈阳市大东区八王寺街28号万科金色家园',
          'price': '9.26',
          'leader': '高会涛',
          'phone': '18202416225',
          'supplier': '济宁亚琪物业服务有限公司'
        }
      ],
      list: [
        {
          'workerLabel': '01',
          'labelStation': '车位、车库保洁岗规则',
          'theoryHour': '144',
          'attendanceHour': '144',
          'attendanceRate': '100%',
          'coverRate': '93%',
          'coverCheckHour': '-1.66',
          'checkJobs': 0,
          'cleanCheckHour': '0',
          'meetJobsHour': 0,
          'missJobHour': 0,
          'addCards': 0,
          'addCardsHour': '1.5',
          'dueHour': '143.84',
          'hourPrice': '9.26',
          'realwage': '1331.96',
          'remark': '备注'
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
      this.startTime = date
    },
    handleChange2 (date) {
      this.endTime = date
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
  @component monthly-sheet{
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
      width: 25%;
      padding: 0 var(--fontBase);
    }
    @descendent item-em {
      padding: 0 var(--fontBase);
      line-height:32px;
    }
    @descendent btn-box {
      padding: 0 var(--fontBase);
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
</style>
