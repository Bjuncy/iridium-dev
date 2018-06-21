<template>
  <div class="project-settlement">
    <div class="loading" v-show="loading"></div>
    <div class="wrapper wrapper-content animated fadeInRight">
      <div class="row">
        <div class="col-sm-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h5>项目结算管理</h5>
            </div>
            <div class="ibox-content">
              <div class="row" style="line-height: 30px;">
                <div class="col-md-2">
                  <div class="form-group">
                    <select id="pronum" class="form-control" name="pronum" v-model="query.projectId">
                      <option v-for="(project, index) in projects" :key="index" :value="project.projectId">{{ project.name }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-1" style="width: 110px;padding-right: 0px;">
                  工作时段：
                </div>
                <div class="col-md-2" style="padding: 0;">
                  <div class="input-group date">
                    <input id="startTime" type="text" v-model="query.workPeriodStartTime" readonly="readonly" class="form-control input-sm">
                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                  </div>
                </div>
                <div class="col-md-1"  style="width: 60px; padding: 0; text-align: center;">到</div>
                <div class="col-md-2" style="padding-left: 0;">
                  <div class="input-group date">
                    <input id="endTime" type="text" v-model="query.workPeriodEndTime" readonly="readonly" class="form-control input-sm">
                    <span class="input-group-addon"><i class="fa fa-calendar"></i></span>
                  </div>
                </div>
                <div class="col-md-2">
                  <button class="btn btn-sm btn-primary left" @click="search">查询</button >
                </div>
              </div>
              <div class="row summary">
                <form class="border">
                  <div class="form-group col-md-3">
                    <label class="control-label">开始时间：</label>
                    <div style="margin-top: 7px;">
                      <input type="text" readonly class="form-control" :value="summary.workPeriodStartTime" />
                    </div>
                  </div>
                  <div class="form-group col-md-3">
                    <label class="control-label">结束时间：</label>
                    <div style="margin-top: 7px;">
                      <input type="text" readonly class="form-control" :value="summary.workPeriodEndTime" />
                    </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">结算金额</label>
                      <div style="margin-top: 7px;">
                        <input type="text" readonly class="form-control" :value="summary.settlementAmount" />
                      </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">出勤率应得总工时</label>
                      <div style="margin-top: 7px;">
                        <input type="text" readonly class="form-control" :value="summary.attendanceRateWorkingHours" />
                      </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">最终实际应得总工时</label>
                      <div style="margin-top: 7px;">
                        <input type="text" readonly class="form-control" :value="summary.finalWorkingHours" />
                      </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">覆盖率应得工时</label>
                      <div style="margin-top: 7px;">
                        <input type="text" readonly class="form-control" :value="summary.coverageWorkingHours" />
                      </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">覆盖率扣除工时</label>
                      <div style="margin-top: 7px;">
                        <input type="text" readonly class="form-control" :value="summary.minusCoverageWorkingHours" />
                      </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">抽检次数</label>
                      <div style="margin-top: 7px;">
                        <input type="text" readonly class="form-control" :value="summary.checkCounts" />
                      </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">补卡工时</label>
                      <div style="margin-top: 7px;">
                        <input type="text" readonly class="form-control" :value="summary.rePunchCardWorkingHours" />
                      </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">抽检扣除工时</label>
                      <div style="margin-top: 7px;">
                        <input type="text" readonly class="form-control" :value="summary.minusCheckWorkingHours" />
                      </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">抽检奖/惩金</label>
                      <div style="margin-top: 7px;">
                        <input type="text" readonly class="form-control" :value="summary.checkRewardsOrPunishments" />
                      </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">及时反馈率</label>
                      <div style="margin-top: 7px;">
                        <input type="text" readonly class="form-control" :value="summary.inTimeFeedbackRate" />
                      </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">反馈超时扣工时</label>
                      <div style="margin-top: 7px;">
                        <input type="text" readonly class="form-control" :value="summary.feedbackOvertimeWorkingHours" />
                      </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">反馈超时率扣除金额</label>
                      <div style="margin-top: 7px;">
                        <input type="text" readonly class="form-control" :value="summary.feedbackOvertimeRateAmount" />
                      </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">累积反馈率奖励金额</label>
                      <div style="margin-top: 7px;">
                        <input type="text" readonly class="form-control" :value="summary.feedbackRateRewardAmount" />
                      </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">临时用工费用</label>
                      <div style="margin-top: 7px;">
                        <input type="text" class="form-control" v-model="summary.temporaryLaborCounts" @change="recordLaborAmount" />
                      </div>
                    </div>
                    <div class="form-group col-md-3">
                      <label class="control-label">奖惩费用</label>
                      <div style="margin-top: 7px;">
                        <input type="text" class="form-control" v-model="summary.rewardsOrPunishmentsCounts" @change="recordRewardOrPunishAmount" />
                      </div>
                    </div>
                    <div class="form-group col-md-12">
                      <button :disabled="hideSettleBtn" type="button" class="btn btn-sm btn-danger right" @click="selectSettler">结算</button>
                    </div>
                  </form>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <table class="table table-striped table-bordered table-hover center">
                      <thead>
                        <tr>
                          <th>移动标签ID</th>
                          <th>规则名称</th>
                          <th>理论工时</th>
                          <th>出勤率应得工时</th>
                          <th>最终实际应得总工时</th>
                          <th>覆盖率应得工时</th>
                          <th>覆盖率扣除工时</th>
                          <th>抽检次数</th>
                          <th>补卡工时</th>
                          <th>抽检扣除工时</th>
                          <th>抽检奖惩金额</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, itemIndex) in list" :key="itemIndex">
                            <td>{{ item.movingLabel }}</td>
                            <td>{{ item.ruleName }}</td>
                            <td>{{ item.theoreticalWorkingHours }}</td>
                            <td>{{ item.attendanceRateWorkingHours }}</td>
                            <td>{{ item.finalWorkingHours }}</td>
                            <td>{{ item.coverageWorkingHours }}</td>
                            <td>{{ item.minusCoverageWorkingHours }}</td>
                            <td>{{ item.checkCounts }}</td>
                            <td>{{ item.rePunchCardWorkingHours }}</td>
                            <td>{{ item.minusCheckWorkingHours }}</td>
                            <td>{{ item.checkRewardsOrPunishments }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="col-md-12">
                    <div id="pagination" class="pagination"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-wrap" v-show="showSelectSettlerModal">
      <div class="modal-main inmodal">
        <div class="modal-dialog" style="width: 400px;">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" @click="closeSelectSettlerModal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
              <h4 class="modal-title">结算</h4>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label class="col-md-4 control-label" style="line-height: 34px;">责任人：</label>
                <div class="col-md-8">
                  <select id="settleClerk" class="form-control">
                    <option value="">请选择责任人</option>
                    <option v-for="(clerk, index) in settleClerks" :key="index" :value="JSON.stringify({id:clerk.id,name:clerk.name})">{{ clerk.name }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-white" @click="closeSelectSettlerModal">关闭</button>
                <!--<button type="button" class="btn btn-info" :disabled="disableScanBtn" @click="scan">扫描确认</button>-->
              <button type="button" class="btn btn-primary" :disabled="disableSettleBtn" @click="settle">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-wrap" v-show="showSettleConflictModal">
      <div class="modal-main inmodal">
        <div class="modal-dialog" style="width: 600px;">
          <div class="modal-content">
            <div class="modal-body" id="projectSettle-edit">
              <p style="margin: 15px 0;">当前工作时段 {{ query.workPeriodStartTime }} - {{ query.workPeriodEndTime }} 中存在已结算的记录如下，如果需要继续结算，请在已结算项目中撤销该时间段内的已结算记录。</p>
              <table class="table table-bordered center">
                <thead>
                  <tr>
                    <th>项目</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                    <th>结算时间</th>
                    <th>操作人</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in duplicatedRecords" :key="index">
                    <td class="text-center">{{ item.projectName }}</td>
                    <td class="text-center">{{ item.workPeriodStartTime }}</td>
                    <td class="text-center">{{ item.workPeriodEndTime }}</td>
                    <td class="text-center">{{ item.settleDate }}</td>
                    <td class="text-center">{{ item.settlementClerk }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="closeSettleConflictModal">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectSettlement',
  data () {
    return {
      showSelectSettlerModal: false,
      showSettleConflictModal: false,
      startTime: this.getNow(),
      endTime: this.getNow(),
      projects: [],
      settleClerks: [], 
      defaultUrl: 'rest/projects/settlement',
      projectData: {},
      summary: {},
      list: [],
      query: {
      projectId: '00',
        workPeriodStartTime: this.getNow(),
        workPeriodEndTime: this.getNow()
      },
      settleClerk: {
        id: '',
        name: ''
      },
      laborList: 0,
      rewardOrPunishmentList: 0,
      hideSettleBtn: false,
      disableScanBtn: true,
      disableSettleBtn: true,
      duplicatedRecords: [],
      loading: false
    }
  },
  created () {
    // 加载项目选项卡数据
    $.ajax({
      type: 'GET',
      url: 'rest/projects',
      success: (res) => {
        if (res.code === 0) {
          this.projects = res.data
        } else {
          showErrorAlert(res.msg)
        }
      }
    })
  },
  mounted () {
    this.search()
  },
  watch: {
    'laborAmount' (value) {
      this.summary.settlementAmount = this.defaultSettleAmount + value + this.rewardOrPunishAmount
    },
    'rewardOrPunishAmount' (value) {
      this.summary.settlementAmount = this.defaultSettleAmount + value + this.laborAmount
    }
  },
  methods: {
    initPagination (dataSource) {
      $('#pagination').pagination({
        dataSource: dataSource || this.defaultUrl,
        locator: 'data.records',
        totalNumberLocator: (res) => {
          if (res.data.countResultMap.projectCode) {
            this.summary = res.data.countResultMap
            this.summary.projectId = this.query.projectId
            this.summary.temporaryLaborCounts = this.temporaryLaborCounts || 0
            this.summary.rewardsOrPunishmentsCounts = this.rewardsOrPunishmentsCounts || 0
            this.defaultSettleAmount = this.summary.settlementAmount - 0
            this.laborAmount = this.summary.temporaryLaborCounts
            this.rewardOrPunishAmount = this.summary.rewardsOrPunishmentsCounts
            this.hideSettleBtn = false
          } else {
            this.summary = {}
            this.hideSettleBtn = true
              showInfoAlert('暂无数据！')
          }
          return res.data.totalCount
        },
        pageSize: 1000,
        pageRange: 6,
        firstText: '首页',
        lastText: '末页',
        prevText: '上一页',
        nextText: '下一页',
        alias: {
          pageNumber: 'pageNum',
          pageSize: 'numPerPage'
        },
        ajax: {
          beforeSend: () => {
            this.loading = true
          }
        },
        callback: (data, pagination) => {
          this.loading = false
          this.list = data
        }
      })
    },
    splicingSearchQuery (baseUrl, query) {
      baseUrl += '?'
      Object.entries(query).forEach((item, index, arr) => {
        if (index === arr.length -1) {
          baseUrl += item.join('=')
        } else {
          baseUrl += item.join('=') + '&'
        }
      })
      return baseUrl
    },
    getNow () {
      let now = this.fmtDate(new Date, 'yyyy-MM-dd')
      return now
    },
    search () {
      let url = ''
      this.query.workPeriodStartTime = $('#startTime').val()
      this.query.workPeriodEndTime = $('#endTime').val()
      // 处理查询字符串
      if (this.query.projectId || this.query.workPeriodStartTime || this.query.workPeriodEndTime
      ) {
        url = this.splicingSearchQuery(this.defaultUrl, this.query)
      } else {
        showInfoAlert('请选择项目和结算月份！')
        return
      }
      this.initPagination(url)
    },
    getSettleClerks () {
      let getLeadersUrl = 'rest/projects/' + this.query.projectId + '/leaders'
      $.ajax({
        type : 'GET',
        url : getLeadersUrl,
        dataType : 'JSON',
        contentType: 'application/json; charset=utf-8',
        success: res => {
          this.settleClerks = res.data
          setTimeout(() => {
              $('#settleClerk').chosen().change((e, params) => {
                  this.settleClerk = params.selected ? JSON.parse(params.selected) : {}
                  // this.disableScanBtn = !this.settleClerk.id
                  this.disableSettleBtn = !this.settleClerk.id
              })
          }, 1)
        },
        error: err => {
          showErrorAlert('服务器内部错误')
        }
      })
    },
    selectSettler () {
      if (!this.query.projectId) {
        showInfoAlert('请先选择项目！')
        return
      }
      // 选择结算人
      this.getSettleClerks()
      // 打开结算人对话框
      this.showSelectSettlerModal = true
    },
    scan () {
      let param = {}
      this.disableScanBtn = true
      param.id = this.settleClerk.id
      if (!param.id) {
        showInfoAlert('请选择结算责任人！')
      }
      layer.msg('扫描中，请等待......')
      $.ajax({
        type : 'POST',
        data : param,
        url : 'rest/projectbill/projectbillScan',
        dataType : 'JSON',
        success: res => {
          this.disableScanBtn = false
          if (res.success){
            if (res.statusCode == -1){
              layer.msg('不是本人，请重试。')
            }else if (res.statusCode == -5){
              layer.msg('没有权限操作指纹。')
            } else {
              layer.msg('已经验证，是本人。')
              this.disableSettleBtn = false
            }
          } else {
            showErrorAlert('请检查设备是否连接成功。')
          }
        },
        error: err => {
          showErrorAlert('服务器内部错误')
        }
      })
    },
    settle () {
      this.summary.projectId = this.query.projectId || '00'
      this.summary.settlementClerk = this.settleClerk.name
      this.disableSettleBtn = true
      // 提交项目结算配置数据
      $.ajax({
        url: 'rest/projects/' + this.summary.projectId + '/settle',
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(this.summary),
        success: (res) => {
          this.closeSelectSettlerModal()
          this.disableSettleBtn = false
          if (res.code === 0) {
            showSuccessAlert('您操作的菜单已经保存成功。')
          } else if (res.code === 999) {
            this.duplicatedRecords = res.data
            this.showSettleConflictModal = true
          } else {
            showErrorAlert(res.msg)
          }
        }
      })
    },
    changeSettleAmount () {
      this.summary.settlementAmount = this.defaultSettleAmount + this.laborAmount + this.rewardOrPunishAmount
    },
    recordLaborAmount () {
      this.laborAmount = this.summary.temporaryLaborCounts - 0
      this.changeSettleAmount()
    },
    recordRewardOrPunishAmount () {
      this.rewardOrPunishAmount =  this.summary.rewardsOrPunishmentsCounts - 0
      this.changeSettleAmount()
    },
    closeSelectSettlerModal () {
      this.showSelectSettlerModal = false
    },
    closeSettleConflictModal () {
      this.showSettleConflictModal = false
    },
    fmtDate (date, fmt) {
      let reg = /^\d{4}(-|[\u4e00-\u9fa5])\d{1,2}(-|[\u4e00-\u9fa5])\d{1,2}/
      if (reg.test(date)) {
        date = new Date(date.replace(/-|[\u4e00-\u9fa5]/g, '/'))
      }
      date = new Date(date)
      let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
  }
}

$('.date').datepicker({
  keyboardNavigation: 0,
  autoclose: 1,
  format: 'yyyy-mm-dd',
  maxViewMode: 0,
  minViewMode: 0,
  initialDate: new Date()
})
</script>

<style scoped>
  
</style>