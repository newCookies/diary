<template>
    <section id="learnInspiration">
        <van-nav-bar title="心得体会" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <main>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="(item,index) in list" :key="index">
                    <div class="box">
                        <button @click="onButton('redact',item)">编辑</button>
                        <button @click="onButton('delete',item)">删除</button>
                    </div>
                    <lifeDataShow :copm-data="item"></lifeDataShow>

                </van-cell>
            </van-list>
        </main>
    </section>

</template>

<script>
    import apiLists from './../../../interfase/apiLists'
    import lifeDataShow from './../../../components/life_dataShow'
    import {Toast} from 'vant'
    import {mapGetters} from 'vuex'

    export default {
        name: "learnInspiration",
        computed: {
            ...mapGetters(['thoughts'])
        },
        components: {
            lifeDataShow
        },
        data() {
            return {
                list: [],
                pageIndex: 1,
                pageSize: 10,
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
                    }, 'learn_inspiration').then(res => {
                        console.log("res = ", res);
                        if (res.code == 1001) {
                            me.list.push(...res.result.list);
                            me.pageIndex++;
                            if (res.result.list.length < me.pageSize) {
                                me.finished = true;
                            }
                            me.loading = false;
                            console.log("list = ", me.list)
                        } else {
                            me.loading = false;
                            me.finished = true;
                        }
                    });
                }, 500);
            },
            onButton(parame, item) {
                if (!!parame && typeof parame === 'string') {
                    if (parame.toString() === 'redact') {
                        this.$store.dispatch('set_thoughts', item);
                        this.$router.push({
                            path: '/learn/thoughts',
                            query: {
                                id: this.$route.query.id,
                                source: 'learnInspiration'
                            }
                        })
                    }else if(parame.toString() === 'delete'){
                        console.log(item);
                        apiLists.dataAjax({},'pulic_deleteThoughts',item._id).then(res => {
                            console.log(res);
                            if(res.code == 1001){

                            }else if(res.code == 1002){

                            }else{

                            }
                        });
                        Toast("暂未找到删除学习心得的api");
                    }else{

                    }
                }
            }
        },

    }
</script>

<style lang="scss" scoped>
    #learnInspiration {
        padding-top: 46px;
        main {
            /*padding: 0 15px;*/
            .box {
                float: right;
                button {
                    padding: 0 15px;
                    font-size: 10px;
                    color: red;
                    border: 1px solid red;
                    margin: 5px;
                    background-color: white;
                    border-radius: 3px;
                }
            }
        }
    }
</style>
