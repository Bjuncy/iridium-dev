<template>
  <div class="iridium-daily-sheet">
    <h5 class="iridium-daily-sheet-title">结算日报表</h5>
    <section class="iridium-daily-sheet-main">
        <div class="iridium-daily-sheet-label">
          <div class="iridium-daily-sheet-label-name">移动标签：</div>
          <div class="iridium-daily-sheet-item">
            <select class="iridium-select" v-model="labels">
              <option class="iridium-select-option" value="请选择">请选择</option>
              <option class="iridium-select-option" :key="val.labelId" :value="val.name" v-for="val in labelOptions">{{ val.name }}</option>
            </select>
          </div>
          <div class="iridium-daily-sheet-item">
            <select class="iridium-select" v-model="project">
              <option class="iridium-select-option" :key="val.projectId" :value="val.name" v-for="val in projectOptions">{{ val.name }}</option>
            </select>
          </div>
        </div>
        <div class="iridium-daily-sheet-label">
          <div class="iridium-daily-sheet-date iridium-daily-sheet-item">
            <div class="iridium-daily-sheet-date-picker">
              <DatePicker ref="picker" type="date" :value="dateVal" :editable="editable" @on-change="handleChange" :open="open" @on-open-change="handleOpenChange"></DatePicker>
            </div>
            <span @click="handleCalendar" class="iridium-daily-sheet-calendar-icon"><i class="fa fa-calendar"></i></span>
          </div>
          <div class="iridium-daily-sheet-btn-box">
            <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-daily-sheet-btn">查询</button>
            <button class="iridium-btn iridium-btn--danger iridium-btn--smaller iridium-daily-sheet-btn"><a class="aDownload" href="#" download="../../assets/images/logo-nav-hide.png">导出</a></button>
          </div>
        </div>
        <div class="iridium-daily-sheet-tabel">
          <table class="iridium-table iridium-table--center">
            <thead>
              <tr class="iridium-table-row">
                <th rowspan="3" class="iridium-table-title">标签号</th>
                <th rowspan="3" class="iridium-table-title">日期</th>
                <th colspan="3" rowspan="1" class="iridium-table-title">出勤情况</th>
                <th colspan="6" rowspan="1" class="iridium-table-title">覆盖情况</th>
                <th colspan="4" rowspan="1" class="iridium-table-title">抽查清洁结果</th>
                <th colspan="4" rowspan="1" class="iridium-table-title">报警情况</th>
                <th rowspan="3" class="iridium-table-title">应得工时</th>
                <th rowspan="3" class="iridium-table-title">补工时</th>
                <th rowspan="3" class="iridium-table-title">最终得到工时</th>
              </tr>
              <tr class="iridium-table-row">
                <th rowspan="2" class="iridium-table-title">时间（上）</th>
                <th rowspan="2" class="iridium-table-title">时间（下）</th>
                <th rowspan="2" class="iridium-table-title">工时</th>

                <th rowspan="2" class="iridium-table-title">点位数</th>
                <th rowspan="2" class="iridium-table-title">覆盖数（一）</th>
                <th rowspan="2" class="iridium-table-title">覆盖数（二）</th>
                <th rowspan="2" class="iridium-table-title">覆盖率</th>
                <th rowspan="2" class="iridium-table-title">考核剩余工时</th>
                <th rowspan="2" class="iridium-table-title">备注</th>

                <th rowspan="2" class="iridium-table-title">时间</th>
                <th rowspan="2" class="iridium-table-title">地点</th>
                <th rowspan="2" class="iridium-table-title">考核等级</th>
                <th rowspan="2" class="iridium-table-title">考核工时</th>

                <th rowspan="2" class="iridium-table-title">时间段</th>
                <th rowspan="2" class="iridium-table-title">报警原因</th>
                <th rowspan="2" class="iridium-table-title">考核工时</th>
                <th rowspan="2" class="iridium-table-title">备注</th>
              </tr>
            </thead>
            <tbody>
              <tr class="iridium-table-row" :key="index" v-for="(item,index) in list">
                <td class="iridium-table-item" :key="key" v-for="(val,key) in item">{{val}}</td>
              </tr>
              <tr v-if="!list.length">
                <td  class="iridium-daily-sheet-empty" colspan="22">没有数据</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="iridium-daily-sheet-pages flex">
          <div class="flex-1 left">
            <p v-if="!totalNum">显示0项</p>
            <p else>显示{{(currentPage-1)*10+1}}到{{currentPage*10}}条，共{{totalNum}}条</p>
          </div>
          <div class="flex-1">
            <ul class="flex right">
              <li @click="handlePages(1)">
                <a href="javascript:void(0);"
                  class="iridium-daily-sheet-pages-item iridium-daily-sheet-leftborder iridium-daily-sheet-lradius"
                  :class="{ aDisable: !pages, aCurrent: currentPage == 1}">首页</a>
              </li>
              <li @click="handlePages(currentPage-1)">
                <a href="javascript:void(0);"
                  class="iridium-daily-sheet-pages-item"
                  :class="{ aDisable: pages && pages === 1 || pages && currentPage === 1 || !pages }">上一页</a>
              </li>
              <li @click="handlePages(n)" :key="index" v-for="( n, index ) in pages">
                <a href="javascript:void(0);"
                  class="iridium-daily-sheet-pages-item"
                  :class="{ aCurrent:n == currentPage }">{{ n }}</a>
              </li>
              <li @click="handlePages(currentPage+1)">
                <a href="javascript:void(0);"
                  class="iridium-daily-sheet-pages-item"
                  :class="{ aDisable: pages && pages === 1 || pages && currentPage === pages || !pages }">下一页</a>
              </li>
              <li @click="handlePages(pages)">
                <a href="javascript:void(0);"
                  class="iridium-daily-sheet-pages-item iridium-daily-sheet-rradius"
                  :class="{ aDisable: pages && pages === 1 || !pages, aCurrent: currentPage == pages}">末页</a>
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
  name: 'dailySheet',
  components: {
    'DatePicker': DatePicker
  },
  data () {
    return {
      labels: '请选择',
      project: '沈阳金域蓝湾（北区）',
      dateVal: '',
      editable: false,
      open: false,
      isCalendar: true,
      isDate: false,
      labelOptions: [
        {
          'labelId': '01',
          'code': '01,01',
          'name': 'A区地库岗',
          'type': '移动标签'
        },
        {
          'labelId': '02',
          'code': '01,02',
          'name': 'B区地库岗',
          'type': '移动标签'
        }
      ],
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
          'labelId': '01',
          'dateTime': '2018-04-14',
          'startTime': '16:22:20',
          'endTime': '16:40:20',
          'attendanceHour': '4.5',
          'point': '22',
          'coverPoint1': 2,
          'coverPoint2': 0,
          'coverRate': '90.92%',
          'remainHour': '2',
          'coverRemark': '备注',
          'checkTime': '16:50:20',
          'checkArea': '车位、车库保洁岗规则',
          'checkLevel': '0',
          'checkHour': '0',
          'warnTime': '',
          'warnReason': '',
          'warnHour': '',
          'warnRemark': '',
          'dueHour': '2.5',
          'addHour': '2',
          'getHour': '4.5'
        } 
      ],
      pages: 3,
      totalNum: 34,
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
      this.dateVal = date
      this.open = false
    },
    handleOpenChange (e) {
      if (e) {
        this.open = true
        this.isDate = true
      } else {
        if (this.isCalendar && !this.isDate) {
          this.open = true
          this.isCalendar = false
        } else {
          this.open = false
        }
      }
    },
    handleCalendar () {
      this.open = true
      this.isCalendar = true
      this.isDate = false
    }
   
  },
  watch: {
    'labels' (newVal, oldVal) {
      console.log(newVal, oldVal)
    },
    'project' (newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  },
  
}
</script>
<style scoped>
  @import '../../assets/css/_variables.css';
  @component daily-sheet{
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
      width: 80px;
      line-height: 32px;
    }
    @descendent item {
      width: 25%;
      padding: 0 var(--fontBase);
    }
    @descendent btn-box {
      padding: 0 var(--fontBase);
    }
    @descendent date {
      margin-left: 80px;
      position:relative;
    }
    @descendent date-picker {
      flex:1;
      box-sizing:border-box;
      position:relative;
      margin-right:40px;
    }
    @descendent calendar-icon {
      width:40px;
      background:#fff;
      position:absolute;
      right:14px;
      top:0;
      bottom:0;
      text-align:center;
      border:1px solid var(--borderColor);
      line-height:32px;
      box-sizing:border-box;
      border-left:0;
    }
    @descendent btn {
      margin: 0 2px;
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
