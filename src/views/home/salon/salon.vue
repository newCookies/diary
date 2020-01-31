<template>
    <section id="salon">
        <van-nav-bar title="党建沙龙" :fixed="true" left-arrow @click-left="back" :z-index="999">
            <van-icon name="add-o" slot="right" @click="creatNow()"/>
        </van-nav-bar>
        <van-tabs :sticky="true" :offset-top="46" v-model="active">
            <van-tab title="全部">
                <van-list v-model="all_loading" :finished="all_finished" finished-text="没有更多了" @load="onLoadAll()">
                    <van-cell v-for="(item,index) in allList" :key="index">
                        <compSalon :comp-data="item"></compSalon>
                        <!-- 评论与赞-->
                        <div class="active-box">
                            <span class="comment-box" @click="comment(item)">
                                <i class="icon iconfont">&#xe656;</i>
                                <span class="comment">评论</span>
                                <span class="comment-num">{{ (item.commentCount!=null)?item.commentCount:0 }}</span>
                            </span>
                            <span class="line"></span>
                            <span class="praise-box" @click="praise(item,'all')">
                                <i class="icon iconfont">&#xe7c8;</i>
                                <span class="praise">赞</span>
                                <span class="praise-num">{{ (item.praiseCount!=null)?item.praiseCount:0 }}</span>
                            </span>
                        </div>
                    </van-cell>
                </van-list>
            </van-tab>

            <!-- 我的部分 -->
            <van-tab title="我的">
                <!-- 保存列表-->

                <!-- 已发布的列表 -->
                <van-list v-model="my_loading" :finished="my_finished" @load="onLoadMy">
                    <van-cell v-for="(item,index) in myList" :key="index">
                        <compSalon :comp-data="item"></compSalon>

                        <!-- 评论与赞-->
                        <div class="active-box" v-if="item.online =='1'">
                            <span class="comment-box" @click="comment(item)">
                                <i class="icon iconfont">&#xe656;</i>
                                <span class="comment">评论</span>
                                <span class="comment-num">{{ (item.commentCount!=null)?item.commentCount:0 }}</span>
                            </span>
                            <span class="line"></span>
                            <span class="praise-box" @click="praise(item,'my')">
                                 <i class="icon iconfont">&#xe7c8;</i>
                                 <span class="praise">赞</span>
                                 <span class="praise-num">{{ (item.praiseCount!=null)?item.praiseCount:0 }}</span>
                            </span>
                        </div>

                        <!-- 发布与删除 -->
                        <div class="keep-box" v-if="item.online =='0'">
                            <span class="release" @click="release(item,'my')">
                                <i class="icon iconfont">&#xe651;</i>
                                <span>发布</span>
                            </span>
                            <span class="line"></span>
                            <span class="release-delet" @click="delet(item,'my')">
                                <i class="icon iconfont">&#xe645;</i>
                                <span>删除</span>
                            </span>
                        </div>
                    </van-cell>
                </van-list>

                <!-- 立即创建 -->
                <div class="creat-box" v-show="creatShow">
                    <img src="./../../../assets/imgs/ic_empty.png">
                    <div class="dear">亲，你还没有党建沙龙记录</div>
                    <button class="creat" @click="creatNow()">立即创建</button>
                </div>
            </van-tab>
        </van-tabs>
    </section>
</template>

