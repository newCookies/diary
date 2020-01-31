<template>
    <section id="signIn">
        <van-nav-bar title="签到明细" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <main>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="(item,index) in list" :key="index">
                    <lifeDataShow :copm-data="item"></lifeDataShow>
                </van-cell>
            </van-list>
        </main>
    </section>

</template>

<script>
    import apiLists from './../../../interfase/apiLists'
    import lifeDataShow from './../../../components/life_dataShow'

    export default {
        name: "signIn",
        components: {
            lifeDataShow
        },
        data() {
            return {
                list: [],
                pageIndex: 1,
                pageSize: 15,
                loading: false,
                finished: false
            }
        },
        mounted() {

        },
        methods: {
            /*  describe: Go back to the previous page -- 返回上一页面
			 *   @parameter：null
			 *   @return：null
			 */
            back() {
                window.history.back();
            },
            /*  describe: Load check-in data -- 加载签到数据
            *   @parameter：null
            *   @return：null
            */
            onLoad() {
                let me = this;
                // 异步更新数据
                me.loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: this.pageIndex,
                        pageSize: this.pageSize,
                        meetingId: this.$route.query.id
                    }, 'life_getSignIn').then(res => {
                        console.log("res = ", res);
                        if (res.code == 1001) {
                            me.list.push(...res.result.list);
                            me.pageIndex++;
                            if (res.result.list.length < me.pageSize) {
                                me.finished = true;
                            }
                            me.loading = false;
                        }else{
                            me.finished = true;
                            me.loading = false;
                        }
                    });
                }, 500);
            }
        },

    }
</script>

<style lang="scss" scoped>
    #signIn {
        padding-top: 46px;
        main {
        }
    }
</style>
