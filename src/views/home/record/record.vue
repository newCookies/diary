<template>
    <section id="record">
        <van-nav-bar title="工作日志" :fixed="true" left-arrow @click-left="back" :z-index="999">
            <van-icon name="add-o" slot="right" @click="creatNow()" />
        </van-nav-bar>
        <van-tabs :sticky="true" :offset-top="46" v-model="active">
            <van-tab title="全部">
                <van-list v-model="all_loading" :finished="all_finished" finished-text="没有更多了" @load="onLoadAll">
                    <van-cell v-for="(item,index) in allList" :key="index">
                        <compRecord :comp-data="item"></compRecord>
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
            <van-tab title="我的">
                <!-- 已发布列表 -->
                <van-list v-model="my_loading" :finished="my_finished" @load="onLoadMy()">
                    <van-cell v-for="(item,index) in myList" :key="index">
                        <compRecord :comp-data="item"></compRecord>
                        <!-- 评论与赞-->
                        <div class="active-box" v-show="(item.status =='1')?true:false">
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
                        <div class="keep-box" v-if="item.status =='0'">
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
                    <div class="dear">亲，你还没有工作日志记录</div>
                    <button class="creat" @click="creatNow()" ref="creat">立即创建</button>
                </div>
            </van-tab>
        </van-tabs>
    </section>
</template>

<script>
    import compRecord from '../record/compRecord';
    import apiLists from './../../../interfase/apiLists'
    import { Toast } from  'vant'
    export default {
        name: "record",
        components:{
            compRecord,
        },
        data(){
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
                creatShow:false,
            }
        },
        methods: {
            back() {
                window.history.back();
            },
            //工作日志加载全部列表
            onLoadAll() {
                let me = this;
                // 异步更新数据
                me.all_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.all_pageIndex,
                        pageSize: me.all_pageSize,
                    }, 'record_all').then(res => {
                        let data = res.result.list;
                        console.log("res = ", data);
                        if (res.code == 1001) {
                            me.all_pageIndex++;
                            for (let i = 0; i < data.length; i++) {
                                me.allList.push({
                                    img: data[i].picture,
                                    lifeDescribe: data[i].title,
                                    name: data[i].user.name,
                                    time: data[i].addDate,
                                    site: data[i].address,
                                    commentCount: data[i].comments,
                                    praiseCount: data[i].likes,
                                    goPageUrl: '/record/recordDetails',
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

            //加载我的工作日志列表
            onLoadMy() {
                let me = this;
                // 异步更新数据
                me.my_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.my_pageIndex,
                        pageSize: me.my_pageSize,
                    }, 'record_my').then(res => {
                        let data = res.result.list;
                        console.log("res = ", data);
                        if (res.code == 1001) {
                            me.my_pageIndex++;
                            for (let i = 0; i < data.length; i++) {
                                me.myList.push({
                                    img: data[i].picture,
                                    lifeDescribe: data[i].title,
                                    name: data[i].user.name,
                                    time: data[i].publicDate,
                                    site:data[i].address,
                                    read: data[i].reads,
                                    commentCount: data[i].comments,
                                    praiseCount: data[i].likes,
                                    status: data[i].status,
                                    goPageUrl: '/record/recordDetails',
                                    id: data[i]._id,
                                });
                            }
                            if(data.length==0){
                                this.creatShow=true;
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

            //刷新全部列表
            allUpdate(){
                this.all_loading = false;
                this.all_finished = false;
                this.all_pageIndex = 1;
                this.allList = [];
            },

            //刷新我的发布列表
            myUpdate(){
                this.my_loading = false;
                this.my_finished = false;
                this.my_pageIndex = 1;
                this.myList = [];
            },

            //工作日志删除
            delet(parameter,flag){
                this.$dialog.confirm({
                    title: '提示',
                    message: '您确定要删除吗'
                }).then(() => {
                    Toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    apiLists.dataAjax({}, 'record_delet', parameter.id).then(res => {
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
            },

            //新建工作日志
            creatNow(){
                this.$router.push({
                    path: '/record/recordAdd',
                    query:{
                    }
                });
            },

            //工作日志发布
            release(parameter,flag){
                this.$dialog.confirm({
                    title: '提示',
                    message: '您确定要发布吗'
                }).then(() => {
                    Toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    apiLists.dataAjax({}, 'record_release', parameter.id).then(res => {
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

            //点赞
            praise(parameter,flag) {
                console.log(parameter.id);
                Toast.loading({
                    mask: true,
                    message: '加载中'
                });
                apiLists.dataAjax({
                    type:3,
                    typeId:parameter.id
                }, 'new_praise').then(res => {
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

            //评论
            comment(parameter) {
                    this.$router.push({
                        path: '/record/recordComment',
                        query: {
                            id:parameter.id,
                        }
                    });
            },

        }
    }
</script>

<style lang="scss" scoped>
    #record{
        padding-top: 46px;
        .creat-box{
            width: 100%;
            text-align: center;
            margin-top: 150px;
        }
        img{
            width: 100px;
        }
        .dear{
            font-size: 14px;
            margin-top: 10px;
        }
        .creat{
            margin-top: 10px;
            border: none;
            background-color: white;
            color: red;
            font-size: 14px;
        }
        .keep-box{
            line-height: 40px;
            border-top: 1px solid #eee;
            margin-top: 8px;
            margin-bottom: -10px;
        }
        .release{
            display: inline-block;
            margin-left: 16%;
            line-height: 30px;
            color: red;
        }
        .release-delet{
            position: absolute;
            left: 71%;
            color: red;
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

