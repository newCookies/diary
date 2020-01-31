<template>
    <section id="LearnDetail">
        <van-nav-bar title="学习明细" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
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
        name: "LearnDetail",
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
            back() {
                window.history.back();
            },
            onLoad() {
                let me = this;
                // 异步更新数据
                me.loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: this.pageIndex,
                        pageSize: this.pageSize,
                        studyTaskId: this.$route.query.id
                    }, 'learn_LearnDetail').then(res => {
                        console.log("res = ", res);
                        if (res.code == 1001) {
                            me.list.push(...res.result.list);
                            me.pageIndex++;
                            if (res.result.list.length < me.pageSize) {
                                me.finished = true;
                            }
                            me.loading = false;
                            console.log("list = ",this.list)
                        }else{
                            me.finished = true;
                        }
                    });
                }, 500);
            }
        },

    }
</script>

<style lang="scss" scoped>
    #LearnDetail {
        padding-top: 46px;
        main {
        }
    }
</style>
