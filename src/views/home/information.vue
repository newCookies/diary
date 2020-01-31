<template>
  <section id="information">
    <van-nav-bar title="消息" :fixed="true" left-arrow @click-left="back" :z-index="999" />
    <main>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index">
          <img :src="hedaImg" alt />
          <div class="content">
            <p>
              <span class="calculate-type">{{ calculateType(item) }}</span>
            </p>
            <p>{{ item.content }}</p>
            <span>{{ item.addDate }}</span>
          </div>
        </van-cell>
      </van-list>
    </main>
  </section>
</template>

<script>
import apilist from "./../../interfase/apiLists";
export default {
  name: "information",
  data() {
    return {
      pageIndex: 1,
      pageSize: 15,
      hedaImg: require("./../../../public/imgs/heda-default.png"),
      loading: false,
      finished: false,
      list: []
    };
  },
  mounted() {},
  computed: {},
  methods: {
    back() {
      window.history.back();
    },
    onLoad() {
      let me = this;
      me.loading = true;
      setTimeout(() => {
        apilist
          .dataAjax(
            {
              pageNo: this.pageIndex,
              pageSize: this.pageSize,
              readReally: "" // 阅读有效时传1，无效时不传
            },
            "message_getAllMessage"
          )
          .then(res => {
            console.log(res);
            if (res.code == 1001) {
              this.list.push(...res.result.list);
              this.pageIndex++;
            }
            console.log(res.result.list.length);
            console.log(me.pageSize);
            if (res.result.list.length < me.pageSize) {
              me.finished = true;
            }
            me.loading = false;
          });
      }, 500);
    },
    calculateType(item) {
      let title = "";
      if (item.type == 1) {
        title = "组织生活消息";
      } else if (item.type == 2) {
        title = "学习消息";
      } else if (item.type == 3) {
        title = "积分消息";
      } else if (this.list.type == 4) {
        title = "党建沙龙消息";
      } else if (item.type == 5) {
        title = "先锋消息";
      } else if (item.type == 6) {
        title = "支部通知";
      } else if (item.type == 7) {
        title = "其他消息";
      } else {
        title = "其他消息";
      }
      return title;
      console.log(title);
    }
  }
};
</script>

<style lang="scss" scoped>
#information {
  padding-top: 46px;
  main {
    img {
      height: 68px;
      position: absolute;
    }
    .content {
      padding-left: 82px;
      height: 72px;
      .calculate-type {
        font-size: 14px;
      }
    }
    p {
      font-size: 13px;
      line-height: 16px;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      display: -webkit-box;
      -webkit-line-clamp: 2;
    }
    span {
      font-size: 13px;
    }
  }
}
</style>
