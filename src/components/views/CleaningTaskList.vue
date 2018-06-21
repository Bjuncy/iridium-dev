<template>
  <section class="iridium-page">
    <h5 class="iridium-page-title">保洁任务</h5>
    <div class="iridium-page-content">
      <Row type="flex" justify="start" :gutter="15">
        <Col>
          <Select placeholder="所属项目" v-model="query.projectId">
            <Option v-for="item in projects" :value="item.projectId" :key="item.projectId">{{ item.name }}</Option>
          </Select>
        </Col>
        <Col>
          任务创建时间：
          <DatePicker type="daterange"
            :placeholder="dateRange"
            @on-change="pickerDate"
            >
          </DatePicker>
        </Col>
        <Col>
          任务单号：
          <input v-model="query.taskCode" class="iridium-form-input" type="text" /></Col>
        <Col>
          <button class="iridium-btn iridium-btn--primary iridium-btn--smaller iridium-btn--radius" @click="search">查询</button>
          <button v-show="!showCheckbox" class="iridium-btn iridium-btn--warning iridium-btn--smaller iridium-btn--radius" @click="showCheckboxBtn">批量操作</button>
          <button v-show="showCheckbox" class="iridium-btn iridium-btn--danger iridium-btn--smaller iridium-btn--radius" @click="cancelSelect">退出批量操作</button>
        </Col>
      </Row>
      <table class="iridium-table iridium-table--striped iridium-table--hover">
        <thead>
          <tr class="iridium-table-row">
            <th class="iridium-table-title">序号</th>
            <th class="iridium-table-title">任务编码</th>
            <th class="iridium-table-title">任务标题</th>
            <th class="iridium-table-title">反馈区域</th>
            <th class="iridium-table-title">创建人</th>
            <th class="iridium-table-title">创建时间</th>
            <th class="iridium-table-title">当前状态</th>
            <th class="iridium-table-title">反馈时间</th>
            <th class="iridium-table-title">验证时间</th>
            <th class="iridium-table-title">是否挂起</th>
            <th class="iridium-table-title">事件等级</th>
            <th class="iridium-table-title">不考核</th>
            <th class="iridium-table-title">结算</th>
            <th class="iridium-table-title">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
             v-for="(item, itemIndex) in list"
             :key="item.id"
             class="iridium-table-row">
            <td
               class="iridium-table-item text-center"
               v-show="!showCheckbox"
            >{{ itemIndex + 1 }}</td>
            <td class="iridium-table-item text-center" v-show="showCheckbox">
              <label>
                <input type="checkbox"
                  @change="addItem($event, item, itemIndex)"
                  :disabled="!item.isAssessment"
                >
                <i class="glyphicon"></i>
              </label>
            </td>
            <td class="iridium-table-item text-center">{{ item.taskCode }}</td>
            <td class="iridium-table-item text-center">{{ item.taskTitle }}</td>
            <td class="iridium-table-item text-center">{{ item.area }}</td>
            <td class="iridium-table-item text-center">{{ item.creater }}</td>
            <td class="iridium-table-item text-center">{{ item.createTime }}</td>
            <td class="iridium-table-item text-center">{{ item.status }}</td>
            <td class="iridium-table-item text-center">
              {{ item.feedbackTime || '-' }} {{ item.isFeedbackTimeout ? '（超时）' : '' }}
            </td>
            <td class="iridium-table-item text-center">
              {{ item.checkTime || '-' }} {{ item.isCheckTimeout ?'（超时）' : '' }}
            </td>
            <td class="iridium-table-item text-center">{{ item.isHangup ? '是' : '否' }}</td>
            <td class="iridium-table-item text-center">{{ item.eventRank }}</td>
            <td class="iridium-table-item text-center">{{ item.isAssessment ? '否' : '是' }}</td>
            <td class="iridium-table-item text-center">
              {{ switchSettlementText(item.settlement.workingHours) }}
              {{ switchSettlementText(item.settlement.unitPrice) }}
            </td>
            <td class="iridium-table-item" width="70">
              <button
                class="iridium-btn
                  iridium-btn--info
                  iridium-btn--smallest
                  iridium-btn--radius"
                @click="detail(item)"
              >
                <i class="glyphicon glyphicon-file"></i>
              </button>
              <button
                v-show="!item.isAssessment
                    ? item.isAssessment
                    : item.isAssessment && !showCheckbox"
                  class="iridium-btn
                    iridium-btn--warning
                    iridium-btn--smallest
                    iridium-btn--radius"
                  @click="edit(item)"
                  >
                    <i class="glyphicon glyphicon-edit"></i>
                  </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div id="pagination" class="pagination"></div>
    </div>
  </section>
</template>

