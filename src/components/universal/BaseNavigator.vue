<template>
  <nav class="iridium-navigator" :class="{ 'iridium-navigator--hide': !toggleNav }">
    <transition name="fade" mode="out-in">
      <section v-if="toggleNav" key="open">
        <h1 class="iridium-logo">万科物业定位管理系统</h1>
        <ul class="iridium-navigator-list">
          <li v-for="(item, index) in nav" :key="index" class="iridium-navigator-category" :class="{ 'fa fa-angle': item.sub, 'padding-bottom': index !== 0 && current === index, 'active': current === index }">
            <span class="iridium-navigator-category-title" @click="toggle($event, index)">
              <i :class="item.icon"></i>
              <strong class="iridium-navigator-category-text">{{ item.name }}</strong>
            </span>
            <!-- <transition name="slide-up"> -->
              <ul v-show="toggleNav && current === index" class="iridium-navigator-sub-list">
                <router-link tag="li" v-for="(sub, index) in item.sub" :key="index" :to="{ name: sub.href }" class="iridium-navigator-sub-item">{{ sub.name }}</router-link>
              </ul>
            <!-- </transition> -->
          </li>
        </ul>
      </section>
      <section v-if="!toggleNav" key="close">
        <h1 class="iridium-logo iridium-logo--hide">万科物业定位管理系统</h1>
        <ul>
          <li v-for="(item, index) in nav" :key="index" class="iridium-navigator-category">
            <span class="iridium-navigator-category-title" @click="updateToggleNav($event, index, true)">
              <i class="font-larger" :class="item.icon"></i>
            </span>
          </li>
        </ul>
      </section>
    </transition>
  </nav>
</template>

<script>
export default {
  name: 'BaseNavigator',
  data () {
    return {
      current: 0,
      nav: [
        {
          name: '首页',
          icon: 'glyphicon glyphicon-home'
        },
        {
          name: '基础信息管理',
          icon: 'fa fa-book',
          sub: [
            {
              name: '员工信息管理',
              href: ''
            },
            {
              name: '固定标签信息管理',
              href: ''
            },
            {
              name: '移动标签信息管理',
              href: ''
            },
            {
              name: '员工移动标签设置',
              href: ''
            },
            {
              name: '出勤率规则设置',
              href: ''
            },
            {
              name: '移动标签出勤率设置',
              href: ''
            }
          ]
        },
        {
          name: '抽查信息管理',
          icon: 'glyphicon glyphicon-list-alt',
          sub: [
            {
              name: '移动标签补卡',
              href: ''
            },
            {
              name: '抽查信息录入',
              href: ''
            }
          ]
        },
        {
          name: '报警信息管理',
          icon: 'glyphicon glyphicon-bell',
          sub: [
            {
              name: '出勤率报警',
              href: ''
            },
            {
              name: '覆盖率报警',
              href: ''
            },
            {
              name: '设备异常报警',
              href: ''
            },
            {
              name: '脱岗报警',
              href: ''
            },
            {
              name: '年龄报警',
              href: ''
            }
          ]
        },
        {
          name: '统计报表',
          icon: 'glyphicon glyphicon-stats',
          sub: [
            {
              name: '考勤日报表',
              href: 'DailySheet'
            },
            {
              name: '考勤月报表',
              href: 'MonthlySheet'
            },
            {
              name: '项目结算',
              href: ''
            },
            {
              name: '员工出勤率与覆盖率统计',
              href: ''
            },
            {
              name: '项目考勤月报表',
              href: ''
            }
          ]
        },
        {
          name: '任务质检',
          icon: 'glyphicon glyphicon-eye-open',
          sub: [
            {
              name: '项目结算配置',
              href: ''
            },
            {
              name: '项目结算',
              href: ''
            },
            {
              name: '已结算项目',
              href: ''
            },
            {
              name: '保洁任务',
              href: ''
            }
          ]
        },
        {
          name: '系统管理',
          icon: 'glyphicon glyphicon-cog',
          sub: [
            {
              name: '项目设置',
              href: ''
            },
            {
              name: '项目用户管理',
              href: ''
            },
            {
              name: '管理中心',
              href: ''
            },
            {
              name: '组织结构管理',
              href: ''
            },
            {
              name: '手动计算',
              href: ''
            },
            {
              name: '用户管理',
              href: ''
            },
            {
              name: '负责人管理',
              href: ''
            },
            {
              name: '角色管理',
              href: ''
            },
            {
              name: '数据导入',
              href: ''
            }
          ]
        }
      ]
    }
  },
  computed: {
    toggleNav () {
      return this.$store.state.toggleNav
    }
  },
  methods: {
    updateToggleNav (e, index, data) {
      this.current = index
      this.$store.dispatch('UPDATE_TOGGLENAV', data)
    },
    toggle (e, index) {
      if (this.current === index) {
        $(e.target).parents('.iridium-navigator-category').children('.iridium-navigator-sub-list').slideUp(300, () => {
          this.current = -1
        })
      } else {
        $('.iridium-navigator-category').eq(this.current).children('.iridium-navigator-sub-list').slideUp(300)
        this.current = index
        $(e.target).parents('.iridium-navigator-category').children('.iridium-navigator-sub-list').slideDown()
      }
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/_variables.css';
@define-mixin initNavItem {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
}

@component navigator {
  width: 220px;
  background: var(--navBgColor);
  color: var(--navColor);
  font-size: var(--fontSmaller);
  cursor: pointer;
  transition: all var(--transitionDuration) var(--transitionTimingFuction);
  overflow: hidden;

  @descendent list {}

  @descendent category {
    @mixin initNavItem;
    position: relative;
    line-height: var(--navItemHeight);
    transition: width var(--transitionDuration) var(--transitionTimingFuction);
    &.fa-angle {
      display: block;
      font-weight: bold;
      &::before {
        position: absolute;
        right: 20px;
        content: '\f104';
        line-height: var(--navItemHeight);
      }
    }
    &.padding-bottom {
      padding-bottom: 10px;
    }
    &:hover,
    &:active,
    &.active {
      background: var(--navBgColorDark);
      color: var(--navColorActive);
    }
    &.active {
      border-left: 4px solid var(--primaryColor);
      &.fa-angle::before {
        content: '\f107';
      }
    }
  }

  @descendent category-title {
    display: block;
    font-weight: bold;
    padding-left: var(--navItemLeftPadding);
    & .glyphicon,
    & .fa {
      margin-right: 8px;
    }
  }

  @descendent category-text {}

  @descendent sub-list {
    font-weight: bold;
    color: var(--navColor);
  }

  @descendent sub-item {
    @mixin initNavItem;
    line-height: var(--navSubItemHeight);
    padding-left: var(--navSubItemLeftPadding);

    &:hover,
    &:active,
    &.active {
      color: var(--navColorActive);
    }
  }

  @modifier hide {
    width: 70px;
  }
}

@component logo {
  height: 105px;
  background: var(--navBgColorDark) url(../../assets/images/logo-nav.png) no-repeat center center;
  text-indent: -9999px;

  @modifier hide {
    background-image: url(../../assets/images/logo-nav-hide.png);
    background-size: 47px 38px;
  }
}
</style>