<script>
    import compSalon from '../salon/compSalon';
    import apiLists from './../../../interfase/apiLists'
    import { Toast } from  'vant'
    export default {
        name: "salon",
        components: {
            compSalon,
        },
        data() {
            return {
                allList: [],
                all_loading: false,
                all_finished: false,
                all_pageIndex: 1,
                all_pageSize: 10,
                myList:[],
                my_loading: false,
                my_finished: false,
                my_pageIndex: 1,
                my_pageSize: 10,
                active: 0,
                creatShow: false,
            }
        },
        mounted(){
            let $id=this.$route.query.idTest;
            apiLists.dataAjax({}, 'salon_release', $id).then(res => {
            })
        },
        methods: {
            back() {
                window.history.back();
            },
            onLoadAll() {
                let me = this;
                // 异步更新数据
                me.all_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.all_pageIndex,
                        pageSize: me.all_pageSize,
                        type: 0
                    }, 'salon_all').then(res => {
                        let data = res.result.list;
                        console.log("res = ", data);
                        if (res.code == 1001) {
                            me.all_pageIndex++;
                            for (let i = 0; i < data.length; i++) {
                                me.allList.push({
                                    img: data[i].headPic,
                                    lifeDescribe: data[i].title,
                                    name: data[i].user.name,
                                    time: data[i].addDate,
                                    read: data[i].reads,
                                    online: data[i].onLine,
                                    top: data[i].isTop,
                                    best: data[i].isBest,
                                    hot: data[i].isHot,
                                    commentCount: data[i].comments,
                                    praiseCount: data[i].likes,
                                    goPageUrl: '/salon/salonDetails',
                                    id: data[i]._id,
                                });
                            }
                            if (data.length < me.all_pageSize) {
                                me.all_finished = true;
                            }
                            me.all_loading = false;
                        } else {
                            me.all_finished = true;
                            me.all_loading = false;
                        }
                    });
                }, 500);
            },

            //加载我的列表
            onLoadMy() {
                let me = this;
                // 异步更新数据
                me.my_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.my_pageIndex,
                        pageSize: me.my_pageSize,
                        type: 1
                    }, 'salon_all').then(res => {
                        let data = res.result.list;
                        console.log("res = ", data);
                        if (res.code == 1001) {
                            me.my_pageIndex++;
                            for (let i = 0; i < data.length; i++) {
                                me.myList.push({
                                    img: data[i].headPic,
                                    lifeDescribe: data[i].title,
                                    name: data[i].user.name,
                                    time: data[i].publicDate,
                                    read: data[i].reads,
                                    online: data[i].onLine,
                                    top: data[i].isTop,
                                    best: data[i].isBest,
                                    hot: data[i].isHot,
                                    commentCount: data[i].comments,
                                    praiseCount: data[i].likes,
                                    goPageUrl: '/salon/salonDetails',
                                    id: data[i]._id,
                                });
                            }
                            if (data.length == 0) {
                                this.creatShow = true;
                            }
                            if (data.length < me.my_pageSize) {
                                me.my_finished = true;
                            }
                            me.my_loading = false;
                        } else {
                            me.my_finished = true;
                            me.my_loading = false;
                        }
                    });
                }, 500);
            },

            //点赞
            praise(parameter,flag) {
                Toast.loading({
                    mask: true,
                    message: '加载中'
                });
                apiLists.dataAjax({}, 'salon_praise', parameter.id).then(res => {
                    if(res.code == 1001){
                        setTimeout(() => {
                            Toast.clear(50);
                            Toast.success("点赞成功");
                            if(flag === 'all'){
                                this.allUpdate();
                            }
                            if(flag === 'my'){
                                this.myUpdate();
                            }
                        },1000);
                    }else if (res.code == 1002) {
                        setTimeout(() => {
                            Toast.clear(50);
                            Toast.fail("你已经点过赞了");
                        },1000);
                    }else{
                        setTimeout(() => {
                            Toast.clear(50);
                            Toast.fail("点赞失败");
                        },1000);
                    }

                })
            },

            //刷新全部列表
            allUpdate(){
                this.all_loading = false;
                this.all_finished = false;
                this.all_pageIndex = 1;
                this.allList = [];
            },

            //刷新我的列表
            myUpdate(){
                this.my_loading = false;
                this.my_finished = false;
                this.my_pageIndex = 1;
                this.myList = [];
            },

            //评论
            comment(parameter) {
                    this.$router.push({
                        path: '/salon/salonComment',
                        query: {
                            id:parameter.id
                        }
                    });
            },

            //创建党建沙龙
            creatNow() {
                this.$router.push({
                    path: '/salon/salonAdd',
                    query: {}
                });
            },

            //党建沙龙发布
            release(parameter,flag) {
                this.$dialog.confirm({
                    title: '提示',
                    message: '您确定要发布吗'
                }).then(() => {
                    Toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    apiLists.dataAjax({}, 'salon_release', parameter.id).then(res => {
                        console.log(res);
                        if (res.code == 1001) {
                            setTimeout(() => {
                                Toast.clear(50);
                                Toast.success("发布成功");
                                if(flag === 'my'){
                                    this.allUpdate();
                                    this.myUpdate();
                                }
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                Toast.clear(50);
                                Toast.success("发布失败");
                            }, 1000);
                        }
                    })
                    // on confirm
                }).catch(() => {
                    // on cancel
                });
            },

            //删除党建沙龙
            delet(parameter,flag) {
                this.$dialog.confirm({
                    title: '提示',
                    message: '您确定要删除吗'
                }).then(() => {
                    Toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    apiLists.dataAjax({}, 'salon_delet', parameter.id).then(res => {
                        console.log(res);
                        if (res.code == 1001) {
                            setTimeout(() => {
                                Toast.clear(50);
                                Toast.success("删除成功");
                                if(flag === 'my'){
                                    this.myUpdate();
                                }
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                Toast.clear(50);
                                Toast.success("删除失败");
                            }, 1000);
                        }
                    })
                    // on confirm
                }).catch(() => {
                    // on cancel
                });
            }

        },
        created() {


        }
    }
</script>

<style lang="scss" scoped>
    #salon {
        padding-top: 46px;
        .creat-box {
            width: 100%;
            text-align: center;
            margin-top: 150px;
        }

        img {
            width: 100px;
        }

        .dear {
            font-size: 14px;
            margin-top: 10px;
        }

        .creat {
            margin-top: 10px;
            border: none;
            background-color: white;
            color: red;
            font-size: 14px;
        }

        .comment-box {
            display: inline-block;
            margin-left: 14%;
            line-height: 30px;
            color: red;
        }

        .praise-box {
            position: absolute;
            left: 71%;
            color: red;
        }

        .active-box {
            line-height: 40px;
            border-top: 1px solid #eee;
            margin-top: 8px;
            margin-bottom: -10px;
        }

        .comment, .comment-num,
        .praise, .praise-num {
            margin-left: 3px;
        }
        .keep-box {
            line-height: 40px;
            border-top: 1px solid #eee;
            margin-top: 8px;
            margin-bottom: -10px;
        }
        .release {
            display: inline-block;
            margin-left: 16%;
            line-height: 30px;
            color: red;
        }
        .release-delet {
            position: absolute;
            left:71% ;
            color: red;
        }
        .line{
            display: inline-block;
            position: absolute;
            left: 50%;
            border-right: 1px solid #eee;
            height: 50px;
            margin-top: 7px;
        }
    }
</style>