<script>
import { DatePicker, Select, Option } from 'iview'
import day from 'dayjs'
import 'paginationjs'
const initPagination = (context, dataSource) => {
  $('#pagination').pagination({
    dataSource: dataSource,
    locator: 'data.records',
    totalNumberLocator: (res) => {
      return res.data.totalCount
    },
    pageRange: 6,
    firstText: '首页',
    lastText: '末页',
    prevText: '上一页',
    nextText: '下一页',
    alias: {
      pageNumber: 'pageNum',
      pageSize: 'numPerPage'
    },
    callback: (data, pagination) => {
      context.list = data
    }
  })
}
export default {
  name: 'CleaningTaskList',
  components: {
    DatePicker,
    Select,
    Option
  },
  data () {
    return {
      showDetailModal: false,
      showEditModal: false,
      showCheckbox: false,
      dateRange: day().format('YYYY-MM-DD') + ' - ' + day().format('YYYY-MM-DD'),
      projects: [],
      list: [],
      detailItem: {},
      editList: [],
      query: {
        projectId: '',
        taskCode: '',
        taskCreateTimeBegin: day().format('YYYY-MM-DD'),
        taskCreateTimeEnd: day().format('YYYY-MM-DD')
      },
      defaultUrl: this.$api.getCleaningTasks,
      reason: ''
    }
  },
  created () {
    // 加载项目选项卡数据
    this.$axios.get(this.$api.getProjects)
      .then(res => {
        if (res.data.code === 0) {
          this.projects = res.data.data
        } else {
          this.$message.error({content: res.data.msg})
        }
      })
  },
  mounted () {
    initPagination(this, this.defaultUrl)
  },
  methods: {
    switchSettlementText (settlement) {
      let symbol
      switch (settlement.type || settlement.settleWay) {
        case 'reward':
          symbol = '+'
          break
        case 'deduction':
          symbol = '-'
          break
        default:
          symbol = ''
      }
      return symbol + ('count' in settlement ? settlement.count : settlement.amount) + settlement.unit
    },
    search () {
      // 获取开始时间
      let url = this.defaultUrl
      // 处理查询字符串
      if (this.query.projectCode || this.query.taskCode || this.query.taskCreateTimeBegin || this.query.taskCreateTimeEnd) {
        url += '?'
        Object.entries(this.query).forEach((item, index, arr) => {
          if (index === arr.length - 1) {
            url += item.join('=')
          } else {
            url += item.join('=') + '&'
          }
        })
      }
      initPagination(this, url)
    },
    showCheckboxBtn () {
      if (!this.list.length) return
      // 显示多选框
      this.showCheckbox = true
    },
    pickerDate (value) {
      this.query.taskCreateTimeBegin = value[0]
      this.query.taskCreateTimeEnd = value[1]
    },
    cancelSelect () {
      this.showCheckbox = false
      this.editList = []
      this.reason = ''
      $('#cleaningListTable').find('[type=checkbox]').each((index, item) => {
        item.checked = false
      })
    },
    detail (item) {
      this.$axios.get(this.$api.getCleaningTaskDetail({id: item.id}))
        .then(res => {
          if (res.data.code === 0) {
            this.showDetailModal = true
            this.detailItem = res.data.data
          } else {
            this.$message.error({content: res.msg})
          }
        })
    },
    addItem (e, item, index) {
      if (e.target.checked) {
        this.editList.push(item)
      } else {
        let index = 0
        this.editList.forEach((editItem, editIndex, arr) => {
          if (editItem.id === item.id) {
            index = editIndex
          }
        })
        this.editList.splice(index, 1)
      }
    },
    edit (item) {
      if (item && item.id) {
        this.editList = [item]
      }
      if (!this.editList.length) {
        this.$message.warning({content: '请至少选择一项任务！'})
        return
      }
      this.showEditModal = true
    },
    closeDetailModal () {
      this.showDetailModal = false
    },
    closeEditModal () {
      this.showEditModal = false
      this.reason = ''
    },
    confirm () {
      if (!this.reason) {
        this.$message.warning({content: '请填写原因！'})
        return
      }
      let params = {
        ids: this.editList.map(item => item.id).join(','),
        reason: '不考核（' + this.reason + '）'
      }
      // 提交保洁任务数据
      this.$axios.post(this.$api.modifyCleaningTasks, params)
        .then(res => {
          if (res.code === 0) {
            this.$message.success('您操作的菜单已经保存成功。')
            // 更新页面
            this.updateListAssessment(this.editList)
          } else {
            this.$message.error({content: res.msg})
          }
          this.closeEditModal()
        })
    },
    updateListAssessment (selectedItems) {
      selectedItems.forEach(item => {
        item.isAssessment = 0
      })
    }
  }
}
</script>

<style scoped>
</style>
