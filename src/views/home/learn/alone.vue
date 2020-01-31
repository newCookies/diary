<template>
    <section id="alone">
        <van-nav-bar title="自主学习" :fixed="true" left-arrow @click-left="back" :z-index="999">
            <van-icon name="add-o" slot="right" @click="goIconPage"/>
        </van-nav-bar>
        <van-tabs :sticky="true" :offset-top="46" v-model="active">
            <van-tab title="全部">
                <van-list v-model="all_loading" :finished="all_finished" finished-text="没有更多了" @load="onLoadAll">
                    <van-cell v-for="(item,index) in allList" :key="index">
                        <compLife :comp-data="item"></compLife>
                    </van-cell>
                </van-list>
            </van-tab>
            <van-tab title="我的">
                <van-list v-model="my_loading" :finished="my_finished" finished-text="没有更多了" @load="onLoadMy">
                    <van-cell v-for="(item,index) in myList" :key="index">
                        <compLife :comp-data="item"></compLife>
                        <div class="start-finish van-hairline--top" v-if="item">
                            <div class="SF_start" @click="onEndDate(item)">发布</div>
                            <div @click="publish(item,index)">删除</div>
                        </div>
                    </van-cell>
                </van-list>
            </van-tab>
        </van-tabs>
    </section>
</template>

<script>
    import compLife from '../../../components/compLife'
    import apiLists from '../../../interfase/apiLists'
    import {Dialog} from 'vant';
    import {Toast} from 'vant';
    export default {
        name: "alone",
        components: {
            compLife
        },
        data() {
            return {
                url: '/alone',
                allList: [],
                all_loading: false,
                all_finished: false,
                all_pageIndex: 1,
                all_pageSize: 10,
                myList: [],
                my_loading: false,
                my_finished: false,
                my_pageIndex: 1,
                my_pageSize: 10,
                active: 0
            }
        },
        methods: {
            back() {
                window.history.back();
            },
            goIconPage() {
                this.$router.push({
                    path: '/learn/addAlone',
                    query: {}
                })
            },
            /*  describe: Load all the data for the organization's learn -- 加载在线学习全部数据
            *   @parameter：null
            *   @return：null
            */
            onLoadAll() {
                let me = this;
                me.all_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.all_pageIndex,
                        pageSize: me.all_pageSize
                    }, 'learn_allAlone').then(res => {
                        let data = res.result.list;
                        if(res.code == 1001){
                            me.all_pageIndex++;
                            for (let i = 0; i < data.length; i++) {
                                me.allList.push({
                                    img: data[i].headPic, // 头像
                                    lifeDescribe: data[i].subject,
                                    name: data[i].creator.name,
                                    time: data[i].addDate,
                                    site: data[i].location,
                                    meetingType: data[i].type,
                                    goPageUrl: '/learn/aloneDetail',
                                    id: data[i]._id,
                                });
                            }
                            if (data.length < me.all_pageSize) {
                                me.all_finished = true;
                            }
                            me.all_loading = false;
                        }else{
                            me.all_finished = true;
                            me.all_loading = false;
                        }
                    });
                }, 500);
            },
            /*  describe: Load my the data for the organization's learn -- 加载在线学习中我的数据
            *   @parameter：null
            *   @return：null
            */
            onLoadMy() {
                let me = this;
                me.my_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        status: 0, // (0:未发布,1:已发布)
                        pageNo: me.my_pageIndex,
                        pageSize: me.my_pageSize
                    }, 'learn_myAlone').then(res => {
                        let data = res.result.list;
                        if(res.code == 1001){
                            me.my_pageIndex++;
                            for (let i = 0; i < data.length; i++) {
                                me.myList.push({
                                    img: data[i].headPic, // 头像
                                    lifeDescribe: data[i].subject,
                                    name: data[i].creator.name,
                                    time: data[i].addDate,
                                    site: data[i].location,
                                    meetingType: data[i].type,
                                    goPageUrl: '/learn/aloneDetail',
                                    id: data[i]._id,
                                    experience: data[i].experience,
                                });
                            }
                            if (data.length < me.my_pageSize) {
                                me.my_finished = true;
                            }
                            me.my_loading = false;
                        }else{
                            me.my_finished = true;
                            me.my_loading = false;
                        }
                    });
                }, 500);
            },
            /*  describe: Delete the data -- 删除资料
            *   @parameter：Object、index
            *   @return：null
            */
            publish(parameter, index){
                if(!!parameter && typeof parameter){
                    Toast.loading({
                        mask: true,
                        message: '加载中'
                    });
                    apiLists.dataAjax({},'learn_deleteAlone',parameter.id).then(res => {
                        console.log(res);
                        if(res.code == 1001){
                            setTimeout(() => {
                                this.myList.splice(index,1);
                                this.onLoadMy();
                                Toast.success("删除成功");
                            },1000)

                        }else{
                            Toast.fail("删除失败");
                        }
                    })
                }else{
                    Toast.fail("删除失败");
                }
            },
            onEndDate(item) {
                if(!!item && typeof item === 'object'){
                    if(!item.experience){
                        if (!item.hasOwnProperty('endDate')) {
                            Dialog.confirm({
                                title: '结束',
                                message: '需要填写本次学习的心得体会并提交后才能完成',
                                confirmButtonText: '写心得',
                                confirmButtonColor: 'red'
                            }).then(() => {
                                this.$router.push({
                                    path: '/learn/thoughts',
                                    query: {
                                        id: item.id
                                    }
                                })
                            }).catch(() => {
                                // on cancel
                            });
                            let CurentTime = this.Util.CurentTime();
                            console.log("CurentTime = ", CurentTime);
                        }
                    }else{
                        Dialog.confirm({
                            title: '确认发布',
                        }).then(() => {
                            Toast.loading({
                                mask: true,
                                message: '加载中'
                            });
                            apiLists.dataAjax({
                                studyId: item.id,
                                experience: item.experience,
                                status: '3'
                            }, 'learn_writeThoughts').then(res => {
                                if (res.code == 1001) {
                                    setTimeout(() => {
                                        Toast.success("发布成功");
                                        window.history.back();
                                    }, 1000);

                                } else if (res.code == 1002) {
                                    setTimeout(() => {
                                        Toast.fail(res.message);
                                    }, 1000);
                                } else {
                                }
                            })
                        }).catch(() => {
                            // on cancel
                        });

                    }

                }
            }

        },
    }
</script>

<style lang="scss" scoped>
    #alone {
        padding-top: 46px;
        .start-finish{
            padding-top: 10px;
            margin-top: 5px;
            font-size: 12px;
            color: red;
            .SF_start{
                border-right: 1px solid #ebedf0;
            }
            div{
                text-align: center;
                width: 49.5%;
                float: left;
            }
        }
    }

</style>
