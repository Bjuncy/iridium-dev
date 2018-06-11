<template>
  <div class="iridium-daily-sheet">
    <h5 class="iridium-daily-sheet-title">结算日报表</h5>
    <section class="iridium-daily-sheet-main">
        <div class="iridium-daily-sheet-label">
          <div class="iridium-daily-sheet-label-name">移动标签：</div>
          <div class="iridium-daily-sheet-item">
            <select class="iridium-select">
              <option class="iridium-select-option" value="">请选择</option>
              <option class="iridium-select-option" value="2">选项</option>
              <option class="iridium-select-option" value="3">选项</option>
            </select>
          </div>
          <div class="iridium-daily-sheet-item">
            <select class="iridium-select">
              <option class="iridium-select-option" value="金色家园">金色家园</option>
              <option class="iridium-select-option" value="惠山花园">惠山花园</option>
            </select>
          </div>
        </div>
        <div class="iridium-daily-sheet-label">
          <div class="iridium-daily-sheet-date iridium-daily-sheet-item">
            <DatePicker type="date"></DatePicker>
          </div>
          <div class="iridium-daily-sheet-btn-box">
            <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-daily-sheet-btn">查询</button>
            <button class="iridium-btn iridium-btn--danger iridium-btn--smaller iridium-daily-sheet-btn">导出</button>
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
            <p else>显示{{currentPage}}到{{currentPage*10}}条，共{{totalNum}}条</p>
          </div>
          <div class="flex-1">
            <ul class="flex right">
              <li><a href="javascript:void(0);" class="iridium-daily-sheet-pages-item iridium-daily-sheet-leftborder iridium-daily-sheet-lradius" :class="{aDisable:!pages}">首页</a></li>
              <li><a href="#" class="iridium-daily-sheet-pages-item">上一页</a></li>
              <li :key="index" v-for="(n,index) in pages"><a href="#" class="iridium-daily-sheet-pages-item" :class="{aCurrent:n == currentPage}">{{n}}</a></li>
              <li><a href="#" class="iridium-daily-sheet-pages-item">下一页</a></li>
              <li><a href="#" class="iridium-daily-sheet-pages-item iridium-daily-sheet-rradius">末页</a></li>
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
  }
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
      padding-left: 94px;
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
