<template>
    <section id="pioneer">
        <van-nav-bar title="党建先锋" :fixed="true" left-arrow @click-left="back" :z-index="999">
           <van-icon name="add-o" slot="right" @click="creatNow()" />
        </van-nav-bar>
        <van-tabs :sticky="true" :offset-top="46" v-model="active">
            <van-tab title="全部">
                <van-list v-model="all_loading" :finished="all_finished" finished-text="没有更多了" @load="onLoadAll">
                    <van-cell v-for="(item,index) in allList" :key="index">
                        <compPioneer :comp-data="item"></compPioneer>
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
                <van-list v-model="my_loading" :finished="my_finished" @load="onLoadMy">
                    <van-cell v-for="(item,index) in myList" :key="index" >
                        <compPioneer :comp-data="item"></compPioneer>
                        <!-- 审核与删除 -->
                        <div class="auditing-box">

                             <span class="auditing" v-if="item.status == '0'&& isManager == '0'">
                                <i class="icon iconfont"> &#xe6f5;</i>
                                  <span>待审核</span>
                            </span>
                            <span class="auditing-admin" v-if="item.status == '0'&& isManager == '1'" @click="auditing(item,'my')">
                             <i class="icon iconfont"> &#xe6f5;</i>
                               <span>审核</span>
                            </span>

                            <span v-if="item.status == '1'" class="release" @click="release(item,index,'my')">
                                <i class="icon iconfont">&#xe651;</i>
                               <span>发布</span>
                            </span>
                            <span class="line"></span>
                            <span class="auditing-delet" @click="myDelet(item,'my')">
                                 <i class="icon iconfont">&#xe645;</i>
                                 <span>删除</span>
                            </span>
                        </div>
                    </van-cell>
                </van-list>
                 <!-- 立即创建 -->
                <div class="creat-box" v-show="creatShow">
                    <img src="./../../../assets/imgs/ic_empty.png">
                    <div class="dear">亲，你还没有党建先锋记录</div>
                    <button class="creat" @click="creatNow()">立即创建</button>
                </div>
            </van-tab>
        </van-tabs>
    </section>
</template>

<script>
    import compPioneer from '../pioneer/compPioneer';
    import apiLists from './../../../interfase/apiLists';
    import { Toast } from  'vant';
    import {Dialog} from 'vant';
    export default {
        name: "pioneer",
        components:{
            compPioneer,
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
                isManager:null
            }
        },
        mounted(){
            this.isManager = JSON.parse(localStorage.getItem("newH5")).userInfo.isManager;
        },
        methods:{
            back(){
                window.history.back();
            },

            //加载全部先锋列表
            onLoadAll() {
                let me = this;
                // 异步更新数据
                me.all_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.all_pageIndex,
                        pageSize: me.all_pageSize
                    }, 'pioneer_all').then(res =>{
                        let data = res.result.list;
                        console.log("res = ", data);
//                        if(res.result && res.result instanceof Array){
//                            let data = res.result.list;
//                        }
                        if(res.code == 1001) {
                        me.all_pageIndex++;
                        for (let i = 0; i < data.length; i++) {
                            me.allList.push({
                                img: data[i].headPic,
                                lifeDescribe: data[i].subject,
                                name: data[i].user.name,
                                time: data[i].addDate,
                                site: data[i].location,
                                commentCount: data[i].comments,
                                praiseCount: data[i].likes,
                                goPageUrl: '/pioneer/pioneerDetails',
                                id: data[i]._id,
                            });
                        }
                        if (data.length < me.all_pageSize) {
                            me.all_finished = true;
//                        me.allList = JSON.parse(JSON.stringify(me.allList));
//                       me.all_pageIndex++;
                        }
                        me.all_loading = false;
                    }else{
                        me.all_finished = true;
                        me.all_loading = false;
                    }
                        // 加载状态结束
//                        me.all_loading = false;
                      });
                    // 数据全部加载完成
