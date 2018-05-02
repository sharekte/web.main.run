<template>
  <div class="edit">
      <div class="sidebar">
          <ul class="alt">
              <li>
                  <div class="title">
                      标题标题标题标题标题标题标题标题标题
                  </div>
                  <div class="collect">
                      <span>rust学习笔记</span>
                      <span>随便</span>
                  </div>
                  <div class="time">
                      2018-05-01 16:30:50
                  </div>
              </li>
              <li>
                  <div class="title">
                      标题标题标题标题标题标题标题标题标题
                  </div>
                  <div class="collect">
                      <span>rust学习笔记</span>
                      <span>随便</span>
                  </div>
                  <div class="time">
                      2018-05-01 16:30:50
                  </div>
              </li>
              <li>
                  <div class="title">
                      标题标题标题标题标题标题标题标题标题
                  </div>
                  <div class="collect">
                      <span>rust学习笔记</span>
                      <span>随便</span>
                  </div>
                  <div class="time">
                      2018-05-01 16:30:50
                  </div>
              </li>
              <li>
                  <div class="title">
                      标题标题标题标题标题标题标题标题标题
                  </div>
                  <div class="collect">
                      <span>rust学习笔记</span>
                      <span>随便</span>
                  </div>
                  <div class="time">
                      2018-05-01 16:30:50
                  </div>
              </li>
              <li>
                  <div class="title">
                      标题标题标题标题标题标题标题标题标题
                  </div>
                  <div class="collect">
                      <span>rust学习笔记</span>
                      <span>随便</span>
                  </div>
                  <div class="time">
                      2018-05-01 16:30:50
                  </div>
              </li>
              <li>
                  <div class="title">
                      标题标题标题标题标题标题标题标题标题
                  </div>
                  <div class="collect">
                      <span>rust学习笔记</span>
                      <span>随便</span>
                  </div>
                  <div class="time">
                      2018-05-01 16:30:50
                  </div>
              </li>
              <li>
                  <div class="title">
                      标题标题标题标题标题标题标题标题标题
                  </div>
                  <div class="collect">
                      <span>rust学习笔记</span>
                      <span>随便</span>
                  </div>
                  <div class="time">
                      2018-05-01 16:30:50
                  </div>
              </li>
              <li>
                  <div class="title">
                      标题标题标题标题标题标题标题标题标题
                  </div>
                  <div class="collect">
                      <span>rust学习笔记</span>
                      <span>随便</span>
                  </div>
                  <div class="time">
                      2018-05-01 16:30:50
                  </div>
              </li>
              <li>
                  <div class="title">
                      标题标题标题标题标题标题标题标题标题
                  </div>
                  <div class="collect">
                      <span>rust学习笔记</span>
                      <span>随便</span>
                  </div>
                  <div class="time">
                      2018-05-01 16:30:50
                  </div>
              </li>
              <li>
                  <div class="title">
                      标题标题标题标题标题标题标题标题标题
                  </div>
                  <div class="collect">
                      <span>rust学习笔记</span>
                      <span>随便</span>
                  </div>
                  <div class="time">
                      2018-05-01 16:30:50
                  </div>
              </li>
          </ul>
      </div>
      <div class="main">
          <div class="header">
              <button class="small special">保存</button>
              <button class="small special">保存</button>
          </div>
          <div class="content">
              <content-inner></content-inner>
          </div>
      </div>
  </div>
</template>

<script>
import ContentInner from '@/components/edit/ContentInner'
export default {
  components: {
      ContentInner
  }
}
</script>

<style lang="stylus" scoped>
.edit {
    //background-color #ff6600
    height 100%
    width 100%
    display flex
    //justify-content center
    align-items stretch

    .sidebar {
        height 100%
        width 260px
        //background-color #ff6699
        padding-top 10px
        border-right 1px solid #dddddd
        position relative
        overflow-y auto

        &::-webkit-scrollbar {
            display:none
        }

        li {
            padding-left 10px

            .title {
                font-size 1.5rem
                cursor pointer
                color #8cd1a8
            }

            .collect {
                font-size 1.2rem
            }

            .time {
                font-size 1.2rem
                color #888
            }
        }
    }

    .main {
        //height 100%
        flex-grow 1
        width calc(100% - 260px)
        //background-color #eee

        .header {
            height 42px
            //background-color #666666
            padding 5px
            border-bottom 1px solid #dddddd
        }

        .content {
            height calc(100% - 42px)
            overflow-y auto

            &::-webkit-scrollbar {
                display:none
            }
        }
    }
}
</style>
