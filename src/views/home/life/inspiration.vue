<template>
    <section id="inspiration">
        <van-nav-bar title="心得体会" :fixed="true" left-arrow @click-left="back" :z-index="999"/>
        <main>
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <van-cell v-for="(item,index) in mylist" :key="index" v-if="mylist">
                    <lifeDataShow :copm-data="item"></lifeDataShow>
                </van-cell>
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
        name: "inspiration",
        components: {
            lifeDataShow
        },
        data() {
            return {
                list: [],
                mylist: [],
                pageIndex: 1,
                pageSize: 15,
                loading: false,
                finished: false
            }
        },
        mounted() {
            apiLists.dataAjax({
                pageNo: this.pageIndex,
                pageSize: this.pageSize,
                meetingId: this.$route.query.id
            }, 'life_inspiration').then(res => {
                if (res.code == 1001) {
                    let list = res.result.otherList.list;
                    console.log(list);
                }
            })
        },
        methods: {
            /*  describe: Go back to the previous page -- 返回上一页面
			 *   @parameter：null
			 *   @return：null
			 */
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
                        meetingId: this.$route.query.id
                    }, 'life_inspiration').then(res => {
                        console.log("res = ", res);
                        if (res.code == 1001) {
                            if(!!res.result.myExp){
                                me.mylist.push({
                                    addDate: res.result.myExp.addDate,
                                    content: res.result.myExp.content,
                                    files: res.result.myExp.files,
                                    meeting: res.result.myExp.meeting,
                                    status: res.result.myExp.status,
                                    user: res.result.myExp.user,
                                    __v: res.result.myExp.__v,
                                    _id: res.result.myExp._id,
                                    inspirationFlag: true
                                });
                            }
                            me.list.push(...res.result.otherList.list);
                            me.pageIndex++;
                            if (res.result.otherList.list.length < me.pageSize) {
                                me.finished = true;
                            }
                            me.loading = false;
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
    #inspiration {
        padding-top: 46px;
        main {
            .my-info{
                padding: 10px 15px;
            }
        }
    }
</style>