//                    me.all_finished = true;
                }, 500);
            },

            //加载我的发布列表
            onLoadMy() {
                let me = this;
                // 异步更新数据
                me.my_loading = true;
                setTimeout(() => {
                    apiLists.dataAjax({
                        pageNo: me.my_pageIndex,
                        pageSize: me.my_pageSize,
                    }, 'pioneer_my').then(res => {
                        let data = res.result.list;
//                        if(res.result && res.result instanceof Array){
//                            let data = res.result.list;
//                        }
                        console.log(res);
                        if (res.code == 1001) {
                            me.my_pageIndex++;
                            for (let i = 0; i < data.length; i++) {
                                me.myList.push({
                                    img: data[i].headPic,
                                    lifeDescribe: data[i].subject,
                                    name: data[i].user.name,
                                    time: data[i].addDate,
                                    site: data[i].location,
                                    goPageUrl: '/pioneer/pioneerDetails',
                                    id: data[i]._id,
                                    status: data[i].status,
                                    commentCount: data[i].comments,
                                    approvalStatus: data[i].approvalStatus
                                });
                                console.log(data[i].approvalStatus)
                                if(data[i].approvalStatus==2 && this.isManager=='0'){
                                    apiLists.dataAjax({}, 'pioneer_delet', data[i]._id).then(res => {
                                        this.myUpdate();
                                    })
                                }
                            }
                            if (data.length == 0) {
                                this.creatShow = true;
                            }
                            console.log(data.length)
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

            //新建党建先锋
            creatNow(){
                setTimeout(() => {
                    this.$router.push({
                        path: '/pioneer/pioneerAdd',
                        query:{

                        }
                    });
                }, 500);

            },

            //删除列表
            myDelet(parameter,flag) {
                this.$dialog.confirm({
                    title: '提示',
                    message: '您确定要删除吗'
                }).then(() => {
                    Toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    apiLists.dataAjax({}, 'pioneer_delet', parameter.id).then(res => {
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

            //党建先锋发布
            release(parameter,index,flag){
                this.$dialog.confirm({
                    title: '提示',
                    message: '您确定要发布吗'
                }).then(() => {
                    Toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    apiLists.dataAjax({}, 'pioneer_release', parameter.id).then(res => {
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

            //党建先锋审核
            auditing(parameter,flag){
                Dialog.confirm({
                    title: '审核通过',
//                    message: '审核通过',
                    cancelButtonColor: 'red',
                    confirmButtonColor: 'red'
                }).then(() => {
                    Toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    apiLists.dataAjax({
                        pioneerId:parameter.id,
                        approvalStatus:2
                    }, 'pioneer_auditing').then(res => {
                        console.log(res);
                        if (res.code == 1001) {
                            setTimeout(() => {
                                Toast.clear(50);
                                Toast.success("审核成功");
                                if(flag === 'my'){
                                    this.allUpdate();
                                    this.myUpdate();
                                }
                            }, 1000);
                        } else {
                            setTimeout(() => {
                                Toast.clear(50);
                                Toast.success("审核失败");
                            }, 1000);
                        }
                    })
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
                    type:2,
                    typeId:parameter.id
                }, 'new_praise').then(res => {
                    if(res.code == 1001){
                        setTimeout(() => {
                            Toast.clear(50);
                            Toast.success("点赞成功");
                            if(flag === 'all'){
                                this.allUpdate();
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
                        path: '/pioneer/pioneerComment',
                        query: {
                            id:parameter.id,
                        }
                    });
            },

        },//methods底部

    }
</script>

<style lang="scss" scoped>
    #pioneer{
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
        .auditing{
            display: inline-block;
            margin-left: 16%;
            line-height: 30px;
        }
        .auditing-admin{
            display: inline-block;
            margin-left: 16%;
            line-height: 30px;
            color: red;
        }
        .auditing-delet{
            position: absolute;
            left:71% ;
            color: red;
        }
        .auditing-box{
            line-height: 40px;
            border-top: 1px solid #eee;
            margin-top: 8px;
            margin-bottom: -10px;
        }
        .comment-box {
            display: inline-block;
            margin-left: 14%;
            line-height: 30px;
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
    }
</style>
